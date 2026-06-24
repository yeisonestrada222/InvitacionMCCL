import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Camera, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

interface Photo {
  url: string;
  caption: string;
  rotation: string;
}

const PHOTOS: Photo[] = [
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.54 PM.jpeg", caption: "El rey consentido posando lindo 🐾", rotation: "-rotate-2" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.54 PM (1).jpeg", caption: "Miradas que llenan el alma 😍", rotation: "rotate-3" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.54 PM (2).jpeg", caption: "Explorando la vida en familia 🌳", rotation: "rotate-1" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM.jpeg", caption: "Dante y sus travesuras inolvidables 😜", rotation: "-rotate-3" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM (1).jpeg", caption: "Listo para morder todo a su paso 🦷", rotation: "rotate-2" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM (2).jpeg", caption: "Su carita cuando sabe que va para Sabaneta 🚗", rotation: "-rotate-1" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM (3).jpeg", caption: "Compañero incondicional de siestas y abrazos 💤", rotation: "rotate-4" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM (4).jpeg", caption: "El guardián más juguetón y destructor 🛡️", rotation: "-rotate-2" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.55 PM (5).jpeg", caption: "Buscando un calcetín para devorar... 🧦", rotation: "rotate-3" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.56 PM.jpeg", caption: "La felicidad en cuatro patitas 🐾", rotation: "-rotate-3" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.56 PM (1).jpeg", caption: "Aventuras de nuestro perrito travieso ✨", rotation: "rotate-2" },
  { url: "/fotos/WhatsApp Image 2026-06-24 at 4.14.56 PM (2).jpeg", caption: "La alegría más tierna de nuestra casita ❤️", rotation: "-rotate-1" },
];

export default function PhotoGallery() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx + 1) % PHOTOS.length);
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx !== null) {
      setActiveIdx((activeIdx - 1 + PHOTOS.length) % PHOTOS.length);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 relative overflow-hidden">
      {/* Decorative cute sparkle elements */}
      <div className="absolute top-4 left-4 text-rose-300">
        <Camera className="animate-pulse" size={18} />
      </div>
      <div className="absolute top-4 right-4 text-amber-400">
        <Sparkles className="animate-pulse-slow" size={18} />
      </div>

      <div className="text-center mb-8">
        <span className="text-[10px] font-mono tracking-widest text-rose-500 uppercase block mb-1">
          Nuestro Álbum de Amor
        </span>
        <h3 className="font-serif text-2xl font-bold text-slate-800">
          Los Momentos de Dante 🐾
        </h3>
        <p className="font-sans text-xs text-slate-400 max-w-sm mx-auto mt-1">
          Aquí tienes unas fotitos hermosas de nuestro consentido destructor. ¡Toca cualquier foto para verla más grande!
        </p>
      </div>

      {/* Grid of Polaroid style pictures */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 sm:gap-6 relative z-10">
        {PHOTOS.map((photo, idx) => (
          <motion.div
            key={idx}
            className={`bg-slate-50 p-3 pb-5 rounded-md shadow-md border border-slate-100 cursor-pointer origin-center relative group select-none ${photo.rotation} hover:z-20`}
            whileHover={{ scale: 1.06, rotate: 0, y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            onClick={() => setActiveIdx(idx)}
            layoutId={`polaroid-container-${idx}`}
          >
            {/* Cute mini heart tape on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-200/60 backdrop-blur-[1px] text-rose-600/80 px-3 py-0.5 text-[10px] font-mono rounded-sm border border-rose-300/30 rotate-1 shadow-sm uppercase font-semibold">
              ❤️ dante
            </div>

            {/* Photo Container */}
            <div className="aspect-square w-full rounded-sm bg-slate-200 overflow-hidden mb-3 border border-slate-200 relative">
              <img
                src={photo.url}
                alt={photo.caption}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>

            {/* Polaroid caption with beautiful handwritten font */}
            <p className="font-handwritten text-lg text-slate-700 text-center leading-tight tracking-wide truncate px-1">
              {photo.caption}
            </p>
          </motion.div>
        ))}
      </div>

      {/* FULLSCREEN LIGHTBOX MODAL WITH ANIMATION */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/95 p-4 backdrop-blur-sm"
            onClick={() => setActiveIdx(null)}
          >
            {/* Close button on top right */}
            <button
              id="close-lightbox-btn"
              onClick={() => setActiveIdx(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Navigation buttons */}
            <button
              id="prev-photo-btn"
              onClick={handlePrev}
              className="absolute left-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              id="next-photo-btn"
              onClick={handleNext}
              className="absolute right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors cursor-pointer"
            >
              <ChevronRight size={24} />
            </button>

            {/* Active Large Card */}
            <motion.div
              layoutId={`polaroid-container-${activeIdx}`}
              className="bg-white p-4 sm:p-5 pb-8 sm:pb-10 rounded-xl max-w-lg w-full shadow-2xl relative flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-3 right-4 flex items-center gap-1.5 text-xs font-semibold text-rose-500 font-mono">
                <Heart size={12} fill="currentColor" className="animate-heartbeat" />
                <span>{activeIdx + 1} / {PHOTOS.length}</span>
              </div>

              {/* Large Image */}
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-slate-100 mb-4 border border-slate-100 shadow-inner">
                <img
                  src={PHOTOS[activeIdx].url}
                  alt={PHOTOS[activeIdx].caption}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="font-handwritten text-2xl sm:text-3xl text-slate-800 text-center px-4 leading-normal select-none"
              >
                {PHOTOS[activeIdx].caption}
              </motion.p>

              {/* Tap anywhere hint */}
              <span className="font-sans text-[10px] text-slate-400 mt-3 block uppercase tracking-wider">
                Haz clic fuera para cerrar
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
