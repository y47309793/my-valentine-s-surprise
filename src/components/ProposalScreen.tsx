import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

interface ProposalScreenProps {
  onYes: () => void;
  onLoadingStart?: () => void;
}

// ============================================
// CUSTOMIZABLE: Elegant messages
// ============================================
import { PROPOSAL_MESSAGES, PROPOSAL_EMOJI_URL } from '@/config/valentine';

// ============================================
// CUSTOMIZABLE: Elegant messages
// ============================================
const ELEGANT_MESSAGES = PROPOSAL_MESSAGES;

// Replace these with your own GIF URLs
const FUNNY_GIFS = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHR5NzR5MzNnNDh6eTEzOWw5MnNtMDdpMXk0cWk4cWRjNGQzY3AwdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l4pTdcifPZLpDjL1e/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnN3YWgzbWRjYjFpdHVjb3B0aHdnMHdpbHB1bHA3am9lZjNpOXI4ZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOGxhdzNmNm4zbDdoNnZ4OHBqazZ3d3NtbXpxZjIybm8xN2c4MWZqOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26FLdmIp6wJr91JAI/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnM1N3ZwNDM4OXo2cmcxcXJieW5iZW1yenJrZ3J6b3J1cWNyaDZ4byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oEdv4hwWTzBhWvaU0/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjR0d2x1MnJnbHY4cmE3aGN0YnJraTRyYWJmaWhrejJpcWR0Y3VvOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l0MYt5jPR6QX5pnqM/giphy.gif",
];

const ProposalScreen = ({ onYes, onLoadingStart }: ProposalScreenProps) => {
  const [noClickCount, setNoClickCount] = useState(0);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [showAutoYes, setShowAutoYes] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentMessage = ELEGANT_MESSAGES[Math.min(noClickCount, ELEGANT_MESSAGES.length - 1)];
  const currentGif = noClickCount > 0 ? FUNNY_GIFS[(noClickCount - 1) % FUNNY_GIFS.length] : null;

  useEffect(() => {
    if (noClickCount >= 6) {
      setShowAutoYes(true);
      const timer = setTimeout(() => {
        onLoadingStart?.();
        // Add a small delay before calling onYes to show the loader
        setTimeout(() => {
          onYes();
        }, 100);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [noClickCount, onYes, onLoadingStart]);

  const handleNoClick = () => {
    const newCount = noClickCount + 1;
    setNoClickCount(newCount);

    // Custom path based on user's diagram
    // Path: bottom-right -> top-right -> bottom-right (lower) -> bottom-left -> top-left
    if (newCount === 1) {
      // Move to bottom-right area
      setNoButtonStyle({
        transform: 'translate(280px, 220px)',
      });
    } else if (newCount === 2) {
      // Move to top-right area
      setNoButtonStyle({
        transform: 'translate(280px, -180px)',
      });
    } else if (newCount === 3) {
      // Move to bottom-right (lower position)
      setNoButtonStyle({
        transform: 'translate(280px, 280px)',
      });
    } else if (newCount === 4) {
      // Move to bottom-left area
      setNoButtonStyle({
        transform: 'translate(-280px, 280px)',
      });
    } else if (newCount === 5) {
      // Move to top-left area (final position before auto-yes)
      setNoButtonStyle({
        transform: 'translate(-280px, -180px)',
        opacity: 0.8,
      });
    }
  };

  const handleNoHover = () => {
    // Disable random hover movement to keep the custom path intact
    // User can enable this if they want the button to jump on hover
  };

  // Memoize random values for background shapes
  const backgroundShapes = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: `shape-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${120 + Math.random() * 250}px`,
      height: `${120 + Math.random() * 250}px`,
      background: `radial-gradient(circle, 
        rgba(251, 207, 232, ${0.15 + Math.random() * 0.1}) 0%, 
        rgba(244, 114, 182, ${0.08 + Math.random() * 0.08}) 50%, 
        transparent 100%)`,
      x: (Math.random() - 0.5) * 150,
      y: (Math.random() - 0.5) * 150,
      duration: 12 + Math.random() * 8,
      delay: i * 1.2,
    }));
  }, []);

  // Memoize random values for floating icons
  const floatingIcons = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: `icon-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      color: `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 20}% ${75 + Math.random() * 15}%)`,
      size: 24 + Math.random() * 16,
      duration: 8 + Math.random() * 4,
      delay: i * 0.5,
    }));
  }, []);

  // Memoize random values for sparkles
  const sparkleEffects = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: `sparkle-${i}`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 8 + Math.random() * 4,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 4,
    }));
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced geometric shapes with pink theme */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundShapes.map((shape) => (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: shape.left,
              top: shape.top,
              width: shape.width,
              height: shape.height,
              background: shape.background,
              borderRadius: '50%',
              filter: 'blur(50px)',
              transform: 'translate3d(0,0,0)', // Force GPU acceleration
              willChange: 'transform, opacity',
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [shape.x],
              y: [shape.y],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Elegant floating icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{
              left: icon.left,
              top: icon.top,
              color: icon.color,
              opacity: 0.08,
              transform: 'translate3d(0,0,0)',
            }}
            animate={{
              y: [0, -40, 0],
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: icon.duration,
              repeat: Infinity,
              delay: icon.delay,
              ease: 'easeInOut',
            }}
          >
            <Heart size={icon.size} strokeWidth={1.5} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Subtle sparkle effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {sparkleEffects.map((sparkle) => (
          <motion.div
            key={sparkle.id}
            className="absolute"
            style={{
              left: sparkle.left,
              top: sparkle.top,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 0.6, 0],
              rotate: [0, 180],
            }}
            transition={{
              duration: sparkle.duration,
              repeat: Infinity,
              delay: sparkle.delay,
              ease: 'easeInOut',
            }}
          >
            <Sparkles size={sparkle.size} className="text-rose-300" strokeWidth={2} />
          </motion.div>
        ))}
      </div>

      {/* Glassmorphism card container */}
      <motion.div
        className="text-center z-20 max-w-2xl mx-auto relative"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Elegant glass card */}
        <motion.div
          className="backdrop-blur-2xl bg-white/40 rounded-3xl p-10 md:p-16 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] relative overflow-hidden"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Subtle animated border */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.1), rgba(244, 114, 182, 0.05), rgba(236, 72, 153, 0.1))',
              backgroundSize: '200% 200%',
            }}
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          {/* Main Question - Elegant typography */}
          <motion.div
            className="relative z-10 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Cute Bear Emoji GIF */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="h-40 overflow-hidden relative rounded-2xl w-48">
                <img
                  src={PROPOSAL_EMOJI_URL}
                  alt="Cute Bear"
                  className="w-full h-full object-cover object-top"
                  style={{ transform: 'scale(1.1)' }} // Slight zoom to help with filling/cropping if needed
                />
              </div>
            </motion.div>

            <motion.h1
              key={currentMessage}
              className="font-handwritten text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6"
              style={{
                color: '#7c2d12',
                fontWeight: 600,
                letterSpacing: '-0.02em',
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              {currentMessage}
            </motion.h1>

            {/* Elegant decorative line */}
            <motion.div
              className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto"
              style={{ width: '120px' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Decorative icons */}
          <div className="absolute top-6 left-6 opacity-30">
            <motion.div
              animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Heart size={24} className="text-rose-400" fill="currentColor" />
            </motion.div>
          </div>
          <div className="absolute top-6 right-6 opacity-30">
            <motion.div
              animate={{ rotate: [360, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear', delay: 0.5 }}
            >
              <Heart size={24} className="text-rose-400" fill="currentColor" />
            </motion.div>
          </div>

          {/* GIF Display with modern frame */}
          <AnimatePresence mode="wait">
            {currentGif && (
              <motion.div
                key={currentGif}
                className="mb-8 rounded-3xl overflow-hidden mx-auto max-w-xs relative group"
                initial={{ opacity: 0, scale: 0.8, y: 20, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, y: 0, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20, rotateY: 15 }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
                style={{
                  boxShadow: '0 20px 60px -15px rgba(236, 72, 153, 0.4), 0 0 40px rgba(244, 114, 182, 0.2)',
                }}
              >
                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-rose-400 to-red-400 rounded-3xl opacity-20 blur-xl group-hover:opacity-40 transition-opacity"
                  animate={{
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
                <div className="relative rounded-3xl overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
                  <img
                    src={currentGif}
                    alt="Cute reaction"
                    className="w-full h-auto relative z-10"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Buttons with modern design */}
          {!showAutoYes ? (
            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center relative min-h-[140px]"
              layout
            >
              {/* Yes Button - Elegant and sophisticated */}
              <motion.button
                onClick={onYes}
                className="relative overflow-hidden group px-12 py-5 rounded-full font-semibold text-lg text-white flex items-center gap-3"
                style={{
                  background: `linear-gradient(135deg, 
                    hsl(${346 + noClickCount * 2} 77% ${50 + noClickCount * 2}%) 0%, 
                    hsl(${0 + noClickCount * 2} 85% ${55 + noClickCount * 2}%) 100%)`,
                  boxShadow: `0 4px 20px -4px hsl(346 77% 50% / 0.4), 
                    0 0 0 1px rgba(255,255,255,0.1) inset`,
                }}
                whileHover={{
                  scale: 1.05 + noClickCount * 0.03,
                  boxShadow: "0 8px 30px -8px hsl(346 77% 50% / 0.6), 0 0 0 1px rgba(255,255,255,0.2) inset",
                  y: -2
                }}
                whileTap={{ scale: 0.98 + noClickCount * 0.03 }}
                animate={{
                  scale: 1 + noClickCount * 0.08,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                />
                <Heart
                  size={20}
                  className="relative z-10"
                  fill="currentColor"
                  strokeWidth={2.5}
                />
                <span className="relative z-10 tracking-wide">Yes</span>
              </motion.button>

              {/* No Button - Elegant glassmorphism */}
              {noClickCount < 6 && (
                <motion.button
                  onClick={handleNoClick}
                  onMouseEnter={handleNoHover}
                  className="relative overflow-hidden group px-12 py-5 rounded-full font-semibold text-lg backdrop-blur-xl bg-white/50 border border-white/60 text-gray-700 flex items-center gap-3"
                  style={{
                    ...noButtonStyle,
                    boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.05) inset',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 6px 25px -6px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.08) inset",
                    borderColor: 'rgba(0,0,0,0.1)',
                    backgroundColor: 'rgba(255,255,255,0.6)',
                  }}
                  whileTap={{ scale: 0.97 }}
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
                  />
                  <ArrowRight
                    size={18}
                    className="relative z-10 rotate-180"
                    strokeWidth={2.5}
                  />
                  <span className="relative z-10 tracking-wide">No</span>
                </motion.button>
              )}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="text-2xl md:text-3xl font-handwritten relative z-10 text-rose-600 flex items-center gap-3 justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={28} className="text-rose-500" fill="currentColor" />
              </motion.div>
              <span className="font-semibold">Taking that as a yes</span>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                <Heart size={28} className="text-rose-500" fill="currentColor" />
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Elegant bottom decoration */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 relative z-0 flex items-center gap-2"
        animate={{
          y: [0, -8, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Heart size={32} className="text-rose-200" fill="currentColor" strokeWidth={1} />
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-rose-300 to-transparent" />
        <Heart size={32} className="text-rose-200" fill="currentColor" strokeWidth={1} />
      </motion.div>
    </div>
  );
};

export default ProposalScreen;

