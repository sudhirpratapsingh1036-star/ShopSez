import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

const OwnerProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get("/owners/products", {
        withCredentials: true
      });
      setProducts(res.data.data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">My Products</h1>

      {products.length === 0 ? (
        <p>No products added yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-3 rounded">
              <img src={p.images[0]} className="h-40 w-full object-cover" />
              <h2>{p.name}</h2>
              <p>₹{p.price}</p>
              <p>Stock: {p.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerProducts;
