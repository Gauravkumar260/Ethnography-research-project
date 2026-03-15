# Backend Production Build
FROM node:20-alpine AS deps
WORKDIR /app
# Install dependencies needed for node-gyp (argon2, bcryptjs)
RUN apk add --no-cache python3 make g++ 
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm && pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Don't run as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 expressjs
USER expressjs

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
# Include server.js shim if needed, or just run from dist
COPY --from=builder /app/server.js ./server.js

EXPOSE 5000
ENV PORT=5000

CMD ["node", "dist/server.js"]
