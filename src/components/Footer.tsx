import { Globe, Heart, Mail, Facebook, Twitter, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] text-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                <Globe className="w-7 h-7 text-[#4A90E2]" />
              </div>
              <h3 className="m-0 text-white">CultureKids</h3>
            </div>
            <p className="m-0 text-[18px] opacity-90">
              Helping children discover and celebrate the beautiful diversity of our world! 🌍
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-white mb-4">Explore</h4>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <a href="#cultures" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  World Cultures
                </a>
              </li>
              <li>
                <a href="#stories" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  Cultural Stories
                </a>
              </li>
              <li>
                <a href="#games" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  Fun Games
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white mb-4">Resources</h4>
            <ul className="space-y-3 list-none p-0 m-0">
              <li>
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  For Parents
                </a>
              </li>
              <li>
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  For Teachers
                </a>
              </li>
              <li>
                <a href="#" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
                  Learning Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white mb-4">Stay Connected</h4>
            <div className="flex gap-4 mb-6">
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all cursor-pointer border-none">
                <Facebook className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all cursor-pointer border-none">
                <Twitter className="w-6 h-6 text-white" />
              </button>
              <button className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all cursor-pointer border-none">
                <Instagram className="w-6 h-6 text-white" />
              </button>
            </div>
            <a href="mailto:hello@culturekids.com" className="flex items-center gap-2 text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
              <Mail className="w-5 h-5" />
              hello@culturekids.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="m-0 opacity-90 text-[18px]">
            © 2025 CultureKids. Made with <Heart className="inline w-5 h-5 fill-current" /> for curious minds everywhere.
          </p>
          <div className="flex gap-6 text-[18px]">
            <a href="#" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
              Privacy Policy
            </a>
            <a href="#" className="text-white opacity-90 hover:opacity-100 transition-opacity no-underline">
              Terms of Use
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
