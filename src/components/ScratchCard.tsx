import { useEffect, useRef, useState, PointerEvent, TouchEvent } from "react";
import { Sparkles, Heart, RefreshCw } from "lucide-react";
import { motion } from "motion/react";

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);

  // Initialize canvas with the gold scratch scratchable layer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      canvas.width = rect?.width || 340;
      canvas.height = rect?.height || 260;

      // Draw beautiful pink/gold gradient overlay
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "#fda4af"); // rose-300
      gradient.addColorStop(0.5, "#fb7185"); // rose-400
      gradient.addColorStop(1, "#f43f5e"); // rose-500
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add a sparkly pattern or subtle text
      ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
      for (let i = 0; i < 60; i++) {
        ctx.beginPath();
        ctx.arc(
          Math.random() * canvas.width,
          Math.random() * canvas.height,
          Math.random() * 3 + 1,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }

      // Add elegant scratch guidance text
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("✨ RASPA CON TU DEDITO AQUÍ ✨", canvas.width / 2, canvas.height / 2 - 10);
      
      ctx.font = "italic 13px 'Caveat', cursive";
      ctx.fillText("Para revelar una carta secreta...", canvas.width / 2, canvas.height / 2 + 15);
    };

    resizeCanvas();
    // Re-render on window resize to keep pixel ratio
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  // Handle scratching interaction
  const scratch = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Set clear drawing configurations (this cuts a hole through the overlay)
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();

    // Recalculate scratched area percentage to automatically clear if mostly completed
    calculateScratchedPercent();
  };

  const calculateScratchedPercent = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      // Sample every 4th pixel for performance
      for (let i = 3; i < pixels.length; i += 16) {
        if (pixels[i] === 0) {
          transparentPixels++;
        }
      }

      const totalSamples = pixels.length / 16;
      const percent = (transparentPixels / totalSamples) * 100;
      setScratchPercent(percent);

      if (percent > 45 && !isScratched) {
        setIsScratched(true);
        // Fully clear the canvas so the letter is fully readable
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    } catch (e) {
      // Handle security sandbox issue with canvas pixel access if any (should not occur)
      console.warn("Canvas percent check failed", e);
    }
  };

  const handlePointerMove = (e: PointerEvent<HTMLCanvasElement>) => {
    if (e.buttons !== 1 && e.pointerType === "mouse") return;
    scratch(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 0) return;
    const touch = e.touches[0];
    scratch(touch.clientX, touch.clientY);
  };

  const resetScratchcard = () => {
    setIsScratched(false);
    setScratchPercent(0);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "source-over";
    // Redraw
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#fda4af");
    gradient.addColorStop(0.5, "#fb7185");
    gradient.addColorStop(1, "#f43f5e");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let i = 0; i < 60; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 3 + 1, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 16px 'Plus Jakarta Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("✨ RASPA CON TU DEDITO AQUÍ ✨", canvas.width / 2, canvas.height / 2 - 10);
    
    ctx.font = "italic 13px 'Caveat', cursive";
    ctx.fillText("Para revelar una carta secreta...", canvas.width / 2, canvas.height / 2 + 15);
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30 relative">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <Heart size={16} fill="currentColor" />
          </div>
          <div className="text-left">
            <h3 className="font-serif text-sm font-semibold text-slate-800">Una Carta para Ti</h3>
            <p className="font-sans text-[10px] text-slate-400">Escrito desde lo profundo del alma</p>
          </div>
        </div>

        {isScratched && (
          <button
            id="reset-scratch-btn"
            onClick={resetScratchcard}
            className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer font-sans bg-rose-50/50 px-2.5 py-1 rounded-full border border-rose-100"
          >
            <RefreshCw size={12} />
            <span>Volver a raspar</span>
          </button>
        )}
      </div>

      {/* Main card box containing hidden content */}
      <div
        ref={containerRef}
        className="relative w-full min-h-[260px] rounded-2xl border border-rose-100 bg-rose-50/10 p-6 flex flex-col justify-center items-center text-center overflow-hidden"
      >
        {/* Underneath secret Letter Content */}
        <div className="w-full flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-500 mb-3 animate-float">
            <Heart size={18} fill="currentColor" />
          </div>
          
          <h4 className="font-handwritten text-2xl font-bold text-rose-600 mb-2">
            Mi Amor,
          </h4>
          
          <p className="font-sans text-slate-700 text-[13px] leading-relaxed max-w-sm mb-3">
            Este 2 de julio cumplimos <strong className="text-rose-600">4 años juntos</strong>, 4 años en los que has llenado mi vida entera de luz, de risas incomparables y de la paz más bonita que he sentido jamás.
          </p>
          
          <p className="font-sans text-slate-700 text-[13px] leading-relaxed max-w-sm">
            Estoy infinitamente agradecido por tu paciencia, tu sonrisa contagiosa y tu amor incondicional. Eres mi compañera favorita. Este 2 de julio quiero consentirte de una forma muy especial. ¡Gracias por existir y por elegirme todos los días! ❤️
          </p>

          <span className="font-handwritten text-lg text-rose-500 font-semibold mt-4 block">
            — De Jei para Cami ❤️
          </span>
        </div>

        {/* Scratchable Canvas Layer Overlay */}
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          className="absolute inset-0 cursor-crosshair touch-none transition-opacity duration-500"
          style={{ opacity: isScratched ? 0 : 1, pointerEvents: isScratched ? "none" : "auto" }}
        />
      </div>

      {/* Percentage helper text */}
      {!isScratched && (
        <p className="font-sans text-[10px] text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
          <Sparkles size={10} className="text-amber-400" />
          <span>¡Sigue raspando! Revelado: {Math.min(100, Math.round((scratchPercent / 45) * 100))}%</span>
        </p>
      )}
    </div>
  );
}
