import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Smile } from "lucide-react";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false,
  });

  useEffect(() => {
    // Target: July 2, 2026 at 7:00 PM (19:00) - Perfect time for their special date in Sabaneta
    const targetDate = new Date("2026-07-02T19:00:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeBlocks = [
    { label: "Días", value: timeLeft.days, color: "from-rose-400 to-pink-500" },
    { label: "Horas", value: timeLeft.hours, color: "from-pink-400 to-rose-400" },
    { label: "Minutos", value: timeLeft.minutes, color: "from-rose-400 to-orange-400" },
    { label: "Segundos", value: timeLeft.seconds, color: "from-orange-400 to-rose-500" },
  ];

  if (timeLeft.isCompleted) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100/50 rounded-3xl p-6 text-center shadow-md">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mb-3"
        >
          <Smile size={24} />
        </motion.div>
        <h3 className="font-serif text-2xl text-emerald-800 font-semibold mb-1">
          ¡Llegó el gran día! 🎉
        </h3>
        <p className="font-sans text-emerald-600/90 text-sm">
          Hoy celebramos nuestros 17 meses juntos en nuestro rincón especial. ¡Prepárate para una noche inolvidable con Dante! 🐾💖
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-md border border-rose-100/50 rounded-3xl p-6 shadow-xl shadow-rose-100/40 relative overflow-hidden">
      {/* Decorative subtle background circle */}
      <div className="absolute -top-12 -left-12 w-24 h-24 bg-rose-100/30 rounded-full blur-xl" />

      <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
        <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
          <Calendar size={16} />
        </div>
        <div className="text-left">
          <h3 className="font-serif text-sm font-semibold text-slate-800">Cuenta Regresiva</h3>
          <p className="font-sans text-[11px] text-slate-400">Para celebrar nuestros 17 meses</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2.5 sm:gap-4">
        {timeBlocks.map((block, index) => (
          <div key={index} className="flex flex-col items-center">
            <motion.div
              id={`countdown-block-${block.label.toLowerCase()}`}
              className="w-full aspect-square sm:h-20 sm:w-20 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shadow-sm relative overflow-hidden"
              whileHover={{ scale: 1.03, y: -2 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Highlight top border */}
              <div className={`absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r ${block.color}`} />
              
              <span className="font-serif text-xl sm:text-2xl font-bold text-slate-800 tabular-nums">
                {String(block.value).padStart(2, "0")}
              </span>
            </motion.div>
            <span className="font-sans text-[10px] sm:text-xs font-semibold text-slate-400 mt-2">
              {block.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5 text-rose-500 font-handwritten text-lg text-center">
        <Clock size={16} className="animate-spin-slow flex-shrink-0" />
        <span>Esta noche la vamos a pasar en familia y por supuesto Dante está invitado 🐾❤️</span>
      </div>
    </div>
  );
}
