export type UserType = {
    id?: string;
    name?: string;
    username?: string;
    email?: string;
    role?: UserRole
    avatar?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    editedAt?: Date;
    lastLogin?: Date;
    likes?: any;
    bookmarks?: any;
    watched?: any;
    comments?: any;
    authProviders?: AuthProviders[];
    refreshToken?: string;
    emailVerified?: Date;
    emailVerificationToken?: string;
    emailVerificationExpires?: Date;
    passwordResetToken?: string;
}

export type UserRole = 'GUEST' | 'USER' | 'ADMIN' | 'MODERATOR' | 'OWNER' | 'SUPPORT' | 'UNVERIFIED'
export type AuthProviders = 'CREDENTIALS' | 'GOOGLE' | 'APPLE'