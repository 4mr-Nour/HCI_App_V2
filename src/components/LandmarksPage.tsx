import { ArrowLeft, MapPin, Info, Camera, Heart, Star, Globe, Trophy } from 'lucide-react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
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

interface LandmarksPageProps {
  onBack: () => void;
  onLogout?: () => void;
}

export function LandmarksPage({ onBack, onLogout }: LandmarksPageProps) {
  const [selectedLandmark, setSelectedLandmark] = useState<number | null>(null);
  const [visitedLandmarks, setVisitedLandmarks] = useState<number[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => { });

  const handleExitAttempt = (action: () => void) => {
    setPendingAction(() => action);
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    pendingAction();
    setShowExitDialog(false);
  };

  const landmarks = [
    {
      name: 'Eiffel Tower',
      country: 'France',
      emoji: '🗼',
      continent: 'Europe',
      yearBuilt: 1889,
      height: '330 meters',
      description: 'An iconic iron lattice tower on the Champ de Mars in Paris, named after engineer Gustave Eiffel.',
      funFact: 'The Eiffel Tower can grow 6 inches taller during the summer due to thermal expansion!',
      historicalSignificance: 'Built as the entrance arch for the 1889 World\'s Fair, celebrating the French Revolution.',
      color: '#F475A8',
      bgColor: 'from-[#F475A8] to-[#F7A34B]'
    },
    {
      name: 'Great Wall of China',
      country: 'China',
      emoji: '🏯',
      continent: 'Asia',
      yearBuilt: '7th century BC',
      height: '5-8 meters',
      description: 'A series of fortifications built to protect Chinese states from invasions and raids.',
      funFact: 'It\'s so long that it would take about 18 months to walk the entire length!',
      historicalSignificance: 'One of the most ambitious building projects ever undertaken, stretching over 13,000 miles.',
      color: '#F8D93B',
      bgColor: 'from-[#F8D93B] to-[#F7A34B]'
    },
    {
      name: 'Taj Mahal',
      country: 'India',
      emoji: '🕌',
      continent: 'Asia',
      yearBuilt: 1653,
      height: '73 meters',
      description: 'An ivory-white marble mausoleum built by Mughal emperor Shah Jahan for his beloved wife.',
      funFact: 'The color of the Taj Mahal appears to change with different times of the day and seasons!',
      historicalSignificance: 'A monument of eternal love and one of the finest examples of Mughal architecture.',
      color: '#4A90E2',
      bgColor: 'from-[#4A90E2] to-[#7BC67E]'
    },
    {
      name: 'Statue of Liberty',
      country: 'United States',
      emoji: '🗽',
      continent: 'North America',
      yearBuilt: 1886,
      height: '93 meters',
      description: 'A colossal neoclassical sculpture gifted by France, symbolizing freedom and democracy.',
      funFact: 'Lady Liberty wears a size 879 shoe and her index finger is 8 feet long!',
      historicalSignificance: 'A gift from France to America, representing friendship and shared values of liberty.',
      color: '#7BC67E',
      bgColor: 'from-[#7BC67E] to-[#4A90E2]'
    },
    {
      name: 'Pyramids of Giza',
      country: 'Egypt',
      emoji: '🔺',
      continent: 'Africa',
      yearBuilt: '2580-2560 BC',
      height: '146 meters',
      description: 'Ancient pyramid complex including the Great Pyramid, one of the Seven Wonders of the Ancient World.',
      funFact: 'The Great Pyramid was the tallest man-made structure for over 3,800 years!',
      historicalSignificance: 'Built as tombs for pharaohs, showcasing ancient Egyptian engineering brilliance.',
      color: '#F7A34B',
      bgColor: 'from-[#F7A34B] to-[#F8D93B]'
    },
    {
      name: 'Machu Picchu',
      country: 'Peru',
      emoji: '🏔️',
      continent: 'South America',
      yearBuilt: 1450,
      height: '2,430 meters above sea level',
      description: 'An ancient Incan citadel set high in the Andes Mountains, above the Urubamba River valley.',
      funFact: 'It was built without using wheels, iron tools, or draft animals!',
      historicalSignificance: 'A 15th-century Inca estate, believed to have been built for emperor Pachacuti.',
      color: '#4A90E2',
      bgColor: 'from-[#4A90E2] to-[#F475A8]'
    },
    {
      name: 'Colosseum',
      country: 'Italy',
      emoji: '🏛️',
      continent: 'Europe',
      yearBuilt: '70-80 AD',
      height: '48 meters',
      description: 'An ancient amphitheater in Rome, the largest ever built, used for gladiatorial contests.',
      funFact: 'It could hold between 50,000 and 80,000 spectators - that\'s like a modern stadium!',
      historicalSignificance: 'Symbol of Roman engineering prowess and the power of the Roman Empire.',
      color: '#F475A8',
      bgColor: 'from-[#F475A8] to-[#7BC67E]'
    },
    {
      name: 'Sydney Opera House',
      country: 'Australia',
      emoji: '🎭',
      continent: 'Australia',
      yearBuilt: 1973,
      height: '67 meters',
      description: 'A multi-venue performing arts center with a distinctive modern design featuring sail-like shells.',
      funFact: 'Over 1 million roof tiles cover the building, all self-cleaning!',
      historicalSignificance: 'A masterpiece of 20th-century architecture and a UNESCO World Heritage Site.',
      color: '#7BC67E',
      bgColor: 'from-[#7BC67E] to-[#F8D93B]'
    }
  ];

  const toggleVisited = (index: number) => {
    if (!visitedLandmarks.includes(index)) {
      setVisitedLandmarks([...visitedLandmarks, index]);
    }
  };

  const toggleFavorite = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(f => f !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] via-[#FFF8E7] to-[#FFE8F5] pb-32">
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

      <div className="max-w-[1440px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleExitAttempt(onBack)}
              className="w-14 h-14 bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none flex items-center justify-center"
            >
              <ArrowLeft className="w-6 h-6 text-[#333333]" />
            </button>
            <div>
              <h1 className="text-[#333333] m-0 mb-2">Landmarks Adventure 🏛️</h1>
              <p className="text-[#333333] opacity-60 m-0 text-[22px]">
                Explore famous landmarks from around the world!
              </p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={() => onLogout && handleExitAttempt(onLogout)}
              className="bg-white text-[#333333] px-8 py-4 rounded-[20px] hover:bg-[#4A90E2] hover:text-white transition-all cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-12 text-white">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[36px] mb-1">{landmarks.length}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Landmarks</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[36px] mb-1">{visitedLandmarks.length}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Visited</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[36px] mb-1">{favorites.length}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Favorites</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[36px] mb-1">{visitedLandmarks.length >= 4 ? '⭐' : '🔒'}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Explorer Badge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Landmarks Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {landmarks.map((landmark, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 overflow-hidden cursor-pointer"
              onClick={() => {
                setSelectedLandmark(index);
                toggleVisited(index);
              }}
            >
              {/* Landmark Header with Emoji */}
              <div
                className={`h-48 bg-gradient-to-br ${landmark.bgColor} flex items-center justify-center relative overflow-hidden`}
              >
                <span className="text-[100px]">{landmark.emoji}</span>
                {visitedLandmarks.includes(index) && (
                  <div className="absolute top-4 left-4 bg-white rounded-full p-2">
                    <Camera className="w-5 h-5 text-[#7BC67E]" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(index);
                  }}
                  className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer border-none hover:scale-110 transition-transform"
                >
                  <Heart
                    className="w-5 h-5"
                    style={{ color: landmark.color }}
                    fill={favorites.includes(index) ? landmark.color : 'none'}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-[#333333] m-0 mb-2 text-[22px]">{landmark.name}</h3>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#333333] opacity-40" />
                  <p className="text-[#333333] opacity-60 m-0 text-[18px]">{landmark.country}</p>
                </div>

                <div className="bg-gray-50 rounded-[16px] p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#333333] opacity-60 text-[16px]">Built</span>
                    <span className="text-[#333333] text-[18px]">{landmark.yearBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#333333] opacity-60 text-[16px]">Height</span>
                    <span className="text-[#333333] text-[18px]">{landmark.height}</span>
                  </div>
                </div>

                <button
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-[16px] text-white transition-all cursor-pointer border-none text-[18px]"
                  style={{ backgroundColor: landmark.color }}
                >
                  <Info className="w-5 h-5" />
                  <span>Explore</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Landmark Detail Modal */}
        {selectedLandmark !== null && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            onClick={() => setSelectedLandmark(null)}
          >
            <div
              className="bg-white rounded-[32px] max-w-4xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={`h-72 bg-gradient-to-br ${landmarks[selectedLandmark].bgColor} flex items-center justify-center relative overflow-hidden`}
              >
                <span className="text-[200px]">{landmarks[selectedLandmark].emoji}</span>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-8">
                  <h2 className="text-white m-0 mb-2">{landmarks[selectedLandmark].name}</h2>
                  <p className="text-white opacity-90 m-0 text-[24px]">{landmarks[selectedLandmark].country}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-12">
                {/* Quick Facts */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FFE8F5] rounded-[20px] p-6">
                    <p className="text-[#333333] opacity-60 m-0 mb-2 text-[16px]">Continent</p>
                    <h4 className="text-[#333333] m-0 text-[22px]">{landmarks[selectedLandmark].continent}</h4>
                  </div>
                  <div className="bg-gradient-to-br from-[#E3F2FD] to-[#FFF8E7] rounded-[20px] p-6">
                    <p className="text-[#333333] opacity-60 m-0 mb-2 text-[16px]">Built</p>
                    <h4 className="text-[#333333] m-0 text-[22px]">{landmarks[selectedLandmark].yearBuilt}</h4>
                  </div>
                  <div className="bg-gradient-to-br from-[#FFE8F5] to-[#E3F2FD] rounded-[20px] p-6">
                    <p className="text-[#333333] opacity-60 m-0 mb-2 text-[16px]">Height</p>
                    <h4 className="text-[#333333] m-0 text-[22px]">{landmarks[selectedLandmark].height}</h4>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-[#333333] m-0 mb-4 text-[24px]">About This Landmark</h4>
                  <p className="text-[#333333] opacity-80 m-0 text-[20px] leading-relaxed">
                    {landmarks[selectedLandmark].description}
                  </p>
                </div>

                {/* Historical Significance */}
                <div className="mb-8">
                  <h4 className="text-[#333333] m-0 mb-4 text-[24px]">Historical Significance</h4>
                  <p className="text-[#333333] opacity-80 m-0 text-[20px] leading-relaxed">
                    {landmarks[selectedLandmark].historicalSignificance}
                  </p>
                </div>

                {/* Fun Fact */}
                <div className="bg-gradient-to-br from-[#F8D93B] to-[#F7A34B] rounded-[24px] p-8 mb-8">
                  <div className="flex items-start gap-4">
                    <span className="text-[48px]">💡</span>
                    <div>
                      <h4 className="text-white m-0 mb-3 text-[24px]">Fun Fact!</h4>
                      <p className="text-white opacity-95 m-0 text-[20px] leading-relaxed">
                        {landmarks[selectedLandmark].funFact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <button
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[20px] text-white transition-all cursor-pointer border-none text-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                    style={{ backgroundColor: landmarks[selectedLandmark].color }}
                  >
                    <Camera className="w-6 h-6" />
                    <span>Take Virtual Tour</span>
                  </button>

                  <button
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[20px] bg-white border-2 text-[#333333] transition-all cursor-pointer text-[20px] hover:bg-gray-50"
                    style={{ borderColor: landmarks[selectedLandmark].color, color: landmarks[selectedLandmark].color }}
                  >
                    <Star className="w-6 h-6" />
                    <span>Learn More Facts</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedLandmark(null)}
                  className="w-full px-8 py-4 rounded-[20px] bg-gray-100 text-[#333333] hover:bg-gray-200 transition-all cursor-pointer border-none text-[18px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Achievement Challenge */}
        <div className="mt-12 bg-gradient-to-r from-[#F475A8] to-[#F7A34B] rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-white m-0 mb-2">World Explorer Challenge!</h3>
                <p className="text-white opacity-90 m-0 text-[20px]">
                  {visitedLandmarks.length >= 4
                    ? '🎉 Congratulations! You\'ve earned the Explorer Badge!'
                    : `Visit ${4 - visitedLandmarks.length} more landmarks to earn the Explorer Badge!`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[48px] mb-2">
                {visitedLandmarks.length}/{landmarks.length}
              </div>
              <p className="text-white opacity-90 m-0 text-[18px]">Explored</p>
            </div>
          </div>
          <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden mt-6">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{ width: `${(visitedLandmarks.length / landmarks.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
