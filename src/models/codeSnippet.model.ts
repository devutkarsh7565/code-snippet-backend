import mongoose from "mongoose";
import { ICodeSnippet } from "../types/codeSnippet.type";

const codeSnippetSchema = new mongoose.Schema<ICodeSnippet>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const CodeSnippet = mongoose.model<ICodeSnippet>(
  "CodeSnippet",
  codeSnippetSchema
);
