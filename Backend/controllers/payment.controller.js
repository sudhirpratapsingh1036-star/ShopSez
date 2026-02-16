// createPayment
// verifyPayment
// refundPayment

import { asyncHandler } from "../utils/asyncHandler.js";
import {Payment} from "../models/payment.model.js";
import {Order} from "../models/order.model.js";


export const createPayment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { orderId, paymentMethod } = req.body;

  if (!orderId || !paymentMethod) {
    throw new Error("Order ID and payment method are required");
  }

  const order = await Order.findOne({ _id: orderId, user: userId });

  if (!order) {
    throw new Error("Order not found");
  }

  const payment = await Payment.create({
    user: userId,
    order: orderId,
    amount: order.totalAmount,
    paymentMethod,
    paymentStatus: "Pending",
  });

  res.status(201).json(payment);
});


export const verifyPayment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { paymentId, status } = req.body;

  if (!paymentId || !status) {
    throw new Error("Payment ID and status are required");
  }

  const payment = await Payment.findOne({
    _id: paymentId,
    user: userId,
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  payment.paymentStatus = status; // Paid / Failed
  await payment.save();

  // If payment successful → update order
  if (status === "Paid") {
    await Order.findByIdAndUpdate(payment.order, {
      orderStatus: "Paid",
    });
  }

  res.status(200).json(payment);
});


export const refundPayment = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { paymentId, reason } = req.body;

  if (!paymentId || !reason) {
    throw new Error("Payment ID and refund reason are required");
  }

  const payment = await Payment.findOne({
    _id: paymentId,
    user: userId,
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  payment.paymentStatus = "Refunded";
  payment.refundReason = reason;

  await payment.save();

  // Update order status
  await Order.findByIdAndUpdate(payment.order, {
    orderStatus: "Cancelled",
  });

  res.status(200).json(payment);
});
