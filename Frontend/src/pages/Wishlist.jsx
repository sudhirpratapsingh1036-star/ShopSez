import React, { useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Fetch wishlist items from backend
  useEffect(() => {
    api.get("/api/v1/wishlist", { withCredentials: true })
      .then(res => setWishlistItems(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const removeFromWishlist = (productId) => {
    api.delete(`/api/v1/wishlist/${productId}`, { withCredentials: true })
      .then(res => {
        setWishlistItems(prev => prev.filter(item => item._id !== productId));
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your wishlist is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishlistItems.map(item => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2 rounded">
                {item.images && item.images.length > 0 ? (
                  <img src={`${import.meta.env.VITE_API_URL}/${item.images[0]}`} alt={item.name} className="h-full object-contain" />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-700">₹{item.price}</p>
              <p className="text-gray-500 text-sm">{item.category}</p>
              <button
                onClick={() => removeFromWishlist(item._id)}
                className="mt-2 bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
