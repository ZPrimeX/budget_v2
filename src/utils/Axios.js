import axios from "axios";

export const req = axios.create({
  baseURL: "/api/",
  headers: { "Content-Type": "application/json" },
});

req.interceptors.request.use((config) => {
  if (typeof localStorage !== "undefined") {
    const token = localStorage.getItem("token");
    const userToken = token ? `Bearer ` + token : false;
    if (userToken && config.headers) {
      config.headers.Authorization = userToken;
    }
    return config;
  }
  return config;
});
