import {z} from "zod";

export const signupSchema = z.object({
    email: z.string().email().max(99),
    password: z
        .string()
        .min(8)
        .max(100)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`])/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        )
});


export const refreshTokenSchema = z.object({
    refreshToken: z.string().min(1, "Refresh token is required"),
});

export const resendVerificationSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const verifyEmailSchema = z.object({
    token: z.string().min(1, "Verification token is required"),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const resetPasswordSchema = z.object({
    token: z.string().min(1, "Reset token is required"),
    password: z
        .string()
        .min(8)
        .max(100)
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
        ),
});
