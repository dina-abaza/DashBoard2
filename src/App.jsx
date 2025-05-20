
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import Users from "./pages/Users";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";
import ProtectedPage from "./pages/ProtectedPage";
import '../i18n';

export default function App() {

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route
        path="/*"
        element={
          <ProtectedPage>
            <div className="flex">
              <SideBar />
              <div className="flex-1">
                <NavBar />
                <Routes>
                  <Route path="/dashboard" element={<DashBoard />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </div>
            </div>
          </ProtectedPage>
        }
      />
    </Routes>
  );
}
