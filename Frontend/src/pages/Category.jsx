// Category.jsx
import React from "react";

// Sample categories
const categories = [
  { id: 1, name: "Electronics", image: "https://via.placeholder.com/100" },
  { id: 2, name: "Fashion", image: "https://via.placeholder.com/100" },
  { id: 3, name: "Home & Kitchen", image: "https://via.placeholder.com/100" },
  { id: 4, name: "Sports", image: "https://via.placeholder.com/100" },
];

const Category = () => {
  return (
    <div className="flex justify-center gap-6 p-4">
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="flex flex-col items-center border p-2 rounded shadow hover:scale-105 transition-transform"
        >
          <img src={cat.image} alt={cat.name} className="w-20 h-20 object-cover rounded" />
          <span className="mt-2 font-medium">{cat.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Category;
