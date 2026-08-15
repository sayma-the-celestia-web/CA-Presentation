import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Label } from './Shared';

const QUESTIONS = [
  {
    id: 1,
    question: "What is the main purpose of Cache Memory?",
    options: [
      { id: 'A', text: "To store files permanently" },
      { id: 'B', text: "To provide faster access to frequently needed data" },
      { id: 'C', text: "To increase hard-disk space" },
      { id: 'D', text: "To replace Main Memory" }
    ],
    correct: 'B',
    explanation: "Cache stores copies of frequently needed data so the CPU can access it faster."
  },
  {
    id: 2,
    question: "What happens when the required data is found in Cache?",
    options: [
      { id: 'A', text: "Cache Miss" },
      { id: 'B', text: "Cache Hit" },
      { id: 'C', text: "Cache Mapping" },
      { id: 'D', text: "Memory Failure" }
    ],
    correct: 'B',
    explanation: "A Cache Hit means the required data is already present in Cache."
  },
  {
    id: 3,
    question: "Which cache level is closest to the CPU?",
    options: [
      { id: 'A', text: "L1" },
      { id: 'B', text: "L2" },
      { id: 'C', text: "L3" },
      { id: 'D', text: "Main Memory" }
    ],
    correct: 'A',
    explanation: "L1 Cache is the closest and fastest cache level in the multi-level cache organization discussed in the presentation."
  },
  {
    id: 4,
    question: "In Direct Mapping, where can a memory block be placed?",
    options: [
      { id: 'A', text: "Any cache line" },
      { id: 'B', text: "One specific cache line" },
      { id: 'C', text: "Any set" },
      { id: 'D', text: "Main Memory only" }
    ],
    correct: 'B',
    explanation: "In Direct Mapping, each memory block maps to one specific cache line."
  }
];

export function QuizSection({ id }: { id: string }) {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [score, setScore] = useState(0);
  const [hasAttemptedCurrent, setHasAttemptedCurrent] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showError, setShowError] = useState(false);

  const currentQ = QUESTIONS[currentQIndex];

  const handleOptionClick = (optId: string) => {
    if (isAnsweredCorrectly) return; // Prevent clicking after correct answer before next

    setSelectedOption(optId);
    
    if (optId === currentQ.correct) {
      setIsAnsweredCorrectly(true);
      setShowError(false);
      if (!hasAttemptedCurrent) {
        setScore(prev => prev + 1);
      }
    } else {
      setShowError(true);
      if (!hasAttemptedCurrent) {
        setHasAttemptedCurrent(true);
      }
    }
  };

  const handleNext = () => {
    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnsweredCorrectly(false);
      setHasAttemptedCurrent(false);
      setShowError(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsAnsweredCorrectly(false);
    setScore(0);
    setHasAttemptedCurrent(false);
    setIsFinished(false);
    setShowError(false);
  };

  const getScoreMessage = () => {
    if (score === 4) return "4 / 4 — Cache Master ⚡";
    if (score === 3) return "3 / 4 — Pretty Fast!";
    if (score === 2) return "2 / 4 — Time for a Cache Refresh 😄";
    return `${score} / 4 — Main Memory Mode 😂`;
  };

  const scrollToSummary = () => {
    document.getElementById('summary')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id={id} className="min-h-screen py-24 flex flex-col items-center justify-center border-t border-[#e2e2da] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 font-mono text-sm tracking-widest">REQUEST</div>
        <div className="absolute bottom-10 right-10 font-mono text-sm tracking-widest">CACHE</div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 font-mono text-xs tracking-widest rotate-90">BLOCK B04</div>
        <div className="absolute top-20 right-20 font-mono text-sm tracking-widest text-[#55EFC4]">HIT?</div>
        <div className="absolute bottom-20 left-20 font-mono text-sm tracking-widest text-[#FF7675]">MISS?</div>
      </div>

      <div className="mb-16 w-full max-w-2xl text-center z-10">
        <Label text="4 QUESTIONS • BASIC CONCEPTS" className="mb-4 inline-block" />
        <h2 className="font-serif text-4xl md:text-5xl italic font-light text-[#1a1a1a] mb-4">
          Quick Cache Check
        </h2>
        <p className="font-sans text-xl text-[#333333] italic">
          Let's see how much you remember. 👀
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white/50 border border-[#e2e2da] p-8 md:p-12 rounded-2xl shadow-sm z-10 relative">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div 
              key={currentQIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full"
            >
              <div className="mb-8 flex justify-between items-center">
                <span className="font-mono text-[10px] text-[#636E72] font-bold tracking-widest">
                  QUESTION {currentQIndex + 1} / {QUESTIONS.length}
                </span>
                <div className="flex gap-2">
                  {QUESTIONS.map((_, idx) => (
                    <div 
                      key={idx}
                      className={`w-2 h-2 rounded-full border border-black ${idx <= currentQIndex ? 'bg-black' : 'bg-transparent'}`}
                    />
                  ))}
                </div>
              </div>

              <h3 className="font-sans text-2xl font-medium text-[#1a1a1a] mb-8 leading-snug">
                {currentQ.question}
              </h3>

              <div className="flex flex-col gap-3 mb-8">
                {currentQ.options.map(opt => {
                  const isSelected = selectedOption === opt.id;
                  const isCorrectAnswer = opt.id === currentQ.correct;
                  const showAsCorrect = isAnsweredCorrectly && isCorrectAnswer;
                  const showAsWrong = isSelected && showError && !isCorrectAnswer;
                  
                  let btnClass = "border-2 border-black bg-white hover:bg-[#F9F8F3] text-[#1a1a1a]";
                  if (showAsCorrect) {
                    btnClass = "border-2 border-black bg-[#55EFC4] text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";
                  } else if (showAsWrong) {
                    btnClass = "border-2 border-[#FF7675] bg-[#ffeaea] text-[#FF7675] opacity-80 cursor-not-allowed";
                  } else if (isAnsweredCorrectly && !isCorrectAnswer) {
                    btnClass = "border-2 border-[#e2e2da] bg-white text-[#636E72] opacity-50 cursor-not-allowed";
                  } else if (isSelected) {
                    btnClass = "border-2 border-black bg-[#F9F8F3] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleOptionClick(opt.id)}
                      disabled={isAnsweredCorrectly}
                      className={`p-4 text-left font-sans text-lg transition-all flex items-center gap-4 ${btnClass}`}
                    >
                      <span className="font-mono text-sm font-bold opacity-50">{opt.id}.</span>
                      {opt.text}
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {isAnsweredCorrectly && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-auto bg-[#F9F8F3] border border-[#e2e2da] p-6 rounded-xl"
                  >
                    <div className="font-bold text-[#0984E3] mb-2 font-mono tracking-widest text-sm flex items-center gap-2">
                      <span>✓</span> Correct!
                    </div>
                    <p className="font-sans text-[#333333] mb-6 italic">{currentQ.explanation}</p>
                    <button 
                      onClick={handleNext}
                      className="bg-black text-white px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-black/80 transition-colors w-full sm:w-auto"
                    >
                      Next Question →
                    </button>
                  </motion.div>
                )}

                {showError && !isAnsweredCorrectly && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-auto bg-[#ffeaea] border border-[#FF7675] p-4 rounded-xl flex items-center gap-3"
                  >
                     <div className="font-bold text-[#FF7675] font-mono tracking-widest text-sm">
                      ✕ Cache Miss!
                    </div>
                    <p className="font-sans text-[#FF7675] text-sm">Not quite — try again!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div 
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 flex flex-col items-center"
            >
              <h3 className="font-serif text-4xl italic mb-6">Cache Check Complete!</h3>
              
              <div className="inline-block bg-[#1a1a1a] text-white px-8 py-4 font-mono text-lg tracking-widest mb-12 shadow-[6px_6px_0px_0px_#55EFC4]">
                {getScoreMessage()}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleRestart}
                  className="border-2 border-black bg-white px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-[#F9F8F3] transition-colors"
                >
                  Try Again
                </button>
                <button 
                  onClick={scrollToSummary}
                  className="bg-[#0984E3] text-white px-6 py-3 font-mono text-xs tracking-widest uppercase hover:bg-[#0984E3]/90 transition-colors"
                >
                  Review the Concepts ↓
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
