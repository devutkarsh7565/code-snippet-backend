import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//these are the middleware methods,if you use the sintax app.use then you are using middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

export default app;
