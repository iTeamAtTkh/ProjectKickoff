import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = () => {
  const [alert, showAlert] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: { email: "", password: "" } });

  const loginUser = async (values) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save token if needed: localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      showAlert({ show: true, message: err.message });
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {alert.show && (
          <div className="alert alert-error mb-4 flex justify-between items-center">
            {alert.message}
            <button onClick={() => showAlert({ message: "", show: false })} className="btn btn-ghost btn-circle">X</button>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
          <input {...register("email")} placeholder="Email" className="input input-bordered w-full"/>
          <input {...register("password")} placeholder="Password" type="password" className="input input-bordered w-full"/>
          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
