import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Brain } from 'lucide-react';
import { DatabaseService } from '../../services/database';
import { QuizResult } from '../../types';

interface QuizInterfaceProps {
  userId: string;
  onQuizComplete: (result: QuizResult) => void;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "What type of activities do you enjoy most?",
    options: [
      "Working with numbers and data",
      "Creating and designing things",
      "Helping and teaching others",
      "Leading and organizing projects"
    ],
    category: "interests"
  },
  {
    id: 2,
    question: "Which environment would you prefer to work in?",
    options: [
      "Office with computers and technology",
      "Outdoor or field work",
      "Laboratory or research facility",
      "Social settings with people"
    ],
    category: "environment"
  },
  {
    id: 3,
    question: "What motivates you most in your studies?",
    options: [
      "Solving complex problems",
      "Understanding how things work",
      "Making a positive impact on others",
      "Achieving recognition and success"
    ],
    category: "motivation"
  },
  {
    id: 4,
    question: "Which subject area interests you most?",
    options: [
      "Mathematics and Sciences",
      "Arts and Literature",
      "Social Studies and History",
      "Business and Economics"
    ],
    category: "subjects"
  },
  {
    id: 5,
    question: "How do you prefer to learn new things?",
    options: [
      "Reading and research",
      "Hands-on practice",
      "Group discussions",
      "Visual demonstrations"
    ],
    category: "learning"
  },
  {
    id: 6,
    question: "What type of challenges excite you?",
    options: [
      "Technical and analytical problems",
      "Creative and artistic projects",
      "Social and community issues",
      "Strategic and business challenges"
    ],
    category: "challenges"
  },
  {
    id: 7,
    question: "Which career aspect is most important to you?",
    options: [
      "Job security and stability",
      "Creative freedom and flexibility",
      "Making a difference in society",
      "High earning potential"
    ],
    category: "values"
  },
  {
    id: 8,
    question: "How do you handle stress and pressure?",
    options: [
      "Break problems into smaller parts",
      "Take breaks and think creatively",
      "Talk to others for support",
      "Focus on the end goal"
    ],
    category: "stress"
  },
  {
    id: 9,
    question: "What type of skills do you want to develop?",
    options: [
      "Technical and analytical skills",
      "Creative and artistic skills",
      "Communication and interpersonal skills",
      "Leadership and management skills"
    ],
    category: "skills"
  },
  {
    id: 10,
    question: "Which work style suits you best?",
    options: [
      "Independent work with minimal supervision",
      "Collaborative teamwork",
      "Structured environment with clear guidelines",
      "Dynamic environment with variety"
    ],
    category: "workstyle"
  }
];

const QuizInterface: React.FC<QuizInterfaceProps> = ({ userId, onQuizComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isCompleted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleQuizComplete(newAnswers);
      }
    }
  };

  const handleQuizComplete = (finalAnswers = answers) => {
    setIsCompleted(true);
    
    // Calculate results based on answers
    const categoryScores = {
      analytical: 0,
      creative: 0,
      social: 0,
      leadership: 0
    };

    finalAnswers.forEach((answer, index) => {
      switch (answer) {
        case 0:
          categoryScores.analytical++;
          break;
        case 1:
          categoryScores.creative++;
          break;
        case 2:
          categoryScores.social++;
          break;
        case 3:
          categoryScores.leadership++;
          break;
      }
    });

    const totalQuestions = questions.length;
    const result: QuizResult = {
      id: Date.now().toString(),
      userId,
      scores: {
        analytical: Math.round((categoryScores.analytical / totalQuestions) * 100),
        creative: Math.round((categoryScores.creative / totalQuestions) * 100),
        social: Math.round((categoryScores.social / totalQuestions) * 100),
        leadership: Math.round((categoryScores.leadership / totalQuestions) * 100)
      },
      recommendations: generateRecommendations(categoryScores),
      completedAt: new Date().toISOString(),
      timeSpent: (30 * 60) - timeLeft
    };

    // Save to database
    DatabaseService.saveQuizResult(userId, result);
    onQuizComplete(result);
  };

  const generateRecommendations = (scores: any) => {
    const maxScore = Math.max(...Object.values(scores));
    const dominantCategory = Object.keys(scores).find(key => scores[key] === maxScore);

    const recommendations = {
      analytical: [
        "Engineering and Technology",
        "Data Science and Analytics",
        "Research and Development",
        "Finance and Accounting"
      ],
      creative: [
        "Arts and Design",
        "Media and Communications",
        "Architecture",
        "Creative Writing"
      ],
      social: [
        "Education and Teaching",
        "Healthcare and Medicine",
        "Social Work",
        "Psychology and Counseling"
      ],
      leadership: [
        "Business Management",
        "Entrepreneurship",
        "Politics and Governance",
        "Project Management"
      ]
    };

    return recommendations[dominantCategory as keyof typeof recommendations] || [];
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-xl p-8">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Quiz Completed!</h3>
          <p className="text-green-600">
            Your career assessment has been completed successfully. 
            Your results are being processed...
          </p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <Brain className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Career Assessment Quiz</h2>
          </div>
          <div className="flex items-center space-x-2 text-orange-600">
            <Clock className="w-5 h-5" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">
          Question {currentQuestion + 1} of {questions.length}
        </p>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          {question.question}
        </h3>

        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedAnswer !== null ? 'Click Next to continue' : 'Please select an answer'}
          </div>
          <button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
          </button>
        </div>
      </div>

      {/* Warning for time */}
      {timeLeft < 300 && (
        <div className="mt-6 bg-orange-50 border border-orange-200 rounded-xl p-4">
          <div className="flex items-center space-x-2 text-orange-700">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold">Time Warning:</span>
            <span>Less than 5 minutes remaining!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;