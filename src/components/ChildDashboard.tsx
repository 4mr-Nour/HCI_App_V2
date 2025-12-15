import { Globe, Book, Lightbulb, Gamepad2, MapPin, LogOut, Clock, BookOpen } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
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

interface ChildDashboardProps {
  childName: string;
  onNavigate: (screen: string) => void;
  onLogout: () => void;
  worldMapImage: string;
  resumeImage: string;
}

export function ChildDashboard({ childName, onNavigate, onLogout, worldMapImage, resumeImage }: ChildDashboardProps) {
  const landmarks = [
    { name: 'Great Wall', emoji: '🏯', country: 'China', top: '35%', left: '70%', color: '#F475A8', funFact: 'The Great Wall is over 13,000 miles long! That\'s longer than the distance from the North Pole to the South Pole!' },
    { name: 'Pyramids', emoji: '🏜️', country: 'Egypt', top: '40%', left: '50%', color: '#F7A34B', funFact: 'The Great Pyramid was the tallest man-made structure for over 3,800 years!' },
    { name: 'Eiffel Tower', emoji: '🗼', country: 'France', top: '30%', left: '48%', color: '#4A90E2', funFact: 'The Eiffel Tower can grow 6 inches taller during the summer because the iron expands in the heat!' },
    { name: 'Taj Mahal', emoji: '🕌', country: 'India', top: '45%', left: '65%', color: '#7BC67E', funFact: 'It took 20,000 workers and 1,000 elephants over 20 years to build the Taj Mahal!' },
    { name: 'Statue of Liberty', emoji: '🗽', country: 'USA', top: '35%', left: '20%', color: '#F8D93B', funFact: 'The Statue of Liberty wears a size 879 shoe! She was a gift from France to the USA.' }
  ];

  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => { });
  const [selectedLandmark, setSelectedLandmark] = useState<typeof landmarks[0] | null>(null);

  const handleExitAttempt = (action: () => void) => {
    setPendingAction(() => action);
    setShowExitDialog(true);
  };

  const confirmExit = () => {
    pendingAction();
    setShowExitDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E7] to-[#E3F2FD] pb-32">
      <AlertDialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <AlertDialogContent className="max-w-[600px] border-4 border-[#FFB74D] rounded-[32px] p-8 bg-white">
          <AlertDialogHeader className="items-center text-center">
            <div className="w-20 h-20 bg-[#FFF3E0] rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🤔</span>
            </div>
            <AlertDialogTitle className="text-3xl font-bold text-[#333333] mb-2">
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-xl text-[#666666]">
              You'll be returned to the landing page.
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
              Log Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Fun Fact Dialog */}
      <AlertDialog open={!!selectedLandmark} onOpenChange={(open: boolean) => !open && setSelectedLandmark(null)}>
        <AlertDialogContent className="max-w-[500px] border-4 rounded-[32px] p-8 bg-white" style={{ borderColor: selectedLandmark?.color }}>
          <AlertDialogHeader className="items-center text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: `${selectedLandmark?.color}20` }}>
              <span className="text-6xl">{selectedLandmark?.emoji}</span>
            </div>
            <AlertDialogTitle className="text-4xl font-bold text-[#333333] mb-1">
              {selectedLandmark?.name}
            </AlertDialogTitle>
            <p className="text-xl text-[#666666] font-medium mb-6 uppercase tracking-wider">{selectedLandmark?.country}</p>

            <div className="bg-gray-50 p-6 rounded-[24px] w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" style={{ color: selectedLandmark?.color }} />
              <AlertDialogDescription className="text-2xl text-[#333333] font-medium leading-relaxed">
                <span className="block text-sm font-bold opacity-50 mb-2 uppercase tracking-widest" style={{ color: selectedLandmark?.color }}>Fun Fact</span>
                {selectedLandmark?.funFact}
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center w-full mt-8">
            <AlertDialogAction
              onClick={() => setSelectedLandmark(null)}
              className="w-full text-xl px-12 py-5 rounded-[24px] text-white border-none cursor-pointer hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
              style={{ backgroundColor: selectedLandmark?.color }}
            >
              Wow, Awesome! 🌟
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-[1440px] mx-auto px-12 py-12">
        {/* Welcome Message with Logout */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <h1 className="text-[#333333] m-0 mb-2">Welcome, {childName}! 👋</h1>
            <p className="text-[#333333] opacity-70 m-0 text-[24px]">
              Ready for another amazing adventure around the world?
            </p>
          </div>

          <button
            onClick={() => handleExitAttempt(onLogout)}
            className="flex items-center gap-3 bg-white text-[#333333] px-8 py-4 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-[#F475A8] hover:text-white transition-all cursor-pointer border-none"
          >
            <LogOut className="w-6 h-6" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Resume Adventure Card */}
        <div className="bg-gradient-to-r from-[#FFB74D] to-[#F7A34B] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-12 flex items-center justify-between text-white relative overflow-hidden group cursor-pointer hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-all" onClick={() => onNavigate('storybook')}>
          <div className="relative z-10 flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="bg-white/20 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Continue Reading</span>
              <span className="flex items-center gap-1 text-sm font-medium opacity-90"><Clock className="w-4 h-4" /> 5 mins left</span>
            </div>
            <h2 className="text-4xl font-bold m-0 mb-2 leading-tight">The Festival of Colors: Holi</h2>
            <p className="text-xl opacity-90 m-0 mb-6 max-w-xl">
              Sarah and her friends are throwing colorful powders! Find out what happens next...
            </p>
            <button className="bg-white text-[#F7A34B] px-8 py-3 rounded-[24px] font-bold text-lg flex items-center gap-2 hover:bg-[#FFF3E0] transition-colors">
              <BookOpen className="w-5 h-5" />
              Resume Story
            </button>
          </div>

          {/* Decorative Image/Pattern */}
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
          </div>
          <div className="w-[300px] h-[200px] rounded-[24px] overflow-hidden shadow-lg transform rotate-3 transition-transform group-hover:rotate-0 border-4 border-white/30 hidden md:block">
            <ImageWithFallback
              src={resumeImage}
              alt="Holi Festival"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Interactive World Map */}
        <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[#333333] m-0">Explore the World Map</h2>
            <span className="bg-[#F8D93B] px-6 py-2 rounded-[20px] text-[#333333] font-bold animate-pulse">
              Tap the icons for fun facts! 👆
            </span>
          </div>

          <div className="relative rounded-[24px] overflow-hidden">
            <ImageWithFallback
              src={worldMapImage}
              alt="Interactive World Map"
              className="w-full h-[500px] object-cover"
            />

            {/* Tappable Landmarks */}
            {landmarks.map((landmark, index) => (
              <button
                key={index}
                onClick={() => setSelectedLandmark(landmark)}
                className="absolute w-16 h-16 rounded-full flex flex-col items-center justify-center transition-all hover:scale-125 cursor-pointer border-none shadow-[0_4px_20px_rgba(0,0,0,0.2)] group hover:z-20 animate-bounce"
                style={{
                  top: landmark.top,
                  left: landmark.left,
                  backgroundColor: landmark.color,
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <span className="text-[28px]">{landmark.emoji}</span>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-[0_4px_20px_rgba(0,0,0,0.1)] z-30 pointer-events-none">
                  <p className="m-0 text-[16px] text-[#333333] font-bold">{landmark.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Section Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Explore Cultures */}
          <button
            onClick={() => onNavigate('cultures')}
            className="bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer border-none text-left"
          >
            <div className="w-16 h-16 bg-white/20 rounded-[24px] flex items-center justify-center mb-4">
              <Globe className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-white m-0 mb-2">Explore Cultures</h3>
            <p className="m-0 text-white opacity-90 text-[18px]">
              Discover amazing countries and their traditions!
            </p>
          </button>

          {/* Fun Facts */}
          <button
            className="bg-gradient-to-br from-[#F8D93B] to-[#F7A34B] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer border-none text-left"
          >
            <div className="w-16 h-16 bg-white/20 rounded-[24px] flex items-center justify-center mb-4">
              <Lightbulb className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-white m-0 mb-2">Fun Facts</h3>
            <p className="m-0 text-white opacity-90 text-[18px]">
              Learn cool facts about the world every day!
            </p>
          </button>

          {/* Storybook Library */}
          <button
            onClick={() => onNavigate('storybook')}
            className="bg-gradient-to-br from-[#F475A8] to-[#F7A34B] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer border-none text-left"
          >
            <div className="w-16 h-16 bg-white/20 rounded-[24px] flex items-center justify-center mb-4">
              <Book className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-white m-0 mb-2">Storybook Library</h3>
            <p className="m-0 text-white opacity-90 text-[18px]">
              Read magical stories from around the world!
            </p>
          </button>

          {/* Games */}
          <button
            onClick={() => onNavigate('games')}
            className="bg-gradient-to-br from-[#7BC67E] to-[#4A90E2] rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all hover:scale-105 cursor-pointer border-none text-left"
          >
            <div className="w-16 h-16 bg-white/20 rounded-[24px] flex items-center justify-center mb-4">
              <Gamepad2 className="w-9 h-9 text-white" />
            </div>
            <h3 className="text-white m-0 mb-2">Games</h3>
            <p className="m-0 text-white opacity-90 text-[18px]">
              Play fun games and test your knowledge!
            </p>
          </button>
        </div>

        {/* Recent Activities */}
        <div className="mt-12 bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
          <h3 className="text-[#333333] m-0 mb-6">Continue Your Adventure</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Holi Festival Story', emoji: '🎨', color: '#F475A8', progress: 75 },
              { title: 'Match the Culture Game', emoji: '🎮', color: '#4A90E2', progress: 50 },
              { title: 'World Music Quiz', emoji: '🎵', color: '#7BC67E', progress: 30 }
            ].map((activity, index) => (
              <div key={index} className="bg-gray-50 rounded-[24px] p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: activity.color }}
                  >
                    <span className="text-[28px]">{activity.emoji}</span>
                  </div>
                  <h4 className="text-[#333333] m-0 flex-1 text-[20px]">{activity.title}</h4>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all"
                    style={{
                      width: `${activity.progress}%`,
                      backgroundColor: activity.color
                    }}
                  ></div>
                </div>
                <p className="m-0 text-[16px] text-[#333333] opacity-60 mt-2">
                  {activity.progress}% complete
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}