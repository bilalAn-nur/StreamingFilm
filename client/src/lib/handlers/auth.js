import { BASE_URL } from "@/config/index.js";
import { validateAuthForm } from "../validation/auth.schema.js";

export async function handleSubmitAuth(formData, type, router) {
  // validasi
  const result = validateAuthForm(formData, type);

  if (!result.success) return { success: false, errors: result.errors };

  // submit API
  try {
    const res = await fetch(`${BASE_URL}/auth/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.data);
    console.log(data.accessToken);
    if (res.ok) {
      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/profile");
      return { success: true };
    } else {
      const error = await res.json();
      return {
        success: false,
        errors: { form: error.message || "Email atau password salah!" },
      };
    }
  } catch (err) {
    alert(err);
    return {
      success: false,
      errors: { form: "Terjadi kesalahan, coba lagi nanti." },
    };
  }
}
