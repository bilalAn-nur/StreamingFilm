import { z } from "zod";

// Schema untuk login/register
export const authFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(/(?=.*[A-Za-z])(?=.*\d)/, {
      message: "Password must contain at least one letter and one number",
    }),
});

// Schema untuk forgot password (hanya email)
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email wajib diisi" })
    .email({ message: "Format email tidak valid" }),
});

// Fungsi validasi generik
export function validateAuthForm(data, type) {
  let schema;

  if (type === "forgot") {
    schema = forgotPasswordSchema;
  } else {
    schema = authFormSchema;
  }

  const result = schema.safeParse(data);

  if (result.success) return { success: true, data: result.data };

  const { fieldErrors } = result.error.flatten();

  const errors = Object.fromEntries(
    Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0]])
  );

  return { success: false, errors };
}
