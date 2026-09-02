# -------------------------
# Base
# -------------------------
FROM node:24-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app


# -------------------------
# Builder
# -------------------------
FROM base AS builder
ARG DATABASE_URI
COPY . .
RUN pnpm install --frozen-lockfile
RUN DATABASE_URI="$DATABASE_URI" \
    pnpm --filter @exore/api exec prisma generate
RUN pnpm --filter @exore/api build


# -------------------------
# Production dependencies
# -------------------------
FROM base AS prod-deps
COPY . .
RUN pnpm install \
    --frozen-lockfile \
    --prod \
    --filter @exore/api...


# -------------------------
# Runner
# -------------------------
FROM base AS runner

ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates openssl \
    && rm -rf /var/lib/apt/lists/*

COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=prod-deps /app/apps/api/node_modules ./apps/api/node_modules

COPY --from=builder /app/apps/api/dist ./apps/api/dist

COPY --from=builder /app/apps/api/prisma ./apps/api/prisma
COPY --from=builder /app/apps/api/prisma.config.ts ./apps/api/prisma.config.ts
COPY --from=builder /app/apps/api/package.json ./apps/api/package.json

WORKDIR /app/apps/api

RUN node node_modules/playwright/cli.js install --with-deps chromium \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 4001

CMD ["node", "dist/src/main.js"]