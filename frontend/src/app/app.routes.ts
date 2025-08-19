import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NewGame } from './pages/new-game/new-game';
import { Board } from './pages/board/board';

export const routes: Routes = [
  {path: '', component: Home},
  {path: 'new-game', component: NewGame},
  {path: ':id', component: Board},
];
