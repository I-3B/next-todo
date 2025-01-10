# Next Todo

a production-ready full-stack Next.js 15 app.

## Stack

- [Next.js 15](https://nextjs.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [NextAuth.js](https://next-auth.js.org/)
- [Hono](https://hono.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Kysely](https://kysely.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Hook Form](https://react-hook-form.com/)
- [nuqs](https://nuqs.47ng.com/)
- [Zod](https://zod.dev/)

## Features

- Credentials Authentication.
- React Server Components, Server Actions.
- Client side fetching.
- REST API with OpenAPI documentation.
- Form state management and validation.
- Pagination and filtering with search params.

## Getting Started

### Prerequisites

- [Nodejs](https://nodejs.org/en/download) or [Bun](https://bun.sh/)
- [Docker Engine](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository
1. Install dependencies

   ```sh
   bun install
   ```

1. Add `.env` file:

   ```sh
    DATABASE_URL=postgres://postgres:password@localhost:5455/todo?sslmode=disable
    NEXTAUTH_URL=http://localhost:3018
    NEXTAUTH_SECRET=b1+gnCDiTjxv9lFnCrTmOAJxfi4R6T4YplkNq0zC0rd=
   ```

1. Start up the Docker database

   ```sh
   docker compose -f "docker-compose.yml" up -d
   ```

1. Run the database migrations

   ```sh
   make migrate
   ```

1. Run the development server

   ```sh
   bun dev
   ```

## Deployment

if you want to deploy this project to a serverless platform (e.g. Vercel) you need a serverless database provider. For this project, I'm using [Neon](https://neon.tech/docs) to host the database. If you're going to use Neon, you will just need to update `DATABASE_URL` env variable.
