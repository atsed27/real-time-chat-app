import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from 'src/prisma/prisma.service';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private prisma: PrismaService) {}

  handleConnection(client: Socket, ...args: any[]) {
    console.log('new connect id is:', client.id);
    client.broadcast.emit('join-user', {
      message: `new user is connect id is ${client.id}`,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('disconnect user id', client?.id);
    client.broadcast.emit('left-user', {
      message: ` user is left grop id is ${client.id}`,
    });
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @MessageBody() body: { username: string; text: string }, // corrected type
  ) {
    const data: { username: string; text: string } = JSON.parse(body as any);

    if (!data.username) return;
    console.log('Looking for user:', data.username);
    let user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: { username: data.username },
      });
    }

    // Save message
    const message = await this.prisma.message.create({
      data: { text: data.text, userId: user.id },
      include: { user: true },
    });

    // Broadcast to everyone (group chat)
    this.server.emit('receive_message', {
      id: message.id,
      text: message.text,
      username: message.user.username,
      createdAt: message.createdAt,
    });
  }
}
