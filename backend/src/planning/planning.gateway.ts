import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateRoomDto } from './dto/create-room.dto';
import { PlanningService } from './planning.service';

@WebSocketGateway(3005, { cors: { origin: '*' } })
export class PlanningGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly planningService: PlanningService) {}

  handleConnection(client: Socket) {
    console.log('new connection', client.id);
    client.emit('connected', {
      message: 'You are connected to the WebSocket server!',
    });
  }

  @SubscribeMessage('createRoom')
  async createRoom(client: Socket, createRoomDto: CreateRoomDto) {
    const room = this.planningService.createRoom(
      createRoomDto.name,
      createRoomDto.username,
      client.id,
    );

    await client.join(room.id);
  }
}
