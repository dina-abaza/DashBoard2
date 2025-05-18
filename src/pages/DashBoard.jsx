import React, { useState,useEffect } from "react";
import axios from "axios";

export default function DashBoard(){

    const [orders,setOrders]=useState([])
    const [users,setUsers]=useState([])
    const [products,setProducts]=useState([])


    const totalRevenue = orders
    .filter(order => order.status === "completed")
    .reduce((acc, order) => acc + order.totalPrice, 0);
    
    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const orderRes=await axios.get("http://localhost:5000/orders");
                setOrders(orderRes.data)
            }
            catch (error){
                console.log("خطا اثناء تحميل الطلبات", error)
            }
            try{
                const productRes=await axios.get ("http://localhost:5000/products");
                setProducts(productRes.data)
            }
            catch(error){
                console.log("خطا اثناء التحميل ",error)
            }
            try{
                const userRes=await axios.get ("http://localhost:5000/users");
                setUsers(userRes.data)
            }
            catch(error){
                console.log("خطا اثناء التحميل", error)
            }
        }
fetchData()},[])
    return(
       <div className="p-6 mt-20">
      <h1 className="text-2xl font-bold text-green-800">welcom to the dashboard</h1>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-6">
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
