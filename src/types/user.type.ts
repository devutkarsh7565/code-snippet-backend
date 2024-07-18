import { ICodeSnippet } from "./codeSnippet.type";
import { ITag } from "./tag.type";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  codeSnippet: ICodeSnippet[];
  favourites: ICodeSnippet[];
  trash: ICodeSnippet[];
  tags: ITag[];
  createdAt: Date;
  updatedAt: Date;
}
