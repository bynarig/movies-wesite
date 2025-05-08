import axiosInstance from "@/lib/axios.ts";
import {useUserStore} from "@/store/userStore.ts";

export class UserService {
    static async getProfileInfo() {
        const id = useUserStore.getState().id;
        const res =  await axiosInstance.get(`/users/profile/${id}`);
        return res.data.data;
    }
}
