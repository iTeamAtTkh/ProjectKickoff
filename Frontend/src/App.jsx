import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Layouts
import PublicLayout from "./components/PublicLayout";
import DashboardLayout from "./components/DashboardLayout";

// Pages
import Home from "./pages/home";
import AboutUs from "./pages/aboutUs";
import Developers from "./pages/developers";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Dashboard from "./pages/dashboard";

// Protected route wrapper
import ProtectedRoute from "./components/protected-route";

const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* Public routes wrapped in PublicLayout */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected dashboard routes wrapped in DashboardLayout */}
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Child routes inside dashboard */}
            <Route index element={<Dashboard />} />
            {/* You can add more nested dashboard pages like this: */}
            {/* <Route path="orders" element={<Orders />} /> */}
            {/* <Route path="settings" element={<Settings />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;