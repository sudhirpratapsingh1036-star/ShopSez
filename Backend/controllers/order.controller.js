// order.controller.js
import { asyncHandler } from "../utils/asyncHandler.js";
import { Order } from "../models/order.model.js";
import { Cart } from "../models/cart.model.js";
import { Shipping } from "../models/shipping.model.js";


export const placeOrder = async (req, res) => {
  try {
    const { shippingAddress, paymentMethod, items, totalAmount } = req.body;
    const userId = req.user._id;

    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "Cart is empty" });
    }

    const order = await Order.create({
      user: userId,
      shippingAddress,
      paymentMethod,
      items,
      totalAmount,
    });

  


    res.status(201).json({ success: true, message: "Order placed successfully!", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to place order" });
  }
};
export const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId })
    .populate("items.product")
    .sort({ createdAt: -1 });

  res.status(200).json(orders);
});

// Get order by ID
export const getOrderById = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId } = req.params;

  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "items.product"
  );

  if (!order) {
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});
