import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./layouts/main-layout";   // Layout contains Navbar + Footer
import Home from "./pages/home";
import AboutUs from "./pages/aboutUs";
import Developers from "./pages/developers";
import Login from "./pages/login";
import Signup from "./pages/signup";
// import Dashboard from "./pages/dashboard"; // later if needed

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          {/* Pages that should have Navbar + Footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            <Route path="/developers" element={<Developers />} />
          </Route>

          {/* Pages WITHOUT Navbar + Footer */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Example for a protected dashboard later:
          <Route element={<Layout />}>
            <Route
              path="/dashboard"
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
            />
          </Route>
          */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

