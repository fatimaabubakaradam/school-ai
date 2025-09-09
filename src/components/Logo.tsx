import React from 'react';
import { GraduationCap, Star, Target } from 'lucide-react';

const Logo: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-16 h-16'
  };

  const textSizeClasses = {
    small: 'text-lg',
    medium: 'text-2xl',
    large: 'text-3xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer border-2 border-white/20`}>
          <GraduationCap className="text-white w-1/2 h-1/2" />
        </div>
        <div className="absolute -top-1 -right-1 animate-pulse">
          <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <Star className="text-white w-2 h-2 fill-current" />
          </div>
        </div>
      </div>
      <div>
        <h1 className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-pink-600 hover:to-blue-600 transition-all duration-500`}>
          Schooby
        </h1>
        {size !== 'small' && (
          <p className="text-gray-600 text-sm -mt-1 font-medium">Career Guidance Platform</p>
        )}
      </div>
    </div>
  );
};

export default Logo;