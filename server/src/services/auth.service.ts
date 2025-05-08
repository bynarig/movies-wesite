import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {ENV} from "@/config/env";
import {AppError} from "@/utils/appError";
import {logger} from "@/config/logger";
import {ErrorCode} from "@/utils/errorCodes";
import crypto, {randomUUID} from "crypto";
import {EmailService} from "./email.service";
import axios from "axios";

const prisma = new PrismaClient();

export class AuthService {

    public static isTokenExpired(token: string): boolean {
        try {
            const decoded = jwt.decode(token) as { exp: number };
            if (!decoded?.exp) return true;

            return decoded.exp * 1000 < Date.now();
        } catch {
            return true;
        }
    }

    public static getTokenExpiration(token: string): Date | null {
        try {
            const decoded = jwt.decode(token) as { exp: number };
            if (!decoded?.exp) return null;

            return new Date(decoded.exp * 1000);
        } catch {
            return null;
        }
    }

    private emailService: EmailService;

    constructor() {
        this.emailService = new EmailService();
    }

    private generateVerificationToken(): string {
        return crypto.randomBytes(32).toString("hex");
    }

    async signup(email: string, password: string) {
        console.log("Signup: ", email, password, "")

        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            throw new AppError("Email already exists", 400, ErrorCode.ALREADY_EXISTS);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationToken = this.generateVerificationToken();
        const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
        const name = `user-${randomUUID()}`;
        let user = await prisma.user.create({
            data: {
                email,
                name,
                username: name,
                password: hashedPassword,
                emailVerificationToken: verificationToken,
                emailVerificationExpires: verificationExpires,
            },
            select: {
                id: true,
                email: true,
                name: true,
                username: true,

                role: true,
                createdAt: true,
            },
        });


        const accessToken = this.generateAccessToken(user.id, user.role);
        const refreshToken = this.generateRefreshToken(user.id);

        await prisma.user.update({
            where: {id: user.id},
            data: {
                refreshToken,
            },
        })

        // Send verification email
        // await this.emailService.sendVerificationEmail(email, name, verificationToken);

        return {
            user: {
                ...user,
            },
            accessToken, refreshToken,
        };
    }

    async verifyEmail(token: string) {
        const user = await prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
                emailVerificationExpires: {
                    gt: new Date(),
                },
                emailVerified: null,
            },
        });

        if (!user) {
            throw new AppError(
                "Invalid or expired verification token",
                400,
                ErrorCode.INVALID_TOKEN
            );
        }

        await prisma.user.update({
            where: {id: user.id},
            data: {
                emailVerified: new Date(),
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
        });

        return {message: "Email verified successfully"};
    }

    private async cleanupExpiredTokens() {
        await prisma.user.updateMany({
            where: {
                emailVerificationExpires: {
                    lt: new Date(),
                },
                emailVerified: null,
            },
            data: {
                emailVerificationToken: null,
                emailVerificationExpires: null,
            },
        });
    }

    async resendVerificationEmail(email: string) {
        // Clean up expired tokens first
        await this.cleanupExpiredTokens();

        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) {
            throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
        }

        if (user.emailVerified) {
            throw new AppError(
                "Email is already verified",
                400,
                ErrorCode.INVALID_REQUEST
            );
        }

        const verificationToken = this.generateVerificationToken();
        await prisma.user.update({
            where: {id: user.id},
            data: {
                emailVerificationToken: verificationToken,
                emailVerificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            },
        });

        await this.emailService.sendVerificationEmail(
            user.email,
            user.name,
            verificationToken
        );

        return {message: "Verification email sent"};
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user || !user.password) {
            throw new AppError(
                "Invalid credentials",
                401,
                ErrorCode.INVALID_CREDENTIALS
            );
        }

        // if (!user.emailVerified) {
        //     throw new AppError(
        //         "Please verify your email before logging in",
        //         401,
        //         ErrorCode.UNAUTHORIZED
        //     );
        // }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError(
                "Invalid credentials",
                401,
                ErrorCode.INVALID_CREDENTIALS
            );
        }

        const accessToken = this.generateAccessToken(user.id, user.role);
        const refreshToken = this.generateRefreshToken(user.id);

        // Store refresh token in database
        await prisma.user.update({
            where: {id: user.id},
            data: {
                refreshToken,
                lastLogin: new Date(),
            },
        });

        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
            },
            accessToken,
            refreshToken,

        };
    }

    async googleAuth(token: string) {

        const {data: userInfo} = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {Authorization: `Bearer ${token}`},
            }
        );

        if (!userInfo.email) {
            throw new AppError(
                "Invalid token",
                401,
                ErrorCode.INVALID_CREDENTIALS
            );
        }

        // Then proceed with your user creation/login logic
        let user = await prisma.user.findUnique({
            where: {email: userInfo.email},
        });

        const name = `user-${randomUUID()}`;


        if (!user) {
            user = await prisma.user.create({
                data: {
                    email: userInfo.email,
                    name: userInfo.name || '',
                    username: name,
                    avatar: userInfo.picture,
                    authProviders: ['GOOGLE'],
                },
            });
        }

        const accessToken = this.generateAccessToken(user.id, user.role);
        const refreshToken = this.generateRefreshToken(user.id);
        const accessTokenExpiry = AuthService.getTokenExpiration(accessToken);
        const refreshTokenExpiry = AuthService.getTokenExpiration(refreshToken);

        await prisma.user.update({
            where: {id: user.id},
            data: {
                refreshToken,
                lastLogin: new Date(),
            },
        })


        return {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                username: user.username,
                role: user.role,
                avatar: userInfo.picture,
            },
            accessToken,
            refreshToken,

        };

    }

    async refresh(refreshToken: string) {
        if (!refreshToken) {
            throw new AppError(
                "Refresh token is required",
                400,
                ErrorCode.INVALID_TOKEN
            );
        }

        try {
            // Verify the refresh token first
            const decoded = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET) as {
                userId: string;
            };

            // Check if the token exists in DB and matches
            const user = await prisma.user.findFirst({
                where: {
                    id: decoded.userId,
                    refreshToken: refreshToken, // Verify the token matches what's stored
                },
            });

            if (!user) {
                throw new AppError(
                    "Invalid refresh token",
                    401,
                    ErrorCode.INVALID_TOKEN
                );
            }

            // Generate new tokens
            const accessToken = this.generateAccessToken(user.id, user.role);
            const newRefreshToken = this.generateRefreshToken(user.id);

            // Update the refresh token in DB (token rotation)
            await prisma.user.update({
                where: {id: user.id},
                data: {refreshToken: newRefreshToken},
            });

            return {
                accessToken,
                refreshToken: newRefreshToken,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    avatar: user.avatar,
                },
            };
        } catch (error) {
            // Handle specific JWT errors
            if (error instanceof jwt.TokenExpiredError) {
                throw new AppError(
                    "Refresh token expired",
                    401,
                    ErrorCode.TOKEN_EXPIRED
                );
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError(
                    "Invalid refresh token",
                    401,
                    ErrorCode.INVALID_TOKEN
                );
            }

            // For other errors
            logger.error("Refresh token error", {
                error,
                context: "AuthService.refresh",
            });
            throw new AppError(
                "Authentication failed",
                401,
                ErrorCode.AUTHENTICATION_FAILED
            );
        }
    }

    async logout(userId: string) {
        if (!userId) {
            throw new AppError("User ID is required", 400, ErrorCode.INVALID_INPUT);
        }

        try {
            // Clear the refresh token regardless of current token state
            await prisma.user.update({
                where: {id: userId},
                data: {refreshToken: null},
            });

            return {message: "Logged out successfully"};
        } catch (error) {
            logger.error("Logout error", {
                error,
                userId,
                context: "AuthService.logout",
            });

            // Even if DB update fails, consider it a successful logout
            return {message: "Logged out successfully"};
        }
    }

    private generateAccessToken(userId: string, role: string): string {
        return jwt.sign({userId, role}, ENV.JWT_SECRET, {
            expiresIn: ENV.JWT_EXPIRY,
        });
    }

    private generateRefreshToken(userId: string): string {
        return jwt.sign({userId}, ENV.REFRESH_TOKEN_SECRET, {expiresIn: ENV.REFRESH_TOKEN_EXPIRY}
        );
    }

    async forgotPassword(email: string) {
        const user = await prisma.user.findUnique({where: {email}});
        if (!user) {
            throw new AppError("User not found", 404, ErrorCode.NOT_FOUND);
        }

        const resetToken = this.generateVerificationToken();
        const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.user.update({
            where: {id: user.id},
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires: resetExpires,
            },
        });

        try {
            await this.emailService.sendPasswordResetEmail(
                user.email,
                user.name,
                resetToken
            );
            return {message: "Password reset email sent"};
        } catch (error) {
            // If email fails, clear the reset token
            await prisma.user.update({
                where: {id: user.id},
                data: {
                    passwordResetToken: null,
                    passwordResetExpires: null,
                },
            });
            throw error;
        }
    }

    async resetPassword(token: string, newPassword: string) {
        const user = await prisma.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            throw new AppError(
                "Invalid or expired reset token",
                400,
                ErrorCode.INVALID_TOKEN
            );
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: {id: user.id},
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });

        return {message: "Password reset successfully"};
    }
}
