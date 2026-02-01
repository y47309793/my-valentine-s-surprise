import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoveLetterProps {
  onComplete: () => void;
}

// ============================================
// CUSTOMIZABLE: Your love letter text
// ============================================
const LOVE_LETTER_LINES = [
  "My Dearest Love,",
  "",
  "From the moment I met you,",
  "I knew my life would never be the same.",
  "",
  "Every day with you feels like a gift,",
  "wrapped in laughter, warmth, and endless love.",
  "",
  "You make the ordinary extraordinary,",
  "and turn simple moments into treasured memories.",
  "",
  "Thank you for being my best friend,",
  "my confidant, my partner in everything.",
  "",
  "I fall more in love with you each day,",
  "and I can't wait for all our tomorrows.",
  "",
  "Forever & Always,",
  "Your Valentine 💕",
];

const LoveLetter = ({ onComplete }: LoveLetterProps) => {
  const [visibleLines, setVisibleLines] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (visibleLines < LOVE_LETTER_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines(prev => prev + 1);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setIsComplete(true), 1000);
    }
  }, [visibleLines]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 gradient-romantic">
      {/* Decorative seal */}
      <motion.div
        className="absolute top-8 right-8 text-5xl"
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        💌
      </motion.div>

      {/* Letter container */}
      <motion.div
        className="love-letter-paper max-w-2xl w-full relative"
        initial={{ opacity: 0, y: 30, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Red margin line */}
        <div className="absolute left-12 md:left-16 top-0 bottom-0 w-0.5 bg-red-300/50" />

        {/* Letter content */}
        <div className="pl-8 md:pl-12">
          {LOVE_LETTER_LINES.map((line, index) => (
            <AnimatePresence key={index}>
              {index < visibleLines && (
                <motion.p
                  className={`love-letter ${line === "" ? "h-6" : ""} ${
                    index === 0 || index === LOVE_LETTER_LINES.length - 2 
                      ? "font-bold" 
                      : ""
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Decorative corner hearts */}
        <motion.div
          className="absolute -top-4 -left-4 text-3xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          💕
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4 text-3xl"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          💕
        </motion.div>
      </motion.div>

      {/* Continue button */}
      <AnimatePresence>
        {isComplete && (
          <motion.button
            onClick={onComplete}
            className="btn-valentine bg-primary text-primary-foreground mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="mr-2">📸</span>
            One Last Gift
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reading indicator */}
      {!isComplete && (
        <motion.div
          className="mt-8 flex items-center gap-2 text-muted-foreground"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-xl">✍️</span>
          <span className="font-handwritten text-lg">Reading...</span>
        </motion.div>
      )}
    </div>
  );
};

export default LoveLetter;
