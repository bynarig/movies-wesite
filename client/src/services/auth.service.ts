import axiosInstance from "@/lib/axios.ts";
import {useUserStore} from "@/store/userStore.ts";
import {useUnifiedStore} from "@/store/unifiedStore.ts";
import {googleLogout} from "@react-oauth/google";

export class AuthService {

    private static isRefreshing = false;
    private static refreshQueue: ((token: string) => void)[] = [];


    static async signup(data: { email: string, password: string }) {
        try {
            const res = await axiosInstance.post('/auth/signup', data);
            const {user, accessToken, refreshToken} = res.data.data;

            useUserStore.getState().login({
                name: user.name,
                role: user.role,
                id: user.id,
                email: user.email,
                username: user.username
            });
            useUnifiedStore.getState().setAccessToken(accessToken);
            useUnifiedStore.getState().setRefreshToken(refreshToken);

            return res;
        } catch (error: any) {
            return error.response;
        }
    }

    static async signin(data: { email: string, password: string }) {
        try {
            const res = await axiosInstance.post('/auth/login', data);
            const {user, accessToken, refreshToken} = res.data.data;

            useUserStore.getState().login({
                name: user.name,
                role: user.role,
                id: user.id,
                email: user.email,
                username: user.username
            });
            useUnifiedStore.getState().setAccessToken(accessToken);
            useUnifiedStore.getState().setRefreshToken(refreshToken);

            return res;
        } catch (error: any) {
            return error.response;
        }
    }

    static async googleAuth(token: string) {
        try {
            const response = await axiosInstance.post('/auth/google', {token});

            const {user, accessToken, refreshToken} = response.data.data;
            useUserStore.getState().login({
                name: user.name,
                role: user.role,
                id: user.id,
                email: user.email,
                avatar: user.avatar,
                username: user.username
            });
            useUnifiedStore.getState().setAccessToken(accessToken);
            useUnifiedStore.getState().setRefreshToken(refreshToken);

            return response;
        } catch (error) {
            throw error;
        }
    }

    static async verifyEmail(token: string) {

    }


    static async resendVerificationEmail(email: string) {

    }


    static async refresh() {
        // If already refreshing, add to queue
        if (this.isRefreshing) {
            return new Promise<string>((resolve) => {
                this.refreshQueue.push(resolve);
            });
        }

        try {
            this.isRefreshing = true;
            const refreshToken = useUnifiedStore.getState().refreshToken;

            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await axiosInstance.post('/auth/refresh', {
                refreshToken: refreshToken
            });

            const {accessToken, refreshToken: newRefreshToken} = response.data.data;

            useUnifiedStore.getState().setAccessToken(accessToken);
            useUnifiedStore.getState().setRefreshToken(newRefreshToken);

            // Process all queued requests
            this.refreshQueue.forEach(cb => cb(accessToken));
            this.refreshQueue = [];

            return accessToken;
        } catch (error) {
            // If refresh fails, clear tokens and logout
            this.refreshQueue = [];
            await AuthService.forceLogout();
            throw error;
        } finally {
            this.isRefreshing = false;
        }
    }

    static async logout() {
        try {
            await axiosInstance.post('/auth/logout', {});
            await this.forceLogout();
        } catch (error: any) {
            // If logout fails with 401, still force cleanup
            if (error.response?.status === 401) {
                await this.forceLogout();
            } else {
                throw error;
            }
        }
    }

    static async forceLogout() {
        try {
            // Clear tokens and user data regardless of API call success
            googleLogout();
            useUserStore.getState().logout();
            useUnifiedStore.getState().logout();

            // Attempt API logout but don't fail if it does
            await axiosInstance.post('/auth/logout', {}, {
                // skipAuthRefresh: true // Add this custom flag to bypass refresh interceptor
            });
        } catch (error) {
            console.log('Cleanup logout error:', error);
        }
    }

    static async forgotPassword(email: string) {

    }

    static async resetPassword(token: string, newPassword: string) {

    }
}
