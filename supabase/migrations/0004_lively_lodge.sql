/*
  # Update RLS policies for pong games

  1. Changes
    - Allow public access for game operations
    - Remove authentication requirements
  
  2. Security
    - Enable public read/write for game functionality
    - Keep RLS enabled but with public policies
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can read games" ON pong_games;
DROP POLICY IF EXISTS "Players can update their games" ON pong_games;
DROP POLICY IF EXISTS "Anyone can create games" ON pong_games;

-- Create new public policies
CREATE POLICY "Public read access"
  ON pong_games
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public insert access"
  ON pong_games
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public update access"
  ON pong_games
  FOR UPDATE
  TO public
  USING (true);