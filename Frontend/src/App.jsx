import { useState } from 'react'
import './App.css';
import NavBar from './components/navBar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavLink, Link } from 'react-router';
import NavBar from './components/navBar';

function App() {
  const [count, setCount] = useState(0)

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
          <Route path="/dashboard" element={<MainLayout />}>
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
