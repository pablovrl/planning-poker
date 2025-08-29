import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CreateRoomDto } from './dto/create-room.dto';
import { PlanningService } from './planning.service';
import { JoinRoomDto } from './dto/join-room.dto';

@WebSocketGateway(3005, { cors: { origin: '*' } })
export class PlanningGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  constructor(private readonly planningService: PlanningService) {}

  handleConnection(client: Socket) {
    console.log('new connection', client.id);
  }

  @SubscribeMessage('createRoom')
  createRoom(client: Socket, createRoomDto: CreateRoomDto) {
    const room = this.planningService.createRoom(createRoomDto.name, client.id);
    client.emit('roomCreated', room);
  }

  @SubscribeMessage('joinRoom')
  async joinRoom(client: Socket, joinRoomDto: JoinRoomDto) {
    const room = this.planningService.joinRoom(
      joinRoomDto.roomId,
      joinRoomDto.username,
      client.id,
    );

    if (!room) {
      client.emit('error', { message: 'Room not found' });
      return;
    }

    await client.join(room.id);
    client.emit('roomJoined', room);
    client.to(room.id).emit('playerJoined', room.players);
  }
}
