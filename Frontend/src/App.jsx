import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate } from "react-router-dom";
import NavBar from './components/navBar';
import "./components/styles.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './pages/home';
import AboutUs from './pages/aboutUs';
import Developers from './pages/developers';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard';

const client = new QueryClient();

function RedirectToLogin() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login")
  }, [])

  return <></>
}

function App() {
 

  return (
        <QueryClientProvider client={client}>
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutUs" element={<AboutUs />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
           {/*<Route path="/dashboard" element={<MainLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Route>*/}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
