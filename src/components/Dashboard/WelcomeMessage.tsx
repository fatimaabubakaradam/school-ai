import React from 'react';
import { Sparkles, Target, BookOpen, TrendingUp } from 'lucide-react';

interface WelcomeMessageProps {
  userName: string;
  userClass: string;
  onStartJourney: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName, userClass, onStartJourney }) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl border border-white/20">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white bg-opacity-10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white bg-opacity-10 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-white bg-opacity-5 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative z-10">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          <h2 className="text-3xl font-bold">Welcome to Schooby, {userName}!</h2>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block mb-6">
          <p className="text-white font-semibold">Class: {userClass}</p>
        </div>
        
        <div className="text-lg mb-8 leading-relaxed space-y-4">
          <p className="mb-4">
            🎯 <strong>Discover your career path</strong> - Explore exciting opportunities that align with your interests and strengths
          </p>
          <p className="mb-4">
            📚 <strong>Align academic choices</strong> - Get guidance on subjects that matter for your future career
          </p>
          <p className="mb-4">
            💡 <strong>Get career suggestions</strong> - Receive personalized recommendations based on your unique profile
          </p>
          <p>
            🚀 <strong>Stay motivated</strong> - Learn from real-life success stories and stay inspired on your journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-white/30">
            <Target className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="font-semibold mb-1">Career Discovery</h3>
            <p className="text-sm text-indigo-100">Find your perfect career match</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-white/30">
            <BookOpen className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="font-semibold mb-1">Academic Guidance</h3>
            <p className="text-sm text-indigo-100">Choose the right subjects</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-30 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-white/30">
            <TrendingUp className="w-10 h-10 mx-auto mb-3 text-yellow-300" />
            <h3 className="font-semibold mb-1">Exam Preparation</h3>
            <p className="text-sm text-indigo-100">Excel in your studies</p>
          </div>
        </div>

        <button
          onClick={onStartJourney}
          className="bg-white text-purple-600 px-10 py-4 rounded-2xl font-bold hover:bg-gray-100 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-white/50 text-lg"
        >
          Start Your Journey 🚀
        </button>
      </div>
    </div>
  );
};

export default WelcomeMessage;