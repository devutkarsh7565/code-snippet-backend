import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "./utils/config";

const app = express();

//these are the middleware methods,if you use the sintax app.use then you are using middleware
app.use(
  cors({
    origin: [config.corsOrigin as string],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import userRouter from "./routes/user.route";
import codeSnippetRouter from "./routes/codeSnippet.route";
import tagsRouter from "./routes/tags.route";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/code-snippets", codeSnippetRouter);
app.use("/api/v1/tags", tagsRouter);

export default app;
