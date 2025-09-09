import React from 'react';
import { TrendingUp, Award, BookOpen, Star, Target, Users } from 'lucide-react';
import { QuizResult, StudentProfile } from '../../types';

interface ResultsDisplayProps {
  result: QuizResult;
  profile: StudentProfile;
  onContinue: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, profile, onContinue }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-blue-600 bg-blue-100';
    if (score >= 40) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getMotivationalMessage = (score: number) => {
    if (score >= 80) return "Excellent! You're demonstrating outstanding abilities! 🌟";
    if (score >= 60) return "Great work! You have strong potential! 💪";
    if (score >= 40) return "Good effort! With practice, you'll excel even more! 📈";
    return "Keep learning and growing - every expert was once a beginner! 🚀";
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="text-center">
          <div className="w-24 h-24 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl hover:scale-110 transition-transform duration-300">
            <Award className="w-12 h-12 animate-pulse" />
          </div>
          <h2 className="text-5xl font-bold mb-4">{result.totalScore}%</h2>
          <p className="text-2xl mb-6 font-semibold">Overall Assessment Score</p>
          <p className="text-indigo-100 text-xl font-medium">{getMotivationalMessage(result.totalScore)}</p>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
            <TrendingUp className="w-6 h-6 text-white" />
          </div>
          Your Strengths Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(result.categoryScores).map(([category, score]) => (
            <div key={category} className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-gray-700 capitalize text-lg">{category} Skills</span>
                <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${getScoreColor(score)}`}>
                  {score}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className={`h-4 rounded-full transition-all duration-1000 shadow-lg ${
                    score >= 80 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                    score >= 60 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                    score >= 40 ? 'bg-gradient-to-r from-orange-400 to-orange-600' : 'bg-gradient-to-r from-red-400 to-red-600'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Recommendations */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
        <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
            <Target className="w-6 h-6 text-white" />
          </div>
          Personalized Career Recommendations
        </h3>
        <div className="space-y-8">
          {result.recommendations.map((rec, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
              <div className="flex justify-between items-start mb-6">
                <h4 className="text-2xl font-bold text-gray-800">{rec.career}</h4>
                <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {rec.matchPercentage}% Match
                </span>
              </div>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">{rec.description}</p>
              
              <div className="mb-6">
                <h5 className="font-bold text-gray-700 mb-3 flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mr-2 shadow-md">
                    <BookOpen className="w-4 h-4 text-white" />
                  </div>
                  Required Subjects:
                </h5>
                <div className="flex flex-wrap gap-3">
                  {rec.requiredSubjects.map((subject, idx) => (
                    <span key={idx} className="bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-shadow duration-200">
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 p-6 rounded-r-2xl shadow-lg">
                <h5 className="font-bold text-yellow-800 mb-3 flex items-center text-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg flex items-center justify-center mr-2 shadow-md">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  Real-Life Inspiration:
                </h5>
                <p className="text-yellow-700 text-base italic leading-relaxed font-medium">{rec.realLifeExample}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal Profile Summary */}
      <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-3xl p-8 border border-green-200 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          Your Personal Profile
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold text-gray-700 mb-3 text-lg">Goals:</h4>
            <p className="text-gray-600 leading-relaxed">{profile.goals}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-3 text-lg">Interests:</h4>
            <p className="text-gray-600 leading-relaxed">{profile.interests?.join(', ')}</p>
          </div>
          <div>
            <h4 className="font-bold text-gray-700 mb-3 text-lg">Career Dreams:</h4>
            <p className="text-gray-600 leading-relaxed">{profile.careerDreams}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onContinue}
          className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white px-12 py-4 rounded-2xl font-bold hover:from-green-700 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl text-lg"
        >
          Continue to Exam Preparation 📚
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;