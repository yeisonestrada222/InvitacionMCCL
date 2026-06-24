import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Sparkles, Mail } from "lucide-react";

interface EnchantedEnvelopeProps {
  onOpen: () => void;
}

export default function EnchantedEnvelope({ onOpen }: EnchantedEnvelopeProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Give time for the animation to complete before transitioning to the main content
    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-rose-50 via-rose-100/40 to-pink-100 p-4 overflow-hidden select-none">
      {/* Decorative floating hearts in the background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-rose-300/40"
            initial={{
              x: Math.random() * 400 - 200 + (window.innerWidth / 2),
              y: Math.random() * 500 + window.innerHeight,
              scale: Math.random() * 0.5 + 0.5,
              opacity: 0,
            }}
            animate={{
              y: -100,
              opacity: [0, 0.7, 0.7, 0],
              x: `calc(10px + ${Math.sin(i) * 50}px)`,
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          >
            <Heart size={Math.random() * 20 + 10} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-rose-100/80 text-center"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={isOpening ? { scale: 0.8, opacity: 0, y: -50 } : { scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Sparkly corner accents */}
        <div className="absolute top-4 left-4 text-rose-300">
          <Sparkles className="animate-pulse-slow" size={18} />
        </div>
        <div className="absolute top-4 right-4 text-rose-300">
          <Sparkles className="animate-pulse-slow" size={18} />
        </div>

        <motion.div
          className="mx-auto w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Mail size={36} className="text-rose-500" />
        </motion.div>

        <h1 className="font-serif text-3xl text-slate-800 font-semibold mb-2">
          Hola, Mi Amor ❤️
        </h1>
        
        <p className="font-sans text-slate-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          Tengo una sorpresa muy especial guardada para ti. He preparado algo interactivo y diferente para celebrarnos. ¿Me dejas mostrártela?
        </p>

        {/* Envelope Interactive Button */}
        <div className="relative flex justify-center">
          <motion.button
            id="open-envelope-btn"
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-sans font-medium text-sm shadow-lg shadow-rose-200 transition-all cursor-pointer flex items-center gap-2 overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Pulsing button glow */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-pink-400 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            
            <Heart size={16} fill="currentColor" className="animate-heartbeat" />
            <span>Abrir Invitación Especial</span>
            <Heart size={16} fill="currentColor" className="animate-heartbeat" />
          </motion.button>
        </div>

        {/* Delicate Footer */}
        <div className="mt-8 pt-4 border-t border-rose-50 flex justify-center items-center gap-1.5 text-[11px] font-mono tracking-widest text-rose-400 uppercase">
          <span>De Jei</span>
          <Heart size={10} fill="currentColor" className="text-rose-500" />
          <span>Para Cami</span>
        </div>
      </motion.div>
    </div>
  );
}
