export const BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
export const AUTH_URL = import.meta.env.VITE_AUTH_URL || `${BASE_URL}/auth`;
export const REQUEST_TIMEOUT =
  Number(import.meta.env.VITE_REQUEST_TIMEOUT) || 5000;
export const FEATURE_X_ENABLED = import.meta.env.VITE_FEATURE_X === "true";
