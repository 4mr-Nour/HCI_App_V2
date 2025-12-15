import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChildLogin } from './components/ChildLogin';
import { ParentLogin } from './components/ParentLogin';
import { ParentSignup } from './components/ParentSignup';
import { ChildDashboard } from './components/ChildDashboard';
import { StoryPage } from './components/StoryPage';
import { GamePage } from './components/GamePage';
import { PassportScreen } from './components/PassportScreen';
import { ParentDashboard } from './components/ParentDashboard';
import { BottomNav } from './components/BottomNav';
import { MusicDancePage } from './components/MusicDancePage';
import { LandmarksPage } from './components/LandmarksPage';

type Screen = 'landing' | 'childLogin' | 'parentLogin' | 'parentSignup' | 'dashboard' | 'storybook' | 'games' | 'passport' | 'parent' | 'cultures' | 'musicdance' | 'landmarks';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');
  const [childName, setChildName] = useState('Sarah');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  const handleStartExploring = () => {
    setCurrentScreen('dashboard');
  };

  const handleChildLogin = () => {
    setCurrentScreen('childLogin');
  };

  const handleParentLogin = () => {
    setCurrentScreen('parentLogin');
  };

  const handleParentSignup = () => {
    setCurrentScreen('parentSignup');
  };

  const handleChildLoginComplete = (name: string) => {
    setChildName(name);
    setCurrentScreen('dashboard');
  };

  const handleParentLoginComplete = () => {
    setCurrentScreen('parent');
  };

  const handleParentSignupComplete = () => {
    setCurrentScreen('parent');
  };

  const handleBackToLanding = () => {
    setCurrentScreen('landing');
  };

  const handleBack = () => {
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('landing');
    setChildName('Sarah'); // Reset to default
  };

  // Image URLs
  const images = {
    worldMap: "https://images.unsplash.com/photo-1723306009176-b71e9341b2ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGNvbG9yZnVsfGVufDF8fHx8MTc2NDc5NjUzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    holi: "https://images.unsplash.com/photo-1672093012219-490848c4c013?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob2xpJTIwZmVzdGl2YWwlMjBjb2xvcnN8ZW58MXx8fHwxNzY0NzQ0NDU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    childrenHoli: "https://images.unsplash.com/photo-1763735134834-d309278c97c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMHBsYXlpbmclMjBob2xpfGVufDF8fHx8MTc2NDc5NjUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sweets: "https://images.unsplash.com/photo-1684813114206-867e17b5b697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBzd2VldHMlMjBjb2xvcmZ1bHxlbnwxfHx8fDE3NjQ3NzgxODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    taco: "https://images.unsplash.com/photo-1707603571504-86c1ea50903e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwbWV4aWNhbiUyMGZvb2R8ZW58MXx8fHwxNzY0Nzc5OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    sitar: "https://images.unsplash.com/photo-1575669572405-52da19d6a7db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaXRhciUyMGluZGlhbiUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzY0Nzk2NTMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    kimchi: "https://images.unsplash.com/photo-1559863658-57587f49d0c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraW1jaGklMjBrb3JlYW4lMjBmb29kfGVufDF8fHx8MTc2NDc5NjUzMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    flute: "https://images.unsplash.com/photo-1672578249566-3f4b6d564aa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmbHV0ZSUyMGluc3RydW1lbnR8ZW58MXx8fHwxNzY0Nzk2NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    music: "https://images.unsplash.com/photo-1758598306778-b99be86d7709?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMGRhbmNlJTIwY2VsZWJyYXRpb258ZW58MXx8fHwxNzY0Nzk2NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
  };

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return (
          <LandingPage
            onStartExploring={handleStartExploring}
            onChildLogin={handleChildLogin}
            onParentLogin={handleParentLogin}
            onMusicDance={() => setCurrentScreen('musicdance')}
            onLandmarks={() => setCurrentScreen('landmarks')}
            worldMapImage={images.worldMap}
            musicImage={images.music}
          />
        );

      case 'childLogin':
        return (
          <ChildLogin
            onBack={handleBackToLanding}
            onLogin={handleChildLoginComplete}
          />
        );

      case 'parentLogin':
        return (
          <ParentLogin
            onBack={handleBackToLanding}
            onLogin={handleParentLoginComplete}
            onSignUp={handleParentSignup}
          />
        );

      case 'parentSignup':
        return (
          <ParentSignup
            onBack={handleBackToLanding}
            onSignup={handleParentSignupComplete}
            onLogin={() => setCurrentScreen('parentLogin')}
          />
        );

      case 'dashboard':
        return (
          <ChildDashboard
            childName={childName}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            worldMapImage={images.worldMap}
            resumeImage={images.holi}
          />
        );

      case 'storybook':
        return (
          <StoryPage
            onBack={handleBack}
            onLogout={handleLogout}
            holiImage={images.holi}
            childrenHoliImage={images.childrenHoli}
            sweetsImage={images.sweets}
          />
        );

      case 'games':
        return (
          <GamePage
            onBack={handleBack}
            onLogout={handleLogout}
            tacoImage={images.taco}
            sitarImage={images.sitar}
            kimchiImage={images.kimchi}
            fluteImage={images.flute}
          />
        );

      case 'passport':
        return (
          <PassportScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            childName={childName}
          />
        );

      case 'parent':
        return <ParentDashboard onLogout={handleLogout} />;

      case 'musicdance':
        return <MusicDancePage onBack={handleBackToLanding} onLogout={handleLogout} />;

      case 'landmarks':
        return <LandmarksPage onBack={handleBackToLanding} onLogout={handleLogout} />;

      default:
        return (
          <ChildDashboard
            childName={childName}
            onNavigate={handleNavigate}
            worldMapImage={images.worldMap}
            resumeImage={images.holi}
            onLogout={handleLogout}
          />
        );
    }
  };

  const showBottomNav = ['dashboard', 'storybook', 'games', 'passport'].includes(currentScreen);

  return (
    <div className="min-h-screen">
      {renderScreen()}
      {showBottomNav && (
        <BottomNav activeScreen={currentScreen} onNavigate={handleNavigate} />
      )}
    </div>
  );
}