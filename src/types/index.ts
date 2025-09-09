export interface User {
  id: string;
  name: string;
  email: string;
  class: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: 'logical' | 'mathematical' | 'verbal' | 'spatial';
}

export interface QuizResult {
  totalScore: number;
  categoryScores: Record<string, number>;
  strengths: string[];
  recommendations: CareerRecommendation[];
}

export interface CareerRecommendation {
  career: string;
  description: string;
  requiredSubjects: string[];
  realLifeExample: string;
  matchPercentage: number;
}

export interface StudentProfile {
  goals: string;
  interests: string[];
  careerDreams: string;
  strengths: string[];
  quizResults?: QuizResult;
}

export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  date: Date;
}