import { Plane, Heart, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroProps {
  globeImage: string;
}

export function Hero({ globeImage }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFF8E7] to-[#E3F2FD] py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-[#F8D93B] text-[#333333] px-6 py-2 rounded-[20px] mb-4">
              <span className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-current" />
                Welcome Young Explorer!
              </span>
            </div>
            
            <h1 className="text-[#333333] leading-tight m-0">
              Discover Amazing Cultures Around the World! 🌍
            </h1>
            
            <p className="text-[#333333] opacity-80 m-0">
              Join us on an exciting adventure to learn about different countries, their traditions, stories, and so much more. Let's explore together!
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <button className="bg-[#4A90E2] text-white px-10 py-4 rounded-[24px] hover:bg-[#3A7BC8] transition-all hover:scale-105 cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.08)] flex items-center gap-2">
                <Plane className="w-6 h-6" />
                Start Adventure
              </button>
              <button className="bg-white text-[#333333] px-10 py-4 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-2 border-[#4A90E2] flex items-center gap-2">
                <Heart className="w-6 h-6 text-[#F475A8]" />
                Learn More
              </button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F475A8] rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#7BC67E] rounded-full opacity-20 blur-3xl"></div>
            <div className="relative rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <ImageWithFallback 
                src={globeImage}
                alt="World Globe"
                className="w-full h-[400px] object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 bg-[#F8D93B] p-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rotate-[-5deg]">
              <p className="m-0 text-[24px]">🎉</p>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#7BC67E] p-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] rotate-[5deg]">
              <p className="m-0 text-[24px]">✨</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
