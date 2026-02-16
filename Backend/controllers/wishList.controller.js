// getWishlistItems
// addToWishlist
// removeFromWishlist
// clearWishlist

import { asyncHandler } from "../utils/asyncHandler.js";
import {Wishlist} from "../models/wishlist.model.js";
import {Product} from "../models/product.model.js";


export const getWishlistItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const wishlist = await Wishlist.findOne({ user: userId })
    .populate("products");

  if (!wishlist) {
    return res.status(200).json([]);
  }

  res.status(200).json(wishlist.products);
});


export const addToWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    throw new Error("Product ID is required");
  }

  const productExists = await Product.findById(productId);
  if (!productExists) {
    throw new Error("Product not found");
  }

  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({
      user: userId,
      products: [productId],
    });
  } else {
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }
  }

  res.status(200).json(wishlist);
});


export const removeFromWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  if (!productId) {
    throw new Error("Product ID is required");
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  wishlist.products = wishlist.products.filter(
    (id) => id.toString() !== productId
  );

  await wishlist.save();

  res.status(200).json(wishlist);
});


export const clearWishlist = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    throw new Error("Wishlist not found");
  }

  wishlist.products = [];
  await wishlist.save();

  res.status(200).json(wishlist);
});
