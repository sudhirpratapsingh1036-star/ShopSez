import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserProfile,
  updateUserProfile,
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  getMyOrders,
  getOrderById,
  changePassword,
  deleteUserAccount,
} from "../controllers/user.controller.js";

const router = Router();

router.use(verifyJWT);

router.get("/profile", getUserProfile);
router.patch("/profile", updateUserProfile);

router.post("/shipping", addShippingAddress);
router.get("/shipping", getShippingAddresses);
router.patch("/shipping/:id", updateShippingAddress);
router.delete("/shipping/:id", deleteShippingAddress);

router.get("/orders", getMyOrders);
router.get("/orders/:orderId", getOrderById);

router.patch("/change-password", changePassword);
router.delete("/delete-account", deleteUserAccount);

export default router;
