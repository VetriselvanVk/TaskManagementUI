// src/api/axiosInterceptor.js
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

// ✅ Create Axios instance
const api = axios.create({
  baseURL: "https://taskmanagementapi-bgn4.onrender.com/", // 🔁 Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ✅ Response interceptor
api.interceptors.response.use(
  (response) => {
    // alert(JSON.stringify(response?.data))
    if(response?.data?.statusCode == 401){
    
      toast.error(response?.data?.message)
      localStorage.clear()
    }
    return response;
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        toast.error("Unauthorized! Logging out...");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirect user to login page
      } else if (status === 403) {
        toast("Forbidden: You don't have access to this resource.");
      } else if (status >= 500) {
        toast.error(error.response.data);
      }
    } else if (error.request) {
      toast.error("No response from server. Check your network.");
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
