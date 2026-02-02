import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const HeartLoader = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-pink-theme">
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

            {/* Main heart loader */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                {/* Pulsing heart */}
                <motion.div
                    className="relative"
                    animate={{
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    {/* Outer glow */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0, 0.5],
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        <Heart
                            size={120}
                            className="text-rose-400"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    </motion.div>

                    {/* Main heart */}
                    <Heart
                        size={80}
                        className="text-rose-500 relative z-10"
                        fill="currentColor"
                        strokeWidth={0}
                    />
                </motion.div>

                {/* Orbiting small hearts */}
                <div className="relative w-40 h-40">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={`orbit-${i}`}
                            className="absolute top-1/2 left-1/2"
                            style={{
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            animate={{
                                rotate: [i * 60, i * 60 + 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <motion.div
                                className="absolute"
                                style={{
                                    x: 70,
                                    y: -10,
                                }}
                                animate={{
                                    scale: [0.8, 1.2, 0.8],
                                    opacity: [0.4, 1, 0.4],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.25,
                                    ease: "easeInOut",
                                }}
                            >
                                <Heart
                                    size={16}
                                    className="text-pink-400"
                                    fill="currentColor"
                                    strokeWidth={0}
                                />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                {/* Loading text */}
                <motion.div
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <motion.p
                        className="font-handwritten text-3xl md:text-4xl text-rose-600 font-semibold"
                        animate={{
                            opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        Loading your surprise...
                    </motion.p>

                    {/* Animated dots */}
                    <div className="flex justify-center gap-2 mt-4">
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={`dot-${i}`}
                                className="w-2 h-2 bg-rose-400 rounded-full"
                                animate={{
                                    y: [0, -10, 0],
                                    opacity: [0.3, 1, 0.3],
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Floating hearts in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                    <motion.div
                        key={`float-${i}`}
                        className="absolute"
                        style={{
                            left: `${Math.random() * 100}%`,
                            bottom: -20,
                        }}
                        animate={{
                            y: [-20, -window.innerHeight - 50],
                            x: [0, (Math.random() - 0.5) * 100],
                            rotate: [0, 360],
                            opacity: [0, 0.6, 0],
                        }}
                        transition={{
                            duration: 5 + Math.random() * 3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <Heart
                            size={20 + Math.random() * 20}
                            className="text-rose-300"
                            fill="currentColor"
                            strokeWidth={0}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default HeartLoader;
