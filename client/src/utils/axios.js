import axios from "axios";
import CONFIG from "@/config";

const api = axios.create({
  baseURL: CONFIG.BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Attach access token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh token otomatis jika 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const res = await api.post("/auth/refresh-token");
        localStorage.setItem("accessToken", res.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        window.location.href = "/sign-in";
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
