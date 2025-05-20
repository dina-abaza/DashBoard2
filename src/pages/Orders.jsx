import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Orders (){
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("all");
  const [showForm, setShowForm] = useState(false)
   
  useEffect(() => {
    setTimeout(() => setShowForm(true), 100);
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resOrder = await axios.get("http://localhost:5000/orders");
        setOrders(resOrder.data);
        console.log(resOrder.data)
      } catch (error) {
        console.log("فشل في تحميل بيانات الطلبات", error);
      }

      try {
        const resUser = await axios.get("http://localhost:5000/users");
        setUsers(resUser.data);
        console.log(resUser.data)
      } catch (error) {
        console.log("فشل في تحميل بيانات المستخدمين", error);
      }
    };

    fetchData();
  }, []); 


  const getUserName = (userId) => {
    const user = users.find((u) => String(u.id) === String(userId));
    return user ? user.name : "مستخدم غير معروف";
  };



  const updateStatus = async (id, newStatus) => {
    try {
     const res= await axios.patch(`http://localhost:5000/orders/${id}`, { status: newStatus });
         console.log("الاستجابة بعد التحديث:", res.data);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("فشل في تحديث الحالة", err);
    }
  };

  
  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
     <div
        className={` w-full flex flex-col justify-center items-center transition-all duration-700 ease-in-out transform ${
          showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        } bg-white p-8`}
      >
      <h2 className="text-2xl font-bold mb-4 uppercase text-amber-700">Orders</h2>

      <div className="mb-4">
        <label className="mr-2 font-semibold">الحالة:</label>
        <select
          className="border px-2 py-1 rounded"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">الكل</option>
          <option value="completed">مكتملة</option>
          <option value="pending">قيد الانتظار</option>
        </select>
      </div>

      <div className="w-full max-w-4xl overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">رقم</th>
              <th className="p-3">العميل</th>
              <th className="p-3">السعر الكلي</th>
              <th className="p-3">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{getUserName(order.userId)}</td>
                <td className="p-3">{order.totalPrice} ج.م</td>
                <td className="p-3 flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      order.status === "completed"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {order.status === "completed" ? "مكتمل" : "قيد الانتظار"}
                  </span>
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order.id, "completed")}
                      className="text-sm text-blue-500 underline"
                    >
                      تأكيد
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  لا توجد طلبات في هذه الحالة.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};