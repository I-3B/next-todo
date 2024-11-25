schema:
	bun x kysely-codegen --out-file ./services/db/schema.ts --schema "public"

migrate:
	bun scripts/migrate.ts latest && make schema

migrate-up:
	bun scripts/migrate.ts up && make schema

migrate-down:
	bun scripts/migrate.ts down && make schema

migrate-create:
	bun scripts/migrate.ts create $(name)

seed:
	bun scripts/populate.ts