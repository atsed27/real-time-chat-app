import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

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
    @MessageBody() data: { sender: string; content: string },
  ) {
    this.server.emit('receive_message', data);
  }
}
