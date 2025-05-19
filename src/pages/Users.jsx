import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
   const [showForm, setShowForm] = useState(false)
   
  useEffect(() => {
    setTimeout(() => setShowForm(true), 100);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  return (
       <div
        className={` w-full text-center transition-all duration-700 ease-in-out transform ${
          showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
        } bg-white p-8 mt-10`}
      >
      <h2 className="text-2xl font-bold text-amber-700 mb-10 uppercase">Users</h2>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.id}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};