#!/bin/sh


/usr/bin/wait-for-db.sh


echo "Running Prisma Migrations..."
npx prisma migrate deploy

# Start the application using PM2 config
echo "Starting application with PM2..."
pm2-runtime start pm2-config.json --env production