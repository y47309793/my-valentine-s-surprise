import { useState, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Camera, Sparkles, Infinity as InfinityIcon } from 'lucide-react';

// ============================================
// CUSTOMIZABLE: Your photo URLs
// Replace these with your own photos
// ============================================
import { MEMORY_PHOTOS } from '@/config/valentine';

// ============================================
// CUSTOMIZABLE: Your photo URLs
// Replace these with your own photos
// ============================================
const PHOTOS = MEMORY_PHOTOS;

const PhotoMemories = () => {
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const requestRef = useRef<number>();

  const handleShowFinal = () => {
    setShowFinalMessage(true);
    // Final celebration
    const duration = 4000;
    const end = Date.now() + duration;
    const colors = ['#E11D48', '#F472B6', '#FB7185', '#FDA4AF'];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 4,
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
  };

  // Cleanup effect
  useState(() => {
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  });

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
      duration: 12 + Math.random() * 8,
      delay: i * 1.2,
    }));
  }, []);

  // Memoize floating hearts
  const floatingHearts = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      color: `hsl(${340 + Math.random() * 20} ${60 + Math.random() * 20}% ${70 + Math.random() * 15}%)`,
      size: 16 + Math.random() * 12,
      x1: (Math.random() - 0.5) * 50,
      x2: (Math.random() - 0.5) * 100,
      duration: 6 + Math.random() * 3,
      delay: i * 0.3,
    }));
  }, []);

  // Memoize random rotations for photo frames
  const photoRotations = useMemo(() => {
    return PHOTOS.map(() => ({
      initial: Math.random() * 10 - 5,
      animate: Math.random() * 6 - 3,
    }));
  }, []);

  if (showFinalMessage) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
      >
        {/* Enhanced background shapes */}
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
        {/* Floating hearts background */}
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute"
            style={{
              left: heart.left,
              top: '110%',
              color: heart.color,
              opacity: 0.2,
              transform: 'translate3d(0,0,0)',
            }}
            animate={{
              y: [-50, -window.innerHeight - 100],
              x: [heart.x1, heart.x2],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: heart.duration,
              repeat: Infinity,
              delay: heart.delay,
            }}
          >
            <Heart size={heart.size} fill="currentColor" strokeWidth={1.5} />
          </motion.div>
        ))}

        <motion.div
          className="text-center z-20 max-w-lg relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="backdrop-blur-2xl bg-white/40 rounded-3xl p-10 md:p-16 border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]"
          >
            <motion.div
              className="flex justify-center mb-6"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart size={64} className="text-rose-500" fill="currentColor" strokeWidth={2} />
            </motion.div>

            <motion.h1
              className="font-handwritten text-4xl md:text-6xl mb-4"
              style={{ color: '#7c2d12', fontWeight: 600 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              This is just the beginning
            </motion.h1>

            <motion.p
              className="font-handwritten text-2xl md:text-3xl mb-8"
              style={{ color: '#991b1b', fontWeight: 500 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Happy Valentine's Day
            </motion.p>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-muted-foreground font-quicksand text-lg">
                Thank you for being mine
              </p>
              <motion.div
                className="flex items-center justify-center gap-2"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <span className="font-handwritten text-xl" style={{ color: '#dc2626' }}>
                  I love you endlessly
                </span>
                <InfinityIcon size={20} className="text-rose-500" strokeWidth={2} />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen px-4 py-12 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced background shapes */}
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
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="font-handwritten text-4xl md:text-6xl mb-4 flex items-center justify-center gap-3"
            style={{ color: '#7c2d12', fontWeight: 600 }}
          >
            <Camera size={40} className="text-rose-500" strokeWidth={1.5} />
            Our Beautiful Memories
          </motion.h1>
          <p className="text-muted-foreground font-quicksand text-lg">
            Every moment with you is a treasure
          </p>
        </motion.div>

        {/* Photo Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {PHOTOS.map((photo, index) => (
            <motion.div
              key={index}
              className="photo-frame group relative aspect-square"
              initial={{ opacity: 0, scale: 0.8, rotate: photoRotations[index].initial }}
              animate={{ opacity: 1, scale: 1, rotate: photoRotations[index].animate }}
              transition={{
                delay: 0.2 + index * 0.15,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 10,
              }}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover"
              />

              {/* Caption overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <p className="font-handwritten text-white text-lg">
                  {photo.caption}
                </p>
              </motion.div>

              {/* Decorative corner */}
              <motion.div
                className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart size={20} className="text-rose-400" fill="currentColor" strokeWidth={1.5} />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.button
            onClick={handleShowFinal}
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
            <Heart size={20} className="relative z-10" fill="currentColor" strokeWidth={2.5} />
            <span className="relative z-10 tracking-wide">See My Final Message</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoMemories;
