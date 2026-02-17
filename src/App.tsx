import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Globe } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Welcome to 3:18 Bible Church",
    subtitle: "We may not be the church for you",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Sunday Sermons and Meals",
    subtitle: "Every week at 11 AM and 12 AM",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Why 318?",
    subtitle: "Odd name we know...",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function MobileVideoApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Since arrows are gone, clicking the screen or progress bars could trigger this
  const nextVideo = () => setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden">

      {/* 1. Header (Logo & Menu) */}
      <header className="absolute top-0 w-full z-[100] flex justify-between items-start bg-gradient-to-b from-black/80 via-black/20 to-transparent">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 pl-6 pr-8 rounded-r-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border-y border-r border-white/20 flex items-center justify-center"
        >
          <img src="/3182.png" alt="3:18 Logo" className="h-16 w-auto object-contain" />
        </motion.div>

        <div className="pr-6 mt-2 relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-3 backdrop-blur-xl rounded-full border transition-all duration-300 active:scale-90 ${isMenuOpen ? "bg-white text-black border-white" : "bg-black/30 text-white border-white/10"
              }`}
          >
            <MoreHorizontal size={28} />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute right-0 mt-4 w-56 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col p-2">
                  <a href="https://318-template.vercel.app/" target="_blank" rel="noreferrer" className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-2xl transition-colors">
                    <Globe size={20} className="text-blue-400" />
                    <span className="font-medium">Website</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* 2. Full-Screen Video Content */}
      <div className="relative flex-1 w-full" onClick={nextVideo}>
        <AnimatePresence mode="wait">
          <motion.video
            key={videos[currentIndex].src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={videos[currentIndex].src} type="video/mp4" />
          </motion.video>
        </AnimatePresence>

        {/* Cinematic Scrim - Provides legibility for text & progress bars */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

        {/* 3. Floating UI (Bottom Anchored) */}
        <div className="absolute bottom-0 left-0 w-full p-8 pb-12 flex flex-col gap-6 pointer-events-none">

          {/* Text Content */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-2xl">
              {videos[currentIndex].title}
            </h1>
            <p className="text-white/80 text-lg max-w-[90%] drop-shadow-lg font-medium leading-tight">
              {videos[currentIndex].subtitle}
            </p>
          </motion.div>

          {/* 4. Floating Progress Bars (Replacing the Dock) */}
          <div className="flex gap-2 w-full pointer-events-auto">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent trigger of nextVideo on parent
                  setCurrentIndex(index);
                }}
                className="flex-1 py-4 group"
              >
                <div
                  className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)]"
                    : "bg-white/20 group-hover:bg-white/40"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}