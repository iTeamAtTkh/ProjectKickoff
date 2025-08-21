// import { Link, Outlet } from 'react-router-dom';


// export default function MainLayout(){
//   return (
//     <>
//       <div className="navbar bg-base-100">
//         <div className="flex-1">
//           <a className="btn btn-ghost text-xl">PantryPal</a>
//         </div>
//         <div className="flex-none">
//           <ul className="menu menu-horizontal px-1">
//             <li><button className="btn btn-link">Logout</button></li>
//           </ul>
//         </div>
//       </div>
//       <Outlet />
//     </>
//   )
// }
import { Outlet } from "react-router-dom";
import Navbar from "../components/navBar.jsx"
import Footer from "../components/Footer.jsx";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F9F3F0]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}