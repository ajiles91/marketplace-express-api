import "dotenv/config";
import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import ws from "ws";
import { IDatabase } from "../models/ideasModel";

export const db = new Kysely<IDatabase>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    password: process.env.PGPASSWORD,
    port: 5432,
    ssl: {
      rejectUnauthorized: false,
    },
    user: process.env.PGUSER,
    webSocketConstructor: ws,
  }),
});
