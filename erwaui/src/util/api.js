import axios from "axios";
import config from '../config/config'

const getAuthToken = () => {
  return localStorage.getItem("access_token"); 
};

const api = axios.create({
  baseURL: config.apiConfig.baseURL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach token to every request
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle token expiration (optional)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Redirect to login or refresh token (implement if needed)
    }
    return Promise.reject(error);
  }
);

export default api;
