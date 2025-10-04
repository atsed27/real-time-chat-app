#!/bin/sh
# wait for db.sh

set -e

host="postgres"
port="5432"

echo "Waiting for PostgreSQL at $host:$port..."

while ! nc -z $host $port; do
  sleep 1
done

echo "PostgreSQL started."