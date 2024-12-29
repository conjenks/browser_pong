import { useCallback } from 'react';

export function useMousePosition(
  boardRef: React.RefObject<HTMLDivElement>,
  onPaddleMove: (y: number) => void
) {
  return useCallback(
    (e: MouseEvent) => {
      if (!boardRef.current) return;
      const rect = boardRef.current.getBoundingClientRect();
      const y = e.clientY - rect.top - 40; // 40 is half paddle height
      const maxY = rect.height - 80; // 80 is paddle height
      const boundedY = Math.max(0, Math.min(y, maxY));
      onPaddleMove(boundedY);
    },
    [onPaddleMove]
  );
}