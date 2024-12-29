import React from 'react';

interface BallProps {
  x: number;
  y: number;
}

export const Ball: React.FC<BallProps> = ({ x, y }) => {
  return (
    <div
      className="absolute w-4 h-4 bg-white rounded-full"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    />
  );
};