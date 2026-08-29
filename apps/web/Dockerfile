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
COPY . .
RUN pnpm install --frozen-lockfile

# NEXT_PUBLIC_* встраиваются в клиентский bundle
# во время next build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN pnpm --filter ./apps/web build


# -------------------------
# Runner
# -------------------------
FROM node:24-bookworm-slim AS runner

ENV NODE_ENV=production
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

WORKDIR /app

# Запускаем не от root
RUN groupadd --system --gid 1001 nodejs \
    && useradd --system --uid 1001 --gid nodejs nextjs

# Standalone server + необходимые production dependencies
COPY --from=builder --chown=nextjs:nodejs \
    /app/apps/web/.next/standalone ./

# Статические файлы Next
COPY --from=builder --chown=nextjs:nodejs \
    /app/apps/web/.next/static ./apps/web/.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "apps/web/server.js"]