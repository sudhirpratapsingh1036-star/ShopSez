import { Router } from "express";
import {
  getWishlistItems,
  addToWishlist,
  removeFromWishlist,
  clearWishlist
} from "../controllers/wishList.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", verifyJWT, getWishlistItems);
router.post("/add", verifyJWT, addToWishlist);
router.delete("/remove", verifyJWT, removeFromWishlist);
router.delete("/clear", verifyJWT, clearWishlist);

export default router;
