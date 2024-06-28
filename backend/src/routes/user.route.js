import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import {
  loginUser,
  loggedoutUser,
  refershAccessToken,
  fetchAllUsersController,
  updateUserAvatar,
  updateAccountDetails,
  changeCurrentPassword,
  currUser,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();
router
  .route("/register")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT, loggedoutUser);
router.route("/updateAvatar").put(verifyJWT, updateUserAvatar);
router.route("/updateAccountDetails").put(verifyJWT, updateAccountDetails);
router.route("/userdetails").post(verifyJWT,currUser);

router.route("/refresh-access-token").post(refershAccessToken);

router.route("/fetchUsers").get(verifyJWT, fetchAllUsersController);

export default router;
