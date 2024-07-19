import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import createHttpError from "http-errors";
import { AuthRequest } from "../middleware/auth.middleware";
import { CodeSnippet } from "../models/codeSnippet.model";

const createCodeSnippet = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, code, language } = req.body;

    if (!title || !description || !code || !language) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }
    const _req = req as AuthRequest;

    console.log(_req?.userId, "req console");

    const findCodeSnippetByUserAndTitle = await CodeSnippet.findOne({
      title,
      owner: _req.userId,
    });

    if (findCodeSnippetByUserAndTitle) {
      const error = createHttpError(
        409,
        "code snippet already exist with this title"
      );
      return next(error);
    }

    const newCodeSnippet = await CodeSnippet.create({
      title,
      description,
      code,
      language,
      owner: _req.userId,
    });

    if (!newCodeSnippet) {
      const error = createHttpError(500, "Error while creating code snippet");
      return next(error);
    }

    return res.status(201).json({
      success: true,
      message: "code snippet created successfully",
      newCodeSnippet,
    });
  }
);

const getAllCodeSnippetOfCurrentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const codeSnippets = await CodeSnippet.find({ owner: _req.userId });
    if (!codeSnippets) {
      const error = createHttpError(404, "No code snippet found");
      return next(error);
    }
    return res.status(200).json({
      success: true,
      codeSnippets,
      message: "code snippet for Current User fetched successfully",
    });
  }
);

export { createCodeSnippet, getAllCodeSnippetOfCurrentUser };
