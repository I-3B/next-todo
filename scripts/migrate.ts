import { dbDialect } from "@/services/db";
import dotenv from "dotenv";
import { FileMigrationProvider, Kysely, Migrator } from "kysely";
import { run } from "kysely-migration-cli";
import { promises as fs } from "node:fs";
import * as path from "node:path";

dotenv.config();
const migrationFolder = path.join(__dirname, "../services/db/migrations");

const db = new Kysely<any>({
  dialect: dbDialect,
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
