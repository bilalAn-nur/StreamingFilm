"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import {
  handleSubmitForgot,
  handleSubmitLogin,
  handleSubmitRegister,
} from "@/lib/handlers/auth";
import Notification from "../home/Notification";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   let result;

  //   try {
  //     if (type === "login")
  //       result = await handleSubmitLogin(formData, type, router);
  //     else if (type === "register")
  //       result = await handleSubmitRegister(formData, type, router);
  //     else result = await handleSubmitForgot(formData, type, router);

  //     if (!result.success) {
  //       setErrors(result.errors);
  //       setNotification(result.errors.form || "Terjadi error!");
  //     } else {
  //       setNotification("Berhasil!");
  //     }
  //   } catch (err) {
  //     setNotification("Terjadi kesalahan, coba lagi nanti.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await handleSubmitLogin(formData, type, router, setNotification);

    setLoading(false);
  };
  return (
    <div className="w-full max-w-sm bg-gray-800 rounded-2xl p-6 shadow-lg">
      <Notification
        message={notification?.message || notification}
        type={notification?.type || "error"}
        onClose={() => setNotification(null)}
      />
      <form onSubmit={handleSubmit}>
        {type === "register" && (
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            className="text-white"
          />
        )}
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          className="text-white"
        />
        {type !== "forgot" && (
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            className="text-white"
          />
        )}
        {type === "register" && (
          <Input
            label="Re-Password"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            error={errors.password2}
            className="text-white"
          />
        )}

        <button
          type="submit"
          className={`w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition flex justify-center items-center mt-4`}
          disabled={loading}
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          )}
          {loading
            ? "Processing..."
            : type === "login"
            ? "Login"
            : type === "register"
            ? "Register"
            : "Forgot Password"}
        </button>
      </form>
    </div>
  );
}
