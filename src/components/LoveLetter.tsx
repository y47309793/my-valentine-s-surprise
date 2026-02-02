import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Heart, Camera, PenTool } from 'lucide-react';

interface LoveLetterProps {
  onComplete: () => void;
}

// ============================================
// CUSTOMIZABLE: Your love letter text
// ============================================
import { LOVE_LETTER_LINES } from '@/config/valentine';

// ============================================
// CUSTOMIZABLE: Your love letter text
// ============================================
// Uses lines from config

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
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(7)].map((_, i) => (
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
              delay: i * 1.3,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      {/* Decorative seal */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ rotate: -20, scale: 0 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <Mail size={40} className="text-rose-400" strokeWidth={1.5} />
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
                  className={`love-letter ${line === "" ? "h-6" : ""} ${index === 0 || index === LOVE_LETTER_LINES.length - 2
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

        {/* Decorative corner icons */}
        <motion.div
          className="absolute -top-4 -left-4"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Heart size={24} className="text-rose-300" fill="currentColor" strokeWidth={1.5} />
        </motion.div>
        <motion.div
          className="absolute -bottom-4 -right-4"
          animate={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <Heart size={24} className="text-rose-300" fill="currentColor" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      {/* Continue button */}
      <AnimatePresence>
        {isComplete && (
          <motion.button
            onClick={onComplete}
            className="btn-valentine bg-primary text-primary-foreground mt-8 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{
              scale: 1.08,
              boxShadow: '0 0 40px hsl(346 77% 60% / 0.5), 0 20px 60px -15px hsl(346 77% 50% / 0.4)',
              y: -3
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            <span className="relative z-10 tracking-wide">One Last Gift</span>
            <Camera size={18} className="relative z-10 ml-2" strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Reading indicator */}
      {!isComplete && (
        <motion.div
          className="mt-8 flex items-center gap-2 text-muted-foreground relative z-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <PenTool size={18} strokeWidth={2} />
          <span className="font-quicksand text-base">Reading...</span>
        </motion.div>
      )}
    </div>
  );
};

export default LoveLetter;
