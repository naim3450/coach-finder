import axios from "axios";
import rootConfig from "../config/index.js";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: rootConfig.server_base_url, // Replace with your API base URL
  timeout: 20000, // Optional: set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage or any storage mechanism you use
    const token = localStorage.getItem("authToken");
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
  (response) => response.data, // Return the response if it's successful
  (error) => {
    // Check for 401 Unauthorized error
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login.");
      // Optionally, handle logout or redirect to login page
      window.location.href = "/";
    }
    return Promise.reject(error); // Reject the promise with the error
  }
);

export default axiosInstance;
