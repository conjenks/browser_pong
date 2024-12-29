import { onConnect, onDisconnect } from './handlers/connectionHandler.js';
import { onJoinGame, onPaddleMove } from './handlers/gameHandler.js';

export const handler = async (event) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  try {
    const routeKey = event.requestContext.routeKey;
    
    switch (routeKey) {
      case '$connect':
        const connectResult = await onConnect(event);
        return {
          statusCode: 200,
          headers: {
            "Sec-WebSocket-Protocol": "websocket"
          }
        };
      case '$disconnect':
        return await onDisconnect(event);
      case 'joinGame':
        return await onJoinGame(event);
      case 'paddleMove':
        return await onPaddleMove(event);
      default:
        return {
          statusCode: 400,
          body: 'Unknown route'
        };
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
}; 