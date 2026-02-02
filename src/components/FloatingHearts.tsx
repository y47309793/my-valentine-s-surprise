import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);
  const timeoutsMs = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Limit the number of hearts to prevent DOM overload
    const MAX_HEARTS = 15;

    const createHeart = () => {
      // Don't create if we have too many
      setHearts(prev => {
        if (prev.length >= MAX_HEARTS) return prev;

        const duration = Math.random() * 4 + 4;
        const heart: Heart = {
          id: Date.now() + Math.random(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 15,
          duration: duration,
          delay: 0,
        };

        // Schedule removal
        const timeout = setTimeout(() => {
          setHearts(current => current.filter(h => h.id !== heart.id));
        }, duration * 1000);

        timeoutsMs.current.push(timeout);

        return [...prev, heart];
      });
    };

    const interval = setInterval(createHeart, 1200); // Reduced frequency slightly

    return () => {
      clearInterval(interval);
      timeoutsMs.current.forEach(clearTimeout);
      timeoutsMs.current = [];
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence mode='popLayout'>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0.8, rotate: 0 }}
            animate={{ y: '-10vh', opacity: 0, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: 'linear' }}
            className="absolute will-change-transform"
            style={{ fontSize: heart.size }}
          >
            💕
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
