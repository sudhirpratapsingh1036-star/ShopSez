import React, { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "https://shopsez.onrender.com/api/v1",
  withCredentials: true,
});

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await api.get("/owners/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data.data);
    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  // Handle input changes for text fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewProduct((prev) => ({ ...prev, imageFile: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setNewProduct((prev) => ({ ...prev, imageFile: null }));
    setImagePreview(null);
  };

  // Add product
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.imageFile) {
      alert("Please select an image.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("category", newProduct.category);
      formData.append("description", newProduct.description);
      formData.append("price", Number(newProduct.price));
      formData.append("stock", Number(newProduct.stock));
      formData.append("image", newProduct.imageFile);

const res = await api.post(
  "/owners/products",
  formData,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  }
);
      setProducts((prev) => [res.data.data, ...prev]);

      setNewProduct({
        name: "",
        category: "",
        description: "",
        price: "",
        stock: "",
        imageFile: null,
      });
      setImagePreview(null);
      setShowAddForm(false);
      alert("Product added successfully ✅");
    } catch (err) {
      console.log("Add product error:", err);
      alert(err.response?.data?.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/owners/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("Product deleted successfully ✅");
    } catch (err) {
      console.log("Delete product error:", err);
      alert(err.response?.data?.message || "Failed to delete product");
    }
  };

  return (
    <div className="p-10 w-screen min-h-screen bg-gray-100 text-black">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Add Product Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showAddForm ? "Cancel" : "Add Product"}
      </button>

      {/* Add Product Form */}
      {showAddForm && (
        <form
          onSubmit={handleAddProduct}
          className="bg-white p-6 rounded shadow mb-6 grid grid-cols-1 gap-4 max-w-md"
        >
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={newProduct.category}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newProduct.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={newProduct.price}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 rounded w-full"
              required
            />
            {imagePreview && (
              <div className="mt-2 flex items-center space-x-4">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </form>
      )}

      {/* Products List */}
      <h2 className="text-xl font-bold mb-3">Latest Products</h2>
      {products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {products.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded shadow relative">
              <img
                src={Array.isArray(p.images) ? p.images[0] : p.images}
                alt={p.name}
                className="h-32 w-full object-cover mb-2 rounded"
              />
              <h3 className="font-bold">{p.name}</h3>
              <p>₹{p.price}</p>
              <button
                onClick={() => handleDeleteProduct(p._id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
