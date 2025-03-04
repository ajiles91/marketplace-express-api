import { IdeaUpdate, NewIdea, VariableUpdate } from "../../models/ideasModel";
import { db } from "../../src/database";
console.log("top of ideaController");

export default class IdeaSQLCalls {
  async getIdeaById(id: number) {
    console.log("in getById call" + id);
    return await db
      .selectFrom("ideas")
      .where("id", "=", id)
      .selectAll()
      .executeTakeFirst();
  }

  async getAllIdeas() {
    console.log("in getAllIdeas call");
    return await db.selectFrom("ideas").selectAll().execute();
  }

  async updateIdea(id: number, updateWith: IdeaUpdate) {
    return await db
      .updateTable("ideas")
      .set(updateWith)
      .where("id", "=", id)
      .executeTakeFirst();
  }

  async updateClaimedVariable(id: number, updateWith: VariableUpdate) {
    return await db
      .updateTable("ideas")
      .set(updateWith)
      .where("id", "=", id)
      .execute();
  }

  async createNewIdea(idea: NewIdea) {
    return await db
      .insertInto("ideas")
      .values(idea)
      .returningAll()
      .executeTakeFirstOrThrow();
  }

  async deleteIdea(id: number) {
    return await db
      .deleteFrom("ideas")
      .where("id", "=", id)
      .returningAll()
      .executeTakeFirst();
  }
}
export function getAllIdeas() {
  throw new Error("Function not implemented.");
}
export function getIdeaById(intNum: number) {
  throw new Error("Function not implemented.");
}

export function updateClaimedVariable(
  intNum: number,
  newClaimedVariable: { claimed: any }
) {
  throw new Error("Function not implemented.");
}
export function createNewIdea(newIdea: {
  authorname: any;
  claimed: any;
  email: any;
  ideaname: any;
  ideasummary: any;
  submitted: any;
}) {
  throw new Error("Function not implemented.");
}
