"use client";
import Input from "@/components/auth/Input";
import Notification from "@/components/home/Notification";
import useAuth from "@/lib/hooks/useAuth";

export default function AuthForm({ type }) {
  const {
    formData,
    updateField,
    submit,
    loading,
    notification,
    setNotification,
    error,
  } = useAuth(type);

  return (
    <div className="w-full max-w-sm bg-gray-800 rounded-2xl p-6 shadow-lg">
      <Notification
        notification={notification}
        onClose={() => setNotification(null)}
      />

      <form onSubmit={submit}>
        {type === "signup" && (
          <Input
            label="Full Name"
            name="name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            error={error.name}
          />
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField("email", e.target.value)}
          error={error.email}
        />

        {type !== "forgot" && (
          <Input
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            error={error.password}
          />
        )}

        {type === "signup" && (
          <Input
            label="Re-Password"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={(e) => updateField("password2", e.target.value)}
            error={error.password2}
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-4"
        >
          {loading
            ? "Processing..."
            : type === "signin"
            ? "Login"
            : type === "signup"
            ? "Register"
            : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
