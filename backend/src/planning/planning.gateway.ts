import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3005, { cors: { origin: '*' } })
export class PlanningGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('new connection', client.id);
    client.emit('connected', {
      message: 'You are connected to the WebSocket server!',
    });
  }
}
