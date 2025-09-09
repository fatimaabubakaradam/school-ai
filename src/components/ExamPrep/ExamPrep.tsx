import React from 'react';
import { BookOpen, Star, Clock, Users, ArrowRight, Target, Brain, Zap } from 'lucide-react';

interface ExamPrepProps {
  onComplete: () => void;
  onSubjectClick: (subjectId: string) => void;
}

const ExamPrep: React.FC<ExamPrepProps> = ({ onComplete, onSubjectClick }) => {
  const subjects = [
    {
      id: 'mathematics',
      name: 'Mathematics',
      icon: '🔢',
      description: 'Algebra, Geometry, Calculus & Statistics',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'english',
      name: 'English Language',
      icon: '📝',
      description: 'Grammar, Literature, Composition & Comprehension',
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      difficulty: 'Beginner',
      topics: 9,
      questions: 90
    },
    {
      id: 'physics',
      name: 'Physics',
      icon: '⚡',
      description: 'Mechanics, Waves, Electricity & Modern Physics',
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      difficulty: 'Advanced',
      topics: 9,
      questions: 90
    },
    {
      id: 'chemistry',
      name: 'Chemistry',
      icon: '⚗️',
      description: 'Organic, Inorganic & Physical Chemistry',
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'biology',
      name: 'Biology',
      icon: '🧬',
      description: 'Cell Biology, Genetics, Ecology & Human Biology',
      color: 'from-teal-500 to-green-500',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'agricultural-science',
      name: 'Agricultural Science',
      icon: '🌾',
      description: 'Crop Production, Animal Husbandry & Farm Management',
      color: 'from-amber-500 to-yellow-500',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'further-mathematics',
      name: 'Further Mathematics',
      icon: '📐',
      description: 'Advanced Algebra, Calculus & Mathematical Analysis',
      color: 'from-indigo-500 to-blue-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      difficulty: 'Advanced',
      topics: 9,
      questions: 90
    },
    {
      id: 'geography',
      name: 'Geography',
      icon: '🌍',
      description: 'Physical Geography, Human Geography & Environmental Studies',
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'literature-in-english',
      name: 'Literature-in-English',
      icon: '📖',
      description: 'Poetry, Prose, Drama & Literary Analysis',
      color: 'from-rose-500 to-pink-500',
      bgColor: 'bg-rose-50',
      textColor: 'text-rose-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'government',
      name: 'Government',
      icon: '🏛️',
      description: 'Political Systems, Governance & Civic Education',
      color: 'from-slate-500 to-gray-600',
      bgColor: 'bg-slate-50',
      textColor: 'text-slate-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'history',
      name: 'History',
      icon: '📜',
      description: 'World History, African History & Historical Analysis',
      color: 'from-amber-600 to-orange-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'irs',
      name: 'Islamic Religious Studies',
      icon: '☪️',
      description: 'Quran, Hadith, Islamic Law & History',
      color: 'from-emerald-600 to-green-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      difficulty: 'Beginner',
      topics: 9,
      questions: 90
    },
    {
      id: 'crs',
      name: 'Christian Religious Studies',
      icon: '✝️',
      description: 'Bible Studies, Theology & Christian Ethics',
      color: 'from-violet-500 to-purple-600',
      bgColor: 'bg-violet-50',
      textColor: 'text-violet-700',
      difficulty: 'Beginner',
      topics: 9,
      questions: 90
    },
    {
      id: 'accounting',
      name: 'Accounting',
      icon: '💰',
      description: 'Financial Accounting, Cost Accounting & Business Finance',
      color: 'from-green-600 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      difficulty: 'Intermediate',
      topics: 9,
      questions: 90
    },
    {
      id: 'commerce',
      name: 'Commerce',
      icon: '🏪',
      description: 'Trade, Business Operations & Commercial Activities',
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      difficulty: 'Beginner',
      topics: 9,
      questions: 90
    },
    {
      id: 'economics',
      name: 'Economics',
      icon: '📈',
      description: 'Microeconomics, Macroeconomics & Development',
      color: 'from-indigo-500 to-purple-500',
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-700',
      difficulty: 'Advanced',
      topics: 9,
      questions: 90
    },
    {
      id: 'marketing',
      name: 'Marketing',
      icon: '📢',
      description: 'Marketing Principles, Consumer Behavior & Digital Marketing',
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-700',
      difficulty: 'Beginner',
      topics: 9,
      questions: 90
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <div className="w-16 md:w-20 h-16 md:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
          <BookOpen className="w-8 md:w-10 h-8 md:h-10 text-white" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Exam Preparation</h2>
        <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
          Master your subjects with comprehensive study materials, practice questions, and exam strategies across all 17 subjects.
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Target className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">17</p>
          <p className="text-sm md:text-base text-gray-600 font-medium">Subjects</p>
        </div>
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Brain className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">153</p>
          <p className="text-sm md:text-base text-gray-600 font-medium">Topics</p>
        </div>
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <Zap className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">1,530</p>
          <p className="text-sm md:text-base text-gray-600 font-medium">Questions</p>
        </div>
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-12 md:w-16 h-12 md:h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
            <BookOpen className="w-6 md:w-8 h-6 md:h-8 text-white" />
          </div>
          <p className="text-2xl md:text-3xl font-bold text-gray-800">0%</p>
          <p className="text-sm md:text-base text-gray-600 font-medium">Progress</p>
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => onSubjectClick(subject.id)}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden"
          >
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl md:text-4xl group-hover:scale-110 transition-transform duration-300">
                  {subject.icon}
                </div>
                <div className={`px-2 md:px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(subject.difficulty)}`}>
                  {subject.difficulty}
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 leading-tight">
                {subject.name}
              </h3>
              <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                {subject.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Topics</span>
                  <span className="font-semibold text-gray-700">{subject.topics}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Questions</span>
                  <span className="font-semibold text-gray-700">{subject.questions}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <Star className="w-4 h-4 text-gray-300" />
                  <span className="text-xs text-gray-500 ml-1">4.0</span>
                </div>
                <div className={`text-xs font-semibold ${subject.textColor} group-hover:underline flex items-center space-x-1`}>
                  <span>Start Learning</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div className={`h-1 bg-gradient-to-r ${subject.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-8 md:mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-6 md:p-8 border border-blue-200 shadow-lg max-w-4xl mx-auto">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Ready to Excel in Your Exams?</h3>
          <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
            Choose any subject above to start your comprehensive exam preparation journey. Each subject contains detailed study materials and practice questions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <button
              onClick={() => onSubjectClick('mathematics')}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start with Mathematics 🔢
            </button>
            <button
              onClick={() => onSubjectClick('english')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start with English 📝
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamPrep;