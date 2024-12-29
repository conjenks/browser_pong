export class Game {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.ball = { x: 400, y: 300, dx: 5, dy: 5 };
    this.paddle1Y = 260;
    this.paddle2Y = 260;
    this.score1 = 0;
    this.score2 = 0;
    this.status = 'waiting';
    this.gameInterval = null;
  }

  addPlayer(playerId) {
    if (this.players.length < 2) {
      this.players.push(playerId);
    }
  }

  removePlayer(playerId) {
    this.players = this.players.filter(id => id !== playerId);
    if (this.gameInterval) {
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    this.status = 'finished';
  }

  isReady() {
    return this.players.length === 2;
  }

  isEmpty() {
    return this.players.length === 0;
  }

  updatePaddlePosition(playerId, y) {
    if (playerId === this.players[0]) {
      this.paddle1Y = y;
    } else if (playerId === this.players[1]) {
      this.paddle2Y = y;
    }
  }

  start() {
    this.status = 'playing';
    this.gameInterval = setInterval(() => this.update(), 1000 / 60);
  }

  update() {
    // Update ball position
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    // Ball collision with top and bottom
    if (this.ball.y <= 0 || this.ball.y >= 600) {
      this.ball.dy *= -1;
    }

    // Ball collision with paddles
    if (this.ball.x <= 54 && this.ball.y >= this.paddle1Y && this.ball.y <= this.paddle1Y + 80) {
      this.ball.dx *= -1;
      this.ball.x = 55;
    }
    if (this.ball.x >= 746 && this.ball.y >= this.paddle2Y && this.ball.y <= this.paddle2Y + 80) {
      this.ball.dx *= -1;
      this.ball.x = 745;
    }

    // Score points
    if (this.ball.x <= 0) {
      this.score2++;
      this.resetBall();
    }
    if (this.ball.x >= 800) {
      this.score1++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball = {
      x: 400,
      y: 300,
      dx: (Math.random() > 0.5 ? 1 : -1) * 5,
      dy: (Math.random() * 2 - 1) * 5
    };
  }

  getState() {
    return {
      id: this.id,
      players: this.players,
      ball: this.ball,
      paddle_1_y: this.paddle1Y,
      paddle_2_y: this.paddle2Y,
      score1: this.score1,
      score2: this.score2,
      status: this.status
    };
  }
}