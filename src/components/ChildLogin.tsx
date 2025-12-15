import { ArrowLeft, Star, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ChildLoginProps {
  onBack: () => void;
  onLogin: (name: string) => void;
}

export function ChildLogin({ onBack, onLogin }: ChildLoginProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [childName, setChildName] = useState('');

  const avatars = [
    { emoji: '🌟', color: '#F8D93B', name: 'Star Explorer' },
    { emoji: '🦁', color: '#F7A34B', name: 'Brave Lion' },
    { emoji: '🚀', color: '#4A90E2', name: 'Space Traveler' },
    { emoji: '🌈', color: '#F475A8', name: 'Rainbow Friend' },
    { emoji: '🐼', color: '#7BC67E', name: 'Panda Pal' },
    { emoji: '🎨', color: '#F475A8', name: 'Creative Artist' }
  ];

  const handleLogin = () => {
    if (childName.trim()) {
      onLogin(childName);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#E3F2FD] to-[#FFE8F5] flex items-center justify-center p-12">
      <div className="max-w-4xl w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 bg-white px-8 py-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none text-[#333333] mb-12 text-[20px]"
        >
          <ArrowLeft className="w-7 h-7" />
          <span>Back</span>
        </button>

        {/* Main Login Card */}
        <div className="bg-white rounded-[32px] p-16 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-40 h-40 bg-gradient-to-br from-[#F8D93B] to-[#F7A34B] rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <span className="text-[100px]">🌍</span>
            </div>
            <h1 className="text-[#333333] m-0 mb-4">Welcome Back, Explorer! 🎉</h1>
            <p className="text-[#333333] opacity-70 m-0 text-[26px]">
              Let's continue your amazing adventure around the world!
            </p>
          </div>

          {/* Name Input */}
          <div className="mb-12">
            <label className="block text-[#333333] mb-5 text-[26px]">
              What's your name?
            </label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Type your name here..."
              className="w-full px-10 py-6 rounded-[24px] border-3 border-[#4A90E2] focus:border-[#F475A8] outline-none text-[26px] text-[#333333]"
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Avatar Selection */}
          <div className="mb-12">
            <label className="block text-[#333333] mb-5 text-[26px]">
              Choose your avatar!
            </label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6">
              {avatars.map((avatar, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAvatar(index)}
                  className={`relative rounded-[24px] p-8 transition-all cursor-pointer border-3 ${
                    selectedAvatar === index
                      ? 'border-[#4A90E2] shadow-[0_8px_30px_rgba(0,0,0,0.12)] scale-110'
                      : 'border-transparent bg-gray-50 hover:bg-gray-100'
                  }`}
                  style={{ backgroundColor: selectedAvatar === index ? `${avatar.color}20` : undefined }}
                >
                  <span className="text-[56px] block">{avatar.emoji}</span>
                  {selectedAvatar === index && (
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-[#7BC67E] rounded-full flex items-center justify-center">
                      <span className="text-white text-[24px]">✓</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
            <p className="text-center text-[#333333] opacity-60 m-0 mt-6 text-[22px]">
              {avatars[selectedAvatar].name}
            </p>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            disabled={!childName.trim()}
            className="w-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] text-white py-7 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-none flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-[24px]"
          >
            <Sparkles className="w-8 h-8" />
            <span>Start My Adventure!</span>
          </button>

          {/* Fun Message */}
          <div className="mt-10 text-center">
            <p className="text-[#333333] opacity-60 m-0 text-[22px]">
              New here? Just type your name and pick an avatar! 🚀
            </p>
          </div>
        </div>

        {/* Fun Decorative Elements */}
        <div className="flex justify-center gap-12 mt-12">
          {['🌟', '🎨', '🌈', '⭐', '🎉'].map((emoji, index) => (
            <div
              key={index}
              className="text-[48px] animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {emoji}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}