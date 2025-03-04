import { Application } from "express";
import homeRoutes from "./home.routes";
import ideasRoutes from "./ideas.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/api/idea", ideasRoutes);
  }
}
