import React from "react";
import DashboardNavBar from "./DashboardNavBar"; 
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <DashboardNavBar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;