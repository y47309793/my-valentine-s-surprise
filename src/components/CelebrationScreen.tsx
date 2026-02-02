import { useEffect, useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Gift, Sparkles } from 'lucide-react';

interface CelebrationScreenProps {
  onContinue: () => void;
}

// Custom imports
import { CELEBRATION_GIF_URL } from '@/config/valentine';

const CelebrationScreen = ({ onContinue }: CelebrationScreenProps) => {
  const requestRef = useRef<number>();
  const startTimeRef = useRef<number>();

  useEffect(() => {
    // Trigger confetti celebration
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ['#E11D48', '#F472B6', '#FB7185', '#FDA4AF', '#FECDD3'];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestRef.current = requestAnimationFrame(frame);
      }
    };

    frame();

    // Heart burst
    const timer = setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
        shapes: ['circle'],
      });
    }, 500);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      clearTimeout(timer);
    };
  }, []);

  // Memoize random background shapes
  const backgroundShapes = useMemo(() => {
    return [...Array(10)].map((_, i) => ({
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

  // Memoize floating icons
  const floatingIcons = useMemo(() => {
    return [...Array(15)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 20}% ${70 + Math.random() * 15}%)`,
      x: (Math.random() - 0.5) * 150,
      size: 20 + Math.random() * 16,
      duration: 6 + Math.random() * 4,
      delay: i * 0.4,
    }));
  }, []);

  // Memoize sparkles
  const sparkleEffects = useMemo(() => {
    return [...Array(12)].map((_, i) => ({
      id: `sparkle-${i}`,
      left: `${20 + Math.random() * 60}%`,
      top: `${20 + Math.random() * 60}%`,
      size: 8 + Math.random() * 4,
      duration: 3 + Math.random() * 2,
      delay: i * 0.4,
    }));
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced geometric shapes */}
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
              transform: 'translate3d(0,0,0)',
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

      {/* Floating celebration icons */}
      {floatingIcons.map((icon) => (
        <motion.div
          key={icon.id}
          className="absolute"
          style={{
            left: icon.left,
            top: '100%',
            color: icon.color,
            opacity: 0.15,
            transform: 'translate3d(0,0,0)',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, icon.x],
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            delay: icon.delay,
            ease: 'easeOut',
          }}
        >
          <Heart size={icon.size} fill="currentColor" strokeWidth={1.5} />
        </motion.div>
      ))}

      {/* Glassmorphism card */}
      <motion.div
        className="text-center z-20 max-w-2xl mx-auto relative"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 200,
          damping: 20,
          delay: 0.2
        }}
      >
        <motion.div
          className="backdrop-blur-2xl bg-white/40 rounded-3xl p-10 md:p-16 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {/* Animated border */}
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

          {/* Celebration icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={64} className="text-rose-500" fill="currentColor" strokeWidth={2} />
            </motion.div>
          </motion.div>

          {/* Big celebration text */}
          <motion.h1
            className="font-handwritten text-5xl md:text-7xl lg:text-8xl mb-6"
            style={{
              color: '#7c2d12',
              fontWeight: 600,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Wonderful!
          </motion.h1>

          <motion.h2
            className="font-handwritten text-3xl md:text-5xl text-foreground mb-6"
            style={{
              color: '#991b1b',
              fontWeight: 500,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            You're my Valentine
          </motion.h2>

          {/* Dancing GIF */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border-4 border-white/50 w-64 h-64 relative">
              <img
                src={CELEBRATION_GIF_URL}
                alt="Celebration Dance"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-10 font-quicksand"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            Best decision ever
          </motion.p>

          {/* Continue button */}
          <motion.button
            onClick={onContinue}
            className="relative overflow-hidden group px-12 py-5 rounded-full font-semibold text-lg text-white flex items-center gap-3 mx-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(346 77% 50%) 0%, hsl(0 85% 55%) 100%)',
              boxShadow: '0 4px 20px -4px hsl(346 77% 50% / 0.4), 0 0 0 1px rgba(255,255,255,0.1) inset',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 8px 30px -8px hsl(346 77% 50% / 0.6), 0 0 0 1px rgba(255,255,255,0.2) inset',
              y: -2
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            <Gift size={20} className="relative z-10" strokeWidth={2.5} />
            <span className="relative z-10 tracking-wide">I have something for you</span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Subtle sparkle effects */}
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
  );
};

export default CelebrationScreen;

