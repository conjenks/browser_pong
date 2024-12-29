import { GameManager } from '../services/gameManager.js';
import { WebSocketManager } from '../services/webSocketManager.js';

const gameManager = new GameManager();
const wsManager = new WebSocketManager();

export const onConnect = async (event) => {
  const connectionId = event.requestContext.connectionId;
  await wsManager.addConnection(connectionId);
  
  return { statusCode: 200 };
};

export const onDisconnect = async (event) => {
  const connectionId = event.requestContext.connectionId;
  gameManager.handleDisconnect(connectionId);
  await wsManager.removeConnection(connectionId);
  
  return { statusCode: 200 };
};