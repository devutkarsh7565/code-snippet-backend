"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
//these are the middleware methods,if you use the sintax app.use then you are using middleware
app.use(
  (0, cors_1.default)({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "16kb" }));
app.use(express_1.default.static("public"));
app.use((0, cookie_parser_1.default)());
// routes import
const user_route_1 = __importDefault(require("../src/routes/user.route.js"));
const codeSnippet_route_1 = __importDefault(
  require("./routes/codeSnippet.route.js")
);
app.use("/api/v1/users", user_route_1.default);
app.use("/api/v1/code-snippets", codeSnippet_route_1.default);
exports.default = app;
