
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
    // console.log("enter verifyToken");    //verify the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    //  console.log("decodedToken:",decodedToken._id);
    //check if the user exists
    const user = await User.findById(decodedToken._id).select(
      "-password -refershToken"
    );
    // console.log("enter verifyToken",user);    //verify the token

    if (!user) {
      return new ApiError(401, "User not authenticated");
    }
    // console.log("enter verifyToken");    //verify the token

    req.user = user;

    console.log("user:", user);
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "User not authenticated");
  }
});
