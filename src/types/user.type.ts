import { ICodeSnippet } from "./codeSnippet.type";

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
  createdAt: Date;
  updatedAt: Date;
}
