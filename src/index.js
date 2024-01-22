import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import errorHandlerMiddleware from "./middlewares/handleError.js";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import handleNotFoundRoute from "./middlewares/notFoundRoute.js";
import compression from "compression";
import xss from "./middlewares/xss.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(xss());

app.use("/api/v1", routes);

app.get("/", (req, res) => {
  return res.json("Hello world");
});

app.use(errorHandlerMiddleware);
app.use(handleNotFoundRoute);

const server = http.createServer(app);

server.listen(port);

server.on("listening", () => {
  console.log(`Server running on port ${port}`);
});
