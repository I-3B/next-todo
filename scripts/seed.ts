import { db } from "@/services/db";
import dotenv from "dotenv";
import { sql } from "kysely";

dotenv.config();

async function resetDb() {
  await sql`
  DO
  $do$
  BEGIN
    EXECUTE
    (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' RESTART IDENTITY CASCADE'
      FROM pg_class
      WHERE relkind = 'r'  -- only tables
      AND relnamespace IN ('public'::regnamespace)
      AND oid::regclass::text NOT IN ('kysely_migration', 'kysely_migration_lock')
    );
  END
  $do$;
  `.execute(db);

  return true;
}

async function main() {
  await resetDb();

  console.log("======= Successfully repopulated =======");

  process.exit(0);
}

main();
