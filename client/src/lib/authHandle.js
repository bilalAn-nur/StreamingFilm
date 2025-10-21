import { validateAuthForm } from "./definitions";

export async function handleSubmitAuth(formData, type, router) {
  // validasi
  const result = validateAuthForm(formData, type);

  if (!result.success) return { success: false, errors: result.errors };

  // submit API
  try {
    const res = await fetch(`/api/auth/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push("/dashboard");
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
