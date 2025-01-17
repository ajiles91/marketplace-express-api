//database structure to ensure strong correct typing
import { GeneratedAlways, Insertable, Selectable, Updateable } from "kysely";

export interface Database {
  ideas: IdeasTable;
}

export interface IdeasTable {
  id: GeneratedAlways<number>;
  ideaName: string;
  ideaSummary: string;
  authorName: string;
  email: string;
  claimed: boolean;
  submitted: boolean;
}

export type Idea = Selectable<IdeasTable>;
export type NewIdea = Insertable<IdeasTable>;
export type IdeaUpdate = Updateable<IdeasTable>;
export type VariableUpdate = Updateable<IdeasTable>;
