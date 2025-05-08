import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";
import type {UserType} from "@root/types/userTypes.ts";
import type {AuthProviders, UserRole} from "@root/types/userTypes.ts";

interface UserState extends UserType{
    isSignedUp: boolean
    lastLoginLocal: Date | undefined
    login: (userData: {
        name: string
        username: string
        role: UserRole
        id: string
        email: string
        avatar?: string | undefined
        authProviders?: AuthProviders[] | undefined
    }) => void
    logout: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isSignedUp: false,
            lastLoginLocal: undefined,
            name: undefined,
            username: undefined,
            avatar: undefined,
            authProviders: ["CREDENTIALS"],
            role: "GUEST",
            id: undefined,
            email: undefined,
            login: ({name,username, role, id, email, avatar = undefined, authProviders = ["CREDENTIALS"] }) =>
                set({
                    isSignedUp: true,
                    lastLoginLocal: new Date(),
                    name,
                    username,
                    role,
                    id,
                    email,
                    avatar,
                    authProviders
                }),
            logout: () => set({
                isSignedUp: false,
                name: undefined,
                username: undefined,
                role: "GUEST",
                id: undefined,
                email: undefined,
                avatar: undefined,
                authProviders: undefined
            }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => sessionStorage),
        },
    ),
)