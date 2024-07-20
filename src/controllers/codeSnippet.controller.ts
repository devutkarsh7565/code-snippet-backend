import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import createHttpError from "http-errors";
import { AuthRequest } from "../middleware/auth.middleware";
import { CodeSnippet } from "../models/codeSnippet.model";
import { SearchCriteria } from "../types/codeSnippet.type";

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
    const { title, description } = req.query as {
      title: string;
      description: string;
    };

    console.log(title);

    // Define the searchCriteria with the appropriate type
    const searchCriteria: SearchCriteria = {
      owner: _req.userId,
    };

    if (title) {
      searchCriteria.title = { $regex: title as string, $options: "i" }; // Case-insensitive regex search
    }

    if (description) {
      searchCriteria.description = {
        $regex: description as string,
        $options: "i",
      };
    }

    const codeSnippets = await CodeSnippet.find(searchCriteria);
    if (!codeSnippets || codeSnippets.length === 0) {
      const error = createHttpError(404, "No code snippets found");
      return next(error);
    }

    return res.status(200).json({
      success: true,
      codeSnippets,
      message: "Code snippets for current user fetched successfully",
    });
  }
);

const getSingleCodeSnippetOfCurrentUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const { id } = req.params as { id: string };
    const codeSnippet = await CodeSnippet.findOne({
      _id: id,
      owner: _req.userId,
    });
    if (!codeSnippet) {
      const error = createHttpError(404, "No code snippet found");
      return next(error);
    }
    return res.status(200).json({
      success: true,
      codeSnippet,
      message: "code snippet for Current User fetched successfully",
    });
  }
);

const updateCodeSnippetById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const { id } = req.params as { id: string };
    const { title, description, code, language } = req.body;
    if (!title || !description || !code || !language) {
      const error = createHttpError(400, "All fields are required");
      return next(error);
    }
    const codeSnippet = await CodeSnippet.findOne({
      _id: id,
      owner: _req.userId,
    });
    if (!codeSnippet) {
      const error = createHttpError(404, "No code snippet found");
      return next(error);
    }
    const updatedCodeSnippet = await CodeSnippet.findByIdAndUpdate(
      { _id: id },
      { title, description, code, language },
      { new: true }
    );
    if (!updatedCodeSnippet) {
      const error = createHttpError(500, "Error while updating code snippet");
      return next(error);
    }
    return res.status(200).json({
      success: true,
      message: "code snippet updated successfully",
      updatedCodeSnippet,
    });
  }
);

const deleteCodeSnippetById = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const _req = req as AuthRequest;
    const { id } = req.params as { id: string };
    const codeSnippet = await CodeSnippet.findOne({
      _id: id,
      owner: _req.userId,
    });
    if (!codeSnippet) {
      const error = createHttpError(404, "No code snippet found");
      return next(error);
    }
    await CodeSnippet.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "code snippet deleted successfully",
    });
  }
);

export {
  createCodeSnippet,
  getAllCodeSnippetOfCurrentUser,
  getSingleCodeSnippetOfCurrentUser,
  updateCodeSnippetById,
  deleteCodeSnippetById,
};
