"use client";
import { BASE_URL } from "@/config";
import { handleSubmitLogout } from "@/lib/handlers/auth";
import React from "react";

const ProfilePage = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    handleSubmitLogout();
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
