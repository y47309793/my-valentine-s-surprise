import { useState, useRef, useEffect } from "react";
import { Music, Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";
import { BACKGROUND_MUSIC_URL } from "@/config/valentine";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Attempt auto-play on mount (often blocked by browsers, but worth a try)
        if (audioRef.current) {
            audioRef.current.volume = 0.4; // Set a reasonable volume
            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(() => {
                    // Auto-play was prevented.
                    // We'll wait for user interaction.
                    setIsPlaying(false);
                });
            }
        }
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const togglenMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    if (!BACKGROUND_MUSIC_URL) return null;

    return (
        <>
            <audio ref={audioRef} src={BACKGROUND_MUSIC_URL} loop />

            <motion.button
                onClick={togglePlay}
                className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-white/80 backdrop-blur-sm shadow-lg border border-rose-200 text-rose-500 hover:bg-white transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <div className="flex items-center gap-2">
                    <motion.div
                        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    >
                        <Music size={20} />
                    </motion.div>

                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out whitespace-nowrap text-sm font-medium text-rose-600">
                        {isPlaying ? "Playing Love Song" : "Play Music"}
                    </span>

                    {isPlaying && (
                        <div onClick={togglenMute} className="ml-1 hover:text-rose-700">
                            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </div>
                    )}
                </div>
            </motion.button>
        </>
    );
};

export default MusicPlayer;
