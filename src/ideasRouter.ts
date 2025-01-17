import express, { NextFunction, Request, Response, Router } from "express";
import { Idea } from "./types";
const IdeaRepository = require("./IdeaRepository");
const ideasRouter: Router = express.Router();
const jsonParser = express.json();

ideasRouter.route("/api").get((req, res, next) => {
  const knexInstance = req.app.get("db");
  IdeaRepository.getAllIdeas(knexInstance)
    .then((ideas: Idea) => {
      res.json(ideas);
    })
    .catch(next);
});

ideasRouter
  .route("/api/idea/:id")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    IdeaRepository.getIdeaById(knexInstance, req.params.id)
      .then((idea: Idea) => {
        res.json(idea);
      })
      .catch(next);
  })

  .patch(
    jsonParser,
    (err: Error, req: Request, res: Response, next: NextFunction) => {
      const { claimed } = req.body;
      const newClaimedVariable = { claimed };
      const knexInstance = req.app.get("db");
      IdeaRepository.updateClaimedVariable(
        knexInstance,
        req.params.id,
        newClaimedVariable
      )
        .then((idea: Idea) => {
          res.json(idea);
        })
        .catch((err: Error) => {
          res.status(400).send({ error: "Unable to update data" });
        });
    }
  );

ideasRouter.route("/api/idea").post(jsonParser, (req, res, next) => {
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

  IdeaRepository.addNewIdea(req.app.get("db"), newIdea)
    .then((idea: Idea) => {
      res.status(201).json(idea);
    })
    .catch(next);
});

module.exports = ideasRouter;
