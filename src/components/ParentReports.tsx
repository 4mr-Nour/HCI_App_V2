import { Calendar, Download, TrendingUp, Clock, BookOpen, Trophy, Target, Award, Zap, Brain } from 'lucide-react';

export function ParentReports() {
  return (
    <div className="px-12 py-12">
      {/* Header with Export */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-[#333333] m-0 mb-2">Learning Reports</h2>
          <p className="text-[#333333] opacity-60 m-0 text-[20px]">
            Detailed insights into Sarah's learning journey
          </p>
        </div>
        <button className="flex items-center gap-3 bg-[#4A90E2] text-white px-8 py-4 rounded-[20px] hover:bg-[#3A7BC8] transition-all cursor-pointer border-none text-[18px] shadow-[0_4px_20px_rgba(74,144,226,0.2)]">
          <Download className="w-5 h-5" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        <div className="flex items-center gap-6">
          <Calendar className="w-6 h-6 text-[#4A90E2]" />
          <span className="text-[#333333] text-[20px]">Report Period:</span>
          <div className="flex gap-4">
            {['Last 7 Days', 'Last 30 Days', 'Last 3 Months', 'All Time'].map((period, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-[16px] text-[18px] cursor-pointer transition-all ${
                  index === 1
                    ? 'bg-[#4A90E2] text-white border-none'
                    : 'bg-white border-2 border-gray-200 text-[#333333] hover:border-[#4A90E2]'
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Learning Time', value: '45.5 hrs', change: '+12%', icon: Clock, color: '#4A90E2' },
          { label: 'Stories Completed', value: '24', change: '+8%', icon: BookOpen, color: '#F475A8' },
          { label: 'Games Played', value: '38', change: '+15%', icon: Trophy, color: '#F8D93B' },
          { label: 'Average Score', value: '87%', change: '+5%', icon: Target, color: '#7BC67E' }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex items-center justify-between mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: metric.color }} />
                </div>
                <div className="flex items-center gap-2 bg-[#7BC67E] bg-opacity-10 px-4 py-2 rounded-full">
                  <TrendingUp className="w-4 h-4 text-[#7BC67E]" />
                  <span className="text-[#7BC67E] text-[16px]">{metric.change}</span>
                </div>
              </div>
              <div className="text-[36px] text-[#333333] mb-2">{metric.value}</div>
              <p className="text-[#333333] opacity-60 m-0 text-[18px]">{metric.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        {/* Learning Time Trends */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h3 className="text-[#333333] m-0 mb-8">Learning Time Trends (Monthly)</h3>
          
          <div className="space-y-6">
            {[
              { month: 'September', hours: 38, color: '#4A90E2' },
              { month: 'October', hours: 42, color: '#7BC67E' },
              { month: 'November', hours: 35, color: '#F475A8' },
              { month: 'December', hours: 45.5, color: '#F8D93B' }
            ].map((month, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#333333] text-[18px]">{month.month}</span>
                  <span className="text-[#333333] text-[20px]">{month.hours} hrs</span>
                </div>
                <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(month.hours / 50) * 100}%`,
                      backgroundColor: month.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Performance Over Time */}
        <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h3 className="text-[#333333] m-0 mb-8">Subject Performance Trends</h3>
          
          <div className="space-y-6">
            {[
              { subject: 'Geography', scores: [85, 88, 90, 92], current: 92, color: '#4A90E2' },
              { subject: 'Cultural Studies', scores: [80, 82, 85, 88], current: 88, color: '#F475A8' },
              { subject: 'World History', scores: [70, 72, 74, 75], current: 75, color: '#7BC67E' },
              { subject: 'Languages', scores: [75, 78, 82, 85], current: 85, color: '#F7A34B' }
            ].map((subject, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#333333] text-[18px]">{subject.subject}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#333333] opacity-60 text-[16px]">
                      {subject.scores[0]}% → {subject.current}%
                    </span>
                    <span className="text-[24px]" style={{ color: subject.color }}>
                      {subject.current}%
                    </span>
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${subject.current}%`,
                      backgroundColor: subject.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Activity Breakdown */}
      <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        <h3 className="text-[#333333] m-0 mb-8">Activity Breakdown (Last 30 Days)</h3>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              category: 'Stories & Reading',
              time: '18.5 hrs',
              percentage: 41,
              items: 24,
              color: '#F475A8'
            },
            {
              category: 'Interactive Games',
              time: '15.2 hrs',
              percentage: 33,
              items: 38,
              color: '#4A90E2'
            },
            {
              category: 'Quizzes & Tests',
              time: '11.8 hrs',
              percentage: 26,
              items: 16,
              color: '#7BC67E'
            }
          ].map((activity, index) => (
            <div key={index} className="border-2 border-gray-200 rounded-[20px] p-6">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${activity.color}20` }}
              >
                <span className="text-[32px]">{index === 0 ? '📚' : index === 1 ? '🎮' : '✅'}</span>
              </div>
              <h4 className="text-[#333333] m-0 mb-4 text-[22px]">{activity.category}</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#333333] opacity-60 text-[18px]">Total Time:</span>
                  <span className="text-[#333333] text-[20px]">{activity.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#333333] opacity-60 text-[18px]">Completed:</span>
                  <span className="text-[#333333] text-[20px]">{activity.items}</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mt-4">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${activity.percentage}%`,
                      backgroundColor: activity.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements & Milestones */}
      <div className="bg-white rounded-[24px] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] mb-8">
        <h3 className="text-[#333333] m-0 mb-8">Achievements & Milestones</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              title: 'World Explorer',
              description: 'Explored 10 different countries',
              date: 'Dec 1, 2024',
              emoji: '🌍',
              color: '#4A90E2'
            },
            {
              title: 'Story Master',
              description: 'Completed 25 cultural stories',
              date: 'Nov 28, 2024',
              emoji: '📖',
              color: '#F475A8'
            },
            {
              title: 'Quiz Champion',
              description: 'Scored 90%+ on 5 consecutive quizzes',
              date: 'Nov 25, 2024',
              emoji: '🏆',
              color: '#F8D93B'
            },
            {
              title: 'Culture Enthusiast',
              description: 'Spent 50+ hours learning',
              date: 'Nov 20, 2024',
              emoji: '⭐',
              color: '#7BC67E'
            }
          ].map((achievement, index) => (
            <div key={index} className="flex items-start gap-4 p-6 border-2 border-gray-200 rounded-[20px] hover:border-[#4A90E2] transition-colors">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: achievement.color }}
              >
                <span className="text-[32px]">{achievement.emoji}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-[#333333] m-0 mb-2 text-[20px]">{achievement.title}</h4>
                <p className="text-[#333333] opacity-70 m-0 mb-2 text-[18px]">{achievement.description}</p>
                <p className="text-[#333333] opacity-50 m-0 text-[16px]">{achievement.date}</p>
              </div>
              <Award className="w-6 h-6 text-[#F8D93B]" />
            </div>
          ))}
        </div>
      </div>

      {/* Learning Strengths & Areas for Improvement */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-gradient-to-br from-[#7BC67E] to-[#4A90E2] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-white">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-8 h-8 text-white" />
            <h3 className="text-white m-0">Learning Strengths</h3>
          </div>
          
          <div className="space-y-4">
            {[
              'Excellent geography knowledge and map skills',
              'Strong engagement with interactive stories',
              'Consistent daily learning habit (6 days/week)',
              'Quick to grasp new cultural concepts'
            ].map((strength, index) => (
              <div key={index} className="flex items-start gap-3 bg-white bg-opacity-20 rounded-[16px] p-4 backdrop-blur-sm">
                <span className="text-[24px]">✨</span>
                <p className="text-white m-0 text-[18px]">{strength}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Areas for Improvement */}
        <div className="bg-gradient-to-br from-[#F475A8] to-[#F7A34B] rounded-[24px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.08)] text-white">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-8 h-8 text-white" />
            <h3 className="text-white m-0">Growth Opportunities</h3>
          </div>
          
          <div className="space-y-4">
            {[
              'World History scores could be improved',
              'More practice with language lessons',
              'Try more challenging quiz levels',
              'Explore less familiar world regions'
            ].map((area, index) => (
              <div key={index} className="flex items-start gap-3 bg-white bg-opacity-20 rounded-[16px] p-4 backdrop-blur-sm">
                <span className="text-[24px]">💡</span>
                <p className="text-white m-0 text-[18px]">{area}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
