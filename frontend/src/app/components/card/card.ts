import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class Card {
  @Input({ required: true }) value!: number | null;
  @Input() selected: boolean = false;
  @Input() selectable: boolean = true;
}
