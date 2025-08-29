import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { v4 as uuidv4 } from 'uuid';
import { Player } from './entities/player.entity';

@Injectable()
export class PlanningService {
  private rooms: Room[] = [];

  createRoom(name: string, creatorId: string): Room {
    const room: Room = {
      id: uuidv4(),
      name,
      creatorId,
      createdAt: new Date(),
      players: [],
      state: 'voting',
    };

    this.rooms.push(room);
    return room;
  }

  joinRoom(roomId: string, username: string, clientId: string): Room | null {
    const newPlayer = this.createPlayer(username, clientId);

    const room = this.rooms.find((room) => room.id === roomId);
    if (!room) return null;

    room.players.push(newPlayer);
    return room;
  }

  createPlayer(username: string, clientId: string): Player {
    return {
      id: clientId,
      username,
      cardSelected: null,
    };
  }
}
