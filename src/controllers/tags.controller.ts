import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import createHttpError from "http-errors";
import { Tag } from "../models/tag.model";
import { AuthRequest } from "../middleware/auth.middleware";

const createTags = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const _req = req as AuthRequest;
    if (!name) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }

    const findTagByNameAndOwnerId = await Tag.findOne({
      name,
      owner: _req.userId,
    });
    if (findTagByNameAndOwnerId) {
      const error = createHttpError(409, "Tag already exist with this name");
      return next(error);
    }
    const newTag = await Tag.create({ name, owner: _req.userId });
    return res.status(201).json({
      success: true,
      message: "Tag created successfully",
      newTag,
    });
  }
);

export { createTags };
