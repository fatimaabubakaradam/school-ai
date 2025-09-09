import React from 'react';
import { Target, BookOpen, MessageSquare, Award, ArrowRight, Users, Clock, TrendingUp, Star } from 'lucide-react';

interface HomePageProps {
  userName: string;
  userClass: string;
  onCardClick?: (cardId: string) => void;
  onSubjectClick?: (subject: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ userName, userClass, onCardClick, onSubjectClick }) => {
  // If onSubjectClick is provided, show subjects for exam prep
  if (onSubjectClick) {
    const subjects = [
      {
        id: 'mathematics',
        name: 'Mathematics',
        icon: '🔢',
        description: 'Algebra, Geometry, Calculus & Statistics',
        color: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        textColor: 'text-blue-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'physics',
        name: 'Physics',
        icon: '⚡',
        description: 'Mechanics, Waves, Electricity & Modern Physics',
        color: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50',
        textColor: 'text-purple-700',
        difficulty: 'Advanced'
      },
      {
        id: 'chemistry',
        name: 'Chemistry',
        icon: '⚗️',
        description: 'Organic, Inorganic & Physical Chemistry',
        color: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'english',
        name: 'English Language',
        icon: '📝',
        description: 'Grammar, Literature, Composition & Comprehension',
        color: 'from-orange-500 to-red-500',
        bgColor: 'bg-orange-50',
        textColor: 'text-orange-700',
        difficulty: 'Beginner'
      },
      {
        id: 'biology',
        name: 'Biology',
        icon: '🧬',
        description: 'Cell Biology, Genetics, Ecology & Human Biology',
        color: 'from-teal-500 to-green-500',
        bgColor: 'bg-teal-50',
        textColor: 'text-teal-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'agricultural-science',
        name: 'Agricultural Science',
        icon: '🌾',
        description: 'Crop Production, Animal Husbandry & Farm Management',
        color: 'from-amber-500 to-yellow-500',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'further-mathematics',
        name: 'Further Mathematics',
        icon: '📐',
        description: 'Advanced Algebra, Calculus & Mathematical Analysis',
        color: 'from-indigo-500 to-blue-500',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        difficulty: 'Advanced'
      },
      {
        id: 'geography',
        name: 'Geography',
        icon: '🌍',
        description: 'Physical Geography, Human Geography & Environmental Studies',
        color: 'from-emerald-500 to-teal-500',
        bgColor: 'bg-emerald-50',
        textColor: 'text-emerald-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'literature-in-english',
        name: 'Literature-in-English',
        icon: '📖',
        description: 'Poetry, Prose, Drama & Literary Analysis',
        color: 'from-rose-500 to-pink-500',
        bgColor: 'bg-rose-50',
        textColor: 'text-rose-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'government',
        name: 'Government',
        icon: '🏛️',
        description: 'Political Systems, Governance & Civic Education',
        color: 'from-slate-500 to-gray-600',
        bgColor: 'bg-slate-50',
        textColor: 'text-slate-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'history',
        name: 'History',
        icon: '📜',
        description: 'World History, African History & Historical Analysis',
        color: 'from-amber-600 to-orange-600',
        bgColor: 'bg-amber-50',
        textColor: 'text-amber-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'crs-irs',
        name: 'CRS/IRS',
        icon: '✝️',
        description: 'Christian/Islamic Religious Studies & Moral Education',
        color: 'from-violet-500 to-purple-600',
        bgColor: 'bg-violet-50',
        textColor: 'text-violet-700',
        difficulty: 'Beginner'
      },
      {
        id: 'accounting',
        name: 'Accounting',
        icon: '💰',
        description: 'Financial Accounting, Cost Accounting & Business Finance',
        color: 'from-green-600 to-emerald-600',
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        difficulty: 'Intermediate'
      },
      {
        id: 'commerce',
        name: 'Commerce',
        icon: '🏪',
        description: 'Trade, Business Operations & Commercial Activities',
        color: 'from-cyan-500 to-blue-500',
        bgColor: 'bg-cyan-50',
        textColor: 'text-cyan-700',
        difficulty: 'Beginner'
      },
      {
        id: 'economics',
        name: 'Economics',
        icon: '📈',
        description: 'Microeconomics, Macroeconomics & Development',
        color: 'from-indigo-500 to-purple-500',
        bgColor: 'bg-indigo-50',
        textColor: 'text-indigo-700',
        difficulty: 'Advanced'
      },
      {
        id: 'marketing',
        name: 'Marketing',
        icon: '📢',
        description: 'Marketing Principles, Consumer Behavior & Digital Marketing',
        color: 'from-pink-500 to-rose-500',
        bgColor: 'bg-pink-50',
        textColor: 'text-pink-700',
        difficulty: 'Beginner'
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
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <div
              key={subject.id}
              onClick={() => onSubjectClick(subject.id)}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {subject.icon}
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(subject.difficulty)}`}>
                    {subject.difficulty}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900">
                  {subject.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {subject.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-gray-300" />
                    <span className="text-xs text-gray-500 ml-1">4.0</span>
                  </div>
                  <div className={`text-xs font-semibold ${subject.textColor} group-hover:underline`}>
                    Start Learning →
                  </div>
                </div>
              </div>

              <div className={`h-1 bg-gradient-to-r ${subject.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Main home page with feature cards
  const mainFeatures = [
    {
      id: 'career-discovery',
      title: 'Career Discovery',
      description: 'Explore exciting career paths that align with your interests, strengths, and aspirations through personalized assessments.',
      icon: Target,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      features: ['Personality Assessment', 'Interest Matching', 'Career Exploration', 'Future Planning']
    },
    {
      id: 'academic-alignment',
      title: 'Academic Alignment',
      description: 'Get guidance on choosing the right subjects and academic paths that support your career goals.',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      features: ['Subject Selection', 'Course Planning', 'University Prep', 'Academic Strategy']
    },
    {
      id: 'ai-coaching',
      title: 'AI Coaching',
      description: 'Receive personalized guidance and mentorship from our intelligent AI coach tailored to your unique journey.',
      icon: MessageSquare,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      features: ['Personal Guidance', 'Goal Setting', 'Progress Tracking', '24/7 Support']
    },
    {
      id: 'exam-preparation',
      title: 'Exam Preparation',
      description: 'Master your subjects with comprehensive study materials, practice questions, and exam strategies.',
      icon: Award,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      features: ['Practice Tests', 'Study Materials', 'Performance Analytics', 'Exam Strategies']
    }
  ];

  return (
    <div className="p-8">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Welcome back, <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{userName}</span>! 👋
        </h1>
        <p className="text-xl text-gray-600 mb-6">Class {userClass} • Ready to shape your future?</p>
        <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 max-w-4xl mx-auto border border-blue-100">
          <p className="text-lg text-gray-700 leading-relaxed">
            Your journey to discovering the perfect career path starts here. Explore our comprehensive tools designed to help you understand your strengths, align your academics, and prepare for success.
          </p>
        </div>
      </div>

      {/* Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {mainFeatures.map((feature) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={feature.id}
              onClick={() => onCardClick?.(feature.id)}
              className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-2 border border-gray-100 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                      {feature.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {feature.description}
                </p>

                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Key Features</p>
                  <div className="grid grid-cols-2 gap-2">
                    {feature.features.map((item, index) => (
                      <div key={index} className={`${feature.bgColor} rounded-lg px-3 py-2 text-sm font-medium text-gray-700`}>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Join thousands of students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
                    <span>Get Started</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>

              <div className={`h-2 bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-3xl p-8 border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Your Learning Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Target className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-800">4</p>
            <p className="text-sm text-gray-600 font-medium">Core Features</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Award className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0</p>
            <p className="text-sm text-gray-600 font-medium">Achievements</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0h</p>
            <p className="text-sm text-gray-600 font-medium">Study Time</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <p className="text-3xl font-bold text-gray-800">0%</p>
            <p className="text-sm text-gray-600 font-medium">Progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;