import React from 'react';
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import supabase from "../client";

const Signup = () => {
const [alert, showAlert] = useState({
    message: "",
    show: false
  });
  const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { username: "", name: "", email: "", snapNumber: "", ebtNumber: "", zipcode: "", password: "" },
  });

  const signupUser = async (values) => {
    try {
      const res = await fetch("/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.username,
          email: values.email,
          password: values.password,
          snapNumber: values.snapNumber || null, 
          ebtNumber: values.ebtNumber || null,
          zipcode: values.zipcode,
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Signup failed");

      // Optional: store token if backend returns it in future
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      navigate("/dashboard");
    } catch (err) {
      showAlert({ show: true, message: err.message });
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        {alert.show && (
          <div className="alert alert-error mb-4 flex justify-between items-center">
            {alert.message}
            <button onClick={() => showAlert({ message: "", show: false })} className="btn btn-ghost btn-circle">X</button>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(signupUser)}>
          <input {...register("username", { required: "Username required" })} placeholder="Username" className="input input-bordered w-full"/>
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

          <input {...register("email", { required: "Email required" })} placeholder="Email" className="input input-bordered w-full"/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input {...register("name")} placeholder="Name" className="input input-bordered w-full"/>
          <input {...register("snapNumber")} placeholder="SNAP Number" className="input input-bordered w-full"/>
          <input {...register("ebtNumber")} placeholder="EBT Number" className="input input-bordered w-full"/>
          <input {...register("zipcode")} placeholder="Zipcode" className="input input-bordered w-full"/>
          <input {...register("password", { required: "Password required" })} placeholder="Password" type="password" className="input input-bordered w-full"/>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button type="submit" className="btn btn-primary w-full">Register</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;