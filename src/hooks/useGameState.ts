import { useEffect, useState } from 'react';
import { GameState } from '../types/game';

export function useGameState(playerId: string) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'wss://0klpq7yjld.execute-api.us-east-1.amazonaws.com/dev';
    const socket = new WebSocket(wsUrl);

    socket.onopen = () => {
      console.log('WebSocket connected');
      socket.send(JSON.stringify({ action: 'joinGame' }));
    };

    socket.onmessage = (event) => {
      console.log('Received message:', event.data);
      const data = JSON.parse(event.data);
      
      switch (data.action) {
        case 'waiting':
          setGameState(prev => prev ? { ...prev, status: 'waiting' } : null);
          break;
        case 'gameStart':
          setGameState(data.data);
          break;
        case 'gameState':
          setGameState(data.data);
          break;
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
      console.log('WebSocket closed:', event);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [playerId]);

  const handlePaddleMove = (y: number) => {
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ 
        action: 'paddleMove', 
        data: { y } 
      }));
    }
  };

  return { gameState, handlePaddleMove };
}