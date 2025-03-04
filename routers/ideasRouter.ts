// import express, { NextFunction, Request, Response, Router } from "express";
// import { StatusCodes } from "http-status-codes";
// import * as IdeaController from "../controllers/ideaController";

// export const ideasRouter: Router = express.Router();

// ideasRouter.get(
//   "/",
//   async (
//     err: any,
//     req: Request,
//     res: Response,
//     Next: NextFunction
//   ): Promise<void> => {
//     try {
//       console.log("inside try");
//       const allIdeas = await IdeaController.getAllIdeas();
//       res.status(StatusCodes.OK).json({ allIdeas });
//     } catch {
//       console.log("inside catch");
//       res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ Error });
//     }
//   }
// );

// ideasRouter.get("/:id", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const stringNum = req.params.id;
//     const intNum = parseInt(stringNum, 10);
//     console.log("data type from postman: " + typeof req.params.id);
//     console.log("intNum type: " + typeof intNum);
//     const idea = await IdeaController.getIdeaById(intNum);
//     res.status(StatusCodes.OK).json({ idea });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });

// ideasRouter.patch("/:id", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { claimed } = req.body;
//     const newClaimedVariable = { claimed };
//     const stringNum = req.params.id;
//     const intNum = parseInt(stringNum, 10);
//     const claimedToggle = await IdeaController.updateClaimedVariable(
//       intNum,
//       newClaimedVariable
//     );

//     res.status(StatusCodes.OK).json({ claimedToggle });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });

// ideasRouter.post("/", async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { ideaname, ideasummary, authorname, email, claimed, submitted } =
//       req.body;
//     const newIdea = {
//       authorname,
//       claimed,
//       email,
//       ideaname,
//       ideasummary,
//       submitted,
//     };
//     for (const [key, value] of Object.entries(newIdea)) {
//       if (value == null) {
//         res.status(400).json({
//           error: { message: `Missing '${key}' in submission` },
//         });
//       }
//     }
//     const create = await IdeaController.createNewIdea(newIdea);
//     res.status(StatusCodes.CREATED).json({ create });
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error });
//   }
// });

// module.exports = ideasRouter;
