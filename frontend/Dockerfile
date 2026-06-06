# ── Stage 1: build ──────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build args get baked into the Next.js bundle at build time
ARG NEXT_PUBLIC_NEST_URL
ENV NEXT_PUBLIC_NEST_URL=$NEXT_PUBLIC_NEST_URL

RUN npm run build

# ── Stage 2: run ────────────────────────────────────────────
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]