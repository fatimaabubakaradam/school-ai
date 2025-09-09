import { supabase } from '../lib/supabase';
import { StudentProfile, QuizResult } from '../types';

export class DatabaseService {
  static async saveStudentProfile(userId: string, profile: StudentProfile) {
    try {
      const { data, error } = await supabase
        .from('student_profiles')
        .upsert({
          user_id: userId,
          goals: profile.goals,
          interests: profile.interests,
          career_dreams: profile.careerDreams,
          strengths: profile.strengths
        });

      if (error) {
        console.error('Error saving student profile:', error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { error };
    }
  }

  static async saveQuizResult(userId: string, result: QuizResult) {
    try {
      const { data, error } = await supabase
        .from('quiz_results')
        .insert({
          user_id: userId,
          total_score: result.totalScore,
          category_scores: result.categoryScores,
          strengths: result.strengths,
          recommendations: result.recommendations
        });

      if (error) {
        console.error('Error saving quiz result:', error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { error };
    }
  }

  static async saveFeedback(userId: string, rating: number, comment: string) {
    try {
      const { data, error } = await supabase
        .from('feedback')
        .insert({
          user_id: userId,
          rating,
          comment
        });

      if (error) {
        console.error('Error saving feedback:', error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { error };
    }
  }

  static async saveIQTestResult(userId: string, score: number, answers: any, totalQuestions: number) {
    try {
      const { data, error } = await supabase
        .from('iq_test_results')
        .insert({
          user_id: userId,
          score,
          answers,
          total_questions: totalQuestions
        });

      if (error) {
        console.error('Error saving IQ test result:', error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { error };
    }
  }

  static async saveSubjectProgress(userId: string, subjectId: string, topicId: number, score: number, completed: boolean) {
    try {
      const { data, error } = await supabase
        .from('subject_progress')
        .upsert({
          user_id: userId,
          subject_id: subjectId,
          topic_id: topicId,
          score,
          completed,
          last_accessed: new Date().toISOString()
        });

      if (error) {
        console.error('Error saving subject progress:', error);
        return { error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { error };
    }
  }

  static async getSubjectProgress(userId: string, subjectId: string) {
    try {
      const { data, error } = await supabase
        .from('subject_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('subject_id', subjectId);

      if (error) {
        console.error('Error getting subject progress:', error);
        return { data: [], error };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Database error:', error);
      return { data: [], error };
    }
  }
}