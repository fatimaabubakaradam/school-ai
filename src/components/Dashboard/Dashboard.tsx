import React from 'react';
import { Target, BookOpen, MessageSquare, Award, ArrowRight, Users, Clock, TrendingUp, Star, Brain, Lightbulb, GraduationCap, Zap } from 'lucide-react';

interface DashboardProps {
  userName: string;
  userClass: string;
  onCardClick: (cardId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userName, userClass, onCardClick }) => {
  const mainFeatures = [
    {
      id: 'career-discovery',
      title: 'Career Discovery',
      description: 'Explore exciting career paths that align with your interests, strengths, and aspirations through personalized assessments.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      features: ['Personality Assessment', 'Interest Matching', 'Career Exploration', 'Future Planning'],
      stats: '15+ Career Paths'
    },
    {
      id: 'exam-preparation',
      title: 'Exam Preparation',
      description: 'Master your subjects with comprehensive study materials, detailed notes, practice questions, and interactive modules.',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      features: ['Study Notes', 'Practice Tests', 'Interactive Modules', 'Progress Tracking'],
      stats: '6 Subjects • 500+ Questions'
    }
  ];

  return (
    <div className="p-4 md:p-8">
      {/* Welcome Section */}
      <div className="text-center mb-8 md:mb-12">
        <div className="relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Welcome to your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Dashboard</span>, {userName}! 👋
          </h1>
          <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-6 md:w-8 h-6 md:h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse opacity-80"></div>
        </div>
        <p className="text-lg md:text-xl text-gray-600 mb-4 md:mb-6">Class {userClass} • Ready to shape your future?</p>
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-4 md:p-6 max-w-4xl mx-auto border border-blue-100 shadow-lg">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-3 md:mb-4">
            <Lightbulb className="w-6 md:w-8 h-6 md:h-8 text-yellow-500 animate-pulse" />
            <Zap className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
            <Star className="w-6 md:w-8 h-6 md:h-8 text-purple-500 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            Your journey to discovering the perfect career path starts here. Explore our comprehensive tools designed to help you understand your strengths, align your academics, and prepare for success.
          </p>
        </div>
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-8 md:mb-12 max-w-6xl mx-auto">
        {mainFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              onClick={() => onCardClick(feature.id)}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden relative min-h-[350px] md:min-h-[400px]"
            >
              {/* Gradient overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="p-6 md:p-8 lg:p-10 relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <div className={`w-16 md:w-20 h-16 md:h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 md:w-10 h-8 md:h-10 text-white" />
                  </div>
                  <div className={`${feature.bgColor} px-4 py-2 rounded-full`}>
                    <span className="text-sm md:text-base font-bold text-gray-700">{feature.stats}</span>
                  </div>
                </div>

                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300 mb-3 md:mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  <p className="text-sm md:text-base font-semibold text-gray-500 uppercase tracking-wide">Key Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, index) => (
                      <div key={index} className={`${feature.bgColor} rounded-lg px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-medium text-gray-700 border border-gray-200`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 md:pt-6 border-t border-gray-100 mt-auto">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="w-4 md:w-5 h-4 md:h-5" />
                    <span className="text-sm md:text-base">Join thousands of students</span>
                  </div>
                  <div className={`flex items-center space-x-2 text-transparent bg-gradient-to-r ${feature.color} bg-clip-text font-bold group-hover:scale-105 transition-transform duration-300`}>
                    <span className="text-base md:text-lg">Get Started</span>
                    <ArrowRight className="w-5 md:w-6 h-5 md:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              <div className={`h-2 md:h-3 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-6 md:p-8 border border-gray-200 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center flex items-center justify-center space-x-2 md:space-x-3">
          <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-blue-500" />
          <span>Your Learning Journey</span>
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg group-hover:shadow-xl">
              <Target className="w-6 md:w-8 h-6 md:h-8 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">4</p>
            <p className="text-sm text-gray-600 font-medium">Core Features</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg group-hover:shadow-xl">
              <Award className="w-6 md:w-8 h-6 md:h-8 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-600 font-medium">Achievements</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg group-hover:shadow-xl">
              <Clock className="w-6 md:w-8 h-6 md:h-8 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">0h</p>
            <p className="text-sm text-gray-600 font-medium">Study Time</p>
          </div>
          <div className="text-center group hover:scale-105 transition-transform duration-300">
            <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 shadow-lg group-hover:shadow-xl">
              <TrendingUp className="w-6 md:w-8 h-6 md:h-8 text-white" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-gray-800">0%</p>
            <p className="text-sm text-gray-600 font-medium">Progress</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 md:mt-8 text-center">
        <p className="text-gray-600 mb-3 md:mb-4">Ready to get started?</p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
          <button
            onClick={() => onCardClick('ai-coaching')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Start AI Coaching 🤖
          </button>
          <button
            onClick={() => onCardClick('career-discovery')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-5 md:px-6 py-2 md:py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Discover Careers 🎯
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;