import { useState, ChangeEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Send } from "lucide-react";

const LOVE_MESSAGES = [
  { threshold: 20, title: "¡Un poquito! 😄", desc: "Sé que me amas mucho más que esto... ¡intenta deslizar más hacia la derecha! 👀" },
  { threshold: 40, title: "¡Muchísimo! 🥰", desc: "¡Eso se siente de maravilla! Pero sé que tu corazoncito tiene aún más amor guardado." },
  { threshold: 60, title: "¡Hasta las nubes! ☁️", desc: "Un amor gigante que supera el cielo. Gracias por cada sonrisa y cada abrazo tierno." },
  { threshold: 80, title: "¡Hasta la luna de ida y vuelta! 🌙", desc: "Cruzaría todo el universo por ti. Eres mi refugio favorito y mi lugar de paz eterna." },
  { threshold: 101, title: "¡INFINITO Y MÁS ALLÁ! 🚀❤️", desc: "¡Eres el gran amor de mi vida entera! Gracias por estos maravillosos 17 meses de felicidad, risas y de construir un camino juntos. ¡Te amo con toda mi alma!" },
];

export default function LoveMeter() {
  const [loveLevel, setLoveLevel] = useState(50);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setLoveLevel(val);

    // Occasionally spawn floating hearts on slide
    if (val % 3 === 0) {
      setFloatingHearts((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), x: Math.random() * 80 + 10 },
      ].slice(-15)); // Keep only last 15
    }
  };

  const currentMessage = LOVE_MESSAGES.find((m) => loveLevel < m.threshold) || LOVE_MESSAGES[LOVE_MESSAGES.length - 1];

  return (
    <div className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 relative overflow-hidden">
      {/* Decorative sparklies */}
      <div className="absolute top-4 right-4 text-rose-300">
        <Sparkles className="animate-pulse" size={16} />
      </div>

      <div className="text-center mb-6">
        <span className="text-[10px] font-mono tracking-widest text-rose-500 uppercase block mb-1">
          Pregunta muy seria
        </span>
        <h3 className="font-serif text-xl font-semibold text-slate-800">
          ¿Cuánto me amas hoy?
        </h3>
        <p className="font-sans text-xs text-slate-400">
          Usa el deslizador para calibrar tu medidor de amor
        </p>
      </div>

      {/* Love Meter visualizer stage */}
      <div className="h-44 flex flex-col justify-center items-center relative mb-6">
        {/* Floating Hearts Container */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <AnimatePresence>
            {floatingHearts.map((heart) => (
              <motion.div
                key={heart.id}
                initial={{ y: 140, opacity: 1, scale: 0.5 }}
                animate={{ y: 0, opacity: 0, scale: 1.5 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-rose-500"
                style={{ left: `${heart.x}%` }}
              >
                <Heart size={16} fill="currentColor" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Central Heart scaling with love levels */}
        <motion.div
          className="relative"
          style={{
            scale: 0.8 + (loveLevel / 100) * 0.5, // sizes from 0.8 to 1.3
          }}
          animate={{
            y: [0, -4, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Heart
            size={76}
            className="text-rose-500 drop-shadow-lg"
            fill="currentColor"
          />
          {/* Heart Inner details */}
          <span className="absolute inset-0 flex items-center justify-center font-sans text-sm font-bold text-white leading-none">
            {loveLevel}%
          </span>
        </motion.div>

        {/* Dynamic heart sparkles at high values */}
        {loveLevel > 80 && (
          <motion.div
            className="absolute text-amber-400"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles size={110} className="opacity-30" />
          </motion.div>
        )}
      </div>

      {/* Slider input */}
      <div className="relative mb-6">
        <input
          id="love-slider-input"
          type="range"
          min="1"
          max="100"
          value={loveLevel}
          onChange={handleSliderChange}
          className="w-full h-2 bg-rose-50 rounded-lg appearance-none cursor-pointer accent-rose-500 focus:outline-none transition-all"
        />
        <div className="flex justify-between text-[10px] font-sans font-semibold text-slate-400 mt-1">
          <span>Un poquito</span>
          <span>Muchísimo</span>
          <span>¡Infinito! 🚀</span>
        </div>
      </div>

      {/* Love Message Box */}
      <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-4 text-center min-h-[96px] flex flex-col justify-center">
        <h4 className="font-serif text-sm font-semibold text-rose-800 mb-1">
          {currentMessage.title}
        </h4>
        <p className="font-sans text-xs text-rose-600/90 leading-relaxed">
          {currentMessage.desc}
        </p>
      </div>
    </div>
  );
}
