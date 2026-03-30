import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

const OwnerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("🔄 Fetching owner products...");
        const res = await api.get("/owners/products", {
          withCredentials: true
        });
        console.log("📦 Products response:", res.data);
        setProducts(res.data.data || []);
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl mb-4">My Products</h1>

      {error && (
        <div className="bg-red-500 p-4 rounded mb-4">
          Error: {error}
        </div>
      )}

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products added yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p._id} className="border p-3 rounded">
              {p.images && p.images.length > 0 ? (
                <img 
                  src={p.images[0]} 
                  alt={p.name}
                  className="h-40 w-full object-cover rounded" 
                  onError={(e) => {
                    console.error("❌ Image failed to load:", p.images[0]);
                    e.target.src = "https://via.placeholder.com/200";
                  }}
                />
              ) : (
                <div className="h-40 w-full bg-gray-300 rounded flex items-center justify-center">
                  No image
                </div>
              )}
              <h2 className="mt-2 font-bold">{p.name}</h2>
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
