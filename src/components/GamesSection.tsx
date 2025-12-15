import { Gamepad2, Trophy, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  emoji: string;
}

const quizQuestions: Question[] = [
  {
    question: "Which country is famous for the Eiffel Tower?",
    options: ["Germany", "France", "Italy", "Spain"],
    correctAnswer: 1,
    emoji: "🗼"
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: 2,
    emoji: "🗾"
  },
  {
    question: "Which continent is Egypt in?",
    options: ["Asia", "Africa", "Europe", "South America"],
    correctAnswer: 1,
    emoji: "🐪"
  },
  {
    question: "What language do they speak in Brazil?",
    options: ["Spanish", "Portuguese", "French", "English"],
    correctAnswer: 1,
    emoji: "🇧🇷"
  }
];

export function GamesSection() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    if (answerIndex === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
        setShowResult(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameComplete(false);
  };

  const question = quizQuestions[currentQuestion];

  return (
    <section id="games" className="py-20 bg-gradient-to-br from-[#E3F2FD] to-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-block bg-[#F8D93B] text-[#333333] px-6 py-2 rounded-[20px] mb-4">
            <span className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5" />
              Fun Games
            </span>
          </div>
          <h2 className="text-[#333333] m-0 mb-4">Test Your Knowledge!</h2>
          <p className="text-[#333333] opacity-70 max-w-2xl mx-auto m-0">
            Play our fun quiz game and see how much you know about world cultures!
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {!gameComplete ? (
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[18px] text-[#333333] opacity-70">
                    Question {currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-[18px] text-[#4A90E2] flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Score: {score}
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="text-center mb-8">
                <div className="text-[64px] mb-4">{question.emoji}</div>
                <h3 className="text-[#333333] m-0">{question.question}</h3>
              </div>

              {/* Answer Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => {
                  const isCorrect = index === question.correctAnswer;
                  const isSelected = selectedAnswer === index;
                  
                  let bgColor = 'bg-gray-50';
                  let borderColor = 'border-gray-200';
                  let textColor = 'text-[#333333]';
                  
                  if (selectedAnswer !== null) {
                    if (isCorrect) {
                      bgColor = 'bg-[#7BC67E]';
                      borderColor = 'border-[#7BC67E]';
                      textColor = 'text-white';
                    } else if (isSelected) {
                      bgColor = 'bg-[#F475A8]';
                      borderColor = 'border-[#F475A8]';
                      textColor = 'text-white';
                    }
                  }
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedAnswer !== null}
                      className={`${bgColor} ${textColor} border-2 ${borderColor} px-6 py-4 rounded-[24px] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all hover:scale-105 cursor-pointer flex items-center justify-between disabled:cursor-not-allowed`}
                    >
                      <span>{option}</span>
                      {selectedAnswer !== null && (
                        isCorrect ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : isSelected ? (
                          <XCircle className="w-6 h-6" />
                        ) : null
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[32px] p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-center">
              <div className="text-[80px] mb-6">
                {score >= 3 ? '🎉' : score >= 2 ? '😊' : '💪'}
              </div>
              <h2 className="text-[#333333] m-0 mb-4">
                {score >= 3 ? 'Amazing Job!' : score >= 2 ? 'Great Effort!' : 'Keep Learning!'}
              </h2>
              <p className="text-[#333333] opacity-70 mb-2">
                You scored
              </p>
              <div className="text-[64px] text-[#4A90E2] mb-8">
                {score} / {quizQuestions.length}
              </div>
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-[#4A90E2] to-[#7BC67E] text-white px-10 py-4 rounded-[24px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer border-none flex items-center gap-2 mx-auto"
              >
                <RefreshCw className="w-6 h-6" />
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Other Game Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {[
            { title: 'Match the Flags', emoji: '🚩', color: '#4A90E2', desc: 'Match countries with their flags!' },
            { title: 'Food Explorer', emoji: '🍜', color: '#F7A34B', desc: 'Discover dishes from around the world!' },
            { title: 'Landmark Hunt', emoji: '🏛️', color: '#F475A8', desc: 'Find famous landmarks on the map!' }
          ].map((game, index) => (
            <div 
              key={index}
              className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all hover:scale-105 cursor-pointer text-center"
            >
              <div className="text-[64px] mb-4">{game.emoji}</div>
              <h3 className="text-[#333333] m-0 mb-2 text-[28px]">{game.title}</h3>
              <p className="text-[#333333] opacity-70 m-0 mb-4 text-[18px]">
                {game.desc}
              </p>
              <div 
                className="inline-block px-6 py-2 rounded-[20px] text-white"
                style={{ backgroundColor: game.color }}
              >
                Coming Soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
