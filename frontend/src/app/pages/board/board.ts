import { Component } from '@angular/core';
import { Card } from '../../components/card/card';
import { Player } from '../../models/player.model';

@Component({
  selector: 'app-board',
  imports: [Card],
  templateUrl: './board.html',
  styleUrl: './board.scss'
})
export class Board {
  cardValues = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];
  selectedCard: number | null = null;
  players: Player[] = [
    { id: 'player1', name: 'Player 1aaaaaaaaaaaaaaa', selectedCard: null },
    { id: 'player2', name: 'Player 2', selectedCard: null },
    { id: 'player3', name: 'Player 3', selectedCard: null }
  ];

  selectCard(value: number): void {
    this.selectedCard = this.selectedCard === value ? null : value;
  }
}
