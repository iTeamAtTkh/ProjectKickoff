// frontend/components/DashboardNavBar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/dashboard" className=" flex font-bold text-xl justify-center">Dashboard</Link>
      <div className="space-x-4">
        <button  onClick={handleLogout} className="btn btn-primary w-full bg-orange-500 hover:bg-orange-800  mt-4 px-6 py-2  text-white border-black rounded">Logout</button>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
