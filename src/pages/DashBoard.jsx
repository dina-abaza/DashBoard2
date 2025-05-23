import React, { useState,useEffect } from "react";
import axios from "axios";

export default function DashBoard(){

    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])
    const [products,setProducts]=useState([])
    const [showForm, setShowForm] = useState(false)

    const totalRevenue = orders
    .filter(order => order.status === "completed")
    .reduce((acc, order) => acc + order.totalPrice, 0);
    
     useEffect(() => {
    setTimeout(() => setShowForm(true), 100);
  }, []);
  
  useEffect(() => {
  const fetchData = async () => {
    try {
      
      const savedOrders = localStorage.getItem("orders");
      const savedProducts = localStorage.getItem("products");
      const savedUsers = localStorage.getItem("users");

      if (savedOrders && savedProducts && savedUsers) {
      
        setOrders(JSON.parse(savedOrders));
        setProducts(JSON.parse(savedProducts));
        setUsers(JSON.parse(savedUsers));
      } else {
        
        const orderRes = await axios.get("http://localhost:5000/orders");
        setOrders(orderRes.data);
        localStorage.setItem("orders", JSON.stringify(orderRes.data));

        const productRes = await axios.get("http://localhost:5000/products");
        setProducts(productRes.data);
        localStorage.setItem("products", JSON.stringify(productRes.data));

        const userRes = await axios.get("http://localhost:5000/users");
        setUsers(userRes.data);
        localStorage.setItem("users", JSON.stringify(userRes.data));
      }
    } catch (error) {
      console.log("خطأ أثناء تحميل البيانات", error);
    }
  };

  fetchData();
}, []);
    return(
        <div
        className={`flex flex-col w-full justify-center items-center transition-all duration-700 ease-in-out transform ${
          showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        } bg-white p-8 mt-10`}
      >
      <h1 className="text-4xl font-bold text-green-800">welcom to the dashboard</h1>

      <div className=" w-full mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-800 text-lg">the orders:</h2>
          <p className="text-2xl font-bold text-green-400">{orders.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-800 text-lg">the users:</h2>
          <p className="text-2xl font-bold text-green-400">{users.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-800 text-lg">the products:</h2>
          <p className="text-2xl font-bold text-green-400">{products.length}</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="text-gray-800 text-lg">total:</h2>
          <p className="text-2xl font-bold text-green-800">{totalRevenue} ج.م</p>
        </div>
      </div>
    </div>
  );
};
