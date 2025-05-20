import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeople, MdShoppingCart, MdInventory, MdSettings } from "react-icons/md";
import { FiLogOut } from 'react-icons/fi';
import useSidebarStore from "../../store/sidebarstore";

export default function SideBar() {
  const { isOpen, toggleSidebar, closeSidebar } = useSidebarStore();

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <aside 
      className={`bg-amber-50 h-screen p-4 space-y-4 fixed sm:relative top-0 left-0 transition-transform transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0 w-60 z-50`}
    >
      <button
        className="text-amber-800 sm:hidden absolute top-4 right-4"
        onClick={toggleSidebar}
      >
        X
      </button>

      <Link to="/dashboard" className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600" onClick={()=>closeSidebar()}>
        <MdDashboard size={20} />
        Dashboard
      </Link>
      <Link to="/users" className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600"onClick={()=>closeSidebar()} >
        <MdPeople size={20} />
        Users
      </Link>
      <Link to="/products" className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600" onClick={()=>closeSidebar()} >
        <MdInventory size={20} />
        Products
      </Link>
      <Link to="/orders" className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600" onClick={()=>closeSidebar()} >
        <MdShoppingCart size={20} />
        Orders
      </Link>
      <Link to="/settings" className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600" onClick={()=>closeSidebar()} >
        <MdSettings size={20} />
        Settings
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 mt-10 text-amber-800 hover:text-amber-600 font-bold"
      >
        <FiLogOut size={20}/> Logout
      </button>
    </aside>
  );
}
