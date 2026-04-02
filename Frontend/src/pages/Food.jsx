import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

function Food() {
  const [products, setProducts] = useState([]);

 useEffect(() => {
  api.get("/products")
    .then(res => setProducts(res.data.data.products || res.data.data))
    .catch(err => console.error("Error fetching products:", err));
}, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Food Menu</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">No products available</p>
        ) : (
          products.map(item => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2 rounded">
                {item.images && item.images.length > 0 ? (
                 <img 
  src={item.images[0].startsWith("http") ? item.images[0] : `${import.meta.env.VITE_API_URL}/${item.images[0]}`} 
  alt={item.name} 
  className="h-full object-contain" 
/>
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>
              <p className="text-gray-500 text-sm">{item.category}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Food;
