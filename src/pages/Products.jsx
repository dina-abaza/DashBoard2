import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    image: "",
    stock: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowForm(true), 100);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const savedProducts = localStorage.getItem("products");

        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          const res = await axios.get("http://localhost:5000/products");
          setProducts(res.data);
          localStorage.setItem("products", JSON.stringify(res.data));
        }
      } catch (error) {
        console.error("فشل تحميل المنتجات:", error);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      setProducts((prev) => {
        const updatedProducts = prev.filter((p) => p.id !== id);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
    } catch (error) {
      console.error("فشل حذف المنتج:", error);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    try {
      const res = await axios.post("http://localhost:5000/products", {
        ...newProduct,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
      });
      setProducts((prev) => {
        const updatedProducts = [...prev, res.data];
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        return updatedProducts;
      });
      setNewProduct({ title: "", price: "", image: "", stock: "" });
    } catch (error) {
      console.error("فشل في إضافة المنتج:", error);
    }
  };

  return (
    <div
      className={` w-full text-center transition-all duration-700 ease-in-out transform ${
        showForm ? "translate-x-0 opacity-100" : "-translate-x-20 opacity-0"
      } bg-white p-8`}
    >
      <h2 className="text-2xl font-bold text-amber-700 mb-4 uppercase">products</h2>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <input
          className="border p-2"
          name="title"
          placeholder="اسم المنتج"
          value={newProduct.title}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="price"
          type="number"
          placeholder="السعر"
          value={newProduct.price}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="image"
          placeholder="رابط الصورة"
          value={newProduct.image}
          onChange={handleChange}
        />
        <input
          className="border p-2"
          name="stock"
          type="number"
          placeholder="الكمية"
          value={newProduct.stock}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={addProduct}
        className="bg-amber-200 text-amber-700 px-4 py-2 rounded mb-6 hover:bg-amber-700 hover:text-amber-200 transform duration-500"
      >
        إضافة منتج
      </button>

      <table className="w-3/4 border text-sm text-center table-auto m-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 w-20">الصورة</th>
            <th className="p-2">الاسم</th>
            <th className="p-2">السعر</th>
            <th className="p-2">الكمية</th>
            <th className="p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-2">{product.title}</td>
              <td className="p-2">{product.price} جنيه</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 hover:bg-red-600 transform duration-500 text-white px-3 py-1 rounded"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
