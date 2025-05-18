import React from "react";
import { MdDashboard } from "react-icons/md"; 

export default function NavBar() {
  return (
    <nav className="w-full h-16 bg-amber-50 flex justify-around items-center">
 
      <div className="flex items-center gap-2">
        <MdDashboard className="text-amber-300 text-3xl" />
        <h2 className="text-amber-800 font-bold text-3xl">Dashboard</h2>
      </div>
       <p className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-amber-700 to-yellow-500 animate-pulse text-2xl font-bold">
  Welcome
</p>

    </nav>
  );
}
