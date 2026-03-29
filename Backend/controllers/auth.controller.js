import { User } from "../models/user.model.js";
import { Owner } from "../models/owner.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";


const generateTokens = async (Model, id) => {
  const account = await Model.findById(id);
  if (!account) throw new ApiError(500, "Account not found");

  const accessToken = account.generateAccessToken();
  const refreshToken = account.generateRefreshToken();

  account.refreshToken = refreshToken;
  await account.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};



export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;

  if ([username, email, password, phoneNumber].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  try {
    const user = await User.create({
      username,
      email,
      password,
      phoneNumber,
    });

    const safeUser = await User.findById(user._id).select("-password -refreshToken");

    res.status(201).json(
      new ApiResponse(201, safeUser, "User registered successfully")
    );
  } catch (error) {
    // Handle MongoDB E11000 duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw new ApiError(409, `${field} already exists`);
    }
    throw error;
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if ([email, password].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isValid = await user.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid email or password");

  const { accessToken, refreshToken } = await generateTokens(User, user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

 const cookieOptions = {
  httpOnly: true,
  secure: true,       // must be true on HTTPS (Render + Vercel)
  sameSite: "none",   // 🔥 required for cross-origin
};
  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    $unset: { refreshToken: 1 },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out"));
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingToken) throw new ApiError(401, "Unauthorized");

  const decoded = jwt.verify(
    incomingToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decoded._id);
  if (!user || user.refreshToken !== incomingToken) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const { accessToken, refreshToken } = await generateTokens(User, user._id);

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "Access token refreshed"
      )
    );
});



export const registerOwner = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if ([username, email, password].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }

  if (email !== process.env.OWNER_EMAIL) {
    throw new ApiError(403, "Not allowed to register as owner");
  }

  const existingOwner = await Owner.findOne({ email });
  if (existingOwner) {
    throw new ApiError(409, "Owner already exists");
  }

  try {
    await Owner.create({ username, email, password });

    res.status(201).json(
      new ApiResponse(201, {}, "Owner registered successfully")
    );
  } catch (error) {
    // Handle MongoDB E11000 duplicate key error
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw new ApiError(409, `${field} already exists`);
    }
    throw error;
  }
});

export const loginOwner = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  if ([email, password].some(f => !f?.trim())) {
    throw new ApiError(400, "All fields are required");
  }
  
  const owner = await Owner.findOne({ email });
  if (!owner) throw new ApiError(401, "Invalid email or password");
  // console.log("Login Email:", email);
  // console.log("Owner found:", owner);

  const isValid = await owner.isPasswordCorrect(password);
  if (!isValid) throw new ApiError(401, "Invalid email or password");

  const { accessToken, refreshToken } = await generateTokens(Owner, owner._id);

  const loggedInOwner = await Owner.findById(owner._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { owner: loggedInOwner, accessToken, refreshToken },
        "Owner logged in successfully"
      )
    );
});

export const logoutOwner = asyncHandler(async (req, res) => {
  await Owner.findByIdAndUpdate(req.owner._id, {
    $unset: { refreshToken: 1 },
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };

  res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "Owner logged out"));
});
