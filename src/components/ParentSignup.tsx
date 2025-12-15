import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Phone } from 'lucide-react';
import { useState } from 'react';

interface ParentSignupProps {
  onBack: () => void;
  onSignup: () => void;
  onLogin: () => void;
}

export function ParentSignup({ onBack, onSignup, onLogin }: ParentSignupProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const handleSignup = () => {
    if (
      formData.fullName.trim() &&
      formData.email.trim() &&
      formData.password.trim() &&
      formData.confirmPassword.trim() &&
      formData.password === formData.confirmPassword &&
      agreeToTerms
    ) {
      onSignup();
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-16 py-20">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 bg-white px-8 py-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer border-none text-[#333333] mb-12 text-[20px]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        {/* Main Signup Card */}
        <div className="bg-white rounded-[24px] p-16 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="mb-16">
            <div className="w-28 h-28 bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[20px] flex items-center justify-center mb-10">
              <span className="text-[56px]">🌟</span>
            </div>
            <h2 className="text-[#333333] m-0 mb-4">Create Parent Account</h2>
            <p className="text-[#333333] opacity-60 m-0 text-[26px]">
              Join us to track your child's cultural learning journey
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-[#333333] mb-5 text-[24px]">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="Enter your full name"
                  className="w-full pl-16 pr-6 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-[#333333] mb-5 text-[24px]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="parent@example.com"
                  className="w-full pl-16 pr-6 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                />
              </div>
            </div>

            {/* Phone (Optional) */}
            <div>
              <label className="block text-[#333333] mb-5 text-[24px]">
                Phone Number <span className="opacity-50">(Optional)</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-16 pr-6 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#333333] mb-5 text-[24px]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-16 pr-16 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#333333] opacity-40 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0"
                >
                  {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
                </button>
            </div>
            {formData.password && formData.password.length < 8 && (
              <p className="text-[#F475A8] mt-2 text-[18px] m-0 font-medium">
                Weak password (must be at least 8 characters)
              </p>
            )}
            {formData.password && formData.password.length >= 8 && (
              <p className="text-[#7BC67E] mt-2 text-[18px] m-0 font-medium">
                Strong password
              </p>
            )}
            <p className="text-[#333333] opacity-50 mt-2 text-[16px] m-0">
              Must be at least 8 characters with numbers and letters
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-[#333333] mb-5 text-[24px]">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="Re-enter your password"
                className="w-full pl-16 pr-16 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                onKeyPress={(e) => e.key === 'Enter' && handleSignup()}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#333333] opacity-40 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0"
              >
                {showConfirmPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
              </button>
            </div>
            {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-[#F475A8] mt-4 text-[20px] m-0 font-bold">
                Passwords do not match
              </p>
            )}
            {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
              <p className="text-[#7BC67E] mt-4 text-[20px] m-0 font-bold">
                Passwords match!
              </p>
            )}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mt-12">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="w-7 h-7 rounded cursor-pointer accent-[#4A90E2] mt-1"
            />
            <span className="text-[#333333] text-[22px] leading-relaxed">
              I agree to the{' '}
              <a href="#" className="text-[#4A90E2] hover:underline no-underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-[#4A90E2] hover:underline no-underline">
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          disabled={
            !formData.fullName.trim() ||
            !formData.email.trim() ||
            !formData.password.trim() ||
            !formData.confirmPassword.trim() ||
            formData.password !== formData.confirmPassword ||
            !agreeToTerms
          }
          className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] text-white py-7 rounded-[20px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)] transition-all cursor-pointer border-none text-[22px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none mt-12"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="flex items-center gap-5 my-12">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-[#333333] opacity-40 text-[20px]">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Social Sign Up Options */}
        <div className="space-y-5">
          <button className="w-full bg-white border-2 border-gray-200 text-[#333333] py-6 rounded-[20px] hover:bg-gray-50 transition-all cursor-pointer text-[22px] flex items-center justify-center gap-4">
            <span className="text-[32px]">🔵</span>
            Sign up with Google
          </button>
          <button className="w-full bg-white border-2 border-gray-200 text-[#333333] py-6 rounded-[20px] hover:bg-gray-50 transition-all cursor-pointer text-[22px] flex items-center justify-center gap-4">
            <span className="text-[32px]">📘</span>
            Sign up with Facebook
          </button>
        </div>

        {/* Login Link */}
        <div className="mt-12 text-center">
          <p className="text-[#333333] opacity-60 m-0 text-[22px]">
            Already have an account?{' '}
            <button onClick={onLogin} className="text-[#4A90E2] hover:underline no-underline bg-transparent border-none cursor-pointer p-0">
              Sign in
            </button>
          </p>
        </div>
      </div>

      {/* Security Note */}
      <div className="mt-10 text-center">
        <p className="text-[#333333] opacity-50 m-0 text-[20px]">
          🔒 Your data is secure and encrypted
        </p>
      </div>
    </div>
    </div >
  );
}