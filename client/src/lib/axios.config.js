import rootConfig from "@/config";
import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: rootConfig.server_base_url,
  timeout: 10000,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from cookies
    let token;
    if (typeof window !== "undefined") {
      const cookies = document.cookie.split(";");
      const tokenCookie = cookies.find((cookie) =>
        cookie.trim().startsWith("auth_token=")
      );
      token = tokenCookie?.split("=")[1];
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Check for 401 Unauthorized error
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login.", { error });

      window.location.href = "/signin";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
