import React from "react";
import { MdDashboard } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import useSidebarStore from "../../store/sidebarstore";

export default function NavBar() {
  const { toggleSidebar } = useSidebarStore();

  return (
    <nav className="w-full h-16 bg-amber-50 flex justify-between items-center px-4">
    
      <div className="sm:hidden" onClick={toggleSidebar}>
        <FiMenu size={25} className="text-amber-800 cursor-pointer" />
      </div>

      <div className="flex items-center gap-2">
        <MdDashboard className="text-amber-300 text-3xl" />
        <h2 className="text-amber-800 font-bold text-2xl">Dashboard</h2>
      </div>

      <p className="hidden sm:block text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-amber-700 to-yellow-500 animate-pulse text-2xl font-bold">
        Welcome
      </p>
    </nav>
  );
}
