import { Player } from './player.entity';

export interface Room {
  id: string;
  name: string;
  creatorId: string;
  createdAt: Date;
  players: Player[];
  state: 'voting' | 'revealed';
}
