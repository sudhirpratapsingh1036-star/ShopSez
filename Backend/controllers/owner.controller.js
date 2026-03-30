import {v2  as cloudinary} from "cloudinary"; 
import { Owner } from "../models/owner.model.js";
import { Product } from "../models/product.model.js";
import { ProductVariant } from "../models/productVariant.model.js";
import { Order } from "../models/order.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getOwnerProfile = asyncHandler(async (req, res) => {
  const owner = await Owner.findById(req.owner._id).select(
    "-password -refreshToken"
  );

  if (!owner) {
    throw new ApiError(404, "Owner not found");
  }

  res.status(200).json(
    new ApiResponse(200, owner, "Owner profile fetched successfully")
  );
});



export const updateOwnerProfile = asyncHandler(async (req, res) => {
  const { username } = req.body;

  const updatedOwner = await Owner.findByIdAndUpdate(
    req.owner._id,
    { username },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedOwner) {
    throw new ApiError(404, "Owner not found");
  }

  res.status(200).json(
    new ApiResponse(200, updatedOwner, "Owner profile updated successfully")
  );
});


// export const createProduct = async (req, res) => {
//   try {
//     const { name, description, category, brand, price, stock } = req.body;

//     // debug
//     console.log("BODY:", req.body);
//     console.log("FILE:", req.file);
//     console.log("OWNER:", req.owner);

//     if (!name || !description || !category || !price || stock === undefined) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be filled",
//       });
//     }

//     if (stock < 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Stock cannot be negative",
//       });
//     }

//     if (!req.file) {
//       return res.status(400).json({
//         success: false,
//         message: "Product image is required",
//       });
//     }

//     const imagePath = `/temp/${req.file.filename}`;

//     const product = await Product.create({
//       ownerId: req.owner._id,     // ✅ matches schema
//       name,
//       description,
//       category,
//       brand,
//       price,
//       stock,
//       image: [imagePath],        // ✅ array as required
//     });

//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       product,
//     });
//   } catch (error) {
//     console.error("Create product error:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
export const createProduct = asyncHandler(async (req, res) => {
  console.log("🔍 createProduct called");
  console.log("📦 Body:", req.body);
  console.log("📄 File:", req.file);
  console.log("👤 Owner ID:", req.owner?._id);

  const { name, price, category, description, stock } = req.body;

  // Validate required fields
  if (!name || !price || !category || !description || stock === undefined) {
    console.error("❌ Missing required fields");
    throw new ApiError(400, "All fields (name, price, category, description, stock) are required");
  }

  if (!req.file) {
    console.error("❌ No file uploaded");
    throw new ApiError(400, "Product image is required");
  }

  console.log("📤 Uploading to Cloudinary...");
  // Upload to Cloudinary
  const uploadedImage = await uploadOnCloudinary(req.file.path);
  
  if (!uploadedImage) {
    console.error("❌ Cloudinary upload failed");
    throw new ApiError(500, "Failed to upload image to Cloudinary");
  }

  console.log("✅ Image uploaded:", uploadedImage.secure_url);

  const product = await Product.create({
    ownerId: req.owner._id,  // ownerId from JWT
    name,
    price: Number(price),
    category,
    description,
    stock: Number(stock),
    images: [uploadedImage.secure_url],
    isDeleted: false
  });

  console.log("✅ Product created:", product._id);

  res.status(201).json(new ApiResponse(201, product, "Product created successfully"));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findOneAndUpdate(
    { _id: productId, ownerId: req.owner._id },
    req.body,
    { new: true }
  );

  if (!product) {
    throw new ApiError(404, "Product not found or unauthorized");
  }

  res.status(200).json(
    new ApiResponse(200, product, "Product updated successfully")
  );
});




export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  // Find the product first
  const product = await Product.findOne({
    _id: productId,
    ownerId: req.owner._id,
  });

  if (!product) throw new ApiError(404, "Product not found or unauthorized");

  // Delete images from Cloudinary
  if (product.images && product.images.length > 0) {
    for (const imageUrl of product.images) {
      const segments = imageUrl.split("/");
      const publicIdWithExt = segments[segments.length - 1];
      const publicId = publicIdWithExt.split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }
  }

  // Soft delete the product
  product.isDeleted = true;
  await product.save();

  // Remove variants as well
  await ProductVariant.deleteMany({ product: productId });

  res.status(200).json(new ApiResponse(200, {}, "Product deleted successfully"));
});


export const addProductVariant = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { price, stock, attributes } = req.body;

  const product = await Product.findOne({
    _id: productId,
    ownerId: req.owner._id,
  });

  if (!product) {
    throw new ApiError(404, "Product not found or unauthorized");
  }

  const variant = await ProductVariant.create({
    product: productId,
    price,
    stock,
    attributes,
  });

  res.status(201).json(
    new ApiResponse(201, variant, "Product variant added successfully")
  );
});



export const updateProductVariant = asyncHandler(async (req, res) => {
  const { variantId } = req.params;

  const variant = await ProductVariant.findByIdAndUpdate(
    variantId,
    req.body,
    { new: true }
  );

  if (!variant) {
    throw new ApiError(404, "Variant not found");
  }

  res.status(200).json(
    new ApiResponse(200, variant, "Product variant updated")
  );
});



export const deleteProductVariant = asyncHandler(async (req, res) => {
  const { variantId } = req.params;

  const variant = await ProductVariant.findByIdAndDelete(variantId);

  if (!variant) {
    throw new ApiError(404, "Variant not found");
  }

  res.status(200).json(
    new ApiResponse(200, {}, "Product variant deleted")
  );
});



export const getOwnerOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ ownerId: req.owner._id })
    .sort({ createdAt: -1 })
    .populate("items.product");

  res.status(200).json(
    new ApiResponse(200, orders, "Owner orders fetched successfully")
  );
});



export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = await Order.findOneAndUpdate(
    { _id: orderId, ownerId: req.owner._id },
    { status },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found or unauthorized");
  }

  res.status(200).json(
    new ApiResponse(200, order, "Order status updated")
  );
});



export const getDashboardStats = asyncHandler(async (req, res) => {
  const totalProducts = await Product.countDocuments({
    ownerId: req.owner._id,
  });

  const totalOrders = await Order.countDocuments({
    ownerId: req.owner._id,
  });

  res.status(200).json(
    new ApiResponse(
      200,
      { totalProducts, totalOrders },
      "Dashboard stats fetched"
    )
  );
});
export const getOwnerProducts = asyncHandler(async (req, res) => {
  console.log("Owner ID:", req.owner._id);
  const products = await Product.find({ ownerId: req.owner._id });
  console.log("Products found:", products.length);

  res.status(200).json(
    new ApiResponse(200, products, "Owner products fetched successfully")
  );
});
