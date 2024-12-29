/*
  # Fix column names and types

  1. Changes
    - Rename paddle columns to use consistent naming
    - Add missing columns if they don't exist
    - Ensure proper column types
  
  2. Security
    - Update RLS policies to use proper column names
*/

-- Drop existing policies to recreate them with correct column names
DROP POLICY IF EXISTS "Anyone can read games" ON pong_games;
DROP POLICY IF EXISTS "Players can update their games" ON pong_games;
DROP POLICY IF EXISTS "Anyone can create games" ON pong_games;

-- Ensure columns exist with correct names
DO $$ 
BEGIN
  -- Rename paddle1Y to paddle_1_y if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle1y'
  ) THEN
    ALTER TABLE pong_games RENAME COLUMN paddle1y TO paddle_1_y;
  END IF;

  -- Rename paddle2Y to paddle_2_y if it exists
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle2y'
  ) THEN
    ALTER TABLE pong_games RENAME COLUMN paddle2y TO paddle_2_y;
  END IF;

  -- Add paddle_1_y if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle_1_y'
  ) THEN
    ALTER TABLE pong_games ADD COLUMN paddle_1_y float8 DEFAULT 260;
  END IF;

  -- Add paddle_2_y if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'pong_games' AND column_name = 'paddle_2_y'
  ) THEN
    ALTER TABLE pong_games ADD COLUMN paddle_2_y float8 DEFAULT 260;
  END IF;
END $$;

-- Recreate policies with correct column references
CREATE POLICY "Anyone can read games"
  ON pong_games
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Players can update their games"
  ON pong_games
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = player1::text OR auth.uid()::text = player2::text);

CREATE POLICY "Anyone can create games"
  ON pong_games
  FOR INSERT
  TO authenticated
  WITH CHECK (true);