import { Router } from "express";
import {
  createPayment,
  verifyPayment,
  refundPayment
} from "../controllers/payment.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.post("/create", verifyJWT, createPayment);
router.post("/verify", verifyJWT, verifyPayment);
router.post("/refund", verifyJWT, refundPayment);

export default router;
