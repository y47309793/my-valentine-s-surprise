import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FloatingHearts from '@/components/FloatingHearts';
import ProposalScreen from '@/components/ProposalScreen';
import CelebrationScreen from '@/components/CelebrationScreen';
import GiftSelection from '@/components/GiftSelection';
import LoveQuiz from '@/components/LoveQuiz';
import LoveLetter from '@/components/LoveLetter';
import PhotoMemories from '@/components/PhotoMemories';

type Screen = 'proposal' | 'celebration' | 'gifts' | 'quiz' | 'letter' | 'photos';

const STORAGE_KEY = 'valentine-progress';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('proposal');

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
    setCurrentScreen('celebration');
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
          {currentScreen === 'proposal' && (
            <ProposalScreen onYes={handleYes} />
          )}
          
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
          className="fixed bottom-4 left-4 text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          ↺ Start Over
        </motion.button>
      )}
    </div>
  );
};

export default Index;
