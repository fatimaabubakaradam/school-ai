import React, { useState } from 'react';
import { Star, MessageSquare, Users, ThumbsUp, Send } from 'lucide-react';
import { DatabaseService } from '../../services/database';

interface FeedbackFormProps {
  userId: string;
  onSubmit: (feedback: any) => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ userId, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0 && !isLoading) {
      setIsLoading(true);
      
      const feedback = {
        userId,
        rating,
        comment,
        date: new Date()
      };
      
      // Save feedback to database
      const { error } = await DatabaseService.saveFeedback(userId, rating, comment);
      
      if (!error) {
        onSubmit(feedback);
        setIsSubmitted(true);
      }
      
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
            <ThumbsUp className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">Thank You!</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            Your feedback has been submitted successfully. We appreciate your input and will use it to improve Schooby!
          </p>
          <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 mb-8 border border-blue-200 shadow-lg">
            <h3 className="font-bold text-gray-800 mb-6 text-xl">🎉 Congratulations on completing your career journey!</h3>
            <div className="text-left space-y-3">
              <p className="text-gray-700 flex items-center text-lg"><span className="text-2xl mr-3">✅</span> Discovered your career interests</p>
              <p className="text-gray-700 flex items-center text-lg"><span className="text-2xl mr-3">✅</span> Assessed your academic strengths</p>
              <p className="text-gray-700 flex items-center text-lg"><span className="text-2xl mr-3">✅</span> Received personalized career recommendations</p>
              <p className="text-gray-700 flex items-center text-lg"><span className="text-2xl mr-3">✅</span> Practiced with exam preparation quizzes</p>
            </div>
          </div>
          <p className="text-blue-600 font-bold text-xl">
            Keep working towards your dreams! Your future is bright! 🌟
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full translate-y-12 -translate-x-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <h2 className="text-3xl font-bold mb-6 flex items-center relative z-10">
          <div className="w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-2xl flex items-center justify-center mr-4 shadow-lg">
            <MessageSquare className="w-8 h-8" />
          </div>
          Share Your Experience
        </h2>
        <p className="text-purple-100 text-xl leading-relaxed relative z-10">
          Help us improve Schooby by sharing your feedback. Your opinion matters to us!
        </p>
      </div>

      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-white/30">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              How would you rate your experience with AspirelyHub?
            </h3>
            <div className="flex space-x-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-3 transition-all duration-300 hover:scale-125 transform hover:-translate-y-1"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-current drop-shadow-lg'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <p className="text-base text-gray-600 mt-4 text-center font-medium">
              {rating === 5 && "Excellent! We're so glad you loved it! 🌟"}
              {rating === 4 && "Great! We're happy you had a positive experience! 😊"}
              {rating === 3 && "Good! Thanks for your feedback! 👍"}
              {rating === 2 && "We'll work on improving your experience! 💪"}
              {rating === 1 && "We're sorry to hear that. We'll do better! 🙏"}
            </p>
          </div>

          <div>
            <label className="block text-xl font-bold text-gray-800 mb-4">
              Tell us more about your experience (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like most? What could we improve? Any suggestions?"
              rows={6}
              className="w-full p-6 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none text-lg shadow-inner hover:shadow-lg"
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0 || isLoading}
            className="w-full bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-5 rounded-2xl font-bold hover:from-purple-700 hover:via-pink-700 hover:to-red-700 disabled:from-gray-300 disabled:via-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-3xl flex items-center justify-center space-x-3 text-lg disabled:transform-none disabled:shadow-lg"
          >
            <Send className="w-6 h-6" />
            <span>{isLoading ? 'Submitting...' : 'Submit Feedback'}</span>
          </button>
        </form>
      </div>

      {/* Sample Reviews */}
      <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-3xl p-8 border border-blue-200 shadow-xl">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-3 shadow-lg">
            <Users className="w-6 h-6 text-white" />
          </div>
          What Other Students Say
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-white/50">
            <div className="flex items-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              ))}
            </div>
            <p className="text-gray-600 mb-3 leading-relaxed">
              "Schooby helped me discover that I have a passion for engineering! The career recommendations were spot on."
            </p>
            <p className="text-gray-500 text-sm font-semibold">- Adebayo, SS2 Student</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:-translate-y-1 border border-white/50">
            <div className="flex items-center space-x-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 text-yellow-400 fill-current drop-shadow-sm" />
              ))}
            </div>
            <p className="text-gray-600 mb-3 leading-relaxed">
              "The exam prep questions really helped me prepare for my WAEC. I feel more confident now!"
            </p>
            <p className="text-gray-500 text-sm font-semibold">- Fatima, SS3 Student</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;