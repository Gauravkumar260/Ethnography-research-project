# Getting Started in 5 Minutes

## Prerequisites
- Node.js 20+, Docker Desktop, Git

## First-time setup
1. Clone the repo
2. `cd server && cp .env.example .env.local`
3. `pnpm install`
4. `npx ts-node scripts/generate-keys.ts`  (generates your RS256 keys)
5. Fill in the remaining `.env.local` values (the script tells you which ones)
6. `docker compose up -d`  (starts MongoDB + Redis + your app)
7. `npm run seed:admin`  (creates test departments + admin user)
8. Visit http://localhost:3000/auth/login

## Test accounts (after seeding)
- Student: student@university.edu / TestPass123!
- Admin: admin@university.edu / AdminPass123!
- (MFA not enabled on test accounts)

## Useful commands
- `docker compose logs -f server`  → live app logs
- `localhost:8081`  → MongoDB browser (mongo-express)
- `npm run test`  → run all tests
- `npm run test:watch`  → tests in watch mode during development

## Auth system overview
Check [AUTH_ARCHITECTURE.md](./AUTH_ARCHITECTURE.md)

## Who to ask
- Auth questions → @senior-dev-username
- MongoDB questions → @senior-dev-username
- Deployment → @devops-username
