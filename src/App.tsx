import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MoreHorizontal,
  FastForward,
} from "lucide-react";

export default function MobileVideoApp() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoUrl = "https://www.dropbox.com/scl/fi/lyuwktu1z884rqrtrgbu7/2026-at-1030-in-the-morning..mp4?rlkey=awg79kpwn15zoov11xpmwla7a&st=125nucn6&dl=0&raw=1";

  const handleSkip = (): void => {
    const video = videoRef.current;

    if (video && video.readyState >= 1) {
      const skipAmount = 10;
      const newTime = video.currentTime + skipAmount;

      if (newTime < video.duration) {
        video.currentTime = newTime;
      } else {
        video.currentTime = video.duration - 0.1;
        video.pause();
      }
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        bg-[radial-gradient(circle_at_center,_#0f172a_0%,_#020617_100%)]
        flex
        items-center
        justify-center
        overflow-hidden
        p-0
        lg:p-6
      "
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/15 rounded-full blur-[140px] pointer-events-none hidden lg:block" />

      {/* Main Container */}
      <div
        className="
          relative
          w-full
          h-full
          bg-black
          text-white
          flex
          flex-col
          overflow-hidden

          lg:w-[420px]
          lg:h-[90vh]
          lg:max-h-[900px]
          lg:rounded-[32px]
          lg:border
          lg:border-sky-500/20
          lg:shadow-[0_0_60px_-15px_rgba(14,165,233,0.25),_0_25px_70px_-15px_rgba(0,0,0,0.9)]
        "
      >
        {/* Header */}
        <header className="absolute top-0 left-0 right-0 z-50 flex justify-between items-start pt-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white px-4 py-3 sm:px-6 sm:py-4 rounded-r-3xl shadow-xl"
          >
            <img
              src="/3182.png"
              alt="3:18 Logo"
              className="h-10 sm:h-12 md:h-14 w-auto object-contain"
            />
          </motion.div>

          <div className="pr-4 sm:pr-6 mt-4 relative">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`p-2.5 sm:p-3 rounded-full backdrop-blur-xl border transition-all duration-200 ${isMenuOpen
                ? "bg-white text-black border-white"
                : "bg-black/40 text-white border-white/10 hover:bg-black/60"
                }`}
            >
              <MoreHorizontal size={20} />
            </button>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="
                    absolute
                    right-0
                    top-14
                    w-48
                    sm:w-56
                    bg-slate-950/95
                    backdrop-blur-2xl
                    rounded-3xl
                    border
                    border-sky-500/20
                    overflow-hidden
                    shadow-2xl
                  "
                >
                  <div className="p-2">
                    <a
                      href="https://318-template.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 px-4 py-4 rounded-2xl hover:bg-white/10 transition-colors"
                    >
                      <Globe size={20} className="text-sky-400" />
                      <span className="text-sm sm:text-base">Website</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        {/* Video Area */}
        <div
          className="
            relative
            flex-1
            flex
            items-center
            justify-center
            bg-black
            min-h-0
          "
        >
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            controls
            playsInline
            preload="metadata"
          // Removed crossOrigin attribute to allow Dropbox 302 redirects seamlessly
          />

          {/* Floating Skip Button */}
          <button
            onClick={handleSkip}
            className="
              absolute 
              top-24 
              right-4 
              z-40 
              flex 
              items-center 
              gap-2 
              px-4 
              py-2 
              rounded-full 
              bg-black/40 
              hover:bg-black/60 
              backdrop-blur-xl 
              border 
              border-white/10 
              text-white 
              text-xs 
              font-medium 
              tracking-wide
              transition-all 
              duration-200 
              active:scale-95
            "
          >
            <span>Skip 10s</span>
            <FastForward size={14} className="text-sky-400" />
          </button>
        </div>
      </div>
    </div>
  );
}