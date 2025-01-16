// import { Database } from "./types"; // this is the Database interface we defined earlier
// import { Pool } from "pg";
// import { Kysely, PostgresDialect } from "kysely";
// import "dotenv/config";

// const dialect = new PostgresDialect({
//   pool: new Pool({
//     connectionString: process.env.POSTGRES_URL,
//     database: process.env.PGDATABASE,
//     host: process.env.PGHOST,
//     user: process.env.PGUSER,
//     // port: 5434,
//     max: 50,
//   }),
// });

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
// export const db = new Kysely<Database>({
//   dialect,
// });

import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import ws from "ws";
import "dotenv/config";
import { Database } from "./types";

export const db = new Kysely<Database>({
  dialect: new NeonDialect({
    connectionString: process.env.DATABASE_URL,
    webSocketConstructor: ws,
  }),
});
