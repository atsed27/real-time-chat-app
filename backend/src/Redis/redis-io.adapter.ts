// src/redis-io.adapter.ts
import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { createClient } from 'redis';

export class RedisIoAdapter extends IoAdapter {
  private adapter: ReturnType<typeof createAdapter>;

  constructor(app: any) {
    super(app);
  }

  async connectToRedis(): Promise<void> {
    const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
    const REDIS_PORT = process.env.REDIS_PORT || '6379';
    const redisUrl = `redis://${REDIS_HOST}:${REDIS_PORT}`;

    console.log(`Connecting to redis at: ${redisUrl}`);

    const pubClient = createClient({ url: redisUrl });
    const subClient = pubClient.duplicate();

    await pubClient.connect();
    await subClient.connect();

    this.adapter = createAdapter(pubClient, subClient);
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);

    server.adapter(this.adapter);

    return server;
  }
}
