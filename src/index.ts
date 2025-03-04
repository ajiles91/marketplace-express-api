import cors, { CorsOptions } from "cors";
import "dotenv/config";
import express, { Application } from "express";
import helmet from "helmet"; // creates headers for security attacks
import morgan from "morgan"; // logs requests
import Routes from "./routes";

export default class Server {
  constructor(app: Application) {
    this.config(app);
    new Routes(app);
  }
  private config(app: Application): void {
    const corsOptions: CorsOptions = {
      origin: "http://localhost:8081",
    };
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan("combined"));
    app.use(helmet());
    app.use(cors(corsOptions));
  }
}
