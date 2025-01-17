import express, { Request, Response } from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet"; //creates headers for security attacks
const morgan = require("morgan"); //logs requests
const ideasRouter = require("./ideas-router");
const app = express();
const port = process.env.PORT || 8080;
const bodyParser = require("body-parser");

app.use(helmet());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(bodyParser.json());
app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.use("api/", ideasRouter);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
module.exports = app;
