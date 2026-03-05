import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Bus, Eye, EyeOff, AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful login
      console.log('Login attempt with:', formData);
      
      // Redirect to dashboard or home
      navigate('/dashboard');
    } catch (error) {
      setErrors({ general: 'Invalid email or password' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <Bus className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                EA Coach
              </span>
            </Link>
            <Link
              to="/signup"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Don't have an account? <span className="font-semibold text-blue-400 hover:text-blue-600">Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left Column - Form */}
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                    Welcome Back!
                  </h1>
                  <p className="text-gray-600">
                    Sign in to continue your journey with EA Coach
                  </p>
                </div>

                {errors.general && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                    <p className="text-red-600 text-sm">{errors.general}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                          errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                      />
                      <span className="text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm text-blue-400 hover:text-blue-600 font-semibold"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 group"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  {/* Social Login */}
                  {/* <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-gray-500">Or continue with</span>
                    </div>
                  </div> */}

                  {/* <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                      <span className="text-sm font-medium">Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center space-x-2 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877f2">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                  </div> */}
                </form>
              </div>

              {/* Right Column - Hero */}
              <div className="relative hidden md:block bg-gradient-to-br from-primary to-secondary p-12">
                <div className="absolute inset-0 opacity-50">
                  <img
                    src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=1200&fit=crop"
                    alt="Bus travel"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                  <div>
                    <h2 className="text-3xl font-bold mb-4">Start Your Journey</h2>
                    <p className="text-white/90 text-lg leading-relaxed">
                      Join thousands of travelers who trust EA Coach for comfortable and reliable bus travel across East Africa.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl font-bold">50+</div>
                        <div className="text-sm opacity-80">Destinations</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl font-bold">100+</div>
                        <div className="text-sm opacity-80">Daily Trips</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl font-bold">10+</div>
                        <div className="text-sm opacity-80">Bus Partners</div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                        <div className="text-2xl font-bold">24/7</div>
                        <div className="text-sm opacity-80">Support</div>
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                      <p className="text-sm italic mb-3">
                        "EA Coach makes booking bus tickets so easy! I can travel from Kampala to Nairobi without any hassle."
                      </p>
                      <div className="flex items-center space-x-3">
                        {/* <img
                          src="https://images.unsplash.com/photo-1494790108777-466d853a5d7f?w=50&h=50&fit=crop"
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        /> */}
                        <div>
                          <p className="font-semibold">UY</p>
                          <p className="text-xs opacity-80">Regular Traveler</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;