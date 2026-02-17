import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, MoreHorizontal, Globe, Youtube, Info } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Welcome to 3:18",
    subtitle: "Experience community like never before",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    title: "Sunday Sermon",
    subtitle: "Growing deeper in faith together",
    src: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: 3,
    title: "Community Outreach",
    subtitle: "Serving beyond our walls",
    src: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
];

export default function MobileVideoApp() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nextVideo = () => setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  const prevVideo = () => setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));

  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col font-sans overflow-hidden">

      <header className="absolute top-0 w-full z-[100] flex justify-between items-start bg-gradient-to-b from-black/80 via-black/20 to-transparent">

        {/* Logo Tab: Flush to the left, rounded only on the right */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-4 pl-6 pr-8 rounded-r-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border-y border-r border-white/20 flex items-center justify-center"
        >
          <img
            src="/3182.png"
            alt="3:18 Logo"
            className="h-16 w-auto object-contain"
          />
        </motion.div>

        {/* Right Menu Container */}
        <div className="pr-6 mt-2 relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`p-3 backdrop-blur-xl rounded-full border transition-all duration-300 active:scale-90 ${isMenuOpen ? "bg-white text-black border-white" : "bg-black/30 text-white border-white/10"
              }`}
          >
            <MoreHorizontal size={28} />
          </button>

          {/* Modern Dropdown Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className="absolute right-0 mt-4 w-56 bg-black/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              >
                <div className="flex flex-col p-2">
                  <a href="https://318-template.vercel.app/" target="_blank" className="flex items-center gap-3 px-4 py-4 hover:bg-white/10 rounded-2xl transition-colors">
                    <Globe size={20} className="text-blue-400" />
                    <span className="font-medium">Website</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
      {/* 2. Main Video Area */}
      <div className="relative flex-1 w-full bg-zinc-900">
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

        {/* Protection Scrim for bottom text */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

        {/* 3. Text Content */}
        <div className="absolute bottom-0 left-0 w-full px-2 pointer-events-none">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight mb-3 drop-shadow-2xl">
              {videos[currentIndex].title}
            </h1>
            <p className="text-white/90 text-lg leading-relaxed max-w-[90%] drop-shadow-lg font-medium">
              {videos[currentIndex].subtitle}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 4. Bottom Navigation Dock */}
      <div className="relative h-[150px] bg-[#050505] px-6 pt-4 pb-10 flex flex-col justify-between border-t border-white/5 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">

        {/* Progress Bar */}
        <div className="flex gap-2 w-full">
          {videos.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${index === currentIndex ? "bg-white shadow-[0_0_10px_rgba(255,255,255,0.4)]" : "bg-white/10"
                }`}
            />
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/30">Explore</span>
            <span className="text-base font-bold text-white/70">0{currentIndex + 1} <span className="text-white/20 mx-1">/</span> 0{videos.length}</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevVideo}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 active:bg-white/10"
            >
              <ChevronLeft size={28} />
            </button>

            <button className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white text-black shadow-2xl active:scale-95 transition-all">
              <Play size={28} fill="black" />
            </button>

            <button
              onClick={nextVideo}
              className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 active:bg-white/10"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}