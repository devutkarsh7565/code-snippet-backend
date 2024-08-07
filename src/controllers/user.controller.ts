import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
// import { uploadOnCloudinary } from "../utils/cloudinary";
import { IUser } from "../types/user.type";
import { AuthRequest } from "../middleware/auth.middleware";

const generateAccessAndRefereshTokens = async (
  userId: string,
  next: NextFunction
) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = createHttpError(404, "User not found");
      return next(error);
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (err) {
    const error = createHttpError(
      500,
      "Something went wrong while generating referesh and access token"
    );
    return next(error);
  }
};

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    // console.log(req.file, req?.files, "file");

    if (!name || !email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    // database call

    try {
      const user = await User.findOne({ email });

      if (user) {
        const error = createHttpError(
          400,
          "user already exist with this email"
        );
        return next(error);
      }
    } catch (err) {
      return next(createHttpError(500, "Error while getting user"));
    }

    // const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    // const avatarLocalPath = files?.avatar?.[0]?.path;

    // console.log(avatarLocalPath);

    // if (!avatarLocalPath) {
    //   const error = createHttpError(400, "avatar is required");
    //   return next(error);
    // }
    // const avatar = await uploadOnCloudinary(avatarLocalPath);

    // // console.log(avatar?.url, "avatar");

    // if (!avatar) {
    //   const error = createHttpError(500, "Error while uploading avatar");
    //   return next(error);
    // }

    let newUser: IUser;

    // console.log("user crossed", avatar);

    try {
      newUser = await User.create({
        name,
        email,
        password,
      });
    } catch (err) {
      return next(
        createHttpError(500, "Error while creating user bsc of cloudinary")
      );
    }

    const createdUser = await User.findById(newUser._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      const error = createHttpError(500, "Error while creating user");
      return next(error);
    }

    return res.status(201).json({
      success: true,
      message: "user created successfully",
      createdUser,
    });
  }
);

const userLoggedIn = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const user = await User.findOne({ email });
    if (!user) {
      const error = createHttpError(401, "Invalid email or password");
      return next(error);
    }
    const isPasswordCorrect = await user?.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      const error = createHttpError(401, "Invalid email or password");
      return next(error);
    }

    const tokens = await generateAccessAndRefereshTokens(user._id, next);

    if (!tokens) {
      // An error has already been passed to `next` by `generateAccessAndRefereshTokens`
      return;
    }

    const { accessToken, refreshToken } = tokens;

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "none",
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "none",
      })
      .json({ accessToken, refreshToken, loggedInUser });
  }
);

const getCurrentUser = asyncHandler(async (req, res) => {
  const _req = req as AuthRequest;
  const currentUser = await User.findById(_req.userId).select(
    "-password -refreshToken"
  );
  return res.status(200).json({ user: currentUser });
});

const logoutUser = asyncHandler(async (req, res) => {
  const _req = req as AuthRequest;
  await User.findByIdAndUpdate(
    _req.userId,
    {
      $unset: { refreshToken: 1 },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "user logged out Successfully" });
});

export { createUser, userLoggedIn, getCurrentUser, logoutUser };
