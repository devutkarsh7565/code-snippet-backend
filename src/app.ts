import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//these are the middleware methods,if you use the sintax app.use then you are using middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
