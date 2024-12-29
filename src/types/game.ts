export interface GameState {
  id: string;
  players: string[];
  ball: {
    x: number;
    y: number;
    dx: number;
    dy: number;
  };
  paddle_1_y: number;
  paddle_2_y: number;
  score1: number;
  score2: number;
  status: 'waiting' | 'playing' | 'finished';
}