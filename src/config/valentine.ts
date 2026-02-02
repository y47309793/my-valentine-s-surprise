// =========================================================================
// Valentine's Surprise Configuration
// =========================================================================

// 1. Personal Details
export const VALENTINE_NAME = "My Love"; // Used in the title or anywhere you want

// 2. Proposal Page
export const PROPOSAL_EMOJI_URL = "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExMjcxc2NqY2M0ZDIzNjcyZ2Y0ZXRmczg0MHMzbWc5MHhtb2VyZXl1YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/qxS6gdEzFZdhMgo1BN/giphy.gif";
export const PROPOSAL_MESSAGES = [
    "Will you be my Valentine?",      // Initial message (0 clicks)
    "Are you certain?",               // First "No" click
    "That seems like a hasty decision...", // Second "No" click
    "Let's reconsider, my love",      // Third "No" click
    "Pretty please?",                 // Fourth "No" click
    "One more chance?",               // Fifth "No" click
    "I'll take that as a yes",        // Sixth "No" click (Auto-Yes)
];

export const CELEBRATION_GIF_URL = "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2R1dGhxMXFrYzdsYm00YWdkamJtY2I5YjhwdjY4OHZwZ3VtZWZnaiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13hxeOYjoTWtK8/giphy.gif"; // Funny dancing gif

// 3. Love Letter
export const LOVE_LETTER_LINES = [
    "My Dearest Love,",
    "",
    "From the moment I met you,",
    "I knew my life would never be the same.",
    "",
    "Every day with you feels like a gift,",
    "wrapped in laughter, warmth, and endless love.",
    "",
    "You make the ordinary extraordinary,",
    "and turn simple moments into treasured memories.",
    "",
    "Thank you for being my best friend,",
    "my confidant, my partner in everything.",
    "",
    "I fall more in love with you each day,",
    "and I can't wait for all our tomorrows.",
    "",
    "Forever & Always,",
    "Your Valentine"
];

// 4. Photo Memories
export const MEMORY_PHOTOS = [
    {
        url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=400&h=400&fit=crop",
        caption: "Our first adventure together",
    },
    {
        url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&h=400&fit=crop",
        caption: "That magical sunset",
    },
    {
        url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop",
        caption: "Laughing together",
    },
    {
        url: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400&h=400&fit=crop",
        caption: "Best friends forever",
    },
    {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
        caption: "Your beautiful smile",
    },
    {
        url: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=400&h=400&fit=crop",
        caption: "Making memories",
    },
];

// 5. Music (Optional)
// Use a direct URL to an audio file (mp3, wav, etc.)
// Default: A romantic piano piece (Royalty Free)
export const BACKGROUND_MUSIC_URL = "/music/bg.mp3";
