import { ICodeSnippet } from "./codeSnippet.type";
import { ITag } from "./tag.type";
import jwt from "jsonwebtoken";

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
  isPasswordCorrect(password: string): Promise<boolean>;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

export interface JwtPayloadWithId extends jwt.JwtPayload {
  _id: string;
}
