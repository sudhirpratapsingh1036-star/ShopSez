import mongoose,{Schema} from "mongoose";

const shippingSchema = new Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  shippingAddress: {
    fullName: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  shippingMethod: { type: String, enum: ['Standard', 'Express', 'Overnight'], default: 'Standard' },
  trackingNumber: String,
  status: { type: String, enum: ['Pending', 'Shipped', 'In Transit', 'Delivered', 'Returned'], default: 'Pending' },
  estimatedDelivery: Date,
  updatedAt: { type: Date, default: Date.now },
});
 export const Shipping= mongoose.model("Shipping", shippingSchema);