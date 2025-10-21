"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { handleSubmitAuth } from "@/lib/authHandle";

export default function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleSubmitAuth(formData, type, router);
    if (!result.success) setErrors(result.errors);
    else setErrors({});
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
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {type === "login"
            ? "Login"
            : type === "register"
            ? "Register"
            : "Forgot Password"}
        </button>
      </form>
    </div>
  );
}
