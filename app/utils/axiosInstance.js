import axios from "axios";
import {Constants} from "@/app/utils/constants";

const axiosInstance = axios.create({
    baseURL: Constants.API_BASE_URL,
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
