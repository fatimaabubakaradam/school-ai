/*
  # Create additional tables for IQ tests and subject progress

  1. New Tables
    - `iq_test_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `score` (integer)
      - `answers` (jsonb)
      - `total_questions` (integer)
      - `created_at` (timestamp)
    
    - `subject_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `subject_id` (text)
      - `topic_id` (integer)
      - `score` (integer)
      - `completed` (boolean)
      - `last_accessed` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create iq_test_results table
CREATE TABLE IF NOT EXISTS iq_test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  score integer NOT NULL DEFAULT 0,
  answers jsonb DEFAULT '{}',
  total_questions integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create subject_progress table
CREATE TABLE IF NOT EXISTS subject_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  subject_id text NOT NULL,
  topic_id integer NOT NULL,
  score integer DEFAULT 0,
  completed boolean DEFAULT false,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, subject_id, topic_id)
);

-- Enable Row Level Security
ALTER TABLE iq_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE subject_progress ENABLE ROW LEVEL SECURITY;

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

-- Create policies for subject_progress table
CREATE POLICY "Users can insert own subject progress"
  ON subject_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own subject progress"
  ON subject_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own subject progress"
  ON subject_progress
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_iq_test_results_user_id ON iq_test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_iq_test_results_created_at ON iq_test_results(created_at);
CREATE INDEX IF NOT EXISTS idx_subject_progress_user_id ON subject_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_subject_progress_subject_id ON subject_progress(subject_id);
CREATE INDEX IF NOT EXISTS idx_subject_progress_last_accessed ON subject_progress(last_accessed);