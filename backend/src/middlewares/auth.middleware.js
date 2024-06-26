import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.headers("authorization")?.replace("Bearer ", "");
    if (!accessToken) {
      return new ApiError(401, "User not authenticated");
    }

    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    //check if the user exists
    const user = await User.findById(decodedToken._id).select(
      "-password -refershToken"
    );

    if (!user) {
      return new ApiError(401, "User not authenticated");
    }

    req.user = user;

    console.log("user:", user);
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "User not authenticated");
  }
});
