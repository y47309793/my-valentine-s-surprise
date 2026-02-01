import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface CelebrationScreenProps {
  onContinue: () => void;
}

const CelebrationScreen = ({ onContinue }: CelebrationScreenProps) => {
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
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Heart burst
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.6 },
        colors,
        shapes: ['circle'],
      });
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic relative overflow-hidden">
      {/* Floating celebration hearts */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl md:text-4xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: '100%',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeOut',
          }}
        >
          {['❤️', '💕', '💖', '💗', '💝'][Math.floor(Math.random() * 5)]}
        </motion.div>
      ))}

      <motion.div
        className="text-center z-10 max-w-lg mx-auto"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 15,
          delay: 0.2 
        }}
      >
        {/* Big celebration text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1
            className="font-handwritten text-5xl md:text-7xl lg:text-8xl text-primary mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            YAYYY!! 🎉
          </motion.h1>
        </motion.div>

        <motion.h2
          className="font-handwritten text-3xl md:text-5xl text-foreground mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          You're my Valentine 💕
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-muted-foreground mb-10 font-quicksand"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Best decision ever 😌
        </motion.p>

        {/* Continue button */}
        <motion.button
          onClick={onContinue}
          className="btn-valentine bg-primary text-primary-foreground shadow-glow"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 40px hsl(346 77% 60% / 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="inline-block mr-2"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
          >
            🎁
          </motion.span>
          I have something for you
        </motion.button>
      </motion.div>

      {/* Sparkle effects */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            left: `${20 + Math.random() * 60}%`,
            top: `${20 + Math.random() * 60}%`,
          }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default CelebrationScreen;
