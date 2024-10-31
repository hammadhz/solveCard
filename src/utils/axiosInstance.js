import axios from "axios";
import { SERVER_URL } from "../constants/ServerUrl";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      config.url === "/login" ||
      config.url === "/register" ||
      config.url === "/forgotPassword" ||
      config.url === "/resetPassword"
    ) {
      config.headers["Accept"] = "application/json";
      config.headers["Content-Type"] = "application/json";
      config.headers["Device-Id"] = "123456";
    } else {
      const token = Cookies.get("token");
      config.headers["Accept"] = "application/json";
      if (
        config.url === "/addPhoneContact" ||
        config.url === "/updateProfile" ||
        config.url === "/updatePhoneContact"
      ) {
        config.headers["Content-Type"] = "multipart/form-data";
      } else {
        config.headers["Content-Type"] = "application/json";
      }
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
