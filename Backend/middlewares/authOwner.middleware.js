import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { Owner } from "../models/owner.model.js";

export const verifyOwnerJWT = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        console.log("🔐 Owner auth - Token present:", !!token);
        
        if (!token) {
            return next(new ApiError(401, "Unauthorized request: No token provided"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("🔐 Owner auth - Decoded token:", decodedToken);

        const owner = await Owner.findById(decodedToken._id).select("-password -refreshToken");
        console.log("🔐 Owner auth - Owner found:", !!owner);
        
        if (!owner) {
            console.log("❌ Owner auth - Owner not found for ID:", decodedToken._id);
            return next(new ApiError(401, "Invalid Access Token: Owner not found"));
        }

        req.owner = owner;
        next();
    } catch (error) {
        console.log("❌ Owner auth - Error:", error.message);
        next(new ApiError(401, error?.message || "Invalid access token"));
    }
});

