import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, Globe, Volume2, VolumeX } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "",
    subtitle: "",
    src: "https://riseblobs.blob.core.windows.net/$web/2026 at 1030 in the morning..mp4",
  },
];

export default function MobileVideoApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const videoRef = useRef(null);
  const bgVideoRef = useRef(null);

  const nextVideo = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      setIsMuted(false);
      return;
    }
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const toggleMute = (e: { stopPropagation: () => void; }) => {
    e.stopPropagation();
    const targetMute = !isMuted;
    setIsMuted(targetMute);
    if (!hasInteracted) setHasInteracted(true);
  };

  return (
    // Outer Wrapper: Updated from neutral-950 to a premium deep slate-blue tone with a radial lighting falloff
    <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)] flex items-center justify-center overflow-hidden">

      {/* --- BLUE AMBIENT LIGHT ENGINE --- */}
      {/* 1. Lighter Blue Fluid Center Glow Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none z-0 hidden md:block" />

      {/* 2. Secondary Deep Blue Backdrop Wash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[180px] pointer-events-none z-0 hidden md:block" />

      {/* Cinematic Ambient Background (Desktop Only) */}
      <div className="absolute inset-0 hidden md:block select-none pointer-events-none opacity-30 mix-blend-screen scale-110 blur-[100px] z-0">
        <video
          ref={bgVideoRef}
          key={`bg-${videos[currentIndex].src}`}
          src={videos[currentIndex].src}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-contain"
        />
        {/* Dark blue vignette overlaying the video backdrop */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020617]/40 to-[#020617]" />
      </div>

      {/* Decorative desktop background mesh rings with a subtle sky-blue tint */}
      <div className="absolute inset-0 hidden md:block pointer-events-none opacity-20 z-0 bg-[radial-gradient(circle_at_center,_rgba(14,165,233,0.15)_0%,_transparent_70%)]" />

      {/* 9:16 Video Container (Elevated with an exquisite sky-blue outline frame and ambient box shadow) */}
      <div className="relative w-full h-full max-w-md max-h-[92vh] md:aspect-[9/16] md:rounded-[32px] md:border md:border-sky-500/20 shadow-[0_0_60px_-15px_rgba(14,165,233,0.25),_0_25px_70px_-15px_rgba(0,0,0,0.9)] bg-black text-white flex flex-col font-sans overflow-hidden z-10 transition-all duration-300">

        {/* 1. Header (Logo & Menu) */}
        <header className="absolute top-0 w-full z-[100] flex justify-between items-start bg-gradient-to-b from-black/80 via-black/20 to-transparent pt-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-4 pl-6 pr-8 rounded-r-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border-y border-r border-white/20 flex items-center justify-center"
          >
            <img src="/3182.png" alt="3:18 Logo" className="h-14 w-auto object-contain" />
          </motion.div>

          <div className="pr-6 mt-4 flex gap-2 relative">
            {/* Volume Toggle */}
            <button
              onClick={toggleMute}
              className="p-3 backdrop-blur-xl rounded-full border border-white/10 bg-black/30 text-white transition-all duration-300 hover:bg-black/50 active:scale-90"
            >
              {isMuted ? <VolumeX size={22} className="text-red-400" /> : <Volume2 size={22} className="text-sky-400" />}
            </button>

            {/* Menu Dropdown Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-3 backdrop-blur-xl rounded-full border transition-all duration-300 active:scale-90 ${isMenuOpen ? "bg-white text-black border-white" : "bg-black/30 text-white border-white/10 hover:bg-black/50"
                }`}
            >
              <MoreHorizontal size={22} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="absolute right-0 top-14 w-56 bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-sky-500/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-50"
                >
                  <div className="flex flex-col p-2">
                    <a
                      href="https://318-template.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-2xl transition-colors"
                    >
                      <Globe size={20} className="text-sky-400" />
                      <span className="font-medium text-slate-200">Website</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* 2. Full-Screen Video Content */}
        <div className="relative flex-1 w-full cursor-pointer bg-black flex items-center justify-center" onClick={nextVideo}>
          <AnimatePresence mode="wait">
            <motion.video
              ref={videoRef}
              key={videos[currentIndex].src}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-contain"
              autoPlay
              muted={isMuted}
              loop
              playsInline
            >
              <source src={videos[currentIndex].src} type="video/mp4" />
            </motion.video>
          </AnimatePresence>

          {/* Autoplay Initial Overlay Hint */}
          {!hasInteracted && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
                className="bg-sky-500/10 p-4 rounded-full border border-sky-400/20 backdrop-blur-md mb-3 shadow-[0_0_20px_rgba(14,165,233,0.2)]"
              >
                <VolumeX size={28} className="text-sky-300" />
              </motion.div>
              <p className="text-sky-200 font-medium text-xs tracking-wider uppercase drop-shadow-md bg-slate-950/50 px-3 py-1.5 rounded-full border border-sky-500/20 backdrop-blur-sm">
                Tap to listen with sound
              </p>
            </div>
          )}

          {/* Smooth bottom cinematic scrim for text readability */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />

          {/* 3. Floating UI (Bottom Anchored) */}
          <div className="absolute bottom-0 left-0 w-full p-6 pb-8 flex flex-col gap-6 pointer-events-none">

            {/* Text Presentation */}
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              <h1 className="text-3xl font-extrabold tracking-tight drop-shadow-2xl leading-none">
                {videos[currentIndex].title}
              </h1>
              <p className="text-white/80 text-base max-w-[92%] drop-shadow-lg font-medium leading-tight">
                {videos[currentIndex].subtitle}
              </p>
            </motion.div>

            {/* 4. Navigation/Progress Bars */}
            <div className="flex gap-2 w-full pointer-events-auto">
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                    if (!hasInteracted) {
                      setHasInteracted(true);
                      setIsMuted(false);
                    }
                  }}
                  className="flex-1 py-4 group"
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex
                      ? "bg-sky-400 shadow-[0_0_14px_rgba(56,189,248,0.9)]"
                      : "bg-white/20 group-hover:bg-sky-400/50"
                      }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}