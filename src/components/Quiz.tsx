import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Check, X, Award, Flame } from "lucide-react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  successMsg: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "¿Cuál es el superpoder oficial de nuestro cachorro Dante? 🐕",
    options: [
      "Dormir 20 horas al día sin interrupciones",
      "Morder todo y destruirlo todo con sus dientecitos 🐾💥",
      "Ladrarle a su propia sombra",
    ],
    correctIndex: 1,
    successMsg: "¡Sii! Dante es experto en morder y destruirlo todo, pero aún así lo amamos con toda el alma. ¡Es nuestro destructor consentido!",
  },
  {
    id: 2,
    question: "¿Cuál es nuestro plan ideal de felicidad por excelencia? 🍿",
    options: [
      "Pelis, comida deliciosa, arrunchis calentitos y Dante a los pies",
      "Subir una montaña empinada bajo un aguacero en sandalias",
      "Ir a un congreso de álgebra avanzada un sábado a las 6 AM",
    ],
    correctIndex: 0,
    successMsg: "¡Exacto! No hay nada más perfecto en el universo que estar apurruñados los tres.",
  },
  {
    id: 3,
    question: "¿Qué representa celebrar este 2 de Julio? 🌹",
    options: [
      "El día nacional de limpiar la nevera",
      "17 meses del amor más bonito del mundo, risas infinitas y gratitud pura ✨",
      "Un día común y corriente",
    ],
    correctIndex: 1,
    successMsg: "¡¡Siiii!! El 2 de julio es nuestro día especial, y lo celebraremos como te lo mereces.",
  },
];

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResultCard, setShowResultCard] = useState(false);

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (optionIdx === QUIZ_QUESTIONS[currentIdx].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setShowResultCard(true);
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResultCard(false);
  };

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="bg-white rounded-3xl p-6 border border-rose-100/50 shadow-xl shadow-rose-100/30">
      <div className="flex items-center gap-2 mb-4 justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-rose-50 flex items-center justify-center text-rose-500">
            <Award size={16} />
          </div>
          <div className="text-left">
            <h3 className="font-serif text-sm font-semibold text-slate-800">Trivia de Nosotros</h3>
            <p className="font-sans text-[10px] text-slate-400">¿Qué tanto nos conocemos?</p>
          </div>
        </div>
        
        {!showResultCard && (
          <span className="font-mono text-[10px] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-full text-slate-500">
            Pregunta {currentIdx + 1} de {QUIZ_QUESTIONS.length}
          </span>
        )}
      </div>

      <AnimatePresence mode="wait">
        {!showResultCard ? (
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            <h4 className="font-serif text-base font-semibold text-slate-800 mb-4 min-h-[48px]">
              {currentQuestion.question}
            </h4>

            <div className="flex flex-col gap-2.5 mb-5">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                
                let btnStyle = "bg-slate-50/50 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700";
                let iconElement = null;

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle = "bg-emerald-50 border-emerald-200 text-emerald-800 font-medium";
                    iconElement = <Check size={14} className="text-emerald-600 flex-shrink-0" />;
                  } else if (isSelected && !isCorrect) {
                    btnStyle = "bg-rose-50 border-rose-100 text-rose-800";
                    iconElement = <X size={14} className="text-rose-500 flex-shrink-0" />;
                  } else {
                    btnStyle = "bg-slate-50/40 border-slate-50 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`quiz-option-${idx}`}
                    onClick={() => handleOptionClick(idx)}
                    disabled={isAnswered}
                    className={`p-3.5 rounded-2xl border text-xs text-left font-sans flex items-center justify-between gap-3 transition-all cursor-pointer ${btnStyle}`}
                  >
                    <span>{option}</span>
                    {iconElement}
                  </button>
                );
              })}
            </div>

            {/* Answer Message & Next Button */}
            <div className="min-h-[80px] flex flex-col justify-end">
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-50 rounded-2xl p-3 border border-slate-100 text-center flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                  <p className="font-sans text-[11px] text-slate-600 leading-snug flex-grow text-left">
                    {selectedOption === currentQuestion.correctIndex ? (
                      <span className="text-emerald-700 font-semibold block mb-0.5">¡Correcto! 💖</span>
                    ) : (
                      <span className="text-rose-600 font-semibold block mb-0.5">¡Ups! Jeje, pero igual vale... 💕</span>
                    )}
                    {currentQuestion.successMsg}
                  </p>

                  <button
                    id="quiz-next-btn"
                    onClick={handleNext}
                    className="flex-shrink-0 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full font-sans font-medium text-xs shadow-md shadow-rose-100 transition-colors cursor-pointer"
                  >
                    {currentIdx + 1 === QUIZ_QUESTIONS.length ? "Ver Puntuación" : "Siguiente"}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 flex flex-col items-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 mb-4 animate-float">
              <Flame size={32} />
            </div>

            <h4 className="font-serif text-xl font-bold text-slate-800 mb-1">
              ¡Trivia Completada! 🏆
            </h4>
            
            <p className="font-sans text-xs text-slate-500 max-w-xs mb-6">
              Has acertado <strong className="text-rose-500 font-bold">{score} de {QUIZ_QUESTIONS.length}</strong> respuestas. Pero lo realmente importante es que nos amamos con locura y este 2 de julio lo confirmaremos.
            </p>

            <button
              id="quiz-reset-btn"
              onClick={handleReset}
              className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-full font-sans font-medium text-xs transition-colors cursor-pointer border border-slate-200"
            >
              Volver a jugar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
