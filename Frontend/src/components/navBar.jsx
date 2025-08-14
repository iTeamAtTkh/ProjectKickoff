import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import "./styles.css";




const Navbar = () => {
  return (
    <>
    <nav className='nav'>
    <ul>
      <li className='site-title'><NavLink to="/">homeSite</NavLink></li>
      <li><NavLink to="/aboutUs">About</NavLink></li>
      <li><NavLink to="/developers">Developers</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
      <li><NavLink to="/signup">Signup</NavLink></li>
    </ul>
  </nav>
    </>
  );
};


export default Navbar;