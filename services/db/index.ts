import { KyselyAuth } from "@auth/kysely-adapter";
import { CamelCasePlugin, PostgresDialect } from "kysely";
import { Pool } from "pg";
import { DB } from "./schema";
export type Codegen = {
  [K in keyof DB]: { [J in keyof DB[K]]: unknown };
};
export const db = new KyselyAuth<DB, Codegen>({
  dialect: new PostgresDialect({
    pool: new Pool({
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
    }),
  }),
  plugins: [new CamelCasePlugin()],
});
