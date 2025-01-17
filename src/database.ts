import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import ws from "ws";
import "dotenv/config";
import { Database } from "./types";

export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: 5432,
    webSocketConstructor: ws,
    ssl: {
      rejectUnauthorized: false,
    },
  }),
});
