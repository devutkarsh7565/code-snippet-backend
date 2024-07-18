import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadOnCloudinary } from "../utils/cloudinary";
import { IUser } from "../types/user.type";

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.file, req?.files, "file");

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

    const files = req.files as { [fieldname: string]: Express.Multer.File[] };

    const avatarLocalPath = files?.avatar?.[0]?.path;

    console.log(avatarLocalPath);

    if (!avatarLocalPath) {
      const error = createHttpError(400, "avatar is required");
      return next(error);
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);

    // console.log(avatar?.url, "avatar");

    if (!avatar) {
      const error = createHttpError(500, "Error while uploading avatar");
      return next(error);
    }

    let newUser: IUser;

    console.log("user crossed", avatar);

    try {
      newUser = await User.create({
        name,
        email,
        password,
        avatar: avatar?.url,
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

export { createUser };
