import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Trophy, ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

interface LoveQuizProps {
  onComplete: () => void;
}

// ============================================
// CUSTOMIZABLE: Quiz questions and answers
// ============================================
const QUIZ_QUESTIONS = [
  {
    question: "Where did we first meet?",
    options: ["At a coffee shop", "Through friends", "At school or work"],
    correctIndex: 1, // Change to your correct answer (0, 1, or 2)
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile", "Your laugh", "Everything"],
    correctIndex: 2,
  },
  {
    question: "What's our favorite thing to do together?",
    options: ["Watch movies", "Go on adventures", "Just talk for hours"],
    correctIndex: 0,
  },
  {
    question: "What food reminds me of us?",
    options: ["Pizza", "Ice cream", "Home-cooked meals"],
    correctIndex: 1,
  },
  {
    question: "What's our song?",
    options: ["A romantic ballad", "Something upbeat", "We have too many"],
    correctIndex: 2,
  },
];

const WRONG_ANSWER_MESSAGES = [
  "Hmm… are you sure?",
  "Let me help you with that one",
  "Close enough, but not quite",
  "Someone wasn't paying attention",
  "Try again, my love",
];

const LoveQuiz = ({ onComplete }: LoveQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongMessage, setWrongMessage] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  const question = QUIZ_QUESTIONS[currentQuestion];

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    const correct = index === question.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      // Success confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#E11D48', '#F472B6', '#FB7185'],
      });

      setTimeout(() => {
        if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
        } else {
          // Quiz complete!
          setIsComplete(true);
          // Big celebration
          const duration = 3000;
          const end = Date.now() + duration;
          const frame = () => {
            confetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: 0 },
              colors: ['#E11D48', '#F472B6', '#FB7185'],
            });
            confetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: 1 },
              colors: ['#E11D48', '#F472B6', '#FB7185'],
            });
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          };
          frame();
        }
      }, 1500);
    } else {
      // Wrong answer
      setWrongMessage(WRONG_ANSWER_MESSAGES[Math.floor(Math.random() * WRONG_ANSWER_MESSAGES.length)]);
      
      setTimeout(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setWrongMessage('');
      }, 2000);
    }
  };

  if (isComplete) {
    return (
      <div 
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
      >
        <motion.div
          className="text-center max-w-lg relative z-20"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="backdrop-blur-2xl bg-white/40 rounded-3xl p-10 md:p-16 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
          >
            <motion.div
              className="flex justify-center mb-6"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy size={64} className="text-rose-500" strokeWidth={1.5} />
            </motion.div>
            <h1 className="font-handwritten text-4xl md:text-6xl mb-4"
              style={{ color: '#7c2d12', fontWeight: 600 }}
            >
              Perfect Score!
            </h1>
            <p className="font-handwritten text-2xl mb-8"
              style={{ color: '#991b1b' }}
            >
              You know us so well
            </p>
            <motion.button
              onClick={onComplete}
              className="relative overflow-hidden group px-12 py-5 rounded-full font-semibold text-lg text-white flex items-center gap-3 mx-auto"
              style={{
                background: 'linear-gradient(135deg, hsl(346 77% 50%) 0%, hsl(0 85% 55%) 100%)',
                boxShadow: '0 4px 20px -4px hsl(346 77% 50% / 0.4)',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 30px -8px hsl(346 77% 50% / 0.6)',
                y: -2
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
              <span className="relative z-10 tracking-wide">Next Gift</span>
              <ArrowRight size={18} className="relative z-10" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`shape-${i}`}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${120 + Math.random() * 250}px`,
              height: `${120 + Math.random() * 250}px`,
              background: `radial-gradient(circle, 
                rgba(251, 207, 232, ${0.15 + Math.random() * 0.1}) 0%, 
                rgba(244, 114, 182, ${0.08 + Math.random() * 0.08}) 50%, 
                transparent 100%)`,
              borderRadius: '50%',
              filter: 'blur(50px)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 1.5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {/* Progress indicator */}
      <motion.div
        className="w-full max-w-md mb-8 relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-quicksand">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <Heart size={20} className="text-rose-400" fill="currentColor" strokeWidth={1.5} />
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          className="backdrop-blur-2xl bg-white/40 rounded-3xl p-8 md:p-10 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] max-w-md w-full text-center relative z-20"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="font-handwritten text-2xl md:text-3xl mb-8"
            style={{ color: '#7c2d12', fontWeight: 600 }}
          >
            {question.question}
          </motion.h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-2xl text-left font-quicksand transition-all duration-300 relative overflow-hidden group ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-700 shadow-lg shadow-green-500/30'
                      : 'bg-red-100 border-2 border-red-400 text-red-700 animate-wiggle shadow-lg shadow-red-400/30'
                    : selectedAnswer !== null && index === question.correctIndex
                    ? 'bg-green-100 border-2 border-green-500 text-green-700 shadow-lg shadow-green-500/30'
                    : 'bg-secondary hover:bg-accent border-2 border-transparent hover:border-primary/30 hover:shadow-md'
                }`}
                whileHover={selectedAnswer === null ? { 
                  scale: 1.03, 
                  x: 8,
                  boxShadow: '0 4px 20px -4px hsl(346 77% 50% / 0.3)'
                } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.97 } : {}}
              >
                {selectedAnswer === null && (
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  />
                )}
                <span className="relative z-10">{option}</span>
              </motion.button>
            ))}
          </div>

          {/* Wrong answer message */}
          <AnimatePresence>
            {wrongMessage && (
              <motion.p
                className="mt-6 font-handwritten text-xl text-primary"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {wrongMessage}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Success message */}
          <AnimatePresence>
            {isCorrect && (
              <motion.div
                className="mt-6 flex items-center justify-center gap-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <CheckCircle2 size={24} className="text-green-600" strokeWidth={2} />
                <p className="font-handwritten text-xl text-green-600">Perfect!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoveQuiz;
