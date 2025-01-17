import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet"; //creates headers for security attacks
const morgan = require("morgan"); //logs requests
import bodyParser from "body-parser";
const ideasRouter = require("./ideasRouter");
const app = express();
const port = process.env.PORT || 8080;
const router = express.Router();

app.use(helmet());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong");
});

app.use("/api", ideasRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
