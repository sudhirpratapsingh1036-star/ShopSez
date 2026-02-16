import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleSearch = (e) => {
    e.preventDefault();
    alert(`Searching for: ${searchQuery}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 bg-black text-white flex items-center justify-between px-5 z-50">
        <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
          ShopSez
        </div>

        <form className="border-2 rounded-xl w-96 flex" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 outline-none text-black"
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-4 py-2 rounded-r-xl hover:bg-red-700"
          >
            Search
          </button>
        </form>

        <ul className="hidden md:flex items-center space-x-6">
          {/* 🔹 AUTH SECTION */}
          {!token ? (
            <>
              <li><Link to="/login" className="hover:text-gray-300">Login</Link></li>
              <li><Link to="/signUp" className="hover:text-gray-300">Sign Up</Link></li>
            </>
          ) : (
            <li className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-black"
              >
                👤
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-md w-32">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}

          <li><Link to="/aboutUs" className="hover:text-gray-300">About Us</Link></li>
          <li><Link to="/contactUs" className="hover:text-gray-300">Contact Us</Link></li>
          <li><Link to="/faq" className="hover:text-gray-300">FAQ</Link></li>
          <li><Link to="/privacy-policy" className="hover:text-gray-300">Privacy Policy</Link></li>
          <li><Link to="/return-refund" className="hover:text-gray-300">Return & Refund</Link></li>
        </ul>

        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-black text-white mt-16">
          {!token ? (
            <>
              <Link to="/login" className="block px-5 py-3 border-t border-gray-800">Login</Link>
              <Link to="/signUp" className="block px-5 py-3 border-t border-gray-800">Sign Up</Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left px-5 py-3 border-t border-gray-800"
            >
              Logout
            </button>
          )}

          <Link to="/aboutUs" className="block px-5 py-3 border-t border-gray-800">About Us</Link>
          <Link to="/contactUs" className="block px-5 py-3 border-t border-gray-800">Contact Us</Link>
          <Link to="/faq" className="block px-5 py-3 border-t border-gray-800">FAQ</Link>
          <Link to="/privacy-policy" className="block px-5 py-3 border-t border-gray-800">Privacy Policy</Link>
          <Link to="/return-refund" className="block px-5 py-3 border-t border-gray-800">Return & Refund</Link>
        </div>
      )}
    </>
  );
};
