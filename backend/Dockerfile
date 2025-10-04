
FROM node:18-alpine AS builder

WORKDIR /app


COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm && pnpm install --frozen-lockfile


COPY . .


RUN npx prisma generate
RUN pnpm run build


FROM node:18-alpine AS runner

WORKDIR /app


RUN npm install -g pm2

# Copy only necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pm2-config.json ./
COPY --from=builder /app/package.json ./


COPY ./scripts/wait-for-db.sh /usr/bin/wait-for-db.sh
COPY ./scripts/entrypoint.sh /usr/bin/entrypoint.sh
RUN chmod +x /usr/bin/wait-for-db.sh /usr/bin/entrypoint.sh


EXPOSE 3000

ENTRYPOINT ["/usr/bin/entrypoint.sh"]