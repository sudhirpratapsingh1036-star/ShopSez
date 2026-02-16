// SearchResult.jsx
import React from "react";
import { useLocation } from "react-router-dom";

// Sample products
const products = [
  { id: 1, name: "Laptop", price: 500, image: "https://via.placeholder.com/150" },
  { id: 2, name: "Shoes", price: 50, image: "https://via.placeholder.com/150" },
  { id: 3, name: "Headphones", price: 100, image: "https://via.placeholder.com/150" },
];

const SearchResult = () => {
  const query = new URLSearchParams(useLocation().search);
  const searchQuery = query.get("q") || "";

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">
        Search Results for "{searchQuery}"
      </h2>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <h3 className="font-medium">{product.name}</h3>
              <p className="font-bold">${product.price}</p>
              <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 mt-4">No products found for "{searchQuery}"</p>
      )}
    </div>
  );
};

export default SearchResult;
