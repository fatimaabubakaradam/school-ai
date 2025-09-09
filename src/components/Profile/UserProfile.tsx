import React from 'react';
import { ArrowLeft, User, Mail, GraduationCap, Trophy, Brain, Target, Calendar, Award } from 'lucide-react';
import { StudentProfile, QuizResult } from '../../types';

interface UserProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    class: string;
  };
  profile: StudentProfile | null;
  quizResult: QuizResult | null;
  onBack: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, profile, quizResult, onBack }) => {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 md:p-8 text-white mb-8">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4 text-blue-100">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Class: {user.class}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Student Profile Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Career Profile</h2>
            </div>

            {profile ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Goals & Aspirations</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile.goals}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Interests</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile.interests}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Career Dreams</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile.careerDreams}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">Strengths</h3>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{profile.strengths}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Complete the AI Career Coaching to see your profile</p>
              </div>
            )}
          </div>

          {/* Quiz Results Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Assessment Results</h2>
            </div>

            {quizResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <Trophy className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">{quizResult.totalScore}</div>
                    <div className="text-sm text-blue-600">Total Score</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{quizResult.percentage}%</div>
                    <div className="text-sm text-green-600">Percentage</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-700 mb-3">Category Scores</h3>
                  <div className="space-y-2">
                    {Object.entries(quizResult.categoryScores).map(([category, score]) => (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-gray-600 capitalize">{category.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                              style={{ width: `${(score / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{score}/10</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {quizResult.recommendations && quizResult.recommendations.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3">Career Recommendations</h3>
                    <div className="space-y-2">
                      {quizResult.recommendations.map((rec, index) => (
                        <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg">
                          <div className="font-medium text-gray-800">{rec.career}</div>
                          <div className="text-sm text-gray-600 mt-1">{rec.reason}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Complete the Career Assessment to see your results</p>
              </div>
            )}
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Learning Journey</h2>
          </div>

          <div className="space-y-4">
            {profile && (
              <div className="flex items-center space-x-4 p-4 bg-green-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Completed AI Career Coaching</div>
                  <div className="text-sm text-gray-600">Discovered your career interests and goals</div>
                </div>
              </div>
            )}

            {quizResult && (
              <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Completed Career Assessment</div>
                  <div className="text-sm text-gray-600">Scored {quizResult.percentage}% with personalized recommendations</div>
                </div>
              </div>
            )}

            {!profile && !quizResult && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">Your learning journey will appear here as you complete activities</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;