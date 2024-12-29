import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GameBoard } from './components/GameBoard';
import { useGameState } from './hooks/useGameState';
import { Gamepad2 } from 'lucide-react';

export default function App() {
  const [playerId] = useState(() => uuidv4());
  const { gameState, handlePaddleMove } = useGameState(playerId);

  if (!gameState) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">
          Connecting to game...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="mb-8 flex items-center gap-3">
        <Gamepad2 className="w-8 h-8 text-blue-500" />
        <h1 className="text-4xl font-bold text-white">Multiplayer Pong</h1>
      </div>
      <GameBoard
        gameState={gameState}
        playerId={playerId}
        onPaddleMove={handlePaddleMove}
      />
      <p className="mt-4 text-gray-400">
        Move your mouse up and down to control your paddle
      </p>
    </div>
  );
}