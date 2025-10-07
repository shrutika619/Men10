import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true, // ensures cookies are sent
});

// Handle 401 -> Refresh flow
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
            error.config._retry = true;
            await fetch("/api/refresh-access-token", { method: "POST" });
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
