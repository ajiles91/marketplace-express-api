import { db } from "./database";
import { VariableUpdate, IdeaUpdate, NewIdea } from "./types";
console.log("top of ideaRepo");

export async function getIdeaById(id: number) {
  return await db
    .selectFrom("ideas")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function getAllIdeas() {
  console.log("in all ideas call");
  return await db.selectFrom("ideas").selectAll().execute();
}

export async function updateIdea(id: number, updateWith: IdeaUpdate) {
  return await db
    .updateTable("ideas")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function updateClaimedVariable(
  id: number,
  updateWith: VariableUpdate
) {
  return await db
    .updateTable("ideas")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createNewIdea(idea: NewIdea) {
  return await db
    .insertInto("ideas")
    .values(idea)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteIdea(id: number) {
  return await db
    .deleteFrom("ideas")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
