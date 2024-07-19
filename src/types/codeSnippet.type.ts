import { Types } from "mongoose";
import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface ICodeSnippet {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: "typescript" | "javascript" | "html" | "css";
  owner: IUser;
  date: Date;
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface SearchCriteria {
  owner: Types.ObjectId | string;
  title?: { $regex: string; $options: string };
  description?: { $regex: string; $options: string };
  tags?: { $in: string[] };
}
