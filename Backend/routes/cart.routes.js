import { Router } from "express";
import {
  getCartItems,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();




router.get("/", verifyJWT, getCartItems);
router.post("/add", verifyJWT, addToCart);
router.put("/update", verifyJWT, updateCartItem);
router.delete("/remove", verifyJWT, removeFromCart);
router.delete("/clear", verifyJWT, clearCart);

export default router;
