import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface ParentLoginProps {
  onBack: () => void;
  onLogin: () => void;
  onSignUp: () => void;
}

export function ParentLogin({ onBack, onLogin, onSignUp }: ParentLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (email.trim() && password.trim()) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-16 py-20">
      <div className="max-w-3xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 bg-white px-8 py-4 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer border-none text-[#333333] mb-12 text-[20px]"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>

        {/* Main Login Card */}
        <div className="bg-white rounded-[24px] p-16 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          {/* Header */}
          <div className="mb-16">
            <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[20px] flex items-center justify-center mb-10">
              <span className="text-[48px]">👨‍👩‍👧</span>
            </div>
            <h2 className="text-[#333333] m-0 mb-4">Parent Login</h2>
            <p className="text-[#333333] opacity-60 m-0 text-[24px]">
              Monitor your child's learning journey
            </p>
          </div>

          {/* Email Input */}
          <div className="mb-10">
            <label className="block text-[#333333] mb-5 text-[24px]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full pl-16 pr-6 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-10">
            <label className="block text-[#333333] mb-5 text-[24px]">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-6 top-1/2 transform -translate-y-1/2 w-7 h-7 text-[#333333] opacity-40" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-16 pr-16 py-6 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none text-[22px] text-[#333333]"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-[#333333] opacity-40 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-none p-0"
              >
                {showPassword ? <EyeOff className="w-7 h-7" /> : <Eye className="w-7 h-7" />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between mb-12">
            <label className="flex items-center gap-4 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-7 h-7 rounded cursor-pointer accent-[#4A90E2]"
              />
              <span className="text-[#333333] text-[22px]">Remember me</span>
            </label>
            <a href="#" className="text-[#4A90E2] hover:underline text-[22px] no-underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!email.trim() || !password.trim()}
            className="w-full bg-[#4A90E2] text-white py-6 rounded-[20px] hover:bg-[#3A7BC8] transition-all cursor-pointer border-none text-[22px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4A90E2] shadow-[0_4px_20px_rgba(74,144,226,0.2)]"
          >
            Sign In
          </button>

          {/* Divider */}
          <div className="flex items-center gap-5 my-12">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-[#333333] opacity-40 text-[20px]">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Social Login Options */}
          <div className="space-y-5">
            <button className="w-full bg-white border-2 border-gray-200 text-[#333333] py-6 rounded-[20px] hover:bg-gray-50 transition-all cursor-pointer text-[22px] flex items-center justify-center gap-4">
              <span className="text-[32px]">🔵</span>
              Continue with Google
            </button>
            <button className="w-full bg-white border-2 border-gray-200 text-[#333333] py-6 rounded-[20px] hover:bg-gray-50 transition-all cursor-pointer text-[22px] flex items-center justify-center gap-4">
              <span className="text-[32px]">📘</span>
              Continue with Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="mt-12 text-center">
            <p className="text-[#333333] opacity-60 m-0 text-[22px]">
              Don't have an account?{' '}
              <button onClick={onSignUp} className="text-[#4A90E2] hover:underline no-underline bg-transparent border-none cursor-pointer p-0">
                Sign up
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
    </div>
  );
}