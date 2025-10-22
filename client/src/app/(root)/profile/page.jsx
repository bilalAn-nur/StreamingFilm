"use client";
import { BASE_URL } from "@/config";
import React from "react";

const ProfilePage = () => {
  const handleLogout = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/sign-out`, {
        method: "POST",
        credentials: "include", // penting agar cookies (refreshToken) ikut terkirim
      });

      if (res.ok) {
        // Hapus accessToken dari localStorage
        localStorage.removeItem("accessToken");

        // Arahkan kembali ke halaman login
        window.location.href = "/sign-in";
      } else {
        const data = await res.json();
        alert(data.message || "Logout gagal");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Terjadi kesalahan saat logout");
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
