import express, { Request, Response } from "express";
import cors from "cors";
const ideasRouter = require("./ideas-router");
const app = express();
const port = process.env.PORT || 8080;

require("dotenv").config();

// Express Middleware
const helmet = require("helmet"); // creates headers that protect from attacks (security)
const bodyParser = require("body-parser");
const morgan = require("morgan"); // logs requests

// db Connection w/ Heroku
const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

app.set("db", db);

// db Connection w/ localhost
// var db = require("knex")({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     user: "ajil",
//     password: "",
//     database: "marketplace-db",
//   },
// });

app.use(helmet());
app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(bodyParser.json());
app.use(morgan("combined")); // use 'tiny' or 'combined'
// app.use("/idea",ideasRouter, db);
app.use(ideasRouter);

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});

app.get("/ping", (_req: Request, res: Response) => {
  return res.send("pong 🏓");
});

app.listen(port, () => {
  return console.log(`Server is listening on ${port}`);
});
module.exports = app;
