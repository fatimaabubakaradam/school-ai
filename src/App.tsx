import React, { useState } from 'react';
import { LogOut, User, Home, BookOpen, MessageSquare, Award, Target, Brain, Star, Zap } from 'lucide-react';
import AuthForm from './components/Auth/AuthForm';
import ChatInterface from './components/Chatbot/ChatInterface';
import QuizInterface from './components/Quiz/QuizInterface';
import IQTest from './components/IQTest/IQTest';
import ResultsDisplay from './components/Results/ResultsDisplay';
import ExamPrep from './components/ExamPrep/ExamPrep';
import FeedbackForm from './components/Feedback/FeedbackForm';
import Dashboard from './components/Dashboard/Dashboard';
import UserProfile from './components/Profile/UserProfile';
import SubjectPage from './components/Subject/SubjectPage';
import Logo from './components/Logo';
import { StudentProfile, QuizResult } from './types';
import { useAuth } from './hooks/useAuth';

type AppState = 'dashboard' | 'career-discovery' | 'career-alignment' | 'ai-coaching' | 'exam-prep' | 'iq-test' | 'chat' | 'quiz' | 'results' | 'feedback' | 'profile' | 'subject';

function App() {
  const { user, loading, signOut } = useAuth();
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  // Handle user login from AuthForm
  const handleLogin = (userProfile: { id: string; name: string; email: string; class: string }) => {
    // User state will be automatically updated by the useAuth hook
    setCurrentState('dashboard');
  };

  const handleSignOut = async () => {
    await signOut();
    setStudentProfile(null);
    setQuizResult(null);
    setCurrentState('dashboard');
  };

  const handleProfileComplete = (profile: StudentProfile) => {
    setStudentProfile(profile);
    // Automatically redirect to IQ Test after AI chat completion
    setTimeout(() => setCurrentState('quiz'), 1000);
  };

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result);
    setCurrentState('results');
  };

  const handleContinueToExamPrep = () => {
    setCurrentState('exam-prep');
  };

  const handleExamPrepComplete = () => {
    setCurrentState('feedback');
  };

  const handleFeedbackSubmit = (feedback: any) => {
    console.log('Feedback submitted:', feedback);
  };

  const handleSubjectClick = (subjectId: string) => {
    setSelectedSubject(subjectId);
    setCurrentState('subject');
  };

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'from-blue-500 to-cyan-500' },
    { id: 'ai-coaching', label: 'AI Coaching', icon: MessageSquare, color: 'from-purple-500 to-pink-500' },
    { id: 'iq-test', label: 'IQ Test', icon: Brain, color: 'from-indigo-500 to-purple-500' },
    { id: 'exam-prep', label: 'Exam Preparation', icon: BookOpen, color: 'from-orange-500 to-red-500' },
    { id: 'feedback', label: 'Feedback', icon: Star, color: 'from-green-500 to-emerald-500' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading Schooby...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-4 md:py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 space-y-4 sm:space-y-0">
          <div 
            onClick={() => setCurrentState('dashboard')}
            className="cursor-pointer hover:scale-105 transition-transform duration-200"
          >
            <Logo size="medium" />
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 p-2 md:p-3 flex items-center space-x-2 md:space-x-3 w-full sm:w-auto">
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-gray-800 font-semibold text-sm truncate max-w-32 sm:max-w-none">{user.name}</p>
                <p className="text-blue-600 text-xs">Class: {user.class}</p>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4 w-full sm:w-auto">
              <button
                onClick={() => setCurrentState('profile')}
                className="flex items-center justify-center space-x-1 md:space-x-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-3 md:px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 sm:flex-none"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Profile</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center space-x-1 md:space-x-2 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-3 md:px-4 py-2 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex-1 sm:flex-none"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm font-medium">Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-3 mb-6 md:mb-8">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentState === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentState(item.id as AppState)}
                className={`p-3 md:p-4 rounded-xl shadow-lg border transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 ${
                  isActive
                    ? `bg-gradient-to-r ${item.color} text-white shadow-xl border-white/30`
                    : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white border-white/50 hover:shadow-xl'
                }`}
              >
                <div className="flex flex-col items-center space-y-1 md:space-y-2">
                  <div className={`w-10 md:w-12 h-10 md:h-12 rounded-xl flex items-center justify-center ${
                    isActive ? 'bg-white/20' : `bg-gradient-to-r ${item.color}`
                  }`}>
                    <IconComponent className={`w-5 md:w-6 h-5 md:h-6 ${isActive ? 'text-white' : 'text-white'}`} />
                  </div>
                  <div className="text-center">
                    <span className="font-bold text-xs md:text-sm block leading-tight">{item.label}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl md:rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
          {currentState === 'dashboard' && (
            <Dashboard
              userName={user.name}
              userClass={user.class}
              onCardClick={(cardId) => {
                if (cardId === 'career-discovery') setCurrentState('career-discovery');
                else if (cardId === 'career-alignment') setCurrentState('career-alignment');
                else if (cardId === 'ai-coaching') setCurrentState('ai-coaching');
                else if (cardId === 'exam-preparation') setCurrentState('exam-prep');
              }}
            />
          )}

          {currentState === 'profile' && (
            <UserProfile
              user={user}
              profile={studentProfile}
              quizResult={quizResult}
              onBack={() => setCurrentState('dashboard')}
            />
          )}

          {currentState === 'subject' && (
            <SubjectPage
              subjectId={selectedSubject}
              onBack={() => setCurrentState('exam-prep')}
              onStartQuiz={(subjectId, type, moduleId) => {
                console.log('Starting quiz:', { subjectId, type, moduleId });
                // For now, redirect back to exam prep with the subject quiz
                setCurrentState('exam-prep');
              }}
            />
          )}

          {(currentState === 'career-discovery' || currentState === 'career-alignment' || currentState === 'ai-coaching' || currentState === 'chat') && (
            <div className="p-4 md:p-8">
              <ChatInterface userId={user.id} onProfileComplete={handleProfileComplete} />
            </div>
          )}

          {currentState === 'quiz' && (
            <div className="p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <Brain className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">IQ Assessment</h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Discover your cognitive strengths with our comprehensive assessment.
                </p>
              </div>
              <QuizInterface userId={user.id} onQuizComplete={handleQuizComplete} />
            </div>
          )}

          {currentState === 'iq-test' && (
            <div className="p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <Brain className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">IQ Test</h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Test your cognitive abilities with our comprehensive IQ assessment.
                </p>
              </div>
              <IQTest userId={user.id} onComplete={() => setCurrentState('dashboard')} />
            </div>
          )}

          {currentState === 'results' && studentProfile && quizResult && (
            <div className="p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <Award className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Your Career Guide</h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Based on your assessment, here are your personalized career recommendations.
                </p>
              </div>
              <ResultsDisplay
                result={quizResult}
                profile={studentProfile}
                onContinue={handleContinueToExamPrep}
              />
            </div>
          )}

          {currentState === 'exam-prep' && (
              <ExamPrep onComplete={handleExamPrepComplete} onSubjectClick={handleSubjectClick} />
          )}

          {currentState === 'feedback' && (
            <div className="p-4 md:p-8">
              <div className="text-center mb-6 md:mb-8">
                <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg">
                  <MessageSquare className="w-6 md:w-8 h-6 md:h-8 text-white" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3 md:mb-4">Share Your Experience</h2>
                <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                  Help us improve AspirelyHub by sharing your thoughts and feedback.
                </p>
              </div>
              <FeedbackForm userId={user.id} onSubmit={handleFeedbackSubmit} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;