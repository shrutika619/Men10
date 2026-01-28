import axios from "axios";
import { Constants } from "@/app/utils/constants";

const axiosInstance = axios.create({
    baseURL: Constants.API_BASE_URL,
    withCredentials: true, 
});

// 1. Request Interceptor: Attach the current token to every request
axiosInstance.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 

// 2. Response Interceptor: Handle 401 and Refresh Token
axiosInstance.interceptors.response.use(
    (res) => res,
    async (error) => {
        const originalRequest = error.config;

        // Check if error is 401 (Unauthorized) and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Call your Next.js API route to refresh the token
                const refreshRes = await fetch("/api/refresh-access-token", { method: "POST" });
                
                if (refreshRes.ok) {
                    const data = await refreshRes.json();
                    
                    // Update the new access token in localStorage for subsequent requests
                    if (data.accessToken) {
                        localStorage.setItem("token", data.accessToken);
                        
                        // Update the header of the original request that failed
                        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
                    }

                    // Retry the original request with the new token
                    return axiosInstance(originalRequest);
                } else {
                    // Refresh token is likely expired too
                    throw new Error("Refresh token expired");
                }
            } catch (refreshError) {
                // ✅ FORCE LOGOUT: Clear data and redirect if refresh fails
                console.error("Session expired, logging out...");
                localStorage.removeItem("token");
                localStorage.removeItem("userId");
                
                // Use window.location to force a full app reset (clears Redux)
                if (typeof window !== "undefined") {
                    window.location.href = "/login?message=session_expired";
                }
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default axiosInstance;