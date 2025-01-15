import { db } from "./database";
import { VariableUpdate, IdeaUpdate, Idea, NewIdea } from "./types";

export async function getIdeaById(id: number) {
  return await db
    .selectFrom("idea")
    .where("id", "=", id)
    .selectAll()
    .executeTakeFirst();
}

export async function getAllIdeas() {
  return await db.selectFrom("idea").selectAll();
}
export async function updateIdea(id: number, updateWith: IdeaUpdate) {
  return await db
    .updateTable("idea")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function updateClaimedVariable(
  id: number,
  updateWith: VariableUpdate
) {
  return await db
    .updateTable("idea")
    .set(updateWith)
    .where("id", "=", id)
    .execute();
}

export async function createNewIdea(idea: NewIdea) {
  return await db
    .insertInto("idea")
    .values(idea)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function deleteIdea(id: number) {
  return await db
    .deleteFrom("idea")
    .where("id", "=", id)
    .returningAll()
    .executeTakeFirst();
}
