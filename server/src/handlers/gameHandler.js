import { GameManager } from '../services/gameManager.js';
import { WebSocketManager } from '../services/webSocketManager.js';

const gameManager = new GameManager();
const wsManager = new WebSocketManager();

export const onJoinGame = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const game = gameManager.joinGame(connectionId);
  
  if (game.isReady()) {
    await wsManager.broadcastToGame(game.id, {
      action: 'gameStart',
      data: game.getState()
    });
    game.start();
  } else {
    await wsManager.sendToConnection(connectionId, {
      action: 'waiting'
    });
  }
  
  return { statusCode: 200 };
};

export const onPaddleMove = async (event) => {
  const connectionId = event.requestContext.connectionId;
  const { y } = JSON.parse(event.body);
  
  const game = gameManager.getGameByPlayerId(connectionId);
  if (game) {
    game.updatePaddlePosition(connectionId, y);
    await wsManager.broadcastToGame(game.id, {
      action: 'gameState',
      data: game.getState()
    });
  }
  
  return { statusCode: 200 };
};