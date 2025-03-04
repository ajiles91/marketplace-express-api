import { Request, Response } from "express";

export function welcomeMsg(req: Request, res: Response) {
  res.json({ message: "Welcome to the application." });
}
