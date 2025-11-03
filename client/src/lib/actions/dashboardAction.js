import api from "@/utils/axios";

// --- Refresh token dan simpan ---
export async function refreshAndStoreAccessToken() {
  const res = await api.post("/token/refresh", {}, { withCredentials: true });
  const accessToken = res.data?.accessToken;
  if (accessToken && typeof window !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
  }
  return accessToken;
}

// --- Ambil data user ---
export async function getUser() {
  let token =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  if (!token) {
    token = await refreshAndStoreAccessToken();
  }

  if (!token)
    throw new Error("No access token available (and refresh failed).");

  const res = await api.get("/users", {
    headers: { Authorization: `Bearer ${token}` },
    withCredentials: true,
  });

  return res.data; // misal { user: {...} }
}
