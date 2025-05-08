import {PrismaClient} from "@prisma/client";
import {AppError} from "@/utils/appError";

const prisma = new PrismaClient();

import {User} from "@prisma/client";

type UserRole = 'GUEST' | 'USER' | 'ADMIN' | 'MODERATOR' | 'OWNER' | 'SUPPORT' | 'UNVERIFIED'

export class UserService {
    async getAllUsers(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        return await prisma.user.findMany({
            take: limit,
            skip,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async getUserById(id: string) {
        const user = await prisma.user.findUnique({
            where: {id},
            select: {
                id: true,
                name: true,
                username: true,
                avatar: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
                lastLogin: true,
                authProviders: true,
            },
        });

        if (!user) {
            throw new AppError("User not found", 404);
        }

        return user;
    }

    async updateUser(
        id: string,
        data: Partial<User>
    ) {
        return prisma.user.update({
            where: {id},
            data,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }

    async deleteUser(id: string) {
        await prisma.user.delete({
            where: {id},
        });
    }

    async createUser(data: User) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
}
