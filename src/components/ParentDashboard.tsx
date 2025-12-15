import { BarChart3, Search, User, Settings, BookOpen, Trophy, Clock, TrendingUp, LogOut } from 'lucide-react';
import { useState } from 'react';
import { ParentReports } from './ParentReports';
import { ParentSettings } from './ParentSettings';
import { ParentHelp } from './ParentHelp';
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

interface ParentDashboardProps {
  onLogout: () => void;
}

export function ParentDashboard({ onLogout }: ParentDashboardProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'reports' | 'settings' | 'help'>('dashboard');
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

  return (
    <div className="min-h-screen bg-[#F5F7FA]">
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

      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <header className="bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] sticky top-0 z-50">
          <div className="px-12 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[#333333] m-0 mb-1">Parent Dashboard</h2>
                <p className="text-[#333333] opacity-60 m-0 text-[18px]">
                  Track your child's learning journey
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#333333] opacity-40" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="pl-12 pr-6 py-3 rounded-[20px] border-2 border-gray-200 focus:border-[#4A90E2] outline-none w-80 text-[18px]"
                  />
                </div>

                {/* Logout Button */}
                <button
                  onClick={() => handleExitAttempt(onLogout)}
                  className="flex items-center gap-2 bg-white border-2 border-gray-200 text-[#333333] px-6 py-3 rounded-[20px] hover:bg-[#4A90E2] hover:text-white hover:border-[#4A90E2] transition-all cursor-pointer text-[18px]"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>

                {/* Profile */}
                <button className="w-12 h-12 bg-[#4A90E2] rounded-full flex items-center justify-center cursor-pointer border-none">
                  <User className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="bg-white border-b border-gray-200 px-12">
          <div className="flex gap-8">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'reports', label: 'Reports' },
              { id: 'settings', label: 'Settings' },
              { id: 'help', label: 'Help' }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 border-b-3 text-[18px] cursor-pointer bg-transparent ${activeTab === tab.id
                  ? 'border-[#4A90E2] text-[#4A90E2]'
                  : 'border-transparent text-[#333333] opacity-60 hover:opacity-100'
                  }`}
                onClick={() => setActiveTab(tab.id as 'dashboard' | 'reports' | 'settings' | 'help')}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="px-12 py-12">
          {activeTab === 'dashboard' && (
            <>
              {/* Summary Card */}
              <div className="bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] rounded-[24px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] mb-12 text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Trophy className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white m-0 mb-1">Your child has been exploring different cultures!</h3>
                    <p className="text-white opacity-90 m-0 text-[20px]">
                      Great progress this week - Sarah has visited 3 new countries
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mt-8">
                  {[
                    { label: 'Learning Time', value: '12.5 hrs', icon: Clock },
                    { label: 'Countries Explored', value: '5', icon: BookOpen },
                    { label: 'Quiz Score', value: '85%', icon: TrendingUp },
                    { label: 'Achievements', value: '8', icon: Trophy }
                  ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="bg-white/10 rounded-[20px] p-6 backdrop-blur-sm group hover:bg-white/20 transition-all">
                        <Icon className="w-10 h-10 text-white mb-4 group-hover:scale-110 transition-transform" />
                        <div className="text-[42px] font-bold mb-1 leading-none">{stat.value}</div>
                        <p className="text-white opacity-90 m-0 text-[18px] font-medium">{stat.label}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Learning Progress Chart */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-[#333333] m-0">Weekly Learning Progress</h3>
                    <BarChart3 className="w-6 h-6 text-[#4A90E2]" />
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="space-y-6">
                    {[
                      { day: 'Monday', hours: 2.5, color: '#4A90E2' },
                      { day: 'Tuesday', hours: 1.8, color: '#7BC67E' },
                      { day: 'Wednesday', hours: 3.2, color: '#F475A8' },
                      { day: 'Thursday', hours: 2.0, color: '#F8D93B' },
                      { day: 'Friday', hours: 1.5, color: '#F7A34B' },
                      { day: 'Saturday', hours: 0.8, color: '#4A90E2' },
                      { day: 'Sunday', hours: 0.7, color: '#7BC67E' }
                    ].map((day, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[#333333] text-[18px]">{day.day}</span>
                          <span className="text-[#333333] opacity-60 text-[18px]">{day.hours} hrs</span>
                        </div>
                        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${(day.hours / 4) * 100}%`,
                              backgroundColor: day.color
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities */}
                <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                  <h3 className="text-[#333333] m-0 mb-8">Recent Activities</h3>

                  <div className="space-y-6">
                    {[
                      {
                        activity: 'Completed Holi Festival Story',
                        time: '2 hours ago',
                        emoji: '🎨',
                        color: '#F475A8'
                      },
                      {
                        activity: 'Played "Match the Culture" Game',
                        time: '5 hours ago',
                        emoji: '🎮',
                        color: '#4A90E2'
                      },
                      {
                        activity: 'Explored Japan Culture',
                        time: '1 day ago',
                        emoji: '🏯',
                        color: '#7BC67E'
                      },
                      {
                        activity: 'Earned "World Explorer" Badge',
                        time: '2 days ago',
                        emoji: '🏆',
                        color: '#F8D93B'
                      },
                      {
                        activity: 'Completed India Quiz - 90%',
                        time: '3 days ago',
                        emoji: '✅',
                        color: '#7BC67E'
                      }
                    ].map((item, index) => (
                      <div key={index} className="flex items-start gap-4 p-4 rounded-[20px] hover:bg-gray-50 transition-colors">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: item.color }}
                        >
                          <span className="text-[24px]">{item.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-[#333333] m-0 mb-1 text-[20px]">{item.activity}</h4>
                          <p className="text-[#333333] opacity-50 m-0 text-[16px]">{item.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subject Performance */}
              <div className="mt-8 bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-[#333333] m-0 mb-8">Subject Performance</h3>

                <div className="grid md:grid-cols-3 gap-8">
                  {[
                    { subject: 'Geography', score: 92, color: '#4A90E2' },
                    { subject: 'Cultural Studies', score: 88, color: '#F475A8' },
                    { subject: 'World History', score: 75, color: '#7BC67E' }
                  ].map((subject, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-[#333333] m-0 text-[24px] font-semibold">{subject.subject}</h4>
                        <span className="text-[32px] font-bold" style={{ color: subject.color }}>
                          {subject.score}%
                        </span>
                      </div>
                      <div className="w-full h-5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${subject.score}%`,
                            backgroundColor: subject.color
                          }}
                        ></div>
                      </div>
                      <p className="text-[#333333] opacity-60 m-0 mt-3 text-[18px] font-medium">
                        {subject.score >= 90 ? 'Excellent!' : subject.score >= 80 ? 'Great work!' : 'Keep improving!'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-8 bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
                <h3 className="text-[#333333] m-0 mb-6">Recommended Activities</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'African Cultures Module',
                      description: 'Sarah shows interest in wildlife - explore African cultures next!',
                      color: '#F7A34B'
                    },
                    {
                      title: 'Music & Instruments',
                      description: 'Expand learning with traditional instruments from around the world',
                      color: '#7BC67E'
                    }
                  ].map((rec, index) => (
                    <div
                      key={index}
                      className="border-2 border-gray-200 rounded-[20px] p-6 hover:border-[#4A90E2] transition-colors cursor-pointer"
                    >
                      <div
                        className="w-10 h-10 rounded-full mb-4"
                        style={{ backgroundColor: rec.color }}
                      ></div>
                      <h4 className="text-[#333333] m-0 mb-2 text-[22px]">{rec.title}</h4>
                      <p className="text-[#333333] opacity-70 m-0 text-[18px]">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'reports' && <ParentReports />}
          {activeTab === 'settings' && <ParentSettings />}
          {activeTab === 'help' && <ParentHelp />}
        </div>
      </div>
    </div>
  );
}