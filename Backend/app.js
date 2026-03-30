import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import jsonwebtoken from 'jsonwebtoken'


const app = express();

// Improved CORS configuration
app.use(
  cors({
    origin: [
      "https://shop-sez.vercel.app",
      "https://shop-5lyusih28-sudhir-prataps-projects.vercel.app",
      "https://shop-sez-git-main-sudhir-prataps-projects.vercel.app",
      "https://shop-ge9stk5oc-sudhir-prataps-projects.vercel.app",
      "http://localhost:5173"  // Allow local development
    ],
    credentials: true
  })
);
app.options("*", cors());

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Backend is running' });
});

//routes import 
import authRoutes from "./routes/auth.routes.js";
import userRoutes from './routes/user.routes.js';
import ownerRoutes from './routes/owner.routes.js';
import productRoutes from './routes/product.routes.js'
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import wishListRoutes from "./routes/wishList.routes.js";

//routes declaration
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/owners", ownerRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/wishlist", wishListRoutes);

// Global error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  console.error(`[ERROR] ${statusCode}: ${message}`);
  
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    data: null
  });
});

export {app};