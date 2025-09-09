import React, { useState, useEffect } from 'react';
import { ArrowLeft, Play, BookOpen, FileText, Award, Clock, Users, Star, CheckCircle, X, ArrowRight } from 'lucide-react';
import { getSubjectById, getTopicById, Question } from '../../data/subjects';
import { DatabaseService } from '../../services/database';
import { useAuth } from '../../hooks/useAuth';

interface SubjectPageProps {
  subjectId: string;
  onBack: () => void;
  onStartQuiz?: (subjectId: string, type: string, moduleId?: number) => void;
}

interface UserProgress {
  [topicId: number]: {
    notesCompleted: boolean;
    quizCompleted: boolean;
    quizScore: number;
  };
}

const SubjectPage: React.FC<SubjectPageProps> = ({ subjectId, onBack }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [currentView, setCurrentView] = useState<'main' | 'notes' | 'quiz'>('main');
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userProgress, setUserProgress] = useState<UserProgress>({});

  const subject = getSubjectById(subjectId);
  if (!subject) return null;

  // Load user progress on component mount
  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user, subjectId]);

  const loadUserProgress = async () => {
    if (!user) return;
    
    const { data, error } = await DatabaseService.getSubjectProgress(user.id, subjectId);
    if (!error && data) {
      const progressMap: UserProgress = {};
      data.forEach((progress: any) => {
        progressMap[progress.topic_id] = {
          notesCompleted: progress.completed && progress.score === -1, // -1 indicates notes completion
          quizCompleted: progress.completed && progress.score >= 0,
          quizScore: progress.score >= 0 ? progress.score : 0
        };
      });
      setUserProgress(progressMap);
    }
  };

  const updateProgress = async (topicId: number, type: 'notes' | 'quiz', score?: number) => {
    if (!user) return;

    const isCompleted = true;
    const progressScore = type === 'notes' ? -1 : (score || 0); // -1 for notes, actual score for quiz
    
    await DatabaseService.saveSubjectProgress(user.id, subjectId, topicId, progressScore, isCompleted);
    
    // Update local state
    setUserProgress(prev => ({
      ...prev,
      [topicId]: {
        ...prev[topicId],
        [type === 'notes' ? 'notesCompleted' : 'quizCompleted']: true,
        ...(type === 'quiz' && { quizScore: score || 0 })
      }
    }));
  };

  const handleStartModule = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentView('notes');
  };

  const handleStartQuiz = (topic: any) => {
    setSelectedTopic(topic);
    setCurrentView('quiz');
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = selectedTopic.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      setQuizScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedTopic.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      setQuizCompleted(true);
      const finalScore = Math.round((quizScore / selectedTopic.questions.length) * 100);
      updateProgress(selectedTopic.id, 'quiz', finalScore);
    }
  };

  const handleNotesComplete = () => {
    updateProgress(selectedTopic.id, 'notes');
    setCurrentView('main');
  };

  const handleQuizComplete = () => {
    setCurrentView('main');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressPercentage = () => {
    const totalTopics = subject.topics.length;
    const completedTopics = Object.values(userProgress).filter(
      progress => progress.notesCompleted && progress.quizCompleted
    ).length;
    return Math.round((completedTopics / totalTopics) * 100);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'modules', label: 'Modules', icon: Play },
    { id: 'practice', label: 'Practice', icon: FileText },
    { id: 'progress', label: 'Progress', icon: Award }
  ];

  // Notes View
  if (currentView === 'notes') {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentView('main')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {subject.name}</span>
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-800">{selectedTopic.title}</h1>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(subject.difficulty)}`}>
              {subject.difficulty}
            </span>
          </div>

          <div className="prose max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {selectedTopic.notes}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Complete reading to mark this module as finished
              </p>
              <button
                onClick={handleNotesComplete}
                className={`px-6 py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
              >
                Mark as Complete ✓
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz View
  if (currentView === 'quiz') {
    if (quizCompleted) {
      const percentage = Math.round((quizScore / selectedTopic.questions.length) * 100);
      return (
        <div className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setCurrentView('main')}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to {subject.name}</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h2>
            <div className="text-6xl font-bold text-green-600 mb-2">{percentage}%</div>
            <p className="text-xl text-gray-600 mb-6">
              You scored {quizScore} out of {selectedTopic.questions.length} questions correctly
            </p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <h3 className="font-semibold text-gray-800 mb-4">Performance Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{quizScore}</div>
                  <div className="text-sm text-gray-600">Correct Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{selectedTopic.questions.length - quizScore}</div>
                  <div className="text-sm text-gray-600">Incorrect Answers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{percentage >= 70 ? 'Pass' : 'Review'}</div>
                  <div className="text-sm text-gray-600">Status</div>
                </div>
              </div>
            </div>

            <button
              onClick={handleQuizComplete}
              className={`px-8 py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
            >
              Continue Learning
            </button>
          </div>
        </div>
      );
    }

    const currentQuestion = selectedTopic.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / selectedTopic.questions.length) * 100;

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentView('main')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to {subject.name}</span>
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">{selectedTopic.title} Quiz</h2>
            <span className="text-sm text-gray-600">
              Question {currentQuestionIndex + 1} of {selectedTopic.questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-300 bg-gradient-to-r ${subject.color}`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4 mb-8">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                  showExplanation
                    ? index === currentQuestion.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-gray-50 text-gray-500'
                    : selectedAnswer === index
                    ? `border-blue-500 bg-blue-50 text-blue-700`
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    showExplanation
                      ? index === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-300'
                      : selectedAnswer === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {((showExplanation && index === currentQuestion.correctAnswer) || 
                      (!showExplanation && selectedAnswer === index)) && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                    {showExplanation && selectedAnswer === index && index !== currentQuestion.correctAnswer && (
                      <X className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
              <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
              <p className="text-blue-700">{currentQuestion.explanation}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Score: {quizScore}/{selectedTopic.questions.length}
            </div>
            
            {!showExplanation ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                  selectedAnswer !== null
                    ? `bg-gradient-to-r ${subject.color} text-white hover:shadow-lg transform hover:scale-105`
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className={`px-6 py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2`}
              >
                <span>{currentQuestionIndex === selectedTopic.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main Subject View
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Subject Hero */}
      <div className={`bg-gradient-to-br ${subject.color} text-white rounded-3xl p-8 relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">{subject.name}</h1>
          <p className="text-lg text-white text-opacity-90 mb-6 max-w-2xl">
            {subject.description}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">12+ hours content</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span className="text-sm font-medium">1,234 students</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-medium">4.8 rating</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-xl px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{getProgressPercentage()}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${subject.color} text-white shadow-lg`
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Course Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              This comprehensive {subject.name.toLowerCase()} course is designed to help you master all essential concepts 
              and excel in your examinations. Our structured approach combines theoretical understanding with practical 
              problem-solving skills.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">What You'll Learn</h3>
                <ul className="space-y-2">
                  {subject.topics.slice(0, 5).map((topic, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600">{topic.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800">Course Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Interactive study notes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Practice quizzes with explanations</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Real-time progress tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-gray-600">Instant feedback and corrections</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'modules' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Course Modules</h2>
            <div className="space-y-4">
              {subject.topics.map((topic, index) => {
                const progress = userProgress[topic.id] || { notesCompleted: false, quizCompleted: false, quizScore: 0 };
                return (
                  <div key={topic.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${subject.color} flex items-center justify-center text-white font-bold`}>
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{topic.title}</h3>
                          <p className="text-sm text-gray-600">{topic.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {progress.notesCompleted && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {progress.quizCompleted && (
                          <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {progress.quizScore}%
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleStartModule(topic)}
                        className={`px-4 py-2 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
                      >
                        {progress.notesCompleted ? 'Review Notes' : 'Start Module'}
                      </button>
                      <button
                        onClick={() => handleStartQuiz(topic)}
                        className="px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                      >
                        {progress.quizCompleted ? 'Retake Quiz' : 'Start Quiz'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Practice & Assessment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Practice</h3>
                <p className="text-gray-600 mb-4">Test your knowledge with random questions from all topics</p>
                <button className={`w-full py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200`}>
                  Start Practice
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Full Assessment</h3>
                <p className="text-gray-600 mb-4">Complete assessment covering all course topics</p>
                <button className={`w-full py-3 bg-gradient-to-r ${subject.color} text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200`}>
                  Start Assessment
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Your Progress</h2>
            
            {/* Overall Progress */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Overall Course Progress</h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className={`h-4 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-500`}
                      style={{ width: `${getProgressPercentage()}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800">{getProgressPercentage()}%</div>
              </div>
            </div>

            {/* Detailed Progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-xl">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {Object.values(userProgress).filter(p => p.notesCompleted).length}
                </div>
                <p className="text-gray-600">Modules Completed</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-xl">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {Object.values(userProgress).filter(p => p.quizCompleted).length}
                </div>
                <p className="text-gray-600">Quizzes Completed</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-xl">
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {Object.values(userProgress).length > 0 
                    ? Math.round(Object.values(userProgress).reduce((acc, p) => acc + p.quizScore, 0) / Object.values(userProgress).filter(p => p.quizCompleted).length || 0)
                    : 0}%
                </div>
                <p className="text-gray-600">Average Quiz Score</p>
              </div>
            </div>

            {/* Topic Progress */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Topic Progress</h3>
              {subject.topics.map((topic, index) => {
                const progress = userProgress[topic.id] || { notesCompleted: false, quizCompleted: false, quizScore: 0 };
                const completionPercentage = (
                  (progress.notesCompleted ? 50 : 0) + 
                  (progress.quizCompleted ? 50 : 0)
                );
                
                return (
                  <div key={topic.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{topic.title}</span>
                      <div className="flex items-center space-x-2">
                        {progress.quizCompleted && (
                          <span className="text-sm font-semibold text-blue-600">
                            Quiz: {progress.quizScore}%
                          </span>
                        )}
                        <span className="text-sm font-semibold text-gray-600">
                          {completionPercentage}%
                        </span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${subject.color} transition-all duration-300`}
                        style={{ width: `${completionPercentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;