import express from "express";
const IdeaRepository = require("./IdeaRepository");

const ideasRouter = express.Router();
const jsonParser = express.json();

ideasRouter.get("/api", async (req, res) => {
  try {
    const ideas = IdeaRepository.getAllIdeas();
    res.json(ideas);
  } catch (error) {
    res.status(404).send({ error: "Unable to retrieve data" });
  }
});

ideasRouter.get("/api/idea/:id", async (req, res) => {
  try {
    const idea = IdeaRepository.getIdeabyId(req.params.id);
    res.json(idea);
  } catch (error) {
    res.status(404).send({ error: "Unable to retrieve data" });
  }
});
ideasRouter.patch("/api/idea/:id", async (req, res) => {
  try {
    const { claimed } = req.body;
    const newClaimedVariable = { claimed };
    const idea = IdeaRepository.updateClaimedVariable(
      req.params.id,
      newClaimedVariable
    );
    res.json(idea);
  } catch (error) {
    res.status(400).send({ error: "Unable to update data" });
  }
});
ideasRouter.post("/api/idea", async (req, res) => {
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
    res.status(201).json(idea);
  } catch (error) {
    res.status(404).send({ error: "Unable to update data" });
  }
});

module.exports = ideasRouter;
