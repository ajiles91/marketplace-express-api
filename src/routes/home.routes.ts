import { Router } from "express";
import { welcomeMsg } from "../controllers/home.controller";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/", welcomeMsg);
  }
}

export default new HomeRoutes().router;
