import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },

    name: {
        type: String,
        required: true,
        trim: true
    },

    description: {
        type: String,
        required: true
    },

    images: [
        {
            type: String, 
            required: true
        }
    ],
    isDeleted: { type: Boolean, default: false },
    category: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        default: ""
    },

    price: {
        type: Number,
        required: true
    },

    discountPrice: {
        type: Number,
        default: null
    },

    stock: {
        type: Number,
        required: true,
        min: 0
    },

    // Shipping-related
    weight: {
        type: Number, // in grams
        default: 0
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number
    },

   
    rating: {
        type: Number,
        default: 0
    },

    numReviews: {
        type: Number,
        default: 0
    },

    // Variants (useful for clothes/shoes)
    variants: [
        {
            size: String,
            color: String,
            stock: Number
        }
    ],

    // For marking trending, popular, etc.
    isFeatured: {
        type: Boolean,
        default: false
    },

   
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
