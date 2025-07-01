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
import "../i18n";

export default function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <Routes>
        
          <Route path="/login" element={<Login />} />


          <Route path="/" element={<Navigate to="/dashboard" />} />

      
          <Route
            path="/dashboard"
            element={
              <ProtectedPage>
                <DashBoard />
              </ProtectedPage>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedPage>
                <Users />
              </ProtectedPage>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedPage>
                <Products />
              </ProtectedPage>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedPage>
                <Orders />
              </ProtectedPage>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedPage>
                <Settings />
              </ProtectedPage>
            }
          />

        
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
}
