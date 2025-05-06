import {create} from 'zustand'
import {createJSONStorage, persist} from "zustand/middleware";

interface UnifiedState {
    accessToken: string | null
    refreshToken: string | null
    setAccessToken: (accessToken: string) => void
    setRefreshToken: (refreshToken: string) => void
    logout: () => void
}

export const useUnifiedStore = create<UnifiedState>()(
    persist(
        (set) => ({
            accessToken: null,
            refreshToken: null,
            setAccessToken: (accessToken) => set({accessToken}),
            setRefreshToken: (refreshToken) => set({refreshToken}),
            logout: () => set({accessToken: null, refreshToken: null}),
        }),
        {
            name: 'unified-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    ),
)