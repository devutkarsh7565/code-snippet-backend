import mongoose from "mongoose";
import { ITag } from "../types/tag.type";

const tagSchema = new mongoose.Schema<ITag>(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Tag = mongoose.model<ITag>("Tag", tagSchema);
