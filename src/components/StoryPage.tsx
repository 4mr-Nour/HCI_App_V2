import { ArrowLeft, ArrowRight, Volume2, Lightbulb, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { ScrollProgress } from './ui/ScrollProgress';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface StoryPageProps {
  onBack: () => void;
  onLogout: () => void;
  holiImage: string;
  childrenHoliImage: string;
  sweetsImage: string;
}

export function StoryPage({ onBack, onLogout, holiImage, childrenHoliImage, sweetsImage }: StoryPageProps) {
  const [currentView, setCurrentView] = useState<'library' | 'story'>('library');
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isLessonComplete, setIsLessonComplete] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => { });

  const stories = [
    {
      id: 'holi',
      title: 'Festival of Colors',
      description: 'Explore the vibrant celebration of Holi from India!',
      image: holiImage,
      color: '#F475A8'
    },
    {
      id: 'tea',
      title: 'Japanese Tea Ceremony',
      description: 'Discover the peaceful art of preparing matcha tea.',
      image: 'https://images.unsplash.com/photo-1545657380-4927421ac080?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqYXBhbmVzZSUyMHRlYSUyMGNlcmVtb255fGVufDF8fHx8MTc2NDgwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#7BC67E'
    },
    {
      id: 'pyramids',
      title: 'Pyramids of Egypt',
      description: 'Journey to the ancient sands and meet the Sphinx!',
      image: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxweXJhbWlkcyUyMGVneXB0fGVufDF8fHx8MTc2NDgwMDAwMXww&ixlib=rb-4.1.0&q=80&w=1080',
      color: '#F8D93B'
    }
  ];

  const handleScrollProgress = (progress: number) => {
    if (progress > 0.95 && !isLessonComplete) {
      setIsLessonComplete(true);
      toast.success("Lesson Complete!", {
        description: "You've explored everything! You can now move to the next story.",
        duration: 3000,
      });
    }
  };

  const handleExitAttempt = (action: () => void) => {
    if (currentView === 'story') {
      setPendingAction(() => action);
      setShowExitDialog(true);
    } else {
      action();
    }
  };

  const confirmExit = () => {
    pendingAction();
    setShowExitDialog(false);
  };

  const handlePlayNarration = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectStory = (id: string) => {
    setSelectedStoryId(id);
    setCurrentView('story');
    setIsLessonComplete(false); // Reset for new story
  };

  const handleReturnToLibrary = () => {
    setPendingAction(() => () => {
      setCurrentView('library');
      setSelectedStoryId(null);
    });
    setShowExitDialog(true);
  };

  const handleNextStory = () => {
    if (!isLessonComplete) {
      toast.error("Not quite there yet!", {
        description: "Scroll to the bottom to finish the lesson first.",
      });
      return;
    }

    // Logic to go to next story in list
    const currentIndex = stories.findIndex(s => s.id === selectedStoryId);
    if (currentIndex < stories.length - 1) {
      handleSelectStory(stories[currentIndex + 1].id);
      window.scrollTo(0, 0);
    } else {
      toast.success("All stories completed!", {
        description: "You've finished all available stories!",
      });
      setCurrentView('library');
    }
  };

  if (currentView === 'library') {
    return (
      <div className="min-h-screen bg-[#FFF8E7] p-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-12">
            <button
              onClick={onBack}
              className="flex items-center gap-3 bg-white px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none text-[#333333]"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back</span>
            </button>
            <div className="text-right">
              <h1 className="text-[#333333] m-0 mb-2">Story Library 📚</h1>
              <p className="text-[#333333] opacity-60 m-0 text-[24px]">Choose an adventure!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stories.map(story => (
              <div
                key={story.id}
                onClick={() => handleSelectStory(story.id)}
                className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className="h-48 overflow-hidden relative">
                  <ImageWithFallback src={story.image} alt={story.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6">
                  <h3 className="text-[#333333] m-0 mb-2 text-[24px]">{story.title}</h3>
                  <p className="text-[#333333] opacity-60 m-0 mb-4 text-[18px] line-clamp-2">
                    {story.description}
                  </p>
                  <span className="inline-block px-4 py-2 rounded-[16px] text-white text-[16px] font-medium" style={{ backgroundColor: story.color }}>
                    Read Now
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Active Story View
  const activeStory = stories.find(s => s.id === selectedStoryId) || stories[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] to-[#FFE8F5] pb-32">
      <ScrollProgress onProgressChange={handleScrollProgress} />

      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="max-w-[600px] border-4 border-[#FFB74D] rounded-[32px] p-8 bg-white">
          <AlertDialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-[#FFF3E0] rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🤔</span>
            </div>
            <AlertDialogTitle className="text-3xl font-bold text-[#333333] mb-2">
              Are you sure you want to leave?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-[#666666]">
              Your progress in the lesson will be lost!
              <br />
              Do you want to stay and finish the story?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 mt-8 w-full">
            <AlertDialogCancel className="w-full sm:w-auto text-lg px-8 py-6 rounded-[24px] border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white transition-colors">
              Stay & Continue
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmExit}
              className="w-full sm:w-auto text-lg px-8 py-6 rounded-[24px] bg-[#FF5252] hover:bg-[#FF1744] text-white border-none"
            >
              Leave Lesson
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-[1200px] mx-auto px-12 py-12">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleReturnToLibrary}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none text-[#333333]"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Library</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handlePlayNarration}
              className={`flex items-center gap-3 px-8 py-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all cursor-pointer border-none ${isPlaying
                ? 'bg-[#F475A8] text-white animate-pulse'
                : 'bg-[#4A90E2] text-white hover:bg-[#3A7BC8]'
                }`}
            >
              <Volume2 className="w-6 h-6" />
              <span>{isPlaying ? 'Playing...' : 'Play Narration'}</span>
            </button>

            <button
              onClick={() => handleExitAttempt(onLogout)}
              className="flex items-center gap-3 bg-white text-[#333333] px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-[#F475A8] hover:text-white transition-all cursor-pointer border-none"
            >
              <LogOut className="w-6 h-6" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Main Illustration and Title */}
        <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-12">
          <div className="relative h-[400px]">
            <ImageWithFallback
              src={activeStory.image}
              alt={activeStory.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-10">
              <h1 className="text-white m-0">{activeStory.title}</h1>
              <p className="text-white opacity-90 m-0 text-[24px] mt-2">
                A cultural adventure!
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Content based on Story ID (Simplified for demo) */}
        {activeStory.id === 'holi' ? (
          <div className="space-y-12">
            {/* Introduction */}
            <div className="bg-white rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <h2 className="text-[#333333] m-0 mb-6">What is Holi?</h2>
              <p className="text-[#333333] leading-relaxed m-0 mb-6">
                Holi is one of the most colorful and joyful festivals celebrated in India! It's called the "Festival of Colors" because people throw bright, colorful powders at each other while laughing and dancing. Can you imagine a whole day of playing with colors? 🌈
              </p>
              <p className="text-[#333333] leading-relaxed m-0">
                Holi usually happens in March when spring begins. It celebrates the victory of good over evil and the arrival of spring. Families and friends gather together, forget all their worries, and celebrate with music, dancing, and lots and lots of colors!
              </p>
            </div>

            {/* Image Section: Children Celebrating */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <ImageWithFallback
                  src={childrenHoliImage}
                  alt="Children celebrating Holi"
                  className="w-full h-[350px] object-cover"
                />
              </div>
              <div className="bg-gradient-to-br from-[#F475A8] to-[#F7A34B] rounded-[32px] p-8 flex flex-col justify-center text-white">
                <h3 className="text-white m-0 mb-4">How do people celebrate?</h3>
                <p className="m-0 text-[22px] opacity-90 leading-relaxed">
                  Children and adults go outside and throw colorful powders called "gulal" at each other. They use water guns filled with colored water and everyone gets beautifully messy! The colors represent joy, love, and the vibrant energy of spring. 💕
                </p>
              </div>
            </div>

            {/* Sweets and Traditions */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-[#7BC67E] to-[#4A90E2] rounded-[32px] p-8 flex flex-col justify-center text-white">
                <h3 className="text-white m-0 mb-4">Special Foods</h3>
                <p className="m-0 text-[22px] opacity-90 leading-relaxed">
                  Families prepare delicious sweets like "gujiya" (sweet pastries), "ladoo" (round sweets), and "thandai" (a special cool drink with milk and nuts). These treats make the celebration even more special! 🍬
                </p>
              </div>
              <div className="rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <ImageWithFallback
                  src={sweetsImage}
                  alt="Indian sweets"
                  className="w-full h-[350px] object-cover"
                />
              </div>
            </div>

            {/* Did You Know Box */}
            <div className="bg-[#F8D93B] rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-[#F8D93B]" />
                </div>
                <div>
                  <h3 className="text-[#333333] m-0 mb-4">Did You Know?</h3>
                  <ul className="space-y-3 m-0 pl-6">
                    <li className="text-[#333333] text-[22px]">
                      The colors used in Holi were traditionally made from natural flowers and plants! 🌺
                    </li>
                    <li className="text-[#333333] text-[22px]">
                      People say "Happy Holi!" to greet each other during the festival.
                    </li>
                    <li className="text-[#333333] text-[22px]">
                      The festival also celebrates the love story of Lord Krishna and Radha from ancient tales.
                    </li>
                    <li className="text-[#333333] text-[22px]">
                      In some places, they light big bonfires the night before Holi to celebrate! 🔥
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] p-12 text-center shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-h-[400px] flex flex-col justify-center items-center">
            <h2 className="text-[#333333] mb-4">Content coming soon! 🛠️</h2>
            <p className="text-[20px] text-[#666666] max-w-2xl">
              We are currently building this amazing story about {activeStory.title}. Check back later for the full interactive experience!
            </p>
            <div className="mt-8 p-6 bg-[#F5F7FA] rounded-[24px] w-full max-w-2xl">
              <h3 className="text-[#333333] mb-4">While you wait...</h3>
              <p className="text-[#666666] mb-0">
                Did you know that {activeStory.id === 'tea' ? 'Green tea was originally used as medicine in ancient China before it came to Japan?' : 'The Great Pyramid of Giza was the tallest man-made structure in the world for over 3,800 years?'}
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center pt-8">
          <button
            onClick={handleReturnToLibrary}
            className="flex items-center gap-3 bg-white text-[#333333] px-10 py-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-none"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Library</span>
          </button>

          <button
            onClick={handleNextStory}
            disabled={!isLessonComplete}
            className={`flex items-center gap-3 px-10 py-4 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all border-none ${isLessonComplete
              ? 'bg-[#4A90E2] text-white hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] hover:scale-105 cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
          >
            <span>Next Story</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}