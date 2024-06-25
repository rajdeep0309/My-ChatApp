import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import uploadCloudinary from "../utils/cloudinary.js";
import ApiResponse from "../utils/ApiResponse.js";
import { options } from "../constants.js";
import jwt from "jsonwebtoken";

//function of generating the access token and refresh token
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    console.log("userId:", userId);
    const existedUser = await User.findById(userId);
    const accessToken = existedUser.generateAccessToken();
    // console.log("existedUser:",existedUser);
    const refreshToken = existedUser.generateRefreshToken();
    existedUser.refreshTokens = refreshToken;

    await existedUser.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    throw new ApiError(500, "Failed to generate access and refresh tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get the data from the request body
  console.log(req);
  const {
    username,
    fullname,
    email,
    password,
    gender,
    github,
    linkedin,
    twitter,
    address,
    phone,
  } = req.body;
  //   console.log(username, fullname, email, password);
  //valid username,fullname,email,password!!!!!!!!!!!!!!!!!!
  if (
    [username, fullname, email, password].some((fields) => {
      fields?.trim() === "";
    })
  ) {
    throw new ApiError(400, "Please fill in all fields");
  }
  //check if the user already exists
  //if the user exists, send an error response
  //if the user does not exist, register the user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  // console.log(existedUser);
  const avatarLocalPath = req.files?.avatar?.[0]?.path ?? "";
  // const avatarLocalPath = req.body.avatar;
  // console.log(existedUser);
  //check if the avatar  is uploaded
console.log(avatarLocalPath);
  if (!avatarLocalPath) {
    throw new ApiError(400, "Please upload avatar  ");
  }

  //upload the avatar and cover image to cloudinary
  const avatar = await uploadCloudinary(avatarLocalPath);

  if (!avatar) {
    throw new ApiError(500, "Failed to upload avatar ");
  }

  //register the user
  const newUser = await User.create({
    username: username.toLowerCase(),
    fullname,
    email,
    password,
    avatar: avatar.url,
    gender,
    linkedin,
    twitter,
    github,
    phone,
    address,
  });
  //send the response
  const createUser = User.findById(newUser._id)
    .select("-password -refreshToken")
    .then((user) => {
      return res
        .status(201)
        .json(new ApiResponse(201, "User registered successfully", user));
    });

  if (!createUser) {
    throw new ApiError(500, "Failed to register user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  //get the data from the request body
  console.log(req);
  console.log("data received from the frontend");

  const { email, username, password } = req.body;
  // console.log(req.body);
  // console.log(email, username, password);

  //   valid username,password
  if (!username && !email) {
    throw new ApiError(400, "Please fill in all fields");
  }

  //check if the user exists
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  //   .select("-refreshToken -password");
  if (!existedUser) {
    throw new ApiError(400, "User does not exist");
  }
  //check if the password is correct
  const isPasswordValid = await existedUser.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }

  //generate the access token and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    existedUser._id
  );

  const loggedInUser = await User.findById(existedUser._id).select(
    "-password -refreshToken"
  );
  //send the cookies

  //send the response

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});
const loggedoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshTokens: undefined,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "User logged out successfully", user));
});

const refershAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new ApiError(401, "User not authenticated");
  }
  //verify the refresh token
  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );
  //check if the user exists
  const user = await User.findById(decodedToken._id);
  if (!user) {
    throw new ApiError(401, "User not authenticated");
  }
  //generate the access token and refresh token
  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefereshTokens(user._id);
  //send the cookies

  //send the response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new ApiResponse(200, "Access token refreshed successfully", {
        accessToken,
      })
    );
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const user = await User.findById(req.user._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid password");
  }
  if (newPassword !== confirmPassword) {
    throw new ApiError(
      400,
      "New Password does not match to the confirm password"
    );
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { username, fullname, email } = req.body;
  if (!username || !fullname || !email) {
    throw new ApiError(400, "Please fill in all fields");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: { username, fullname, email },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password ");

  return res
    .status(200)
    .json(new ApiResponse(200, "Account details updated successfully", user));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new ApiError(400, "Please upload an avatar");
  }
  const avatar = await uploadCloudinary(avatarLocalPath);
  if (!avatar.url) {
    throw new ApiError(500, "Failed to upload avatar");
  }
  const user = await User.findOneAndUpdate(
    req.user._id,
    {
      $set: { avatar: avatar.url },
    },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
  return res
    .status(200)
    .json(new ApiResponse(200, "Avatar updated successfully", user));
});

const currUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, "User found successfully", req.user));
});
export {
  registerUser,
  loginUser,
  loggedoutUser,
  currUser,
  refershAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
};
