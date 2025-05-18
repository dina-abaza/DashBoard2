import React from 'react'; 
import './App.css'; 
import NavBar from './components/NavBar'; 
import SideBar from './components/SideBar'; 
import DashBoard from './pages/DashBoard'; 
import Users from './pages/Users'; 
import Products from './pages/Products'; 
import Orders from './pages/Orders';
import Setting from './pages/Settings'; 
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1">
        <NavBar />
        <Routes>
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
