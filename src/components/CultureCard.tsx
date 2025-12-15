import { MapPin, Users, Calendar } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface CultureCardProps {
  country: string;
  continent: string;
  image: string;
  funFact: string;
  population: string;
  language: string;
  color: string;
}

export function CultureCard({ country, continent, image, funFact, population, language, color }: CultureCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[420px] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front of card */}
        <div 
          className="absolute w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 h-full">
            <div className="relative h-[240px] overflow-hidden">
              <ImageWithFallback 
                src={image}
                alt={country}
                className="w-full h-full object-cover"
              />
              <div className={`absolute top-4 right-4 px-4 py-2 rounded-[20px] text-white`} style={{ backgroundColor: color }}>
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {continent}
                </span>
              </div>
            </div>
            
            <div className="p-6 space-y-3">
              <h3 className="m-0 text-[#333333]">{country}</h3>
              <p className="m-0 text-[18px] text-[#333333] opacity-70">
                {funFact}
              </p>
              <div className="pt-2 flex items-center gap-2 text-[16px] text-[#333333] opacity-60">
                <span>👆 Click to learn more!</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className="absolute w-full h-full backface-hidden rotate-y-180"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] h-full p-8 flex flex-col justify-center" style={{ backgroundColor: color }}>
            <h3 className="text-white m-0 mb-6">Fun Facts!</h3>
            <div className="space-y-4 text-white">
              <div className="flex items-start gap-3 bg-white/20 p-4 rounded-[20px]">
                <Users className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white m-0 mb-1">Language</h4>
                  <p className="m-0 text-[18px]">{language}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/20 p-4 rounded-[20px]">
                <Calendar className="w-6 h-6 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white m-0 mb-1">Population</h4>
                  <p className="m-0 text-[18px]">{population}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center text-white text-[16px] opacity-80">
              👆 Click again to flip back
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
