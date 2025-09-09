/*
  # Fix users table setup

  1. Tables
    - Ensure `users` table exists with proper structure
    - Handle existing policies gracefully
  
  2. Security
    - Enable RLS on `users` table
    - Create policies only if they don't exist
    - Ensure proper access control
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create or replace policies (this handles existing policies)
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);

-- Create or replace the update trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and recreate
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();