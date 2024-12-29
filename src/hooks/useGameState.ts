import { useEffect, useState } from 'react';
import { GameState } from '../types/game';
import { io, Socket } from 'socket.io-client';

export function useGameState(playerId: string) {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const wsUrl = import.meta.env.VITE_WEBSOCKET_URL || 'http://localhost:3001';
    const socket = io(wsUrl);

    socket.on('connect', () => {
      console.log('Socket.IO connected');
      socket.emit('joinGame');
    });

    socket.on('waiting', () => {
      setGameState(prev => prev ? { ...prev, status: 'waiting' } : null);
    });

    socket.on('gameStart', (data) => {
      setGameState(data);
    });

    socket.on('gameState', (data) => {
      setGameState(data);
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    setSocket(socket);

    return () => {
      socket.close();
    };
  }, [playerId]);

  const handlePaddleMove = (y: number) => {
    if (socket?.connected) {
      socket.emit('paddleMove', y);
    }
  };

  return { gameState, handlePaddleMove };
}