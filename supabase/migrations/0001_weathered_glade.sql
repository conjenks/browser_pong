/*
  # Create Pong Game Tables and Policies

  1. New Tables
    - `pong_games`
      - `id` (uuid, primary key)
      - `player1` (uuid)
      - `player2` (uuid)
      - `ball` (jsonb for ball position and velocity)
      - `paddle1Y` (float8 for paddle 1 position)
      - `paddle2Y` (float8 for paddle 2 position)
      - `score1` (int for player 1 score)
      - `score2` (int for player 2 score)
      - `status` (text for game state)

  2. Security
    - Enable RLS on `pong_games` table
    - Add policies for game access and updates
*/

CREATE TABLE IF NOT EXISTS pong_games (
  id uuid PRIMARY KEY,
  player1 uuid,
  player2 uuid,
  ball jsonb,
  paddle1Y float8,
  paddle2Y float8,
  score1 int DEFAULT 0,
  score2 int DEFAULT 0,
  status text DEFAULT 'waiting',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE pong_games ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read game data
CREATE POLICY "Anyone can read games"
  ON pong_games
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow players to update their own games
CREATE POLICY "Players can update their games"
  ON pong_games
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = player1::text OR auth.uid()::text = player2::text);

-- Allow anyone to insert new games
CREATE POLICY "Anyone can create games"
  ON pong_games
  FOR INSERT
  TO authenticated
  WITH CHECK (true);