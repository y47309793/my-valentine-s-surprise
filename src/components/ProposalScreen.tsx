import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProposalScreenProps {
  onYes: () => void;
}

// ============================================
// CUSTOMIZABLE: Funny messages and GIF URLs
// ============================================
const FUNNY_MESSAGES = [
  "Will you be my Valentine? 💖",
  "Are you sure sure? 🥺",
  "That button seems dangerous… 😏",
  "Let's try that again, my love 💕",
  "Pretty please? With a cherry on top? 🍒",
  "I'll take that as a YES 💖",
];

// Replace these with your own GIF URLs
const FUNNY_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHR5NzR5MzNnNDh6eTEzOWw5MnNtMDdpMXk0cWk4cWRjNGQzY3AwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pTdcifPZLpDjL1e/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnN3YWgzbWRjYjFpdHVjb3B0aHdnMHdpbHB1bHA3am9lZjNpOXI4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGxhdzNmNm4zbDdoNnZ4OHBqazZ3d3NtbXpxZjIybm8xN2c4MWZqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnM1N3ZwNDM4OXo2cmcxcXJieW5iZW1yenJrZ3J6b3J1cWNyaDZ4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv4hwWTzBhWvaU0/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjR0d2x1MnJnbHY4cmE3aGN0YnJraTRyYWJmaWhrejJpcWR0Y3VvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif",
];

const ProposalScreen = ({ onYes }: ProposalScreenProps) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [showAutoYes, setShowAutoYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMessage = FUNNY_MESSAGES[Math.min(noClickCount, FUNNY_MESSAGES.length - 1)];
  const currentGif = noClickCount > 0 ? FUNNY_GIFS[(noClickCount - 1) % FUNNY_GIFS.length] : null;

  useEffect(() => {
    if (noClickCount >= 5) {
      setShowAutoYes(true);
      setTimeout(() => {
        onYes();
      }, 2000);
    }
  }, [noClickCount, onYes]);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Different mischievous behaviors based on click count
    if (newCount === 1) {
      // Move away
      setNoButtonStyle({
        transform: 'translateX(100px)',
      });
    } else if (newCount === 2) {
      // Shrink
      setNoButtonStyle({
        transform: 'scale(0.7) translateY(-50px)',
      });
    } else if (newCount === 3) {
      // Move to opposite side
      setNoButtonStyle({
        transform: 'translateX(-150px) scale(0.5)',
      });
    } else if (newCount === 4) {
      // Almost invisible
      setNoButtonStyle({
        transform: 'translateX(80px) translateY(100px) scale(0.3)',
        opacity: 0.5,
      });
    }
  };

  const handleNoHover = () => {
    if (noClickCount >= 2) {
      // Random position jump on hover
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 100;
      setNoButtonStyle(prev => ({
        ...prev,
        transform: `translate(${randomX}px, ${randomY}px) scale(${0.8 - noClickCount * 0.1})`,
      }));
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic relative overflow-hidden"
    >
      {/* Background decorative hearts */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            💖
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center z-10 max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Main Question */}
        <motion.h1
          key={currentMessage}
          className="font-handwritten text-4xl md:text-6xl lg:text-7xl text-foreground mb-8 leading-tight"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {currentMessage}
        </motion.h1>

        {/* GIF Display */}
        <AnimatePresence mode="wait">
          {currentGif && (
            <motion.div
              key={currentGif}
              className="mb-8 rounded-2xl overflow-hidden shadow-romantic mx-auto max-w-xs"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src={currentGif}
                alt="Cute reaction"
                className="w-full h-auto"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        {!showAutoYes ? (
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center relative min-h-[120px]"
            layout
          >
            {/* Yes Button - Grows with each No click */}
            <motion.button
              onClick={onYes}
              className="btn-yes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: 1 + noClickCount * 0.1,
              }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <motion.span
                className="inline-block mr-2"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              >
                💘
              </motion.span>
              Yes
            </motion.button>

            {/* No Button - Mischievous behavior */}
            {noClickCount < 5 && (
              <motion.button
                onClick={handleNoClick}
                onMouseEnter={handleNoHover}
                className="btn-no"
                style={noButtonStyle}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="mr-2">😒</span>
                No
              </motion.button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-handwritten text-primary"
          >
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              ✨ Taking that as a YES! ✨
            </motion.span>
          </motion.div>
        )}
      </motion.div>

      {/* Decorative bottom hearts */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-6xl opacity-20"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        💕
      </motion.div>
    </div>
  );
};

export default ProposalScreen;
