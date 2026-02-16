import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerOwner,
  loginOwner,
  logoutOwner
} from "../controllers/auth.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();



//user
router.post("/user/register", registerUser);


router.post("/user/login", loginUser);


router.post("/user/logout", verifyJWT, logoutUser);


router.post("/user/refresh-token", refreshAccessToken);


//owner

router.post("/owner/register", registerOwner);


router.post("/owner/login", loginOwner);


router.post("/owner/logout", verifyJWT, logoutOwner);

export default router;
