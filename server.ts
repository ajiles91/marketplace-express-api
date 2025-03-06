import express, { Application } from "express";
import Server from "./src/index";
import { db } from "./src/database";

const app: Application = express();
const server: Server = new Server(app);
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
    console.log(`Server initialized : ${server}`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
app.get("/", (req, res) => {
  res.send("Express Typescript on Vercel");
});

app.get("/ping", (req, res) => {
  res.send("pong 🏓");
});

app.set("db", db);
