import React from "react";
import { Navbar } from "../components/Navbar1.jsx";
import { useNavigate } from "react-router-dom";
import img1 from '../assets/img1.webp'
import img2 from '../assets/img2.webp'
import img3 from '../assets/img3.webp'
import img4 from '../assets/img4.webp'
import img5 from '../assets/img5.webp'

const Home = () => {
  const navigate = useNavigate();
const images = [img1, img2, img3, img4, img5];
  const products = [
    { id: 1, price: 100, category: "Shoes" },
    { id: 2, price: 200, category: "Slippers" },
    { id: 3, price: 300, category: "Glasses" },
    { id: 4, price: 400, category: "Jeans" },
    { id: 5, price: 500, category: "Shirt" },
  ];

  // Handle Shop Now click
  const handleShopNow = () => {
    const token = localStorage.getItem("token"); // check every time
    if (!token) {
      alert("You must log in first to proceed!");
      return;
    }
    navigate("/products");
  };

  // Handle Product click
  const handleProductClick = (id) => {
    const token = localStorage.getItem("token"); // check every time
    if (!token) {
      alert("You must log in first to view product details!");
      return;
    }
    navigate(`/products`);
  };

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="w-full h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to ShopSez</h1>
          <p className="text-gray-300 mb-6">Premium products. Best prices. Fast delivery.</p>
          <button
            onClick={handleShopNow}
            className="bg-red-600 text-white px-6 py-3 font-semibold hover:bg-gray-200 border-2"
          >
            Shop Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-5">
          <div className="h-40 bg-gray-300 flex items-center justify-center font-semibold">Feature 1</div>
          <div className="h-40 bg-gray-400 flex items-center justify-center font-semibold">Feature 2</div>
          <div className="h-40 bg-gray-500 flex items-center justify-center font-semibold text-white">Feature 3</div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="w-full p-4 bg-white">
        <h2 className="text-black flex justify-center text-2xl mb-4">Featured Products</h2>
        <div className="flex gap-2 flex-wrap justify-center">
          {products.map((item,index) => (
            <div
              key={item.id}
              onClick={() => handleProductClick(item.id)}
              className="bg-gray-500 border-xl h-80 w-60 p-4 text-black cursor-pointer hover:scale-105 transition-transform"
            >
               <img 
      src={images[index % images.length]} 
      alt={item.name}
      className="w-52"
    />
              <h3>Rs.{item.price}</h3>
              <h3>{item.category}</h3>
              {/* <p>A basic thing that an individual needs.</p> */}
            </div>
          ))}
        </div>
      </section>

      {/* Sale Section */}
      <section className="w-full bg-black text-white py-20">
        <div className="max-w-5xl mx-auto text-center px-5">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Big Sale Coming Soon</h2>
          <p className="text-gray-400">Save up to 50% on selected products</p>
        </div>
      </section>

      {/* Footer */}
      <div
        onClick={() => navigate("/termsAndConditions")}
        className="block w-full bg-gray-900 text-gray-400 py-6 text-center hover:text-white transition cursor-pointer"
      >
        © 2026 ShopSez. All rights reserved.
      </div>
    </>
  );
};

export default Home;
