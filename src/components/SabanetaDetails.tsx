import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin, Sparkles, Trophy, Flame, Heart, Footprints } from "lucide-react";

export default function SabanetaDetails() {
  const [petCount, setPetCount] = useState(0);
  const [showBark, setShowBark] = useState(false);

  const handlePetDante = () => {
    setPetCount((prev) => prev + 1);
    setShowBark(true);
    setTimeout(() => {
      setShowBark(false);
    }, 1200);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Secret Corner Card */}
      <motion.div
        className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 flex flex-col justify-between relative overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Spot ambient backdrop */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-orange-100/30 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
              <MapPin size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-amber-600 uppercase block">El Destino Secreto</span>
              <h3 className="font-serif text-xl font-semibold text-slate-800">Un Rinconcito de Sabaneta</h3>
            </div>
          </div>

          <p className="font-sans text-slate-600 text-sm leading-relaxed mb-6">
            Sabaneta esconde lugares mágicos, y encontré un rinconcito súper especial, acogedor y moderno. Está diseñado para desconectarnos de todo, respirar aire fresco, disfrutar de unas luces cálidas de ensueño y conversar por horas como tanto nos gusta.
          </p>

          {/* Key atmospheric badges */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <Flame size={14} className="text-orange-500" />
              <span className="font-sans text-xs font-semibold text-slate-700">Luces cálidas</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
              <Sparkles size={14} className="text-amber-500" />
              <span className="font-sans text-xs font-semibold text-slate-700">Ambiente secreto</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50">
          <div className="font-handwritten text-xl text-rose-500 flex items-center gap-1.5 justify-center md:justify-start">
            <span>¡Te prometo que te va a encantar! ✨</span>
          </div>
        </div>
      </motion.div>

      {/* Guest of Honor Card (Dante) */}
      <motion.div
        className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 flex flex-col justify-between relative overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <Trophy size={20} />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-widest text-rose-600 uppercase block">Invitado de Honor</span>
              <h3 className="font-serif text-xl font-semibold text-slate-800">Dante el consentido</h3>
            </div>
          </div>

          <p className="font-sans text-slate-600 text-sm leading-relaxed mb-4">
            ¿Pensabas que se quedaba en casa? ¡Imposible! Nuestro cachorro VIP está en la lista de invitados para celebrar juntos. El rinconcito es 100% pet-friendly, así que Dante podrá correr, recibir mimos y ser el rey de la noche.
          </p>

          {/* Interactive Vector Dante Illustration */}
          <div className="flex justify-center items-center gap-4 py-2 relative">
            <div className="relative">
              {/* Bark message balloon */}
              <AnimatePresence>
                {showBark && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0, y: 10 }}
                    animate={{ scale: 1, opacity: 1, y: -20 }}
                    exit={{ scale: 0, opacity: 0, y: -10 }}
                    className="absolute -top-12 left-12 bg-rose-500 text-white font-sans text-xs font-bold py-1 px-3 rounded-full shadow-md flex items-center gap-1"
                  >
                    <span>¡Guau! 🐾</span>
                    <Heart size={10} fill="currentColor" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Vector Puppy (Dante) */}
              <motion.svg
                width="84"
                height="84"
                viewBox="0 0 100 100"
                className="cursor-pointer"
                onClick={handlePetDante}
                animate={showBark ? { scale: [1, 1.1, 0.95, 1.05, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                {/* Dog Face Shape */}
                <ellipse cx="50" cy="55" rx="32" ry="26" fill="#E6A355" />
                <ellipse cx="50" cy="55" rx="26" ry="21" fill="#FFC27A" />

                {/* Left Ear */}
                <motion.path
                  d="M18 35 C10 45 10 70 18 70 C24 70 28 50 26 38 Z"
                  fill="#B3732D"
                  animate={showBark ? { rotate: [-5, 15, -5] } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Right Ear */}
                <motion.path
                  d="M82 35 C90 45 90 70 82 70 C76 70 72 50 74 38 Z"
                  fill="#B3732D"
                  animate={showBark ? { rotate: [5, -15, 5] } : { rotate: 0 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Dog Brow Accents */}
                <path d="M38 32 C41 30 45 32 45 32" stroke="#B3732D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M62 32 C59 30 55 32 55 32" stroke="#B3732D" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Eyes */}
                <circle cx="36" cy="44" r="5" fill="#3D2916" />
                <circle cx="36" cy="42" r="1.5" fill="white" /> {/* Left Eye Shine */}
                
                {/* Right eye winks if bark is active! */}
                {showBark ? (
                  <path d="M59 44 Q64 48 69 44" stroke="#3D2916" strokeWidth="3" strokeLinecap="round" fill="none" />
                ) : (
                  <>
                    <circle cx="64" cy="44" r="5" fill="#3D2916" />
                    <circle cx="64" cy="42" r="1.5" fill="white" /> {/* Right Eye Shine */}
                  </>
                )}

                {/* Cute cheeks blush */}
                <circle cx="28" cy="53" r="4.5" fill="#FFA3A3" opacity="0.6" />
                <circle cx="72" cy="53" r="4.5" fill="#FFA3A3" opacity="0.6" />

                {/* Snout and Nose */}
                <ellipse cx="50" cy="58" rx="10" ry="7" fill="#FCEBD4" />
                <path d="M44 54 C44 54 47 52 50 52 C53 52 56 54 56 54 C56 54 54 58 50 58 C46 58 44 54 44 54 Z" fill="#3D2916" />
                
                {/* Mouth */}
                <path d="M46 62 Q50 66 54 62" stroke="#3D2916" strokeWidth="2" strokeLinecap="round" fill="none" />

                {/* Tiny red bow tie */}
                <path d="M42 75 L58 75 L50 81 Z" fill="#E11D48" />
                <path d="M58 75 L42 75 L50 81 Z" fill="#E11D48" />
                <circle cx="50" cy="75" r="3.5" fill="#BE123C" />
              </motion.svg>
            </div>

            {/* Tap count trigger info */}
            <div className="flex flex-col">
              <span className="font-sans text-xs font-semibold text-slate-700">Dante te espera</span>
              <span className="font-sans text-[11px] text-slate-400">Toca para acariciarlo</span>
              <div className="flex items-center gap-1 mt-1 text-rose-500 text-xs font-mono">
                <Footprints size={12} />
                <span>Mimos: {petCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
          <span className="font-sans text-xs text-slate-400">Perrito VIP de mamá y papá 🐕</span>
          <span className="px-2.5 py-1 text-[10px] font-semibold text-rose-600 bg-rose-50 rounded-full border border-rose-100">
            Acceso Total
          </span>
        </div>
      </motion.div>
    </div>
  );
}
