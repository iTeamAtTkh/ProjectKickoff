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
    const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      ebtNumber: "",
      snapNumber: "",
      password: ""
    }
  });
/////////////////////////////////////////step 28
  const signupUser = async (values) => {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      data: {
        username: values.username
      }
    });

    if(error){
      showAlert({
        show: true,
        message: error.message
      })
    } else {
      navigate("/dashboard");      
    }
  }
/////////////////////////////////////////

  const SignupAlert = ({alert, showAlert}) => {
    return (
  <>
    {alert.show &&
      <div className="alert alert-error">
        <div className="inline-flex justify-stretch items-center">
          {alert.message}
          <button onClick={() => showAlert({ message: "", show: false })} className="btn btn-ghost btn-circle">
            X
          </button>
        </div>
      </div>
    }
  </>
)
  }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [alert, showAlert] = useState({ message: "", show: false });
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { username: "", email: "", snapNumber: "", ebtNumber: "", zipcode: "", password: "" },
  });

  const signupUser = async (values) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: values.username,
          email: values.email,
          password: values.password,
          snapNumber: values.snapNumber,
          ebtNumber: values.ebtNumber,
        }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

function SignUpForm () {
  return (
  <form className="space-y-4" onSubmit={handleSubmit(signupUser)}>
    <div>
      <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
      <input id="username" type="username" className="input input-bordered w-full" { ...register("username") } />
    </div>
    <div>
      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Name</label>
      <input id="fullName" type="name" className="input input-bordered w-full" { ...register("fullName") } />
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
      <input id="email" type="email" className="input input-bordered w-full" { ...register("email") } />
    </div>
  <div>
      <label htmlFor="ebtNumber" className="block text-sm font-medium text-gray-700">Ebt Number</label>
      <input id="ebt" type="text" className="input input-bordered w-full" { ...register("ebtNumber") } />
    </div>
    <div>
      <label htmlFor="snapNumber" className="block text-sm font-medium text-gray-700">Snap Number</label>
      <input id="snap" type="text" className="input input-bordered w-full" { ...register("snapNumber") } />
    </div>   
    <div>
      <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">Zipcode</label>
      <input id="zipcode" type="text" className="input input-bordered w-full" { ...register("zipcode") } />
    </div> 
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
      <input id="password" type="password" className="input input-bordered w-full"  { ...register("password") }/>
    </div>
    <button type="submit" className="btn btn-primary w-full">Register</button>
  </form>
)
}
      navigate("/dashboard");
    } catch (err) {
      showAlert({ show: true, message: err.message });
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
        {alert.show && (
          <div className="alert alert-error mb-4 flex justify-between items-center">
            {alert.message}
            <button onClick={() => showAlert({ message: "", show: false })} className="btn btn-ghost btn-circle">X</button>
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit(signupUser)}>
          <input {...register("username", { required: "Username required" })} placeholder="Username" className="input input-bordered w-full"/>
          {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}

  return (
   <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Signup</h2>
          <SignupAlert alert={alert} showAlert={showAlert} />
          <SignUpForm/>
        <p className="mt-4 text-center text-sm">Have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></p>
      </div>
    </div> 
  )
};

export default Signup;
          <input {...register("email", { required: "Email required" })} placeholder="Email" className="input input-bordered w-full"/>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

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
