/* getUserProfile
updateUserProfile
addShippingAddress
getShippingAddresses
updateShippingAddress
deleteShippingAddress
getMyOrders
getOrderById
changePassword
deleteUserAccount*/

import { User } from "../models/user.model.js";
import { Order } from "../models/order.model.js";
import { Shipping } from "../models/shipping.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";



export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, user, "User profile fetched successfully")
  );
});


export const updateUserProfile = asyncHandler(async (req, res) => {
  const { username, phoneNumber } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { username, phoneNumber },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(
    new ApiResponse(200, updatedUser, "User profile updated successfully")
  );
});




export const addShippingAddress = asyncHandler(async (req, res) => {
  const {
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phoneNumber,
  } = req.body;

  if (
    [addressLine1, city, state, postalCode, country, phoneNumber].some(
      (field) => !field?.trim()
    )
  ) {
    throw new ApiError(400, "All required address fields must be filled");
  }

  const shipping = await Shipping.create({
    user: req.user._id,
    addressLine1,
    addressLine2,
    city,
    state,
    postalCode,
    country,
    phoneNumber,
  });

  res.status(201).json(
    new ApiResponse(201, shipping, "Shipping address added successfully")
  );
});


export const getShippingAddresses = asyncHandler(async (req, res) => {
  const addresses = await Shipping.find({ user: req.user._id });

  res.status(200).json(
    new ApiResponse(200, addresses, "Shipping addresses fetched")
  );
});


export const updateShippingAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedAddress = await Shipping.findOneAndUpdate(
    { _id: id, user: req.user._id },
    req.body,
    { new: true }
  );

  if (!updatedAddress) {
    throw new ApiError(404, "Shipping address not found");
  }

  res.status(200).json(
    new ApiResponse(200, updatedAddress, "Shipping address updated")
  );
});


export const deleteShippingAddress = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Shipping.findOneAndDelete({
    _id: id,
    user: req.user._id,
  });

  if (!deleted) {
    throw new ApiError(404, "Shipping address not found");
  }

  res.status(200).json(
    new ApiResponse(200, {}, "Shipping address deleted successfully")
  );
});



export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate("items.product");

  res.status(200).json(
    new ApiResponse(200, orders, "User orders fetched successfully")
  );
});


export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.findOne({
    _id: orderId,
    user: req.user._id,
  }).populate("items.product");

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  res.status(200).json(
    new ApiResponse(200, order, "Order fetched successfully")
  );
});




export const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both old and new passwords are required");
  }

  const user = await User.findById(req.user._id);
  const isMatch = await user.isPasswordCorrect(oldPassword);

  if (!isMatch) {
    throw new ApiError(401, "Old password is incorrect");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json(
    new ApiResponse(200, {}, "Password changed successfully")
  );
});

export const deleteUserAccount = asyncHandler(async (req, res) => {
  await Shipping.deleteMany({ user: req.user._id });
  await Order.deleteMany({ user: req.user._id });
  await User.findByIdAndDelete(req.user._id);

  res.status(200).json(
    new ApiResponse(200, {}, "User account deleted successfully")
  );
});
