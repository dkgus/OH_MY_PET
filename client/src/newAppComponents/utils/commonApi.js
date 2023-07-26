import axios from "axios";

export const commonApi = () => {
  const api = axios.create({
    baseURL: "/",
    headers: {
      "Content-Type": "application/json",
      withCredentials: true,
    },
  });

  api.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("token");
      config.headers.common["x-auth-token"] = token;
      config.headers["Cache"] = "No-cache";

      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return api;
};
