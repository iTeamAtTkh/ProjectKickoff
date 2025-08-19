// frontend/components/PublicLayout.jsx
import React from "react";
import NavBar from "./navBar";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div>
      <NavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;