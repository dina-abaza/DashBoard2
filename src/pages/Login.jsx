
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowForm(true), 100);

    const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
    if (isAdmin) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/admin");
      if (res.data.email === email && res.data.password === password) {
        localStorage.setItem("isAdmin", JSON.stringify(true));
        navigate("/dashboard");
      } else {
        alert("بيانات الدخول غير صحيحة");
      }
    } catch (error) {
      console.error("فشل تسجيل الدخول", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-amber-100 mr-5">
      <div
        className={`transition-all duration-700 ease-in-out transform ${
          showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        } bg-white shadow-lg p-6 rounded-lg w-full max-w-md mx-4 sm:mx-auto`}
      >
        <h2 className="text-2xl font-bold text-center text-amber-800 mb-4">
          تسجيل الدخول
        </h2>
        <input
          type="email"
          placeholder="الايميل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-amber-500 text-white p-2 rounded hover:bg-amber-600"
        >
          دخول
        </button>
      </div>
    </div>
  );
}
