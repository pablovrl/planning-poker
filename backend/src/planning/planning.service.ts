import { Injectable } from '@nestjs/common';
import { Room } from './entities/room.entity';
import { v4 as uuidv4 } from 'uuid';
import { Player } from './entities/player.entity';

@Injectable()
export class PlanningService {
  private rooms: Room[] = [];

  createRoom(name: string, username: string, creatorId: string): Room {
    const creator = this.createPlayer(username, creatorId);
    const room: Room = {
      id: uuidv4(),
      name,
      creatorId,
      createdAt: new Date(),
      players: [creator],
      state: 'voting',
    };

    this.rooms.push(room);
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
