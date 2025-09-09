import React, { useState, useEffect } from 'react';
import { Brain, Clock, CheckCircle, XCircle, ArrowRight, Award, Target } from 'lucide-react';
import { DatabaseService } from '../../services/database';

interface IQTestProps {
  userId: string;
  onComplete: () => void;
}

interface IQQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const iqQuestions: IQQuestion[] = [
  {
    id: 1,
    category: 'Pattern Recognition',
    question: 'What comes next in this sequence: 2, 6, 18, 54, ?',
    options: ['108', '162', '216', '324'],
    correctAnswer: 1,
    explanation: 'Each number is multiplied by 3. 2×3=6, 6×3=18, 18×3=54, 54×3=162.',
    difficulty: 'Medium'
  },
  {
    id: 2,
    category: 'Logical Reasoning',
    question: 'If all roses are flowers and some flowers are red, which statement must be true?',
    options: ['All roses are red', 'Some roses might be red', 'No roses are red', 'All flowers are roses'],
    correctAnswer: 1,
    explanation: 'Since all roses are flowers and some flowers are red, it\'s possible (but not certain) that some roses are red.',
    difficulty: 'Medium'
  },
  {
    id: 3,
    category: 'Numerical Ability',
    question: 'If a shirt costs $45 after a 25% discount, what was the original price?',
    options: ['$56.25', '$60', '$67.50', '$70'],
    correctAnswer: 1,
    explanation: 'If $45 is 75% of the original price (100% - 25% = 75%), then the original price is $45 ÷ 0.75 = $60.',
    difficulty: 'Medium'
  },
  {
    id: 4,
    category: 'Verbal Reasoning',
    question: 'Book is to Reading as Fork is to:',
    options: ['Kitchen', 'Eating', 'Metal', 'Plate'],
    correctAnswer: 1,
    explanation: 'A book is used for reading, just as a fork is used for eating. This is an analogy based on function.',
    difficulty: 'Easy'
  },
  {
    id: 5,
    category: 'Spatial Reasoning',
    question: 'If you fold a square piece of paper in half twice and cut a small triangle from the corner, how many holes will there be when you unfold it?',
    options: ['2', '4', '6', '8'],
    correctAnswer: 1,
    explanation: 'Folding twice creates 4 layers. Cutting one triangle creates holes in all 4 layers, resulting in 4 holes when unfolded.',
    difficulty: 'Hard'
  },
  {
    id: 6,
    category: 'Problem Solving',
    question: 'A farmer has 17 sheep. All but 9 die. How many sheep are left?',
    options: ['8', '9', '17', '0'],
    correctAnswer: 1,
    explanation: '"All but 9 die" means 9 sheep survive. The phrase is designed to test careful reading and logical thinking.',
    difficulty: 'Medium'
  },
  {
    id: 7,
    category: 'Pattern Recognition',
    question: 'Which number doesn\'t belong in this series: 2, 3, 6, 7, 8, 14, 15, 30?',
    options: ['8', '7', '6', '3'],
    correctAnswer: 0,
    explanation: 'The pattern alternates: multiply by 1.5, then add 1. 2×1.5=3, 3+1=4 (not 6), so 8 breaks the pattern.',
    difficulty: 'Hard'
  },
  {
    id: 8,
    category: 'Memory and Attention',
    question: 'Study this sequence for 5 seconds: 7, 3, 9, 1, 5, 8, 2. What number appeared 4th in the sequence?',
    options: ['1', '9', '5', '3'],
    correctAnswer: 0,
    explanation: 'The sequence was: 7, 3, 9, 1, 5, 8, 2. The 4th number in this sequence is 1.',
    difficulty: 'Medium'
  },
  {
    id: 9,
    category: 'Logical Reasoning',
    question: 'In a certain code, FLOWER is written as EKNVDQ. How is GARDEN written in that code?',
    options: ['FZQCDM', 'HBSEFP', 'FZQCFM', 'HBQCDM'],
    correctAnswer: 0,
    explanation: 'Each letter is replaced by the letter that comes one position before it in the alphabet. G→F, A→Z, R→Q, D→C, E→D, N→M.',
    difficulty: 'Hard'
  },
  {
    id: 10,
    category: 'Numerical Ability',
    question: 'What is the next number in this sequence: 1, 1, 2, 3, 5, 8, ?',
    options: ['11', '13', '15', '16'],
    correctAnswer: 1,
    explanation: 'This is the Fibonacci sequence where each number is the sum of the two preceding ones: 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13.',
    difficulty: 'Medium'
  }
];

const IQTest: React.FC<IQTestProps> = ({ userId, onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleTestComplete();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQ = iqQuestions[currentQuestion];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    
    // Update answers array
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);

    if (isCorrect) {
      setScore(prev => prev + 1);
      // If correct, move to next question after a brief delay
      setTimeout(() => {
        handleNextQuestion();
      }, 1000);
    } else {
      // If incorrect, show explanation
      setShowExplanation(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < iqQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      handleTestComplete();
    }
  };

  const handleTestComplete = async () => {
    setIsCompleted(true);
    
    const finalScore = Math.round((score / iqQuestions.length) * 100);
    
    // Save IQ test results to database
    await DatabaseService.saveIQTestResult(userId, finalScore, answers, iqQuestions.length);
    
    // Complete the test after showing results
    setTimeout(() => {
      onComplete();
    }, 5000);
  };

  const getIQScore = () => {
    // Convert percentage to IQ score (average IQ is 100, standard deviation is 15)
    const percentage = (score / iqQuestions.length) * 100;
    if (percentage >= 90) return 130; // Very Superior
    if (percentage >= 80) return 120; // Superior
    if (percentage >= 70) return 110; // High Average
    if (percentage >= 50) return 100; // Average
    if (percentage >= 30) return 90;  // Low Average
    if (percentage >= 20) return 80;  // Borderline
    return 70; // Below Average
  };

  const getCareerSuggestions = () => {
    const iqScore = getIQScore();
    const percentage = (score / iqQuestions.length) * 100;
    
    if (iqScore >= 130) {
      return [
        'Research Scientist',
        'Software Engineer',
        'Medical Doctor',
        'University Professor',
        'Aerospace Engineer'
      ];
    } else if (iqScore >= 120) {
      return [
        'Engineer',
        'Lawyer',
        'Architect',
        'Pharmacist',
        'Data Analyst'
      ];
    } else if (iqScore >= 110) {
      return [
        'Teacher',
        'Accountant',
        'Nurse',
        'Marketing Manager',
        'Graphic Designer'
      ];
    } else if (iqScore >= 100) {
      return [
        'Sales Representative',
        'Administrative Assistant',
        'Customer Service',
        'Technician',
        'Social Worker'
      ];
    } else {
      return [
        'Retail Associate',
        'Food Service',
        'Security Guard',
        'Maintenance Worker',
        'Driver'
      ];
    }
  };

  if (isCompleted) {
    const iqScore = getIQScore();
    const percentage = (score / iqQuestions.length) * 100;
    const careerSuggestions = getCareerSuggestions();

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Award className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">IQ Test Completed!</h2>
          <div className="text-6xl font-bold text-purple-600 mb-2">{iqScore}</div>
          <p className="text-xl text-gray-600 mb-6">Your IQ Score</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{score}/{iqQuestions.length}</div>
            <p className="text-gray-600">Questions Correct</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{percentage.toFixed(0)}%</div>
            <p className="text-gray-600">Accuracy Rate</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">{formatTime(1800 - timeLeft)}</div>
            <p className="text-gray-600">Time Taken</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <Target className="w-8 h-8 text-purple-600 mr-3" />
            Career Recommendations Based on Your IQ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {careerSuggestions.map((career, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                <div className="font-semibold text-purple-800">{career}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
          <h4 className="font-bold text-gray-800 mb-4">Performance Breakdown by Category:</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Logical Reasoning', 'Numerical Ability', 'Verbal Reasoning', 'Pattern Recognition'].map((category) => {
              const categoryQuestions = iqQuestions.filter(q => q.category.includes(category.split(' ')[0]));
              const categoryScore = categoryQuestions.reduce((acc, q, idx) => {
                const questionIndex = iqQuestions.findIndex(question => question.id === q.id);
                return acc + (answers[questionIndex] === q.correctAnswer ? 1 : 0);
              }, 0);
              const categoryPercentage = categoryQuestions.length > 0 ? Math.round((categoryScore / categoryQuestions.length) * 100) : 0;
              
              return (
                <div key={category} className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{categoryPercentage}%</div>
                  <div className="text-sm text-gray-600">{category}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Redirecting to dashboard...</p>
          <div className="w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  const currentQ = iqQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / iqQuestions.length) * 100;
  const isCorrect = selectedAnswer === currentQ.correctAnswer;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-bold text-gray-800">IQ Assessment Test</h2>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-orange-600">
              <Clock className="w-5 h-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
              {currentQ.category}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {iqQuestions.length} • Score: {score}/{iqQuestions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-800">
            {currentQ.question}
          </h3>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
            currentQ.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
            currentQ.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {currentQ.difficulty}
          </span>
        </div>

        <div className="space-y-4 mb-8">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                showExplanation
                  ? index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : selectedAnswer === index
                    ? 'border-red-500 bg-red-50 text-red-700'
                    : 'border-gray-200 bg-gray-50 text-gray-500'
                  : selectedAnswer === index
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  showExplanation
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-500'
                      : 'border-gray-300'
                    : selectedAnswer === index
                    ? 'border-purple-500 bg-purple-500'
                    : 'border-gray-300'
                }`}>
                  {showExplanation && index === currentQ.correctAnswer && (
                    <CheckCircle className="w-4 h-4 text-white" />
                  )}
                  {showExplanation && selectedAnswer === index && index !== currentQ.correctAnswer && (
                    <XCircle className="w-4 h-4 text-white" />
                  )}
                  {!showExplanation && selectedAnswer === index && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-lg font-medium">{String.fromCharCode(65 + index)}. {option}</span>
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className={`border-2 rounded-xl p-6 mb-6 ${
            isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
          }`}>
            <div className="flex items-center space-x-2 mb-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
              <h4 className={`font-bold text-lg ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </h4>
            </div>
            <p className={`text-base leading-relaxed ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              <strong>Explanation:</strong> {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedAnswer !== null ? (
              showExplanation ? 'Click Next to continue' : 'Click Submit to check your answer'
            ) : 'Please select an answer'}
          </div>
          
          {!showExplanation ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 ${
                selectedAnswer !== null
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <span>Submit Answer</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>{currentQuestion === iqQuestions.length - 1 ? 'Finish Test' : 'Next Question'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Time Warning */}
      {timeLeft < 300 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-orange-700">
            <Clock className="w-5 h-5" />
            <span className="font-semibold">Time Warning:</span>
            <span>Less than 5 minutes remaining!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IQTest;