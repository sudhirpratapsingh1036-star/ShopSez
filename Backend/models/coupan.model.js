import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage: {
    type: Number, // e.g., 10 for 10% discount
    required: true,
  },
  minimumOrderValue: {
    type: Number,
    default: 0,
  },
  validFrom: {
    type: Date,
    required: true,
  },
  validTo: {
    type: Date,
    required: true,
  },
  usageLimit: {
    type: Number, // total number of times coupon can be used
    default: 0,
  },
  usedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Tracks which users have used the coupon
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Coupan = mongoose.model('Coupon', couponSchema);
