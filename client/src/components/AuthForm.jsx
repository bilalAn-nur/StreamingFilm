"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { handleSubmitAuth } from "@/lib/handlers/auth";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await handleSubmitAuth(formData, type, router);
    if (!result.success) setErrors(result.errors);
    else setErrors({});
    setLoading(false);
  };
  return (
    <div className="w-full max-w-sm bg-white rounded-2xl">
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        {type !== "forgot" && (
          <>
            <Input
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
            />
          </>
        )}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition flex justify-center items-center`}
          disabled={loading} // disable button saat loading
        >
          {loading ? (
            // Spinner sederhana
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
          ) : null}
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
