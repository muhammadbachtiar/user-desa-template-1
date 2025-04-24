import axios from "axios";

const API_URL = import.meta.env.VITE_API_AUTH_URL
const API_VERSION = "/api/v1/public";

const axiosConfig = axios.create({
    baseURL: API_URL + API_VERSION,
    headers: {
      Accept: "application/json",
    },
    timeout: 15000
  });
  
axiosConfig.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        console.error("Request error:", error);
        return Promise.reject(error); 
    }
);

export default axiosConfig;
