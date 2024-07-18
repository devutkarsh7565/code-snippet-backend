import mongoose from "mongoose";
import { IUser } from "../types/user.type";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    avatar: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    codeSnippet: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
      },
    ],
    favourites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
      },
    ],
    trash: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodeSnippet",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//mongoose custom methods

userSchema.methods.isPasswordCorrect = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    config.accessTokenSecret as string,
    {
      expiresIn: config.accessTokenExpiry,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.refreshTokenSecret as string,
    {
      expiresIn: config.refreshTokenExpiry,
    }
  );
};
