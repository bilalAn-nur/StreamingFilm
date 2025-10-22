"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import {
  handleSubmitForgot,
  handleSubmitLogin,
  handleSubmitRegister,
} from "@/lib/handlers/auth";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let result;
    if (type === "login") {
      result = await handleSubmitLogin(formData, type, router);
    } else if (type === "register") {
      result = await handleSubmitRegister(formData, type, router);
    } else {
      result = await handleSubmitForgot(formData, type, router);
    }
    if (!result.success) {
      console.log(result.errors);
      setLoading(false);
      return setErrors(result.errors);
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl">
      <form onSubmit={handleSubmit}>
        {type == "register" && (
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
          />
        )}
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

        {type == "register" && (
          <Input
            label="Re-Password"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            error={errors.password2}
          />
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
