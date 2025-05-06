import axios from 'axios';
import {API_URL} from '@/consts.ts';
import {useUnifiedStore} from '@/store/unifiedStore.ts';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = useUnifiedStore.getState().accessToken;

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally here
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;