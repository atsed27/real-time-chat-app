# Real-Time Chat App

A full-stack **real-time chat application** built using **NestJS**, **React**, **Socket.IO**, and **Prisma ORM**.  
It supports **real-time communication across multiple instances** using Redis and is deployable with **PM2** and **Docker**.

---

## 🚀 Features

- Real-time messaging with Socket.IO  
- Scalable with PM2 cluster mode  
- Prisma ORM with PostgreSQL or SQLite  
- Redis adapter for multi-instance sync  
- Dockerized for easy deployment  
- Clean architecture using NestJS  

---

## 🛠️ Tech Stack

**Backend:** NestJS, Socket.IO, Prisma, Redis, PM2  
**Frontend:** React + Vite + Socket.IO Client  
**Database:** PostgreSQL or SQLite  
**Deployment:** Docker, PM2  

---

## 📦 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/atsed27/real-time-chat-app.git
cd real-time-chat-app


cd backend

# Install dependencies
pnpm install

# Create .env file (if not exists)
cat <<EOT >> .env
DATABASE_URL="postgresql://user:password@localhost:5432/chat_db?schema=public"
REDIS_HOST="localhost"
REDIS_PORT=6379
PORT=3000
EOT

# Run Prisma migrations
pnpm prisma migrate dev --name init

# build first
pnpm run build

# Start backend (cluster mode) using pm2-config.json
pm2 start pm2-config.json

# List running PM2 processes
pm2 list

# View logs for your backend
pm2 logs chat-backend

# Stop the backend process by name
pm2 stop chat-backend

# Delete the backend process from PM2
pm2 delete chat-backend





cd ../frontend

# Install dependencies
pnpm install


# Run in development mode
pnpm run dev

# Build for production
pnpm run build



# Start all services
docker compose up -d --build

# Stop all services
docker compose down
