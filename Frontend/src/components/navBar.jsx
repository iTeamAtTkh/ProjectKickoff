import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./styles.css";

const Navbar = () => {
  return (
    <>
    <nav className="nav nav px-8 py-4">
<div className="flex justify-between items-center w-full max-w-8xl mx-auto">
    {/* Left side links */}
    <ul className="flex items-center gap-6">
      <li className="site-title">
        <NavLink to="/"><img
              src="/pantrypalimg.png"  // your public folder image
              alt="PantryPal logo"
              className="h-12 w-auto" // adjust height as needed
            /></NavLink>
      </li>
      <li className='text-xl uppercase'><NavLink to="/aboutUs">About</NavLink></li>
      <li className='text-xl uppercase'><NavLink to="/developers">Developers</NavLink></li>
    </ul>

    {/* Right side login/signup */}
    <ul className="flex items-center gap-4">
    <li>
      <NavLink
        to="/login"
        className="px-4 py-2 border-2 border-white font-bold uppercase hover:bg-white hover:text-[#C57640] transition"
      >
        Login
      </NavLink>
    </li>
    <li>
      <NavLink
        to="/signup"
        className="px-4 py-2 border-2 border-white font-bold uppercase hover:bg-white hover:text-[#C57640] transition"
      >
        Signup
      </NavLink>
    </li>
  </ul>
  </div>
</nav>

    </>
  );
};


export default Navbar;