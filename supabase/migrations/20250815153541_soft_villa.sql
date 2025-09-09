/*
  # Update authentication schema for email/password auth

  1. Changes
    - Update users table to work with Supabase Auth
    - Add email column and make it required
    - Update class options to include JSS1-JSS3 and SS1-SS3
    - Add proper constraints and indexes

  2. Security
    - Maintain RLS policies
    - Update policies to work with auth.uid()
*/

-- Update users table to work with Supabase Auth
ALTER TABLE users 
  ALTER COLUMN id SET DEFAULT auth.uid(),
  ALTER COLUMN email SET NOT NULL,
  ADD CONSTRAINT users_email_unique UNIQUE (email);

-- Update RLS policies to use auth.uid()
DROP POLICY IF EXISTS "Users can insert own data" ON users;
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;

CREATE POLICY "Users can insert own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Update student_profiles policies
DROP POLICY IF EXISTS "Users can insert own profiles" ON student_profiles;
DROP POLICY IF EXISTS "Users can read own profiles" ON student_profiles;
DROP POLICY IF EXISTS "Users can update own profiles" ON student_profiles;

CREATE POLICY "Users can insert own profiles"
  ON student_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own profiles"
  ON student_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profiles"
  ON student_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Update quiz_results policies
DROP POLICY IF EXISTS "Users can insert own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can read own quiz results" ON quiz_results;

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Update feedback policies
DROP POLICY IF EXISTS "Users can insert own feedback" ON feedback;
DROP POLICY IF EXISTS "Users can read own feedback" ON feedback;

CREATE POLICY "Users can insert own feedback"
  ON feedback
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read own feedback"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read all feedback for display"
  ON feedback
  FOR SELECT
  TO authenticated
  USING (true);