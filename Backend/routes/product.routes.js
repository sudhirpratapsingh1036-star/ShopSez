import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
  getFeaturedProducts,
  getLatestProducts,
  addProductReview,
  getProductReviews,
} from "../controllers/product.controller.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/latest", getLatestProducts);
router.get("/:productId", getProductById);
router.get("/category/:category", getProductsByCategory);
router.get("/:productId/reviews", getProductReviews);
router.get("/search", searchProducts);

// Protected route for review
router.post("/:productId/reviews", verifyJWT, addProductReview);

export default router;
