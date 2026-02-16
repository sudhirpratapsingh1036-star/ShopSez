import { Router } from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderById
} from "../controllers/order.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();




router.post("/", verifyJWT, placeOrder);
router.get("/my-orders", verifyJWT, getUserOrders);
router.get("/:orderId", verifyJWT, getOrderById);

export default router;
