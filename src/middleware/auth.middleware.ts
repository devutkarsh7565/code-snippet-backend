import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import createHttpError from "http-errors";
import { config } from "../utils/config.js";
import { IUser, JwtPayloadWithId } from "../types/user.type.js";
import { NextFunction, Request } from "express";

export interface AuthRequest extends Request {
  user: IUser;
}

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

      // console.log(token);
      if (!token) {
        const error = createHttpError(401, "Unauthorized request");
        return next(error);
      }

      const decodedToken = jwt.verify(
        token,
        config.accessTokenSecret as string
      ) as JwtPayloadWithId;

      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        const error = createHttpError(401, "Invalid Access Token");
        return next(error);
      }

      const _req = req as AuthRequest;
      _req.user = user;
      next();
    } catch (error) {
      const err = createHttpError(401, "Invalid access token error ");
      return next(err);
    }
  }
);
