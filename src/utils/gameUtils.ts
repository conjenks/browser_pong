import { v4 as uuidv4 } from 'uuid';
import { GameState } from '../types/game';

export const INITIAL_GAME_STATE: GameState = {
  id: '',
  player1: null,
  player2: null,
  ball: { x: 400, y: 300, dx: 5, dy: 5 },
  paddle_1_y: 260,
  paddle_2_y: 260,
  score1: 0,
  score2: 0,
  status: 'waiting',
};

export const createNewGame = (playerId: string): GameState => ({
  ...INITIAL_GAME_STATE,
  id: uuidv4(),
  player1: playerId,
});