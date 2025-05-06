import axiosInstance from "@/lib/axios.ts";
import {useUserStore} from "@/store/userStore.ts";
import {useUnifiedStore} from "@/store/unifiedStore.ts";

export class AuthService {


    static async signup(data: { email: string, name: string, password: string }) {
        try {
            return await axiosInstance.post('/auth/signup', data);
        } catch (error: any) {
            return error.response;
        }
    }

    static async signin(data: { email: string, password: string }) {
        try {
            const res = await axiosInstance.post('/auth/login', data);

            const {user, accessToken, refreshToken} = res.data.data;

            useUserStore.getState().login(user.name, user.role, user.id, user.email);
            useUnifiedStore.getState().setAccessToken(accessToken);
            useUnifiedStore.getState().setRefreshToken(refreshToken);

            return res;
        } catch (error: any) {
            throw error;
        }
    }

    static async verifyEmail(token: string) {

    }


    static async resendVerificationEmail(email: string) {

    }


    static async refresh(refreshToken: string) {

    }

    static async logout() {
        try {
            // Send empty object as body since server extracts userId from JWT token
            await axiosInstance.post('/auth/logout', {});
            useUserStore.getState().logout();
            useUnifiedStore.getState().logout();
        } catch (error: any) {
            console.log(error);
            throw error;
        }
    }

    static async forgotPassword(email: string) {

    }

    static async resetPassword(token: string, newPassword: string) {

    }
}
