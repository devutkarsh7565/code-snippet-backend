import { CodeSnippet } from "./codeSnippet.type";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
  refreshToken: string;
  codeSnippet: CodeSnippet[];
  favourites: CodeSnippet[];
  trash: CodeSnippet[];
  createdAt: Date;
  updatedAt: Date;
}
