/*
  # Create IQ test results table

  1. New Tables
    - `iq_test_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `score` (integer)
      - `answers` (jsonb)
      - `total_questions` (integer)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `iq_test_results` table
    - Add policies for authenticated users to manage their own data
*/

-- Create iq_test_results table
CREATE TABLE IF NOT EXISTS iq_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL DEFAULT 0,
  answers jsonb DEFAULT '{}',
  total_questions integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE iq_test_results ENABLE ROW LEVEL SECURITY;

-- Create policies for iq_test_results table
CREATE POLICY "Users can insert own IQ test results"
  ON iq_test_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own IQ test results"
  ON iq_test_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_iq_test_results_user_id ON iq_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_iq_test_results_created_at ON iq_test_results(created_at);