import { IUser } from "./user.type";

export interface ITag {
  _id: string;
  name: string;
  owner: IUser;
  createdAt: Date;
  updatedAt: Date;
}
