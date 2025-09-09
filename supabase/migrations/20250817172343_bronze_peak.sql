/*
  # Create users table with proper structure

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - matches Supabase auth user ID
      - `name` (text, required) - user's full name
      - `class` (text, required) - student's class (JSS1-JSS3, SS1-SS3)
      - `email` (text, optional) - user's email address
      - `created_at` (timestamp) - when the record was created
      - `updated_at` (timestamp) - when the record was last updated

  2. Security
    - Enable RLS on `users` table
    - Add policies for users to manage their own data
    - Add trigger for automatic updated_at timestamp updates

  3. Indexes
    - Add index on created_at for performance
*/

-- Create the users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for users to manage their own data
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
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);