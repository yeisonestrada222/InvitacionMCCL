import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Music, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";

const LYRICS = [
  { time: 0, text: "Desde el primer día, cambiaste mi mundo entero... 🌸" },
  { time: 8, text: "17 meses de risas, de abrazos y de un amor sincero..." },
  { time: 16, text: "Cada segundo a tu lado es un regalo que valoro más que nada..." },
  { time: 24, text: "Y este 2 de julio, quiero escribir contigo otra página dorada..." },
  { time: 32, text: "Gracias por ser mi paz, mi cómplice y mi alegría más grande..." },
  { time: 40, text: "¡Te amo infinitamente, hoy, mañana y para siempre! ❤️" },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio instance. First try loading the user's custom /cancion.mp3 from the public directory.
    // Fallback to the beautiful acoustic guitar loop if /cancion.mp3 is not found or fails.
    const audio = new Audio("/cancion.mp3");
    audio.loop = true;
    audioRef.current = audio;

    const handleAudioError = () => {
      const fallbackUrl = "https://assets.mixkit.co/music/preview/mixkit-gentle-guitars-2070.mp3";
      // Avoid infinite error loops by checking if we already set the fallback source
      if (audio.src !== fallbackUrl) {
        console.log("No se encontró /cancion.mp3 o falló al cargar. Usando melodía romántica de respaldo...");
        audio.src = fallbackUrl;
        // If it was supposed to be playing, try playing the fallback
        if (isPlaying) {
          audio.play().catch((err) => console.log("Error al reproducir audio de respaldo:", err));
        }
      }
    };

    audio.addEventListener("error", handleAudioError);

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      
      // Update lyrics based on time
      const index = LYRICS.reduce((acc, lyric, idx) => {
        if (audio.currentTime >= lyric.time) {
          return idx;
        }
        return acc;
      }, 0);
      setCurrentLyricIndex(index);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 60); // fallback to 60s
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.pause();
      audio.removeEventListener("error", handleAudioError);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log("Audio play blocked by browser:", err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/50 rounded-3xl p-6 text-white shadow-2xl relative overflow-hidden">
      {/* Golden glow effect */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Animated Vinyl Record */}
        <div className="relative flex-shrink-0">
          <motion.div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-neutral-800 via-black to-neutral-800 border-2 border-neutral-700 shadow-xl flex items-center justify-center relative overflow-hidden"
            animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          >
            {/* Grooves */}
            <div className="absolute inset-2 rounded-full border border-neutral-800/40 opacity-50" />
            <div className="absolute inset-4 rounded-full border border-neutral-800/60 opacity-50" />
            <div className="absolute inset-6 rounded-full border border-neutral-800/80 opacity-50" />
            
            {/* Center Sticker */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-500 flex items-center justify-center shadow-inner relative">
              <Heart size={14} fill="white" className="text-white animate-heartbeat" />
            </div>
          </motion.div>

          {/* Tonearm needle effect */}
          <motion.div
            className="absolute top-0 right-[-8px] w-6 h-12 origin-top pointer-events-none"
            animate={isPlaying ? { rotate: 15 } : { rotate: -5 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-[3px] h-10 bg-slate-400 rounded-full mx-auto relative shadow-sm">
              <div className="absolute bottom-0 left-[-2px] w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </div>
          </motion.div>
        </div>

        {/* Track Details & Control */}
        <div className="flex-grow w-full text-center md:text-left">
          <div className="flex items-center gap-1.5 justify-center md:justify-start text-amber-400 text-xs font-mono uppercase tracking-widest mb-1">
            <Sparkles size={12} className="animate-pulse" />
            <span>Sintonía de Amor</span>
          </div>
          <h4 className="font-serif text-lg font-medium tracking-tight text-white mb-0.5">
            17 Meses de Historia Juntos
          </h4>
          <p className="font-sans text-xs text-slate-400 mb-4">
            De: Jei para Cami 💖
          </p>

          {/* Controls bar */}
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <motion.button
              id="music-play-btn"
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-lg shadow-rose-900/30 cursor-pointer transition-all"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-0.5" />}
            </motion.button>

            <button
              id="music-mute-btn"
              onClick={toggleMute}
              className="p-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>

            {/* Time visualization */}
            <div className="flex-grow max-w-[180px] hidden sm:flex items-center gap-2">
              <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                {formatTime(currentTime)}
              </span>
              <div className="h-1 bg-slate-700 rounded-full flex-grow relative overflow-hidden">
                <div
                  className="h-full bg-rose-500"
                  style={{ width: `${(currentTime / (duration || 60)) * 100}%` }}
                />
              </div>
              <span className="font-mono text-[10px] text-slate-500 tabular-nums">
                {formatTime(duration || 33)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Lyrics Display */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 min-h-[64px] flex items-center justify-center text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={currentLyricIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-handwritten text-xl sm:text-2xl text-rose-200 tracking-wide font-medium leading-relaxed max-w-lg"
          >
            {LYRICS[currentLyricIndex]?.text}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Subtle indicator to press play */}
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="bg-slate-900/90 px-4 py-2 rounded-full border border-slate-700 text-xs font-sans text-slate-300 flex items-center gap-2">
            <Music size={12} className="animate-bounce" />
            <span>Dale play para escuchar de fondo 🎵</span>
          </div>
        </div>
      )}
    </div>
  );
}
