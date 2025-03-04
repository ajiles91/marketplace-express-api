// database structure to ensure strong correct typing
import { GeneratedAlways, Insertable, Selectable, Updateable } from "kysely";

export interface IDatabase {
  ideas: IIdeasTable;
}

export interface IIdeasTable {
  id: GeneratedAlways<number>;
  ideaName: string;
  ideaSummary: string;
  authorName: string;
  email: string;
  claimed: boolean;
  submitted: boolean;
}

export type Idea = Selectable<IIdeasTable>;
export type NewIdea = Insertable<IIdeasTable>;
export type IdeaUpdate = Updateable<IIdeasTable>;
export type VariableUpdate = Updateable<IIdeasTable>;
