import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import createHttpError from "http-errors";
import { config } from "../utils/config";
import { JwtPayloadWithId } from "../types/user.type";
import { NextFunction, Request } from "express";
import { asyncHandler } from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  userId: string;
}

export const verifyJWT = asyncHandler(
  async (req: Request, _, next: NextFunction) => {
    try {
      console.log(req.cookies, "cookies .....");
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
      _req.userId = user?._id;
      next();
    } catch (error) {
      const err = createHttpError(401, "Invalid access token error ");
      return next(err);
    }
  }
);
