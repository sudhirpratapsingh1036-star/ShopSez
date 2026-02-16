// getCartItems
// addToCart
// updateCartItem
// removeFromCart
// clearCart

import { asyncHandler } from "../utils/asyncHandler.js";
import {Cart} from "../models/cart.model.js";
import {Product} from "../models/product.model.js";


export const getCartItems = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  res.status(200).json(cart || { items: [] });
});


export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    throw new Error("ProductId and quantity are required");
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
  }

  await cart.save();
  res.status(200).json(cart);
});


export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;

  if (!productId || quantity == null) {
    throw new Error("ProductId and quantity are required");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  const item = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (!item) {
    throw new Error("Product not in cart");
  }

  item.quantity = quantity;
  await cart.save();

  res.status(200).json(cart);
});


export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();
  res.status(200).json(cart);
});


export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new Error("Cart not found");
  }

  cart.items = [];
  await cart.save();

  res.status(200).json(cart);
});
