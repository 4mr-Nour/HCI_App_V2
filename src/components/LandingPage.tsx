import { Sparkles, Music, Landmark } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface LandingPageProps {
  onStartExploring: () => void;
  onChildLogin: () => void;
  onParentLogin: () => void;
  onMusicDance: () => void;
  onLandmarks: () => void;
  worldMapImage: string;
  musicImage: string;
}

export function LandingPage({ onStartExploring, onChildLogin, onParentLogin, onMusicDance, onLandmarks, worldMapImage, musicImage }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] to-[#E3F2FD]">
      <div className="max-w-[1440px] mx-auto px-12 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left: Mascot and Text */}
          <div className="space-y-8">
            {/* Cute Mascot */}
            <div className="relative">
              <div className="w-48 h-48 bg-gradient-to-br from-[#F8D93B] to-[#F7A34B] rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-8">
                <span className="text-[120px] leading-none">🌍</span>
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F475A8] rounded-full flex items-center justify-center animate-bounce">
                <span className="text-[48px]">✨</span>
              </div>
            </div>

            {/* Headlines */}
            <div className="space-y-4">
              <h1 className="text-[#333333] leading-tight m-0">
                Meet Your Adventure Buddy! 🎉
              </h1>
              <h2 className="text-[#333333] opacity-80 m-0">
                Discover cultures through stories and games
              </h2>
              <p className="text-[#333333] opacity-70 m-0 text-[24px]">
                Join us on a magical journey around the world! Learn about different countries, their traditions, music, food, and make friends from everywhere! 🌈
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-6 pt-4">
              <button 
                onClick={onStartExploring}
                className="bg-[#4A90E2] text-white px-12 py-5 rounded-[32px] hover:bg-[#3A7BC8] transition-all hover:scale-105 cursor-pointer border-none shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-3"
              >
                <Sparkles className="w-7 h-7" />
                Start Exploring
              </button>
            </div>
            
            {/* Login Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={onChildLogin}
                className="bg-gradient-to-r from-[#F475A8] to-[#F7A34B] text-white px-10 py-4 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-none"
              >
                Child Login
              </button>
              <button 
                onClick={onParentLogin}
                className="bg-transparent text-[#4A90E2] px-10 py-4 rounded-[24px] hover:bg-white transition-all hover:scale-105 cursor-pointer border-3 border-[#4A90E2] shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
              >
                Parent Login
              </button>
            </div>
          </div>

          {/* Right: World Map */}
          <div className="relative">
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <ImageWithFallback 
                src={worldMapImage}
                alt="World Map"
                className="w-full h-[500px] object-cover"
              />
              {/* Landmark Pins */}
              <div className="absolute top-[20%] left-[15%] w-12 h-12 bg-[#F475A8] rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[24px]">🗽</span>
              </div>
              <div className="absolute top-[30%] right-[25%] w-12 h-12 bg-[#7BC67E] rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[24px]">🗼</span>
              </div>
              <div className="absolute bottom-[25%] left-[45%] w-12 h-12 bg-[#F8D93B] rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[24px]">🕌</span>
              </div>
              <div className="absolute top-[35%] right-[15%] w-12 h-12 bg-[#F7A34B] rounded-full flex items-center justify-center animate-pulse">
                <span className="text-[24px]">🏯</span>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Tiles */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-[#F475A8] to-[#F7A34B] rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer" onClick={onMusicDance}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center flex-shrink-0">
                <Music className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-white m-0 mb-3">Music & Dance</h3>
                <p className="m-0 text-[22px] opacity-90">
                  Explore traditional songs, instruments, and dances from around the world! 🎵
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer" onClick={onLandmarks}>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-[24px] flex items-center justify-center flex-shrink-0">
                <Landmark className="w-10 h-10 text-white" />
              </div>
              <div className="text-white">
                <h3 className="text-white m-0 mb-3">Landmarks Adventure</h3>
                <p className="m-0 text-[22px] opacity-90">
                  Visit famous places like pyramids, temples, and towers from your screen! 🏛️
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t-2 border-[#333333]/10">
          <div className="flex flex-wrap justify-center gap-8 text-[18px] text-[#333333] opacity-60">
            <a href="#" className="hover:opacity-100 transition-opacity no-underline text-[#333333]">About Us</a>
            <a href="#" className="hover:opacity-100 transition-opacity no-underline text-[#333333]">For Parents</a>
            <a href="#" className="hover:opacity-100 transition-opacity no-underline text-[#333333]">For Teachers</a>
            <a href="#" className="hover:opacity-100 transition-opacity no-underline text-[#333333]">Privacy</a>
            <a href="#" className="hover:opacity-100 transition-opacity no-underline text-[#333333]">Contact</a>
          </div>
        </footer>
      </div>
    </div>
  );
}