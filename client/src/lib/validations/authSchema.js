import { z } from "zod";

// Schema untuk login
export const signinFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const signupFormShcema = z
  .object({
    name: z.string().min(3, { message: "Name is required" }),
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
    password2: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(100, { message: "Password must be at most 100 characters long" })
      .regex(/(?=.*[A-Za-z])(?=.*\d)/, {
        message: "Password must contain at least one letter and one number",
      }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
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

  if (type === "forgotPassword") {
    schema = forgotPasswordSchema;
  } else if (type === "signin") {
    schema = signinFormSchema;
  } else {
    schema = signupFormShcema;
  }

  const result = schema.safeParse(data);

  if (result.success) return { success: true, data: result.data };

  const { fieldErrors } = result.error.flatten();

  const errors = Object.fromEntries(
    Object.entries(fieldErrors).map(([key, msgs]) => [key, msgs?.[0]])
  );

  return { success: false, errors };
}
