FROM node:20-alpine AS builder
WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma generate

RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/next.config.ts ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/eslint.config.mjs ./
COPY --from=builder /app/tsconfig.json ./

COPY --from=builder /app/.env.example ./.env.example

EXPOSE 3000

CMD ["pnpm", "start"] 