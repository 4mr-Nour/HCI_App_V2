import { Book, ArrowRight, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

interface Story {
  id: number;
  title: string;
  country: string;
  excerpt: string;
  image: string;
  color: string;
  emoji: string;
  fullStory: string;
}

interface StoriesSectionProps {
  stories: Story[];
}

export function StoriesSection({ stories }: StoriesSectionProps) {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <section id="stories" className="py-20 bg-gradient-to-br from-[#FFF8E7] to-[#FFF0F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#F475A8] text-white px-6 py-2 rounded-[20px] mb-4">
            <span className="flex items-center gap-2">
              <Book className="w-5 h-5" />
              Cultural Stories
            </span>
          </div>
          <h2 className="text-[#333333] m-0 mb-4">Amazing Stories From Around The World</h2>
          <p className="text-[#333333] opacity-70 max-w-2xl mx-auto m-0">
            Discover magical tales and legends that kids just like you love in different countries!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div 
              key={story.id}
              className="bg-white rounded-[32px] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer"
              onClick={() => setSelectedStory(story)}
            >
              <div className="relative h-[200px] overflow-hidden">
                <ImageWithFallback 
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 text-[48px]">
                  {story.emoji}
                </div>
              </div>
              
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5" style={{ color: story.color }} fill={story.color} />
                  <span className="text-[16px]" style={{ color: story.color }}>{story.country}</span>
                </div>
                <h3 className="m-0 text-[#333333]">{story.title}</h3>
                <p className="m-0 text-[18px] text-[#333333] opacity-70">
                  {story.excerpt}
                </p>
                <button 
                  className="flex items-center gap-2 text-[#4A90E2] hover:gap-3 transition-all mt-4 bg-transparent border-none cursor-pointer p-0"
                >
                  <span>Read Story</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Modal */}
      {selectedStory && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedStory(null)}
        >
          <div 
            className="bg-white rounded-[32px] max-w-2xl w-full max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-[48px]">{selectedStory.emoji}</span>
                <div>
                  <h3 className="m-0 text-[#333333]">{selectedStory.title}</h3>
                  <p className="m-0 text-[18px]" style={{ color: selectedStory.color }}>{selectedStory.country}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedStory(null)}
                className="text-[32px] cursor-pointer bg-transparent border-none text-[#333333] hover:text-[#F475A8] transition-colors"
              >
                ×
              </button>
            </div>
            
            <div className="relative h-[300px] rounded-[24px] overflow-hidden mb-6">
              <ImageWithFallback 
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="text-[#333333] leading-relaxed m-0">
              {selectedStory.fullStory}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
