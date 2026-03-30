import { Router } from "express";
import { verifyOwnerJWT } from "../middlewares/authOwner.middleware.js";
import {
  getOwnerProfile,
  updateOwnerProfile,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductVariant,
  updateProductVariant,
  deleteProductVariant,
  getOwnerOrders,
  updateOrderStatus,
  getDashboardStats,
  getOwnerProducts,
} from "../controllers/owner.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyOwnerJWT);

router.get("/profile", getOwnerProfile);
router.patch("/profile", updateOwnerProfile);

router.post("/products", upload.single("image"), createProduct);
router.patch("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

router.post("/products/:productId/variants", addProductVariant);
router.patch("/variants/:variantId", updateProductVariant);
router.delete("/variants/:variantId", deleteProductVariant);

router.get("/orders", getOwnerOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);

router.get("/dashboard", getDashboardStats);
router.get("/products", getOwnerProducts)

export default router;
