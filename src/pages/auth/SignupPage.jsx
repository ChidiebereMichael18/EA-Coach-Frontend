import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, Mail, Lock, Phone, ArrowRight, Bus, Eye, EyeOff, 
  AlertCircle, CheckCircle, ChevronRight 
} from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Name must be at least 3 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase and number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
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

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (currentStep === 1) {
      handleNextStep();
      return;
    }
    
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock successful registration
      console.log('Registration data:', formData);
      
      // Redirect to login or dashboard
      navigate('/login?registered=true');
    } catch (error) {
      setErrors({ general: 'Registration failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (/(?=.*[a-z])/.test(password)) strength++;
    if (/(?=.*[A-Z])/.test(password)) strength++;
    if (/(?=.*\d)/.test(password)) strength++;
    if (/(?=.*[!@#$%^&*])/.test(password)) strength++;
    
    return strength;
  };

  const getPasswordStrengthText = () => {
    const strength = passwordStrength();
    if (strength <= 2) return { text: 'Weak', color: 'text-red-500', bg: 'bg-red-500' };
    if (strength <= 4) return { text: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-500' };
    return { text: 'Strong', color: 'text-green-500', bg: 'bg-green-500' };
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
              to="/login"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Already have an account? <span className="font-semibold text-blue-400 hover:text-blue-600">Sign In</span>
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Personal Info</span>
              </div>
              <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-blue-200' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Security</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                  Create Your Account
                </h1>
                <p className="text-gray-600">
                  Join EA Coach for easy and convenient bus bookings across East Africa
                </p>
              </div>

              {errors.general && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                            errors.fullName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                      )}
                    </div>

                    {/* Email */}
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

                    {/* Phone Number */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+256 700 123 456"
                          className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                            errors.phone ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all transform hover:scale-105 flex items-center justify-center space-x-2 group"
                    >
                      <span>Continue</span>
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Step 2: Security */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    {/* Password */}
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
                          placeholder="Create a strong password"
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
                      
                      {/* Password Strength Indicator */}
                      {formData.password && (
                        <div className="mt-2">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getPasswordStrengthText().bg}`}
                                style={{ width: `${(passwordStrength() / 5) * 100}%` }}
                              ></div>
                            </div>
                            <span className={`text-sm font-medium ${getPasswordStrengthText().color}`}>
                              {getPasswordStrengthText().text}
                            </span>
                          </div>
                          <ul className="space-y-1 text-sm">
                            <li className="flex items-center space-x-2">
                              {formData.password.length >= 8 ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <AlertCircle size={14} className="text-gray-400" />
                              )}
                              <span className={formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}>
                                At least 8 characters
                              </span>
                            </li>
                            <li className="flex items-center space-x-2">
                              {/(?=.*[a-z])/.test(formData.password) ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <AlertCircle size={14} className="text-gray-400" />
                              )}
                              <span className={/(?=.*[a-z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                Contains lowercase letter
                              </span>
                            </li>
                            <li className="flex items-center space-x-2">
                              {/(?=.*[A-Z])/.test(formData.password) ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <AlertCircle size={14} className="text-gray-400" />
                              )}
                              <span className={/(?=.*[A-Z])/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                Contains uppercase letter
                              </span>
                            </li>
                            <li className="flex items-center space-x-2">
                              {/(?=.*\d)/.test(formData.password) ? (
                                <CheckCircle size={14} className="text-green-500" />
                              ) : (
                                <AlertCircle size={14} className="text-gray-400" />
                              )}
                              <span className={/(?=.*\d)/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}>
                                Contains number
                              </span>
                            </li>
                          </ul>
                        </div>
                      )}
                      {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          placeholder="Confirm your password"
                          className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                      )}
                    </div>

                    {/* Terms Agreement */}
                    <div className="space-y-2">
                      <label className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleChange}
                          className="mt-1 w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the{' '}
                          <Link to="/terms" className="text-primary hover:text-blue-600 font-semibold">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy" className="text-primary hover:text-blue-600 font-semibold">
                            Privacy Policy
                          </Link>
                        </span>
                      </label>
                      {errors.agreeToTerms && (
                        <p className="text-sm text-red-600">{errors.agreeToTerms}</p>
                      )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex space-x-4">
                      <button
                        type="button"
                        onClick={handlePreviousStep}
                        className="flex-1 border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Creating Account...</span>
                          </>
                        ) : (
                          <>
                            <span>Sign Up</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>

              {/* Benefits */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-700 mb-4">
                  By joining EA Coach, you'll get:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm text-gray-600">Easy booking process</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm text-gray-600">Secure payments</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                    <span className="text-sm text-gray-600">24/7 customer support</span>
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

export default SignupPage;