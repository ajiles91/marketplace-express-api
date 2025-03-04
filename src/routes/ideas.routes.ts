import { Router } from "express";
import IdeasController from "../controllers/ideas.controller";

class IdeasRoutes {
  router = Router();
  controller = new IdeasController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Idea
    this.router.post("/", this.controller.createIdea);

    // Retrieve all Ideas
    this.router.get("/", this.controller.grabAll);

    // Retrieve a single Tutorial with id
    this.router.get("/:id", this.controller.grabOne);

    // Update a Idea to claim or unclaimed
    this.router.patch("/:id", this.controller.claimedToggle);
  }
}

export default new IdeasRoutes().router;
