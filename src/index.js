import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import https from "https";
import errorHandlerMiddleware from "./middlewares/handleError.js";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes/index.js";
import handleNotFoundRoute from "./middlewares/notFoundRoute.js";
import compression from "compression";
import xss from "./middlewares/xss.js";
import fs from "fs";
import path from "path";
import configs from "./configs/index.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

const options = {
  key: fs.readFileSync(path.join(configs.certLocation, "key.pem")),
  cert: fs.readFileSync(path.join(configs.certLocation, "cert.pem")),
};

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

const server = https.createServer(options, app);

server.listen(port);

server.on("listening", () => {
  console.log(`Server running on port ${port}`);
});
