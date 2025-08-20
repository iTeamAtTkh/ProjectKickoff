// src/pages/login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Login() {
  const [alert, showAlert] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const loginUser = async (values) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Login failed");

      // Example: localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      showAlert({ show: true, message: err.message || "Something went wrong" });
    }
  };

  return (
    <div className="min-h-screen bg-[#C57640] text-[#C57640] flex flex-col">
      {/* Logo */}
      <div className="pt-10 flex justify-center">
        {/* Put the logo at public/images/pantrypalimg.png */}
        <img
          src="/images/pantrypalimg.png"
          alt="PantryPal logo"
          className="w-28 h-28 object-contain bg-[#F9F3F0] p-3 rounded shadow"
        />
      </div>

      {/* Title */}
      <h1 className="mt-6 text-center text-[#F9F3F0] font-extrabold tracking-wide uppercase text-3xl md:text-4xl">
        Login Account
      </h1>

      {/* Card */}
      <div className="mt-6 mx-auto w-[90%] max-w-xl bg-[#F7F3EE]/95 text-[#8b4f2a] rounded-2xl shadow-lg border border-white/40">
        {/* Alert */}
        {alert.show && (
          <div className="mx-6 mt-6 rounded-lg bg-red-100 text-red-700 px-4 py-3 flex items-start justify-between gap-4">
            <span className="text-sm">{alert.message}</span>
            <button
              type="button"
              onClick={() => showAlert({ message: "", show: false })}
              className="shrink-0 rounded px-2 py-1 text-red-700 hover:bg-red-200"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        )}

        {/* Form */}
        <form className="p-6 md:p-8 space-y-5" onSubmit={handleSubmit(loginUser)} noValidate>
          <div>
            <label htmlFor="email" className="block text-base font-medium">Email</label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email", { required: true })}
              className="mt-2 w-full rounded-lg border border-[#C57640]/20 bg-white/90 px-4 py-3 text-[#8b4f2a] outline-none
                         focus:border-[#C57640] focus:ring-2 focus:ring-[#C57640]/30"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-base font-medium">Password</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="mt-2 w-full rounded-lg border border-[#C57640]/20 bg-white/90 px-4 py-3 text-[#8b4f2a] outline-none
                         focus:border-[#C57640] focus:ring-2 focus:ring-[#C57640]/30"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-lg bg-[#C57640] px-4 py-3 text-[#F9F3F0] font-semibold
                       shadow hover:bg-[#b86836] focus:outline-none focus:ring-4 focus:ring-white/60
                       disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-[#8b4f2a]">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline font-medium text-[#C57640] hover:opacity-80">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-auto pb-6 text-center text-xs text-[#F9F3F0]/90">
        <p>© 2025 PantryPal. All rights reserved.</p>
        <p className="opacity-90">Proudly working to fight hunger and reduce food waste.</p>
      </footer>
    </div>
  );
}
