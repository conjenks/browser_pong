import React from 'react';

interface PaddleProps {
  x: number;
  y: number;
  isPlayer?: boolean;
}

export const Paddle: React.FC<PaddleProps> = ({ x, y, isPlayer }) => {
  return (
    <div
      className={`absolute w-4 h-20 ${
        isPlayer ? 'bg-blue-500' : 'bg-red-500'
      } rounded`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
};