import { motion } from 'framer-motion';
import { Target, Mail, Camera } from 'lucide-react';

interface GiftSelectionProps {
  onSelectGift: (gift: 'quiz' | 'letter' | 'photos') => void;
}

const gifts = [
  {
    id: 'quiz' as const,
    icon: Target,
    title: 'The Love Quiz',
    description: "Let's see how well you know us",
    color: 'from-pink-400 to-rose-500',
  },
  {
    id: 'letter' as const,
    icon: Mail,
    title: 'Love Letter',
    description: 'Words from my heart to yours',
    color: 'from-rose-400 to-red-500',
  },
  {
    id: 'photos' as const,
    icon: Camera,
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
    <div 
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme"
    >
      {/* Enhanced background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
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
              x: [(Math.random() - 0.5) * 150],
              y: [(Math.random() - 0.5) * 150],
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: i * 1.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <motion.div
        className="text-center mb-12 relative z-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="font-handwritten text-4xl md:text-6xl mb-4"
          style={{
            color: '#7c2d12',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        >
          Pick a Gift
        </motion.h1>
        <p className="text-lg text-muted-foreground font-quicksand">
          I've prepared three special surprises for you
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full relative z-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {gifts.map((gift, index) => {
          const IconComponent = gift.icon;
          return (
          <motion.button
            key={gift.id}
            onClick={() => onSelectGift(gift.id)}
            className="backdrop-blur-xl bg-white/40 rounded-3xl p-8 text-left border border-white/50 shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] group relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ 
              scale: 1.05, 
              y: -8,
              transition: { type: 'spring', stiffness: 300, damping: 25 }
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            {/* Icon */}
            <motion.div
              className="mb-6 text-rose-500"
              animate={{ 
                y: [0, -4, 0],
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                delay: index * 0.3,
                ease: 'easeInOut',
              }}
            >
              <IconComponent size={48} strokeWidth={1.5} />
            </motion.div>

            {/* Title */}
            <h3 className="font-handwritten text-2xl md:text-3xl mb-2 transition-colors"
              style={{ color: '#7c2d12' }}
            >
              {gift.title}
            </h3>

            {/* Description */}
            <p className="text-muted-foreground font-quicksand text-sm md:text-base">
              {gift.description}
            </p>

            {/* Decorative gradient line */}
            <motion.div
              className={`h-0.5 rounded-full mt-6 bg-gradient-to-r ${gift.color}`}
              initial={{ width: '0%' }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        );
        })}
      </motion.div>

      {/* Bottom hint */}
      <motion.p
        className="mt-8 text-muted-foreground font-quicksand text-base relative z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Select one to continue
      </motion.p>
    </div>
  );
};

export default GiftSelection;
