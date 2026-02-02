import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import ProposalScreen from '@/components/ProposalScreen';
import CelebrationScreen from '@/components/CelebrationScreen';
import GiftSelection from '@/components/GiftSelection';
import LoveQuiz from '@/components/LoveQuiz';
import LoveLetter from '@/components/LoveLetter';
import PhotoMemories from '@/components/PhotoMemories';
import HeartLoader from '@/components/HeartLoader';

type Screen = 'proposal' | 'celebration' | 'gifts' | 'quiz' | 'letter' | 'photos';

const STORAGE_KEY = 'valentine-progress';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('proposal');
  const [isLoading, setIsLoading] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      setCurrentScreen(savedProgress as Screen);
    }
  }, []);

  // Save progress whenever screen changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentScreen);
  }, [currentScreen]);

  const handleYes = useCallback(() => {
    // Add a delay to show the loader
    setTimeout(() => {
      setIsLoading(false);
      setCurrentScreen('celebration');
    }, 2000); // Show loader for 2 seconds
  }, []);

  const handleLoadingStart = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleContinueToGifts = useCallback(() => {
    setCurrentScreen('gifts');
  }, []);

  const handleSelectGift = useCallback((gift: 'quiz' | 'letter' | 'photos') => {
    setCurrentScreen(gift);
  }, []);

  const handleQuizComplete = useCallback(() => {
    setCurrentScreen('letter');
  }, []);

  const handleLetterComplete = useCallback(() => {
    setCurrentScreen('photos');
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Floating hearts background - always visible */}
      <FloatingHearts />

      {/* Screen transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {isLoading ? (
            <HeartLoader />
          ) : currentScreen === 'proposal' ? (
            <ProposalScreen onYes={handleYes} onLoadingStart={handleLoadingStart} />
          ) : null}

          {currentScreen === 'celebration' && (
            <CelebrationScreen onContinue={handleContinueToGifts} />
          )}

          {currentScreen === 'gifts' && (
            <GiftSelection onSelectGift={handleSelectGift} />
          )}

          {currentScreen === 'quiz' && (
            <LoveQuiz onComplete={handleQuizComplete} />
          )}

          {currentScreen === 'letter' && (
            <LoveLetter onComplete={handleLetterComplete} />
          )}

          {currentScreen === 'photos' && (
            <PhotoMemories />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Reset button (for testing) - hidden in bottom corner */}
      {currentScreen !== 'proposal' && (
        <motion.button
          onClick={() => {
            localStorage.removeItem(STORAGE_KEY);
            setCurrentScreen('proposal');
          }}
          className="fixed bottom-4 left-4 text-xs px-3 py-2 rounded-lg bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground/70 hover:text-foreground hover:bg-background/90 hover:border-primary/30 transition-all duration-300 z-50 relative overflow-hidden group shadow-sm hover:shadow-md"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          whileHover={{
            scale: 1.05,
            x: 2
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"
          />
          <motion.span
            className="inline-block mr-1 relative z-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ↺
          </motion.span>
          <span className="relative z-10">Start Over</span>
        </motion.button>
      )}
    </div>
  );
};

export default Index;
