import express, { Request, Response, Router } from "express";
const IdeaRepository = require("./IdeaRepository");
const ideasRouter: Router = express.Router();

console.log("the top of idearoute...");

ideasRouter.get("/api", (req: Request, res: Response) => {
  try {
    console.log("in the try block..");
    const ideas = IdeaRepository.getAllIdeas();
    res.send(ideas);
  } catch (error) {
    res.status(404).send({ error: "Unable to retrieve data" });
  }
});

ideasRouter.get("/api/idea/:id", async (req: Request, res: Response) => {
  try {
    const idea = IdeaRepository.getIdeabyId(req.params.id);
    res.send(idea);
  } catch (error) {
    res.status(404).send({ error: "Unable to retrieve data" });
  }
});
ideasRouter.patch("/api/idea/:id", async (req: Request, res: Response) => {
  try {
    const { claimed } = req.body;
    const newClaimedVariable = { claimed };
    const idea = IdeaRepository.updateClaimedVariable(
      req.params.id,
      newClaimedVariable
    );
    res.send(idea);
  } catch (error) {
    res.status(400).send({ error: "Unable to update data" });
  }
});
ideasRouter.post("/api/idea", async (req: Request, res: Response) => {
  try {
    const { ideaname, ideasummary, authorname, email, claimed, submitted } =
      req.body;
    const newIdea = {
      ideaname,
      ideasummary,
      authorname,
      email,
      claimed,
      submitted,
    };
    for (const [key, value] of Object.entries(newIdea)) {
      if (value == null) {
        return res.status(400).json({
          error: { message: `Missing '${key}' in submission` },
        });
      }
    }
    const idea = IdeaRepository.addNewIdea(req.app.get("db"), newIdea);
    res.status(201).send(idea);
  } catch (error) {
    res.status(404).send({ error: "Unable to update data" });
  }
});
module.exports = ideasRouter;
