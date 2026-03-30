import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});
// import { addItem as addCartItem } from "../redux/cartSlice";
// import { addItem as addWishlistItem } from "../redux/wishlistSlice";
import { addItem as addCartItem, increaseQty, decreaseQty, removeItem  } from "../redux/cartSlice";
import { addItem as addWishlistItem, removeItem as removeWishlistItem } from "../redux/wishlistSlice";


export default function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  // --- Fetch products ---
  const fetchProducts = async (category = "") => {
    try {
      let url = "/products";  // ✅ Correct URL (baseURL is already set)
      if (category) url += `?category=${category}`;

      const res = await api.get(url);  // ✅ Use api client with baseURL
      const fetchedProducts = res.data.data.products;
      setProducts(fetchedProducts);

      const uniqueCategories = [
        ...new Set(fetchedProducts.map((p) => p.category).filter(Boolean)),
      ].sort();
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // --- Add to cart dynamically ---
  const handleAddToCart = async (product) => {
    if (!token) {
      alert("Please login to add items to cart!");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/cart/add",
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update Redux dynamically
      dispatch(addCartItem({
        _id: product._id,
        name: product.name,
        price: product.price,
        qty: 1
      }));

      alert("Product added to cart ✅");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // --- Add to wishlist dynamically ---
  const handleAddToWishlist = async (product) => {
    if (!token) {
      alert("Please login to add items to wishlist!");
      navigate("/login");
      return;
    }

    try {
      await api.post(
        "/api/v1/wishlist/add",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update Redux dynamically
      dispatch(addWishlistItem({
        _id: product._id,
        name: product.name,
        price: product.price
      }));

      alert("Product added to wishlist ❤️");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add to wishlist");
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    fetchProducts(category);
  };

  // --- Cart totals ---
  const subTotal = cartItems.reduce((total, item) => total + item.qty * item.price, 0);
  const deliveryFee = cartItems.length > 0 ? 20 : 0;
  const taxes = subTotal * 0.5 / 100;
  const total = Math.floor(subTotal + deliveryFee + taxes);

const placeOrderCOD = async () => {
  try {
    const res = await api.post(
      "/api/v1/orders",
      {
        shippingAddress: {
          fullName: "Test User",
          phone: "9999999999",
          street: "Delhi",
          city: "Delhi",
          zipCode: "110001",
        },
        paymentMethod: "COD",

        // ✅ SEND CART ITEMS
        cartItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.qty,
          price: item.price,
        })),

        totalAmount: total,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      alert("Order placed successfully!");
      setShowCart(false);
      navigate("/order-confirmation");
    } else {
      alert("Failed to place order");
    }
  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Failed to place order");
  }
};

  return (
    <div className="min-h-screen bg-gray-50 p-8 relative">

      {/* Cart & Wishlist icons */}
      <div className="fixed -mx-7 -my-6 top-5 right-5 flex flex-col gap-3 z-50">
        <button
          onClick={() => setShowCart(true)}
          className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          🛒
          <span className="bg-red-600 text-xs px-1 rounded-full">{cartItems.length}</span>
        </button>

        <button
          onClick={() => setShowWishlist(true)}
          className="bg-pink-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
        >
          ❤️
          <span className="bg-red-600 text-xs px-1 rounded-full">{wishlistItems.length}</span>
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      {/* Category Filter */}
      <div className="mb-6 flex justify-center gap-4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border px-4 py-2 rounded"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <p className="text-gray-500 text-center">No products available</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
              <div className="w-full h-32 bg-gray-200 flex items-center justify-center mb-2 rounded">
                {item.images && item.images.length > 0 ? (
                  <img
                    src={Array.isArray(item.images) ? item.images[0] : item.images}
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
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleAddToWishlist(item)}
                  className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700"
                >
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cart Sidebar */}
      <div
        className={`w-full md:w-[40vw] h-full fixed top-0 right-0 bg-orange-100 shadow-xl p-6 transform ${showCart ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 flex flex-col overflow-auto`}
      >
        <div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold">Cart Items</h2>
  <button
    onClick={() => setShowCart(false)}
    className="text-xl mx-20 cursor-pointer font-bold"
  >
    ✖
  </button>
</div>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-700">Cart is empty</p>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cartItems.map((item) => (
  <div key={item._id} className="flex justify-between items-center bg-white p-2 rounded">

    <div>
      <p>{item.name}</p>
      <p>₹{item.price}</p>
    </div>

    <div className="flex items-center gap-2">
      <button
        onClick={() => dispatch(decreaseQty(item._id))}
        className="px-2 bg-gray-300"
      >−</button>

      <span>{item.qty}</span>

      <button
        onClick={() => dispatch(increaseQty(item._id))}
        className="px-2 bg-gray-300"
      >+</button>

      <button
        onClick={() => dispatch(removeItem(item._id))}
        className="text-red-600 font-bold"
      >❌</button>
    </div>

  </div>
))}

            </div>
<div className="mt-4 border-t pt-4">
  <p>Subtotal: ₹{subTotal}</p>
  <p>Delivery: ₹{deliveryFee}</p>
  <p>Taxes: ₹{taxes}</p>
  <p className="font-bold text-lg">Total: ₹{total}</p>



<button
  onClick={() => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  }}
  className="bg-green-400 text-black py-2 rounded font-semibold mt-4"
>
  Place Order
</button>

</div>

          </>
        )}
      </div>

      {/* Wishlist Sidebar */}
      <div
        className={`w-full md:w-[40vw] h-full fixed top-0 right-0 bg-pink-100 shadow-xl p-6 transform ${showWishlist ? "translate-x-0" : "translate-x-full"} transition-transform duration-500 flex flex-col overflow-auto`}
      >
              <div className="flex justify-between items-center mb-6">
  <h2 className="text-lg font-semibold">Cart Items</h2>
 <button
  onClick={() => setShowWishlist(false)}  
  className="text-xl mx-20 cursor-pointer font-bold"
>
  ✖
</button>
</div>
        {wishlistItems.length === 0 ? (
          <p className="text-center text-gray-700">Wishlist is empty</p>
        ) : (
          <div className="flex flex-col gap-4">
          {wishlistItems.map((item) => (
  <div key={item._id} className="flex justify-between items-center bg-white p-2 rounded">
    <span>{item.name}</span>
    <span>₹{item.price}</span>
    <button
      onClick={() => dispatch(removeWishlistItem(item._id))}
      className="text-red-600 font-bold"
    >
      ❌
    </button>
  </div>
))}

          </div>
        )}
      </div>
    </div>
  );
}
