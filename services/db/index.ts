import { KyselyAuth } from "@auth/kysely-adapter";
import { CamelCasePlugin, PostgresDialect } from "kysely";

import { NeonDialect } from "kysely-neon";
import { Pool } from "pg";
import { DB } from "./schema";
export type Codegen = {
  [K in keyof DB]: { [J in keyof DB[K]]: unknown };
};
export const dbDialect = process.env.DATABASE_URL?.includes("localhost")
  ? new PostgresDialect({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    })
  : new NeonDialect({
      connectionString: process.env.DATABASE_URL,
    });

export const db = new KyselyAuth<DB, Codegen>({
  dialect: dbDialect,
  plugins: [new CamelCasePlugin()],
});
