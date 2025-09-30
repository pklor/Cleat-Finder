Define coding workflow

1) Summary (read this first)

P1 & P2: Build and run everything locally (client + Express API). Use Supabase (cloud) for Postgres + Auth. Push to GitHub daily for backup & instructor visibility.

P3: Deploy the client to AWS Amplify and the API to AWS Lambda (serverless-http wrapper)

2) Git & Branching

Main workflow:

main = stable, production-ready.

Short-lived feature branches allowed: feature/<short>, bugfix/<short>.

Merge back to main with PRs.

Commit frequency: Commit early/often (aim: 5–10 commits per week).

Tag milestones:

v0.1-proto1, v0.2-proto2, v1.0-proto3.

Remote rule: Push at least once per work session (end of day).

3) Repo Layout
/client/     # React (Vite, PWA)
/api/        # Express API (Node)
/supabase/   # SQL migrations + seeds (optional)
/docs/       # PRD, task list, site map, deployment notes
README.md
.gitignore   # must exclude node_modules/, .env, .DS_Store, build artifacts

4) Environments and Secrets
.env.example files required in /client and /api.

Real .env must never be committed.

/client/.env.example
VITE_API_URL=http://localhost:3000/api/v1
VITE_SUPABASE_URL=<public-supabase-url>
VITE_SUPABASE_ANON_KEY=<public-anon-key>

/api/.env.example
PORT=3000
SUPABASE_URL=<supabase-url>
SUPABASE_SERVICE_KEY=<service-role-key>
JWT_SECRET=dev-secret

Rules:

Client may only use VITE_* public keys.

All CRUD goes through the API; client never uses service keys.

5) Local Development

Scripts (recommended):

/client

npm run dev → local dev server

npm run lint, npm test

/api

npm run dev → nodemon on port 3000

npm run lint, npm test

Health check:

API: GET http://localhost:3000/api/v1/health → { "status": "ok" }

Client: loads and calls /api/players without CORS errors

6) API Design

Base path: /api/v1

Resources: /players, /clubs, /favorites, /forum, /learn, /updates

Methods: GET, POST, PUT, DELETE

Pagination & filters supported via query params (e.g., ?page=1&limit=20)

7) Testing and Quality
API: Jest + supertest for endpoints (happy path, validation, auth).

Client: smoke tests for key views.

Linting: ESLint + Prettier in both /client and /api.

Coverage target: ~60% lines (soft goal).

8) Documentation

Keep these updated:

/docs/PRD.md – high-level scope & requirements

/docs/task_list.md – user stories broken into tasks

/docs/site_map.png – boxes + arrows only (hierarchical)

/docs/DEPLOYMENT.md – deployment notes

Per feature:

Link user story

Acceptance criteria

Sample cURL/Postman JSON

9) Logging & Observability

API: use morgan in dev.

Central error handler returns JSON error shape (no stack traces to client).

Include traceId in error responses for debugging.

10) Supabase Rules

Use Supabase for Postgres + Auth.

API (server) holds service role key. Client only uses anon key.

Row-Level Security (RLS) must be enabled:

profiles: users can update only their own row.

favorites, follows, posts, submissions: insert/update/delete only where user_id = auth.uid().

11) Instructor Visibility

Push daily so commit history shows progress.

README.md must include:

how to run locally

known issues

endpoint checklist with status

Screenshots or GIFs for UI in /docs/.

Example cURL for each API route.

12) Prototype Milestones

Prototype 1 – Scaffolding (local only)

Repo created, env configured, Express API skeleton running.

Core read endpoints live (GET /players, GET /clubs).

Client loads list/profile from API.

OpenAPI outline + site map included.

Prototype 2 – Page Building (local only)

Write endpoints: POST /favorites, POST /forum/posts.

Update profile endpoint.

Jest tests passing for API.

Prototype 3 – Deploying

Client → AWS Amplify (connected to GitHub main).

API → AWS Lambda (serverless-http).

CORS configured to Amplify domain.

/docs/DEPLOYMENT.md updated with build settings + env vars.

13) Definition of Ready (DoR)

A task is ready when:

Story + acceptance criteria are clear

API path + sample request/response drafted

UI component(s) identified

Basic tests listed

14) Definition of Done (DoD)

A task is done when:

Code + minimal tests written and pass locally

Docs (OpenAPI + README + cURL examples) updated

Committed & pushed to GitHub

Demoed locally (screenshot or short gif in /docs/)

15) Naming Conventions

Files & docs: UPPERCASE_WITH_UNDERSCORES (e.g., TASKLIST.md, PRD.md, PLAYER_SERVICE.ts)

Variables: snake_case (e.g., player_name, favorite_count)

Functions: camelCase starting with a verb (e.g., getRandom, fetch_player_data)

Classes & Components: PascalCase (e.g., PlayerCard, ForumThread)

Database tables: snake_case (e.g., player_careers, quiz_submissions)

Branches: feature/<short-description> (e.g., feature/player_search)

