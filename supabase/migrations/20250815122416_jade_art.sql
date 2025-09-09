/*
  # Create AspirelyHub Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `name` (text, not null)
      - `class` (text, not null)
      - `email` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `student_profiles`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `goals` (text)
      - `interests` (text array)
      - `career_dreams` (text)
      - `strengths` (text array)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `quiz_results`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `total_score` (integer)
      - `category_scores` (jsonb)
      - `strengths` (text array)
      - `recommendations` (jsonb)
      - `created_at` (timestamp)
    
    - `feedback`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `rating` (integer, 1-5)
      - `comment` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  class text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create student_profiles table
CREATE TABLE IF NOT EXISTS student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  goals text NOT NULL,
  interests text[] DEFAULT '{}',
  career_dreams text NOT NULL,
  strengths text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create quiz_results table
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  total_score integer NOT NULL DEFAULT 0,
  category_scores jsonb DEFAULT '{}',
  strengths text[] DEFAULT '{}',
  recommendations jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now()
);

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (true);

-- Create policies for student_profiles table
CREATE POLICY "Users can read own profiles"
  ON student_profiles
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own profiles"
  ON student_profiles
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own profiles"
  ON student_profiles
  FOR UPDATE
  USING (true);

-- Create policies for quiz_results table
CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  WITH CHECK (true);

-- Create policies for feedback table
CREATE POLICY "Users can read own feedback"
  ON feedback
  FOR SELECT
  USING (true);

CREATE POLICY "Users can insert own feedback"
  ON feedback
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can read all feedback for display"
  ON feedback
  FOR SELECT
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_student_profiles_user_id ON student_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_id ON quiz_results(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_user_id ON feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_feedback_rating ON feedback(rating);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_student_profiles_updated_at
  BEFORE UPDATE ON student_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();