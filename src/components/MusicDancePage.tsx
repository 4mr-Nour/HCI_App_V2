import { ArrowLeft, Play, Pause, Volume2, Heart, Star, Music as MusicIcon, Trophy } from 'lucide-react';
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

interface MusicDancePageProps {
  onBack: () => void;
  onLogout?: () => void;
}

export function MusicDancePage({ onBack, onLogout }: MusicDancePageProps) {
  const [selectedCountry, setSelectedCountry] = useState<number | null>(null);
  const [playingMusic, setPlayingMusic] = useState<number | null>(null);
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

  const musicData = [
    {
      country: 'India',
      emoji: '🇮🇳',
      music: 'Bollywood Music',
      dance: 'Bharatanatyam',
      instrument: 'Sitar',
      description: 'Classical Indian dance with graceful hand movements and rhythmic footwork',
      funFact: 'Bollywood produces more movies than Hollywood every year!',
      color: '#F7A34B',
      instrumentEmoji: '🎸'
    },
    {
      country: 'Brazil',
      emoji: '🇧🇷',
      music: 'Samba',
      dance: 'Samba Dance',
      instrument: 'Berimbau',
      description: 'Energetic Brazilian dance with fast hip movements and vibrant costumes',
      funFact: 'Rio Carnival is the biggest street party in the world!',
      color: '#7BC67E',
      instrumentEmoji: '🎺'
    },
    {
      country: 'Spain',
      emoji: '🇪🇸',
      music: 'Flamenco',
      dance: 'Flamenco',
      instrument: 'Castanets',
      description: 'Passionate Spanish dance with hand clapping, guitar, and dramatic movements',
      funFact: 'Flamenco dancers stomp their feet over 1000 times in one performance!',
      color: '#F475A8',
      instrumentEmoji: '🎶'
    },
    {
      country: 'Ireland',
      emoji: '🇮🇪',
      music: 'Celtic Music',
      dance: 'Irish Step Dance',
      instrument: 'Tin Whistle',
      description: 'Traditional Irish dance with rigid upper body and quick leg movements',
      funFact: 'Irish dancers keep their arms straight to show respect for the king!',
      color: '#4A90E2',
      instrumentEmoji: '🎵'
    },
    {
      country: 'Japan',
      emoji: '🇯🇵',
      music: 'Traditional Koto',
      dance: 'Bon Odori',
      instrument: 'Koto',
      description: 'Japanese folk dance performed during summer festivals',
      funFact: 'The Koto has 13 strings and is over 1,000 years old!',
      color: '#F8D93B',
      instrumentEmoji: '🎻'
    },
    {
      country: 'Australia',
      emoji: '🇦🇺',
      music: 'Didgeridoo',
      dance: 'Aboriginal Dance',
      instrument: 'Didgeridoo',
      description: 'Ancient Aboriginal dance telling stories of the Dreamtime',
      funFact: 'The didgeridoo is one of the oldest wind instruments in the world!',
      color: '#F7A34B',
      instrumentEmoji: '🎺'
    }
  ];

  const toggleFavorite = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter(f => f !== index));
    } else {
      setFavorites([...favorites, index]);
    }
  };

  const toggleMusic = (index: number) => {
    if (playingMusic === index) {
      setPlayingMusic(null);
    } else {
      setPlayingMusic(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] via-[#FFE8F5] to-[#E3F2FD] pb-32">
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
              <h1 className="text-[#333333] m-0 mb-2">Music & Dance Around the World 🎵</h1>
              <p className="text-[#333333] opacity-60 m-0 text-[22px]">
                Explore the rhythms and movements of different cultures!
              </p>
            </div>
          </div>
          {onLogout && (
            <button
              onClick={() => onLogout && handleExitAttempt(onLogout)}
              className="bg-white text-[#333333] px-8 py-4 rounded-[20px] hover:bg-[#F475A8] hover:text-white transition-all cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-[#F475A8] to-[#F7A34B] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-12 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <MusicIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-[36px] mb-1">{musicData.length}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Countries</p>
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
                <div className="text-[36px] mb-1">{selectedCountry !== null ? 1 : 0}</div>
                <p className="text-white opacity-90 m-0 text-[18px]">Explored</p>
              </div>
            </div>
          </div>
        </div>

        {/* Music & Dance Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {musicData.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 overflow-hidden cursor-pointer"
              onClick={() => setSelectedCountry(index)}
            >
              {/* Country Header */}
              <div
                className="p-8 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)` }}
              >
                <div className="absolute top-4 right-4 text-[64px] opacity-30">
                  {item.emoji}
                </div>
                <div className="relative">
                  <h3 className="text-white m-0 mb-2">{item.country}</h3>
                  <p className="text-white opacity-90 m-0 text-[20px]">{item.music}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Dance Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[32px]">💃</span>
                    <div>
                      <p className="text-[#333333] opacity-60 m-0 text-[16px]">Dance Style</p>
                      <h4 className="text-[#333333] m-0 text-[20px]">{item.dance}</h4>
                    </div>
                  </div>
                </div>

                {/* Instrument */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[32px]">{item.instrumentEmoji}</span>
                    <div>
                      <p className="text-[#333333] opacity-60 m-0 text-[16px]">Instrument</p>
                      <h4 className="text-[#333333] m-0 text-[20px]">{item.instrument}</h4>
                    </div>
                  </div>
                </div>

                {/* Play/Favorite Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMusic(index);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-[20px] bg-gradient-to-r transition-all cursor-pointer border-none text-white"
                    style={{
                      background: playingMusic === index
                        ? `linear-gradient(135deg, ${item.color} 0%, ${item.color}CC 100%)`
                        : '#E3F2FD'
                    }}
                  >
                    {playingMusic === index ? (
                      <>
                        <Pause className="w-5 h-5" style={{ color: playingMusic === index ? 'white' : item.color }} />
                        <span style={{ color: playingMusic === index ? 'white' : item.color }} className="text-[18px]">
                          Stop
                        </span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5" style={{ color: item.color }} />
                        <span style={{ color: item.color }} className="text-[18px]">
                          Play
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(index);
                    }}
                    className="w-14 h-14 rounded-[20px] flex items-center justify-center transition-all cursor-pointer border-none"
                    style={{
                      background: favorites.includes(index) ? item.color : '#E3F2FD'
                    }}
                  >
                    <Heart
                      className="w-6 h-6"
                      style={{ color: favorites.includes(index) ? 'white' : item.color }}
                      fill={favorites.includes(index) ? 'white' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Country Detail Modal */}
        {selectedCountry !== null && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-8"
            onClick={() => setSelectedCountry(null)}
          >
            <div
              className="bg-white rounded-[32px] max-w-3xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="p-12 text-white relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${musicData[selectedCountry].color} 0%, ${musicData[selectedCountry].color}CC 100%)` }}
              >
                <div className="absolute top-8 right-8 text-[120px] opacity-20">
                  {musicData[selectedCountry].emoji}
                </div>
                <div className="relative">
                  <h2 className="text-white m-0 mb-3">{musicData[selectedCountry].country}</h2>
                  <h3 className="text-white opacity-90 m-0">{musicData[selectedCountry].music}</h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-12">
                {/* Description */}
                <div className="mb-8">
                  <h4 className="text-[#333333] m-0 mb-4 text-[24px]">About the Dance</h4>
                  <p className="text-[#333333] opacity-80 m-0 text-[20px] leading-relaxed">
                    {musicData[selectedCountry].description}
                  </p>
                </div>

                {/* Fun Fact */}
                <div className="bg-gradient-to-br from-[#FFF8E7] to-[#FFE8F5] rounded-[24px] p-8 mb-8">
                  <div className="flex items-start gap-4">
                    <span className="text-[40px]">💡</span>
                    <div>
                      <h4 className="text-[#333333] m-0 mb-3 text-[22px]">Fun Fact!</h4>
                      <p className="text-[#333333] opacity-80 m-0 text-[20px]">
                        {musicData[selectedCountry].funFact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[20px] text-white transition-all cursor-pointer border-none text-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
                    style={{ background: `linear-gradient(135deg, ${musicData[selectedCountry].color} 0%, ${musicData[selectedCountry].color}CC 100%)` }}
                  >
                    <Volume2 className="w-6 h-6" />
                    <span>Listen to Music</span>
                  </button>

                  <button
                    className="flex items-center justify-center gap-3 px-8 py-5 rounded-[20px] bg-white border-2 text-[#333333] transition-all cursor-pointer text-[20px] hover:bg-gray-50"
                    style={{ borderColor: musicData[selectedCountry].color, color: musicData[selectedCountry].color }}
                  >
                    <Star className="w-6 h-6" />
                    <span>Learn Dance Moves</span>
                  </button>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="w-full mt-6 px-8 py-4 rounded-[20px] bg-gray-100 text-[#333333] hover:bg-gray-200 transition-all cursor-pointer border-none text-[18px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Challenge Card */}
        <div className="mt-12 bg-gradient-to-r from-[#7BC67E] to-[#4A90E2] rounded-[32px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-white m-0 mb-2">Dance Challenge!</h3>
                <p className="text-white opacity-90 m-0 text-[20px]">
                  Can you match the instrument to its country? Take the quiz!
                </p>
              </div>
            </div>
            <button className="bg-white px-10 py-4 rounded-[20px] hover:bg-opacity-90 transition-all cursor-pointer border-none text-[20px]"
              style={{ color: musicData[0].color }}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
