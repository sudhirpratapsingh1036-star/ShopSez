import React from "react"
import { useParams } from "react-router-dom"

const ProductDetail = () => {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <div className="h-64 bg-gray-200 flex items-center justify-center mb-6">
          Product Image
        </div>

        <h1 className="text-3xl font-bold mb-2">Product {id}</h1>
        <p className="text-gray-600 mb-4">$25</p>

        <p className="mb-6">
          This is a sample product description. It explains the product features and benefits.
        </p>

        <div className="flex gap-4">
          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Add to Cart
          </button>

          <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700">
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
