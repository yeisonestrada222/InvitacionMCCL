import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Sparkles, Star, Crown, Gift } from "lucide-react";
import EnchantedEnvelope from "./components/EnchantedEnvelope";
import Countdown from "./components/Countdown";
import MusicPlayer from "./components/MusicPlayer";
import SabanetaDetails from "./components/SabanetaDetails";
import PhotoGallery from "./components/PhotoGallery";
import LoveMeter from "./components/LoveMeter";
import ScratchCard from "./components/ScratchCard";
import Quiz from "./components/Quiz";
import RsvpSection from "./components/RsvpSection";

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-rose-50/50 via-rose-100/20 to-pink-50/50 text-slate-800 font-sans selection:bg-rose-200 selection:text-rose-800">
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="envelope"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50"
          >
            <EnchantedEnvelope onOpen={() => setIsOpen(true)} />
          </motion.div>
        ) : (
          <motion.main
            key="main-experience"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-2xl mx-auto py-10 px-4 space-y-8 pb-20 select-none"
          >
            {/* Top Romantic Header Card */}
            <header className="text-center relative">
              {/* Floating cute stars */}
              <div className="absolute top-[-10px] left-8 text-amber-400 animate-float">
                <Star size={16} fill="currentColor" />
              </div>
              <div className="absolute top-[20px] right-6 text-rose-400 animate-pulse-slow">
                <Sparkles size={18} fill="currentColor" />
              </div>

              {/* Celebration Crown Badge */}
              <motion.div
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100/80 shadow-sm text-xs font-semibold text-rose-600 uppercase tracking-wider mb-5"
                initial={{ scale: 0.9 }}
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Crown size={12} fill="currentColor" />
                <span>Nuestra Próxima Cita</span>
                <Heart size={10} fill="currentColor" className="text-rose-500 animate-heartbeat" />
              </motion.div>

              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-none mb-3">
                ¡Nuestros <span className="text-rose-500">17 Meses</span>,<br />Mi Amor! ❤️
              </h1>

              <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                Cada día a tu lado ha sido una aventura hermosa. Para celebrar nuestros 17 meses este jueves 2 de julio, he preparado un plan súper especial en familia (¡con Dante!). Revisa todos los detalles abajo... 👇
              </p>
            </header>

            {/* COUNTDOWN COMPONENT */}
            <section id="countdown-section" className="w-full">
              <Countdown />
            </section>

            {/* MUSIC PLAYER COMPONENT */}
            <section id="music-player-section" className="w-full">
              <MusicPlayer />
            </section>

            {/* SABANETA DETAILS & DANTE */}
            <section id="plan-section" className="w-full">
              <SabanetaDetails />
            </section>

            {/* DANTE PHOTO GALLERY ALBUM */}
            <section id="photo-gallery-section" className="w-full">
              <PhotoGallery />
            </section>

            {/* LOVE SLIDER METER */}
            <section id="love-meter-section" className="w-full">
              <LoveMeter />
            </section>

            {/* SCRATCHCARD LOVE LETTER */}
            <section id="scratchcard-section" className="w-full">
              <ScratchCard />
            </section>

            {/* TRIVIA/QUIZ COMPONENT */}
            <section id="quiz-section" className="w-full">
              <Quiz />
            </section>

            {/* RSVP ACTION AREA */}
            <section id="rsvp-section" className="w-full pt-4">
              <RsvpSection />
            </section>

            {/* Elegant, Custom Footer */}
            <footer className="pt-8 border-t border-rose-100 text-center space-y-2">
              <div className="flex justify-center items-center gap-1.5 text-[11px] font-mono tracking-widest text-rose-400 uppercase">
                <span>De Jei</span>
                <Heart size={11} fill="currentColor" className="text-rose-500 animate-heartbeat" />
                <span>Para Cami</span>
              </div>
              <p className="font-sans text-[10px] text-slate-400">
                Sabaneta, Antioquia • Jueves, 2 de Julio de 2026 • Celebrando nuestros 17 Meses 🐾❤️
              </p>
            </footer>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
