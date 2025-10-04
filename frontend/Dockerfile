# Stage 1: Build the React application
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

# Build the app.
RUN pnpm run build

FROM node:18-alpine AS runner

WORKDIR /app

RUN npm install -g serve


COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json


EXPOSE 5000


CMD ["serve", "-s", "dist", "-l", "5000"]
