import { motion } from 'framer-motion';

interface GiftSelectionProps {
  onSelectGift: (gift: 'quiz' | 'letter' | 'photos') => void;
}

const gifts = [
  {
    id: 'quiz' as const,
    emoji: '🎯',
    title: 'The Love Quiz',
    description: "Let's see how well you know us!",
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'letter' as const,
    emoji: '💌',
    title: 'Love Letter',
    description: 'Words from my heart to yours',
    color: 'from-rose-400 to-red-500',
  },
  {
    id: 'photos' as const,
    emoji: '📸',
    title: 'Our Memories',
    description: 'A collection of our beautiful moments',
    color: 'from-red-400 to-pink-500',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 20,
    },
  },
};

const GiftSelection = ({ onSelectGift }: GiftSelectionProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 gradient-romantic">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="font-handwritten text-4xl md:text-6xl text-foreground mb-4"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Pick a Gift 🎁
        </motion.h1>
        <p className="text-lg text-muted-foreground font-quicksand">
          I've prepared three special surprises for you
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gifts.map((gift, index) => (
          <motion.button
            key={gift.id}
            onClick={() => onSelectGift(gift.id)}
            className="gift-card group text-left p-8"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -10,
              transition: { type: 'spring', stiffness: 300 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Emoji icon */}
            <motion.div
              className="text-5xl md:text-6xl mb-4"
              animate={{ 
                rotate: [0, 5, -5, 0],
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.3,
              }}
            >
              {gift.emoji}
            </motion.div>

            {/* Title */}
            <h3 className="font-handwritten text-2xl md:text-3xl text-foreground mb-2 group-hover:text-primary transition-colors">
              {gift.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground font-quicksand text-sm md:text-base">
              {gift.description}
            </p>

            {/* Decorative gradient line */}
            <motion.div
              className={`h-1 rounded-full mt-4 bg-gradient-to-r ${gift.color}`}
              initial={{ width: '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{
                background: 'radial-gradient(circle at center, hsl(346 77% 50% / 0.1), transparent 70%)',
              }}
            />
          </motion.button>
        ))}
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        className="mt-8 text-muted-foreground font-handwritten text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tap one to unwrap ✨
      </motion.p>
    </div>
  );
};

export default GiftSelection;
