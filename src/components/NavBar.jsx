
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

export default function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login"); 
  };

  return (
    <nav className="w-full h-16 bg-amber-50 flex justify-between items-center px-4">
      <div className="flex items-center gap-2">
        <MdDashboard className="text-amber-300 text-3xl" />
        <h2 className="text-amber-800 font-bold text-3xl">Dashboard</h2>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-amber-700 to-yellow-500 animate-pulse text-2xl font-bold">
          Welcome
        </p>

    
        <button
          onClick={handleLogout}
          className="bg-amber-50 text-2xl font-bold text-green-500 px-4 py-1 hover:text-green-600 transition duration-300"
        > Logout
        </button>
      </div>
    </nav>
  );
}
