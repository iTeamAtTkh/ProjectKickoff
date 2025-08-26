import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const BASE_URL = import.meta.env.VITE_API_URL;

const Login = () => {
  const [alert, showAlert] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({ defaultValues: { email: "", password: "" } });

  const loginUser = async (values) => {
    try {
      // backticks ` ` for interpolation
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) throw new Error(data.error || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      showAlert({ show: true, message: err.message });
    }
  };

  return (
    
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-[#C57640] rounded-lg shadow-lg p-8 w-full max-w-lg text-center">
        <div className="object-center justify-center justify-items-center">
            <img
              src="/pantrypalimg.png"
              alt="PantryPal logo (smiling paper bag with food)"
              className="w-[100px] h-[100px] object-contain justify-center p-6 rounded "
            />
          </div>
          <h2 className="text-2xl font-bold mb-6 text-center  text-white">LOGIN ACCOUNT </h2>
    
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        {/* <h2 className="text-2xl font-bold mb-6 text-center">Login Account </h2> */}
        {alert.show && (
          <div className="alert alert-error mb-4 flex justify-between items-center">
            {alert.message}
            <button onClick={() => showAlert({ message: "", show: false })} className="btn btn-ghost btn-circle">X</button>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(loginUser)}>
          <input {...register("email", { required: "Email required" })} placeholder="Email" className="input input-bordered w-full text-lg "/>
          <input {...register("password", { required: "Password required" })} placeholder="Password" type="password" className="input input-bordered w-full  border-black rounded text-lg "/>
          <button  type="submit" className="btn btn-primary w-full bg-orange-500 hover:bg-orange-800 py-2  text-white border-black rounded">Login</button>
        </form>
        <p className="mt-4 text-center text-sm">
          Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up</Link>
        </p>
      
      </div>
      </div>
    </div>
    
  );
};

export default Login;
