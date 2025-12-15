import { ArrowLeft, Trophy, HelpCircle, RefreshCw, LogOut } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
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

interface GameCard {
  id: number;
  name: string;
  country: string;
  image: string;
  emoji: string;
}

interface GamePageProps {
  onBack: () => void;
  onLogout: () => void;
  tacoImage: string;
  sitarImage: string;
  kimchiImage: string;
  fluteImage: string;
}

export function GamePage({ onBack, onLogout, tacoImage, sitarImage, kimchiImage, fluteImage }: GamePageProps) {
  const [currentView, setCurrentView] = useState<'menu' | 'memory' | 'quiz' | 'flags'>('menu');
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => { });

  // Memory Game State
  const gameCards: GameCard[] = [
    { id: 1, name: 'Taco', country: 'Mexico', image: tacoImage, emoji: '🌮' },
    { id: 2, name: 'Sitar', country: 'India', image: sitarImage, emoji: '🎵' },
    { id: 3, name: 'Kimchi', country: 'Korea', image: kimchiImage, emoji: '🥬' },
    { id: 4, name: 'Japanese Flag', country: 'Japan', image: '', emoji: '🇯🇵' },
    { id: 5, name: 'Bamboo Flute', country: 'China', image: fluteImage, emoji: '🎋' },
    { id: 6, name: 'Croissant', country: 'France', image: '', emoji: '🥐' }
  ];
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<number[]>([]);
  const [memoryScore, setMemoryScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  // Quiz Game State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [showQuizResult, setShowQuizResult] = useState(false);
  const quizQuestions = [
    { q: "Which country is famous for Sushi?", options: ["China", "Japan", "India"], a: "Japan" },
    { q: "What is the capital of France?", options: ["London", "Berlin", "Paris"], a: "Paris" },
    { q: "Where can you see Pyramids?", options: ["Egypt", "Mexico", "Brazil"], a: "Egypt" }
  ];

  // Flag Game State
  const [flagScore, setFlagScore] = useState(0);
  const [currentFlagIndex, setCurrentFlagIndex] = useState(0);
  const [showFlagResult, setShowFlagResult] = useState(false);
  const flagQuestions = [
    { emoji: "🇧🇷", options: ["Brazil", "Argentina", "Portugal"], a: "Brazil" },
    { emoji: "🇮🇳", options: ["Ireland", "India", "Italy"], a: "India" },
    { emoji: "🇨🇦", options: ["USA", "Canada", "UK"], a: "Canada" },
    { emoji: "🇰🇷", options: ["Japan", "China", "Korea"], a: "Korea" }
  ];

  const handleExitAttempt = (action: () => void) => {
    if (currentView !== 'menu') {
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

  const handleReturnToMenu = () => {
    setPendingAction(() => () => {
      setCurrentView('menu');
      // Reset games
      setFlippedCards([]); setMatchedCards([]); setMemoryScore(0);
      setCurrentQuestion(0); setQuizScore(0); setShowQuizResult(false);
      setCurrentFlagIndex(0); setFlagScore(0); setShowFlagResult(false);
    });
    setShowExitDialog(true);
  };

  // --- Memory Game Logic ---
  const handleCardClick = (cardId: number) => {
    if (flippedCards.includes(cardId) || matchedCards.includes(cardId)) return;
    const newFlipped = [...flippedCards, cardId];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setTimeout(() => {
        if (Math.random() > 0.3) {
          const newMatched = [...matchedCards, ...newFlipped];
          setMatchedCards(newMatched);
          setMemoryScore(memoryScore + 10);
          if (newMatched.length === gameCards.length) {
            toast.success("Memory Game Completed!", { description: `You scored ${memoryScore + 10} points!` });
          }
        }
        setFlippedCards([]);
      }, 1000);
    }
  };

  const handleRestartMemory = () => {
    setFlippedCards([]); setMatchedCards([]); setMemoryScore(0); setShowHint(false);
  };

  // --- Quiz Game Logic ---
  const handleQuizAnswer = (answer: string) => {
    if (answer === quizQuestions[currentQuestion].a) {
      setQuizScore(quizScore + 1);
      toast.success("Correct!", { duration: 1000 });
    } else {
      toast.error("Oops! Try again next time.", { duration: 1000 });
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowQuizResult(true);
    }
  };

  // --- Flag Game Logic ---
  const handleFlagAnswer = (answer: string) => {
    if (answer === flagQuestions[currentFlagIndex].a) {
      setFlagScore(flagScore + 1);
      toast.success("Correct!", { duration: 1000 });
    } else {
      toast.error(`Incorrect! It was ${flagQuestions[currentFlagIndex].a}`, { duration: 1000 });
    }

    if (currentFlagIndex < flagQuestions.length - 1) {
      setCurrentFlagIndex(currentFlagIndex + 1);
    } else {
      setShowFlagResult(true);
    }
  };


  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setQuizScore(0);
    setShowQuizResult(false);
  };

  const handleRestartFlags = () => {
    setCurrentFlagIndex(0);
    setFlagScore(0);
    setShowFlagResult(false);
  };

  // --- VIEWS ---

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-[#E3F2FD] p-12 pb-32">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex justify-between items-center mb-12">
            <button onClick={onBack} className="flex items-center gap-3 bg-white px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none text-[#333333]">
              <ArrowLeft className="w-6 h-6" /> <span>Back</span>
            </button>
            <div className="text-right">
              <h1 className="text-[#333333] m-0 mb-2">Game Arcade 🎮</h1>
              <p className="text-[#333333] opacity-60 m-0 text-[24px]">Play and Learn!</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Memory Match Card */}
            <div onClick={() => setCurrentView('memory')} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform cursor-pointer flex flex-col items-center text-center group">
              <div className="w-32 h-32 bg-[#FFB74D] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <span className="text-[64px]">🃏</span>
              </div>
              <h3 className="text-[#333333] m-0 mb-2 text-[28px]">Memory Match</h3>
              <p className="text-[#333333] opacity-60 m-0 text-[18px]">Match items to their countries!</p>
            </div>

            {/* Culture Quiz Card */}
            <div onClick={() => setCurrentView('quiz')} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform cursor-pointer flex flex-col items-center text-center group">
              <div className="w-32 h-32 bg-[#4A90E2] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <span className="text-[64px]">❓</span>
              </div>
              <h3 className="text-[#333333] m-0 mb-2 text-[28px]">Culture Quiz</h3>
              <p className="text-[#333333] opacity-60 m-0 text-[18px]">Test your world knowledge!</p>
              <span className="bg-[#F475A8] text-white text-xs px-2 py-1 rounded-full mt-2">New!</span>
            </div>

            {/* Flag Guesser Card */}
            <div onClick={() => setCurrentView('flags')} className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:scale-105 transition-transform cursor-pointer flex flex-col items-center text-center group">
              <div className="w-32 h-32 bg-[#7BC67E] rounded-full flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                <span className="text-[64px]">🏳️</span>
              </div>
              <h3 className="text-[#333333] m-0 mb-2 text-[28px]">Flag Guesser</h3>
              <p className="text-[#333333] opacity-60 m-0 text-[18px]">Identify the country flag!</p>
              <span className="bg-[#F475A8] text-white text-xs px-2 py-1 rounded-full mt-2">New!</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER ACTIVE GAME ---
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E3F2FD] to-[#FFF8E7] pb-32">
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
              Your game progress will be lost!
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center gap-4 mt-8 w-full">
            <AlertDialogCancel className="w-full sm:w-auto text-lg px-8 py-6 rounded-[24px] border-2 border-[#4A90E2] text-[#4A90E2] hover:bg-[#4A90E2] hover:text-white transition-colors">
              Stay & Play
            </AlertDialogCancel>
            <AlertDialogAction onClick={confirmExit} className="w-full sm:w-auto text-lg px-8 py-6 rounded-[24px] bg-[#FF5252] hover:bg-[#FF1744] text-white border-none">
              Leave Game
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="max-w-[1200px] mx-auto px-12 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={handleReturnToMenu} className="flex items-center gap-3 bg-white px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all cursor-pointer border-none text-[#333333]">
            <ArrowLeft className="w-6 h-6" />
            <span>Games Menu</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-[#F8D93B] px-8 py-4 rounded-[24px] flex items-center gap-3">
              <Trophy className="w-7 h-7 text-[#333333]" />
              <span className="text-[#333333]">
                {currentView === 'memory' ? `Score: ${memoryScore}` :
                  currentView === 'quiz' ? `Score: ${quizScore}` :
                    `Score: ${flagScore}`}
              </span>
            </div>
            <button onClick={() => handleExitAttempt(onLogout)} className="flex items-center gap-3 bg-white text-[#333333] px-6 py-3 rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:bg-[#F475A8] hover:text-white transition-all cursor-pointer border-none">
              <LogOut className="w-6 h-6" /> <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* --- GAME COMPONENT RENDERING --- */}

        {currentView === 'memory' && (
          <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
            <div className="text-center mb-8">
              <h1 className="text-[#333333] m-0">Match the Culture! 🎯</h1>
            </div>
            {/* Same Memory Game Logic/UI as before */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {gameCards.map((card) => {
                const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
                const isMatched = matchedCards.includes(card.id);
                return (
                  <div key={card.id} onClick={() => handleCardClick(card.id)} className="relative h-[200px] cursor-pointer perspective-1000">
                    <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`} style={{ transformStyle: 'preserve-3d' }}>
                      <div className="absolute w-full h-full backface-hidden rounded-[24px] bg-gradient-to-br from-[#4A90E2] to-[#7BC67E] flex items-center justify-center"><span className="text-[60px]">❓</span></div>
                      <div className={`absolute w-full h-full backface-hidden rounded-[24px] overflow-hidden flex flex-col items-center justify-center p-2 text-center bg-white border-2 border-[#eee]`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                        {card.image ? <ImageWithFallback src={card.image} alt={card.name} className="w-full h-3/4 object-cover rounded-xl" /> : <span className="text-[50px]">{card.emoji}</span>}
                        <span className="text-sm font-bold mt-2">{card.name}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <button onClick={handleRestartMemory} className="bg-[#F475A8] text-white px-8 py-3 rounded-[24px] border-none cursor-pointer text-[18px]">Restart Game</button>
            </div>
          </div>
        )}

        {currentView === 'quiz' && (
          <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-w-2xl mx-auto text-center">
            {!showQuizResult ? (
              <>
                <h2 className="text-[#333333] mb-8 text-[32px]">{quizQuestions[currentQuestion].q}</h2>
                <div className="space-y-4">
                  {quizQuestions[currentQuestion].options.map((option, idx) => (
                    <button key={idx} onClick={() => handleQuizAnswer(option)} className="w-full bg-[#f0f0f0] hover:bg-[#E3F2FD] text-[#333333] py-4 rounded-[20px] text-[22px] border-2 border-transparent hover:border-[#4A90E2] transition-all cursor-pointer">
                      {option}
                    </button>
                  ))}
                </div>
                <p className="mt-8 text-gray-400">Question {currentQuestion + 1} of {quizQuestions.length}</p>
              </>
            ) : (
              <div className="py-12">
                <span className="text-[80px]">🎉</span>
                <h2 className="text-[#333333] mb-4 text-[40px]">Quiz Complete!</h2>
                <p className="text-[#333333] text-[24px] mb-8">You scored {quizScore} out of {quizQuestions.length}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={handleRestartQuiz} className="bg-[#F475A8] text-white px-10 py-5 rounded-[24px] text-[20px] border-none cursor-pointer">Play Again</button>
                  <button onClick={handleReturnToMenu} className="bg-[#4A90E2] text-white px-10 py-5 rounded-[24px] text-[20px] border-none cursor-pointer">Back to Menu</button>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'flags' && (
          <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] max-w-2xl mx-auto text-center">
            {!showFlagResult ? (
              <>
                <span className="text-[120px] mb-8 block">{flagQuestions[currentFlagIndex].emoji}</span>
                <h2 className="text-[#333333] mb-8 text-[32px]">Which country is this?</h2>
                <div className="grid grid-cols-1 gap-4">
                  {flagQuestions[currentFlagIndex].options.map((option, idx) => (
                    <button key={idx} onClick={() => handleFlagAnswer(option)} className="w-full bg-[#f0f0f0] hover:bg-[#E3F2FD] text-[#333333] py-4 rounded-[20px] text-[22px] border-2 border-transparent hover:border-[#7BC67E] transition-all cursor-pointer">
                      {option}
                    </button>
                  ))}
                </div>
                <p className="mt-8 text-gray-400">Flag {currentFlagIndex + 1} of {flagQuestions.length}</p>
              </>
            ) : (
              <div className="py-12">
                <span className="text-[80px]">🏆</span>
                <h2 className="text-[#333333] mb-4 text-[40px]">Flag Master!</h2>
                <p className="text-[#333333] text-[24px] mb-8">You scored {flagScore} out of {flagQuestions.length}</p>
                <div className="flex justify-center gap-4">
                  <button onClick={handleRestartFlags} className="bg-[#F475A8] text-white px-10 py-5 rounded-[24px] text-[20px] border-none cursor-pointer">Play Again</button>
                  <button onClick={handleReturnToMenu} className="bg-[#7BC67E] text-white px-10 py-5 rounded-[24px] text-[20px] border-none cursor-pointer">Back to Menu</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}