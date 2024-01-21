import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import http from "http";
import errorHandlerMiddleware from "./middlewares/handleError.js";
import cors from "cors";
import routes from "./routes/index.js";
import handleNotFoundRoute from "./middlewares/notFoundRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(express.json());

app.use(cors());

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
