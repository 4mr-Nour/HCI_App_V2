import { Globe, Book, Gamepad2, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.08)] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-full flex items-center justify-center">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-[#4A90E2] m-0 p-0 leading-none">CultureKids</h1>
              <p className="text-[14px] text-[#333333] opacity-70 m-0 p-0 leading-none mt-1">Explore the World!</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#cultures" className="flex items-center gap-2 text-[#333333] hover:text-[#4A90E2] transition-colors cursor-pointer no-underline">
              <Globe className="w-6 h-6" />
              <span>Cultures</span>
            </a>
            <a href="#stories" className="flex items-center gap-2 text-[#333333] hover:text-[#F475A8] transition-colors cursor-pointer no-underline">
              <Book className="w-6 h-6" />
              <span>Stories</span>
            </a>
            <a href="#games" className="flex items-center gap-2 text-[#333333] hover:text-[#F8D93B] transition-colors cursor-pointer no-underline">
              <Gamepad2 className="w-6 h-6" />
              <span>Games</span>
            </a>
          </nav>
          
          <button className="bg-gradient-to-r from-[#F475A8] to-[#F7A34B] text-white px-8 py-3 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-none flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Start Learning
          </button>
        </div>
      </div>
    </header>
  );
}
