import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface LoveQuizProps {
  onComplete: () => void;
}

// ============================================
// CUSTOMIZABLE: Quiz questions and answers
// ============================================
const QUIZ_QUESTIONS = [
  {
    question: "Where did we first meet?",
    options: ["At a coffee shop ☕", "Through friends 👫", "At school/work 📚"],
    correctIndex: 1, // Change to your correct answer (0, 1, or 2)
  },
  {
    question: "What's my favorite thing about you?",
    options: ["Your smile 😊", "Your laugh 😂", "Everything 💕"],
    correctIndex: 2,
  },
  {
    question: "What's our favorite thing to do together?",
    options: ["Watch movies 🎬", "Go on adventures 🌄", "Just talk for hours 💬"],
    correctIndex: 0,
  },
  {
    question: "What food reminds me of us?",
    options: ["Pizza 🍕", "Ice cream 🍦", "Home-cooked meals 🍳"],
    correctIndex: 1,
  },
  {
    question: "What's our song?",
    options: ["A romantic ballad 🎵", "Something upbeat 🎶", "We have too many! 🎤"],
    correctIndex: 2,
  },
];

const WRONG_ANSWER_MESSAGES = [
  "Hmm… you sure you're my girlfriend? 😜",
  "Are we dating the same person? 🤔",
  "Let me help you with that one! 💕",
  "Close enough... but not quite! 😄",
  "Someone wasn't paying attention! 😏",
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
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic">
        <motion.div
          className="text-center max-w-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="text-8xl mb-6"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            🏆
          </motion.div>
          <h1 className="font-handwritten text-4xl md:text-6xl text-primary mb-4">
            Perfect Score!
          </h1>
          <p className="font-handwritten text-2xl text-foreground mb-8">
            You know us so well 💖
          </p>
          <motion.button
            onClick={onComplete}
            className="btn-valentine bg-primary text-primary-foreground"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next Gift ➡️
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic">
      {/* Progress indicator */}
      <motion.div
        className="w-full max-w-md mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-quicksand">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </span>
          <span className="text-2xl">💕</span>
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
          className="card-valentine max-w-md w-full text-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <motion.h2
            className="font-handwritten text-2xl md:text-3xl text-foreground mb-8"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {question.question}
          </motion.h2>

          <div className="space-y-4">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => selectedAnswer === null && handleAnswer(index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 rounded-2xl text-left font-quicksand transition-all duration-300 ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'bg-green-100 border-2 border-green-500 text-green-700'
                      : 'bg-red-100 border-2 border-red-400 text-red-700 animate-wiggle'
                    : selectedAnswer !== null && index === question.correctIndex
                    ? 'bg-green-100 border-2 border-green-500 text-green-700'
                    : 'bg-secondary hover:bg-accent border-2 border-transparent hover:border-primary/20'
                }`}
                whileHover={selectedAnswer === null ? { scale: 1.02, x: 5 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
              >
                {option}
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
                className="mt-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <span className="text-4xl">✨</span>
                <p className="font-handwritten text-xl text-green-600">Perfect! 💕</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoveQuiz;
