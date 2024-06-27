import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser,loggedoutUser,refershAccessToken,fetchAllUsersController} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js";
const router = Router();
router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,loggedoutUser);

router.route("/refresh-access-token").post(refershAccessToken)

router.get("/fetchUsers", verifyJWT, fetchAllUsersController);

export default router;
