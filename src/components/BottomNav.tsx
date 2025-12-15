import { Home, Book, Gamepad2, Award } from 'lucide-react';

interface BottomNavProps {
  activeScreen: string;
  onNavigate: (screen: string) => void;
}

export function BottomNav({ activeScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Home' },
    { id: 'storybook', icon: Book, label: 'Stories' },
    { id: 'games', icon: Gamepad2, label: 'Games' },
    { id: 'passport', icon: Award, label: 'Badges' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-50">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex justify-around items-center py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeScreen === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex flex-col items-center gap-1 px-6 py-2 rounded-[16px] transition-all cursor-pointer border-none ${isActive
                    ? 'bg-[#4A90E2] text-white scale-110 shadow-lg font-bold'
                    : 'bg-transparent text-[#333333] hover:bg-gray-100 opacity-70 hover:opacity-100'
                  }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-[14px]">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}