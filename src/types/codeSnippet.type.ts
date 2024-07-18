import { ITag } from "./tag.type";
import { IUser } from "./user.type";

export interface ICodeSnippet {
  _id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  owner: IUser;
  date: Date;
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
