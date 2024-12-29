import { v4 as uuidv4 } from 'uuid';
import { Game } from './game.js';

export class GameManager {
  constructor() {
    this.games = new Map();
    this.playerGameMap = new Map();
  }

  joinGame(playerId) {
    // First, check if player is already in a game
    if (this.playerGameMap.has(playerId)) {
      return this.games.get(this.playerGameMap.get(playerId));
    }

    // Look for an available game
    let game = [...this.games.values()].find(g => !g.isReady());
    
    if (!game) {
      // Create new game if no available game found
      game = new Game(uuidv4());
      this.games.set(game.id, game);
    }

    game.addPlayer(playerId);
    this.playerGameMap.set(playerId, game.id);
    
    return game;
  }

  getGameByPlayerId(playerId) {
    const gameId = this.playerGameMap.get(playerId);
    return gameId ? this.games.get(gameId) : null;
  }

  handleDisconnect(playerId) {
    const gameId = this.playerGameMap.get(playerId);
    if (gameId) {
      const game = this.games.get(gameId);
      if (game) {
        game.removePlayer(playerId);
        if (game.isEmpty()) {
          this.games.delete(gameId);
        }
      }
      this.playerGameMap.delete(playerId);
    }
  }
}