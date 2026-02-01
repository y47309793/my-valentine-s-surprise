import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

// ============================================
// CUSTOMIZABLE: Your photo URLs
// Replace these with your own photos
// ============================================
const PHOTOS = [
  {
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
    caption: "Our first adventure together 💕",
  },
  {
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
    caption: "That magical sunset 🌅",
  },
  {
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop",
    caption: "Laughing together 😄",
  },
  {
    url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop",
    caption: "Best friends forever 👫",
  },
  {
    url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    caption: "Your beautiful smile ✨",
  },
  {
    url: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=400&h=400&fit=crop",
    caption: "Making memories 📸",
  },
];

const PhotoMemories = () => {
  const [showFinalMessage, setShowFinalMessage] = useState(false);

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
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  if (showFinalMessage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic relative overflow-hidden">
        {/* Floating hearts background */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: '110%',
            }}
            animate={{
              y: [-50, -window.innerHeight - 100],
              x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
              rotate: [0, 360],
            }}
            transition={{
              duration: 5 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            {['❤️', '💕', '💖', '💗', '💝', '✨'][Math.floor(Math.random() * 6)]}
          </motion.div>
        ))}

        <motion.div
          className="text-center z-10 max-w-lg"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150 }}
        >
          <motion.div
            className="text-8xl md:text-9xl mb-6"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💖
          </motion.div>
          
          <motion.h1
            className="font-handwritten text-4xl md:text-6xl text-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            This is just the beginning
          </motion.h1>
          
          <motion.p
            className="font-handwritten text-2xl md:text-3xl text-primary mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Happy Valentine's Day ❤️
          </motion.p>

          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <p className="text-muted-foreground font-quicksand">
              Thank you for being mine 💕
            </p>
            <motion.p
              className="font-handwritten text-xl text-primary"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              I love you endlessly ∞
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 gradient-romantic">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.h1
            className="font-handwritten text-4xl md:text-6xl text-foreground mb-4"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Our Beautiful Memories 📸
          </motion.h1>
          <p className="text-muted-foreground font-quicksand">
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
              initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
              animate={{ opacity: 1, scale: 1, rotate: Math.random() * 6 - 3 }}
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
                className="absolute -top-2 -right-2 text-xl opacity-0 group-hover:opacity-100"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                💕
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
            className="btn-valentine bg-primary text-primary-foreground shadow-glow"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              className="inline-block mr-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              💖
            </motion.span>
            See My Final Message
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoMemories;
