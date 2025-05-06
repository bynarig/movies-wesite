import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

interface UserState {
    isSignedUp: boolean
    id: string | null
    name: string | null
    email: string | null
    role: 'guest' | 'user' | 'admin'
    login: (name: string, role: 'user' | 'admin', id: string, email: string) => void
    logout: () => void
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isSignedUp: false,
            name: null,
            role: "guest",
            id: null,
            email: null,
            login: (name, role, id, email) => set({isSignedUp: true, name, role, id, email}),
            logout: () => set({isSignedUp: false, name: null, role: "guest", id: null, email: null}),
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)