import { BASE_URL } from "@/config";

export async function getAccessTokenFromRefresh() {
  const res = await fetch(`${BASE_URL}/token/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // kirim cookie HttpOnly
  });

  if (!res.ok) {
    // baca body error kalau ada, lalu lempar error
    const txt = await res.text().catch(() => null);
    throw new Error(txt || `Refresh failed with status ${res.status}`);
  }

  // coba parse JSON — bisa jadi server tidak mengirim body
  const text = await res.text();
  const data = text ? JSON.parse(text) : {};
  return data?.accessToken ?? null;
}

export async function refreshAndStoreAccessToken(baseUrl) {
  const accessToken = await getAccessTokenFromRefresh(baseUrl);
  if (accessToken) {
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessToken);
    }
  }
  return accessToken;
}

export async function getUser() {
  try {
    // ambil token dari localStorage (jika ada)
    let token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    // kalau ga ada token, coba refresh dulu
    if (!token) {
      token = await refreshAndStoreAccessToken(BASE_URL);
    }
    if (!token) {
      throw new Error("No access token available (and refresh failed).");
    }

    const res = await fetch(`${BASE_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      credentials: "include",
    });

    if (!res.ok) {
      const txt = await res.text().catch(() => null);
      throw new Error(txt || `Request failed with status ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("getUser error:", error);
    throw error;
  }
}
