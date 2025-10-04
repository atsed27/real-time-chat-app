import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ChatGateway, PrismaService],
})
export class ChatModule {}
