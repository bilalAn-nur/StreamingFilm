import CONFIG from "@/config";
import api from "@/utils/axios";
import { validateAuthForm } from "../validations/authSchema";

export async function signin(data) {
  const validation = validateAuthForm(data, "signin");
  if (!validation.success) return validation;

  const res = await api.post("/auth/sign-in", data);
  localStorage.setItem("accessToken", res.data.data.accessToken);
  return res.data;
}

export async function signup(data) {
  const validation = validateAuthForm(data, "signup");
  if (!validation.success) return validation;

  const res = await api.post("/auth/sign-up", data);
  localStorage.setItem("accessToken", res.data.accessToken);
  return res.data;
}

export async function forgotPassword(data) {
  const validation = validateAuthForm(data, "forgotPassword");
  console.log(validation);
  if (!validation.success) return validation;

  const res = await api.post("/auth/forgot-password", data);
  return res.data;
}

export async function signout() {
  await api.post("/auth/sign-out");
  localStorage.removeItem("accessToken");
  window.location.href = "/sign-in";
}
