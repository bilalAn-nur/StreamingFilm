import { BASE_URL } from "@/config/index.js";
import { validateAuthForm } from "../validation/auth.schema.js";

export async function handleSubmitLogin(
  formData,
  type,
  router,
  setNotification
) {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await res.json();

    if (res.ok) {
      // simpan token
      localStorage.setItem("accessToken", data.data.accessToken);

      // notifikasi sukses
      // if (setNotification) setNotification("Login berhasil!", "success");

      const role = data.data.user.role;
      if (role === "admin") router.push("/dashboard");
      else router.push("/profile");

      return { success: true };
    } else {
      // ambil langsung error dari backend
      if (setNotification)
        setNotification(data.error || "Terjadi kesalahan", "error");
      return { success: false, errors: { form: data.error } };
    }
  } catch (err) {
    if (setNotification)
      setNotification(
        err.message || "Terjadi kesalahan, coba lagi nanti",
        "error"
      );
    return { success: false, errors: { form: err.message } };
  }
}

export async function handleSubmitRegister(formData, type, router) {
  const result = validateAuthForm(formData, type);

  if (!result.success) return { success: false, errors: result.errors };

  try {
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/profile");
      return { success: true };
    } else {
      return {
        success: false,
        errors: { form: data.message || "Terjadi kesalahan saat mendaftar." },
      };
    }
  } catch (err) {
    return {
      success: false,
      errors: { form: "Terjadi kesalahan, coba lagi nanti." },
    };
  }
}

export async function handleSubmitForgot(formData, type, router) {
  const result = validateAuthForm(formData, type);

  if (!result.success) return { success: false, errors: result.errors };
  try {
    // contoh request forgot password
    const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        errors: {
          form: data.message || "Gagal mengirim email reset password.",
        },
      };
    }
  } catch (err) {
    return {
      success: false,
      errors: { form: "Terjadi kesalahan, coba lagi nanti." },
    };
  }
}

export async function handleSubmitLogout(formData, type, router) {
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-out`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      // Hapus accessToken dari localStorage
      localStorage.removeItem("accessToken");

      // Arahkan kembali ke halaman login
      window.location.href = "/sign-in";
    } else {
      const data = await res.json();
      console.log(data.message || "Logout gagal");
    }
  } catch (error) {
    console.error("Logout error:", error);
    console.log("Terjadi kesalahan saat logout");
  }
}
