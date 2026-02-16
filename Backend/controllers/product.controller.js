// getAllProducts
// getProductById
// getProductsByCategory
// searchProducts
// getFeaturedProducts
// getLatestProducts
// addProductReview
// getProductReviews

import { Product } from "../models/product.model.js";
import { Review } from "../models/review.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";


// controllers/product.controller.js

// Example: getAllProducts
export const getAllProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    keyword = "",
    category,
    sort = "-createdAt",
  } = req.query;

  const query = {
    isDeleted: { $ne: true }, // ✅ Exclude deleted products
  };

  // Search by product name
  if (keyword) {
    query.name = { $regex: keyword, $options: "i" };
  }

  // Filter by category
  if (category) {
    query.category = category;
  }

  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const totalProducts = await Product.countDocuments(query);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        totalProducts,
        currentPage: Number(page),
        totalPages: Math.ceil(totalProducts / limit),
      },
      "All products fetched successfully"
    )
  );
});


export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId)
    .populate("variants") // Assuming you have ProductVariant model linked
    .lean();

  if (!product) throw new ApiError(404, "Product not found");

  const reviews = await Review.find({ product: productId }).populate(
    "user",
    "username"
  );

  res.status(200).json(
    new ApiResponse(
      200,
      { ...product, reviews },
      "Product fetched successfully"
    )
  );
});


export const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });

  res.status(200).json(
    new ApiResponse(200, products, "Products by category fetched")
  );
});


export const searchProducts = asyncHandler(async (req, res) => {
  const { keyword } = req.query;

  if (!keyword) throw new ApiError(400, "Keyword is required");

  const products = await Product.find({
    name: { $regex: keyword, $options: "i" },
  });

  res.status(200).json(
    new ApiResponse(200, products, "Search results fetched")
  );
});


export const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(10);
  res.status(200).json(
    new ApiResponse(200, products, "Featured products fetched")
  );
});


export const getLatestProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 }).limit(10);
  res.status(200).json(
    new ApiResponse(200, products, "Latest products fetched")
  );
});


export const addProductReview = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  if (!rating || !comment) throw new ApiError(400, "Rating and comment are required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    rating,
    comment,
  });

  res.status(201).json(
    new ApiResponse(201, review, "Review added successfully")
  );
});


export const getProductReviews = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const reviews = await Review.find({ product: productId })
    .populate("user", "username")
    .sort({ createdAt: -1 });

  res.status(200).json(
    new ApiResponse(200, reviews, "Product reviews fetched")
  );
});
