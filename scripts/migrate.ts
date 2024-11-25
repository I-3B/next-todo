import dotenv from "dotenv";
import { FileMigrationProvider, Kysely, Migrator, PostgresDialect } from "kysely";
import { run } from "kysely-migration-cli";
import { promises as fs } from "node:fs";
import * as path from "node:path";
import pg from "pg";

dotenv.config();
const migrationFolder = path.join(__dirname, "../services/db/migrations");

const db = new Kysely<any>({
  dialect: new PostgresDialect({
    pool: new pg.Pool({
      host: process.env.DB_HOST,
      password: process.env.DB_PASSWORD,
      user: process.env.DB_USER,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
    }),
  }),
});

const migrator = new Migrator({
  db,
  provider: new FileMigrationProvider({
    fs,
    path,
    migrationFolder,
  }),
});

run(db, migrator, migrationFolder);
