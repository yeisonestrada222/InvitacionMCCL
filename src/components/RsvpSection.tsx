import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, Calendar, Check, Send, Sparkles, AlertCircle, Volume2, Footprints } from "lucide-react";

export default function RsvpSection() {
  const [accepted, setAccepted] = useState(false);
  const [noBtnPos, setNoBtnPos] = useState({ x: 0, y: 0 });
  const [noCount, setNoCount] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleYes = () => {
    setAccepted(true);
    // Optional: trigger simple haptic or sound vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const handleNoInteraction = () => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate a safe range so the button stays inside the container
    const padding = 20;
    const buttonWidth = 100;
    const buttonHeight = 44;

    const maxX = containerRect.width - buttonWidth - padding * 2;
    const maxY = containerRect.height - buttonHeight - padding * 2;

    const randomX = Math.random() * maxX - maxX / 2;
    const randomY = Math.random() * maxY - maxY / 2;

    setNoBtnPos({ x: randomX, y: randomY });
    setNoCount((prev) => prev + 1);
  };

  const handleNoClick = (e: MouseEvent) => {
    e.preventDefault();
    handleNoInteraction();
  };

  // Generate WhatsApp message and URL
  const getWhatsAppLink = () => {
    const text = "confirmo";
    return `https://api.whatsapp.com/send?phone=573108245540&text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      ref={containerRef}
      className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 text-center relative overflow-hidden min-h-[340px] flex flex-col justify-center"
    >
      <AnimatePresence mode="wait">
        {!accepted ? (
          <motion.div
            key="rsvp-question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center py-4"
          >
            <div className="w-14 h-14 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center text-rose-500 mb-4 animate-heartbeat">
              <Ticket size={24} fill="currentColor" />
            </div>

            <h3 className="font-serif text-2xl font-bold text-slate-800 mb-1">
              ¿Aceptas esta cita, mi amor? 🌹
            </h3>
            
            <p className="font-sans text-xs text-slate-400 mb-8 max-w-xs leading-relaxed">
              Dante y yo estamos listos para hacerte pasar una noche hermosa. ¿Contamos con tu compañía el jueves 2 de julio?
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs relative h-20">
              {/* YES BUTTON */}
              <motion.button
                id="rsvp-yes-btn"
                onClick={handleYes}
                className="w-32 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-sans font-semibold text-sm shadow-md shadow-rose-100 cursor-pointer transition-colors z-10 flex items-center justify-center gap-1.5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Check size={16} strokeWidth={3} />
                <span>¡SÍ, ACEPTO!</span>
              </motion.button>

              {/* PLAYFUL RUNAWAY NO BUTTON */}
              <motion.button
                id="rsvp-no-btn"
                onPointerEnter={handleNoInteraction}
                onTouchStart={handleNoInteraction}
                onClick={handleNoClick}
                className="w-32 py-3 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-full font-sans font-medium text-sm border border-slate-200 cursor-pointer absolute transition-all duration-200 ease-out"
                style={{
                  transform: `translate(${noBtnPos.x}px, ${noBtnPos.y}px)`,
                }}
              >
                <span>{noCount > 3 ? "¡Oblígame! 😜" : "No puedo 💔"}</span>
              </motion.button>
            </div>

            {noCount > 0 && (
              <p className="font-sans text-[10px] text-rose-400 italic mt-2 animate-bounce">
                {noCount > 4 
                  ? "¡El destino ya está escrito, el botón de 'No' no se dejará presionar! 😂" 
                  : "¡Jeje! Intenta atrapar el 'No' si puedes... 🐾"}
              </p>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="rsvp-ticket"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center py-4"
          >
            {/* Confetti celebration wrapper */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-rose-500 text-lg"
                  initial={{
                    x: Math.random() * 320,
                    y: -20,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: 400,
                    x: `calc(${Math.random() * 320}px + ${Math.sin(i) * 30}px)`,
                    rotate: 360,
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: 1,
                  }}
                >
                  {i % 2 === 0 ? "❤️" : "✨"}
                </motion.div>
              ))}
            </div>

            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
              <Check size={20} strokeWidth={3} />
            </div>

            <h4 className="font-serif text-xl font-bold text-slate-800 mb-4">
              ¡Cita Confirmada Oficialmente! 🎉
            </h4>

            {/* Official Digital Ticket Card */}
            <div className="w-full max-w-sm bg-gradient-to-br from-rose-500 via-rose-600 to-pink-600 rounded-2xl p-5 text-white text-left shadow-lg shadow-rose-900/20 border border-rose-400/30 relative">
              {/* Ticket semi-circles cutouts */}
              <div className="absolute left-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-r border-rose-600/20" />
              <div className="absolute right-[-10px] top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full border-l border-rose-600/20" />
              
              <div className="flex justify-between items-center border-b border-white/20 pb-3 mb-3">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-mono text-rose-100">Pase Especial</span>
                  <h5 className="font-serif text-sm font-semibold">4 Años Juntos</h5>
                </div>
                <span className="font-mono text-xs bg-rose-700/60 border border-rose-400/40 px-2 py-0.5 rounded text-rose-100 uppercase font-semibold">
                  VIP Paws 🐾
                </span>
              </div>

              <div className="space-y-2 font-sans text-xs">
                <div className="flex justify-between">
                  <span className="text-rose-200">Invitados:</span>
                  <span className="font-semibold text-white">Cami & Dante 🐕</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-200">Fecha:</span>
                  <span className="font-semibold text-white">Jueves, 2 de Julio (7:00 PM)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-200">Destino:</span>
                  <span className="font-semibold text-white">Rinconcito Secreto, Sabaneta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rose-200">Vestimenta:</span>
                  <span className="font-semibold text-white">Para sonreír mucho 👕👗</span>
                </div>
              </div>

              <div className="border-t border-dashed border-white/25 pt-3 mt-3 flex justify-between items-center text-[10px] font-mono text-rose-200 uppercase">
                <span>Código: 4-ANOS-AMOR</span>
                <div className="flex items-center gap-0.5 text-rose-100">
                  <Footprints size={10} />
                  <span>Aprobado por Dante</span>
                </div>
              </div>
            </div>

            <p className="font-sans text-[11px] text-slate-400 mt-4 max-w-xs leading-relaxed mb-4">
              ¡Dile a tu novio que aceptaste la invitación para que empiece a afinar los detalles de la sorpresa!
            </p>

            <a
              id="whatsapp-confirm-link"
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full font-sans font-semibold text-xs shadow-md shadow-emerald-100 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Send size={14} fill="currentColor" />
              <span>Confirmar por WhatsApp</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
