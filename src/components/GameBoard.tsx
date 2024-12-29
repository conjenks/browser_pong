import React, { useEffect, useRef } from 'react';
import { Ball } from './Ball';
import { Paddle } from './Paddle';
import { GameState } from '../types/game';
import { useMousePosition } from '../hooks/useMousePosition';

interface GameBoardProps {
  gameState: GameState;
  playerId: string;
  onPaddleMove: (y: number) => void;
}

export function GameBoard({ gameState, playerId, onPaddleMove }: GameBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = useMousePosition(boardRef, onPaddleMove);

  useEffect(() => {
    const board = boardRef.current;
    if (board) {
      board.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (board) {
        board.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [handleMouseMove]);

  const isPlayer1 = playerId === gameState.player1;

  return (
    <div
      ref={boardRef}
      className="relative w-[800px] h-[600px] bg-gray-900 rounded-lg overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-0.5 h-full bg-gray-700 dashed" />
      </div>
      
      <div className="absolute top-4 left-0 w-full flex justify-center gap-8 text-2xl text-white font-bold">
        <span>{gameState.score1}</span>
        <span>{gameState.score2}</span>
      </div>

      <Paddle x={50} y={gameState.paddle_1_y} isPlayer={isPlayer1} />
      <Paddle x={746} y={gameState.paddle_2_y} isPlayer={!isPlayer1} />
      <Ball x={gameState.ball.x} y={gameState.ball.y} />

      {gameState.status === 'waiting' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl font-bold">
            Waiting for opponent...
          </div>
        </div>
      )}
    </div>
  );
}