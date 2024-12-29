/*
  # Update Pong Game Table Structure
  
  1. Changes
    - Rename paddle columns to use snake_case
    - paddle1Y -> paddle_1_y
    - paddle2Y -> paddle_2_y
*/

-- Rename columns using safe approach
DO $$ 
BEGIN
  -- Only rename if the old column exists and new one doesn't
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle1y'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle_1_y'
  ) THEN
    ALTER TABLE pong_games RENAME COLUMN paddle1y TO paddle_1_y;
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle2y'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle_2_y'
  ) THEN
    ALTER TABLE pong_games RENAME COLUMN paddle2y TO paddle_2_y;
  END IF;
END $$;