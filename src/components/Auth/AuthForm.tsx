import React, { useState } from 'react';
import { User, Lock, Users, Eye, EyeOff, Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import Logo from '../Logo';
import { useAuth } from '../../hooks/useAuth';

interface AuthFormProps {
  onLogin: (user: { id: string; name: string; email: string; class: string }) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onLogin }) => {
  const { signUp, signIn } = useAuth();
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    class: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const classes = ['JSS1', 'JSS2', 'JSS3', 'SS1', 'SS2', 'SS3'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (isSignUp && !formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (isSignUp && formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }

    if (isSignUp && !formData.class) {
      newErrors.class = 'Please select your class';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      if (isSignUp) {
        const { user, error } = await signUp(
          formData.name,
          formData.email,
          formData.password,
          formData.class
        );
        
        if (error) {
          if (error.message.includes('already registered')) {
            setErrors({ general: 'An account with this email already exists. Please sign in instead.' });
          } else {
            setErrors({ general: error.message });
          }
        } else if (user) {
          // Automatically redirect to sign-in page after successful sign-up
          setIsSignUp(false);
          setFormData({ name: '', email: formData.email, password: '', class: '' });
          setErrors({});
          // Show success message
          setErrors({ general: 'Account created successfully! Please sign in with your credentials.' });
          setTimeout(() => setErrors({}), 3000);
        }
      } else {
        const { user, error } = await signIn(formData.email, formData.password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setErrors({ general: 'Invalid email or password. Please check your credentials and try again.' });
          } else {
            setErrors({ general: error.message });
          }
        } else if (user) {
          // User will be automatically loaded by the auth hook
          // onLogin will be called when user state updates
        }
      }
    } catch (error) {
      setErrors({ general: 'An unexpected error occurred. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setFormData({ name: '', email: '', password: '', class: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-3 md:p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <Logo size="large" />
            <p className="text-gray-600 mt-3 md:mt-4 text-base md:text-lg leading-relaxed">
              {isSignUp 
                ? "Join thousands of students discovering their career paths"
                : "Welcome back! Continue your career journey"
              }
            </p>
          </div>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6 md:mb-8">
            <button
              type="button"
              onClick={() => !isSignUp && switchMode()}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                isSignUp 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => isSignUp && switchMode()}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                !isSignUp 
                  ? 'bg-white text-gray-800 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign In
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            {errors.general && (
              <div className={`border px-3 md:px-4 py-2 md:py-3 rounded-xl flex items-center space-x-2 ${
                errors.general.includes('successfully') 
                  ? 'bg-green-50 border-green-200 text-green-700' 
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}>
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm md:text-base">{errors.general}</span>
              </div>
            )}

            {isSignUp && (
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm md:text-base ${
                      errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.name}</span>
                </p>}
              </div>
            )}

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm md:text-base ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email address"
                />
              </div>
              {errors.email && <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.email}</span>
              </p>}
            </div>

            <div>
              <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full pl-9 md:pl-10 pr-10 md:pr-12 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm md:text-base ${
                    errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder={isSignUp ? "Create a password (min. 6 characters)" : "Enter your password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition duration-200"
                >
                  {showPassword ? <EyeOff className="w-4 md:w-5 h-4 md:h-5" /> : <Eye className="w-4 md:w-5 h-4 md:h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.password}</span>
              </p>}
            </div>

            {isSignUp && (
              <div>
                <label className="block text-sm md:text-base font-medium text-gray-700 mb-2">
                  Class
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  <select
                    value={formData.class}
                    onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                    className={`w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 md:py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 appearance-none bg-white text-sm md:text-base ${
                      errors.class ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select your class</option>
                    {classes.map((cls) => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                  <ArrowRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 w-3 md:w-4 h-3 md:h-4 pointer-events-none" />
                </div>
                {errors.class && <p className="text-red-500 text-xs md:text-sm mt-1 flex items-center space-x-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.class}</span>
                </p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 md:py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 text-sm md:text-base"
            >
              {isLoading ? (
                <>
                  <div className="w-4 md:w-5 h-4 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Please wait...</span>
                </>
              ) : (
                <>
                  <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 md:w-5 h-4 md:h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-4 md:mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : 'New to Schooby?'}
            </p>
            <button
              onClick={switchMode}
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 mt-1 text-sm md:text-base"
            >
              {isSignUp ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;