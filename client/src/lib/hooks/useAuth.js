"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signin as signinAction,
  signup as signupAction,
  forgotPassword as forgotAction,
  signout as signoutAction,
} from "@/lib/actions/authAction.js";

export default function useAuth(type) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [notification, setNotification] = useState(null);

  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    if (e?.preventDefault) e.preventDefault();
    setLoading(true);
    setError({});
    setNotification(null);
    let data;

    try {
      if (type === "signin") {
        data = await signinAction(formData);
        console.log(data);
        if (!data.success) {
          setError(data.errors);
          setNotification({ message: "Form contains errors", type: "error" });
          return;
        }
        const role = data.data.user.role;
        setNotification({ message: "Login berhasil!", type: "success" });
        router.push(role === "admin" ? "/dashboard" : "/profile");
      } else if (type === "signup") {
        data = await signupAction(formData);
        if (!data.success) {
          setError(data.errors);
          setNotification({ message: "Form contains errors", type: "error" });
          return;
        }
        setNotification({ message: "Registrasi berhasil!", type: "success" });
        router.push("/profile");
      } else if (type === "forgot") {
        data = await forgotAction(formData);
        console.log("s");
        if (!data.success) {
          setError(data.errors);
          setNotification({ message: "Form contains errors", type: "error" });
          return;
        }
        setNotification({ message: "Email reset dikirim!", type: "success" });
      }
    } catch (err) {
      const msg = "Terjadi error";
      setNotification({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signoutAction();
      setNotification({ message: "Logout berhasil", type: "success" });
    } catch (err) {
      console.error(err);
      setNotification({ message: "Gagal logout", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    updateField,
    submit,
    loading,
    error,
    notification,
    setError,
    setNotification,
    logout,
  };
}
