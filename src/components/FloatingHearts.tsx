import { useEffect, useState } from 'react';
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

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 4 + 4,
        delay: 0,
      };
      setHearts(prev => [...prev, heart]);

      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id));
      }, heart.duration * 1000);
    };

    const interval = setInterval(createHeart, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            initial={{ y: '110vh', x: `${heart.x}vw`, opacity: 0.8, rotate: 0 }}
            animate={{ y: '-10vh', opacity: 0, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: heart.duration, ease: 'linear' }}
            className="absolute"
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
