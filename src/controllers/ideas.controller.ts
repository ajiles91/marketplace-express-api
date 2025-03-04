import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as IdeaSQLCalls from "./ideas.sql";

export default class IdeasController {
  async grabAll(req: Request, res: Response) {
    try {
      console.log("inside try");
      const allIdeas = IdeaSQLCalls.getAllIdeas();
      res.status(StatusCodes.OK).json({ allIdeas });
    } catch {
      console.log("inside catch");
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error });
    }
  }

  async grabOne(req: Request, res: Response) {
    try {
      const stringNum = req.params.id;
      const intNum = parseInt(stringNum, 10);
      console.log("data type from postman: " + typeof req.params.id);
      console.log("intNum type: " + typeof intNum);
      const idea = IdeaSQLCalls.getIdeaById(intNum);
      res.status(StatusCodes.OK).json({ idea });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  async claimedToggle(req: Request, res: Response) {
    try {
      const { claimed } = req.body;
      const newClaimedVariable = { claimed };
      const stringNum = req.params.id;
      const intNum = parseInt(stringNum, 10);
      const claimedToggle = IdeaSQLCalls.updateClaimedVariable(
        intNum,
        newClaimedVariable
      );

      res.status(StatusCodes.OK).json({ claimedToggle });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  async createIdea(req: Request, res: Response) {
    try {
      const { ideaname, ideasummary, authorname, email, claimed, submitted } =
        req.body;
      const newIdea = {
        authorname,
        claimed,
        email,
        ideaname,
        ideasummary,
        submitted,
      };
      for (const [key, value] of Object.entries(newIdea)) {
        if (value == null) {
          res.status(400).json({
            error: { message: `Missing '${key}' in submission` },
          });
        }
      }
      const create = IdeaSQLCalls.createNewIdea(newIdea);
      res.status(StatusCodes.CREATED).json({ create });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
    }
  }
}
