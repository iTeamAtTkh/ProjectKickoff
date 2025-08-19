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
      <Link to="/dashboard" className="font-bold text-xl">Dashboard</Link>
      <div className="space-x-4">
        <button onClick={handleLogout} className="bg-red-600 px-3 py-1 rounded">Logout</button>
      </div>
    </nav>
  );
};

export default DashboardNavBar;
