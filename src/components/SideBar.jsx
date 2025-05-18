import React from "react";
import { Link } from "react-router-dom";
import { MdDashboard, MdPeople, MdShoppingCart, MdInventory, MdSettings } from "react-icons/md";

export default function SideBar() {
  return (
    <aside className="w-40 bg-amber-50 h-screen p-4 space-y-4">
      <Link 
        to="/dashboard" 
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600  transition-transform transform hover:translate-x-4"
      >
        <MdDashboard size={20} />
        Dashboard
      </Link>
      <Link 
        to="/users" 
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600 transition-transform transform hover:translate-x-4"
      >
        <MdPeople size={20} />
        Users
      </Link>
      <Link 
        to="/products" 
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600  transition-transform transform hover:translate-x-4"
      >
        <MdInventory size={20} />
        Products
      </Link>
      <Link 
        to="/orders" 
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600  transition-transform transform hover:translate-x-4"
      >
        <MdShoppingCart size={20} />
        Orders
      </Link>
      <Link 
        to="/settings" 
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600 transition-transform transform hover:translate-x-4"
      >
        <MdSettings size={20} />
        Settings
      </Link>
    </aside>
  );
}
