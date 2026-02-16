import mongoose, { Schema } from "mongoose";

const productVariantSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  variantName: {
    type: String, // e.g., "Size: M" or "Color: Red"
    required: true,
  },
  additionalPrice: {
    type: Number, // extra cost for this variant if any
    default: 0,
  },
  stock: {
    type: Number,
    default: 0,
  },
  sku: {
    type: String, // Stock keeping unit
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const ProductVariant = mongoose.model('ProductVariant', productVariantSchema);
