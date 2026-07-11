import { useState } from 'react';
import { QUIZ_QUESTIONS, TOYS_DATA, Toy } from '../data/toys';
import { ArrowLeft, RefreshCw, Sparkles, Check, BookmarkPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ToyFinderQuizProps {
  onAddToCart: (toy: Toy) => void;
  cartIds: string[];
}

export default function ToyFinderQuiz({ onAddToCart, cartIds }: ToyFinderQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Auto advance to next step after a tiny delay for visual confirmation
    setTimeout(() => {
      if (currentStep < QUIZ_QUESTIONS.length - 1) {
        setCurrentStep((prev) => prev + 1);
      } else {
        setShowResults(true);
      }
    }, 250);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
    setShowResults(false);
  };

  // Recommendations Logic based on academic criteria
  const getRecommendations = (): Toy[] => {
    const grade = answers['age']; // mapped from 'age'
    const interest = answers['interest'];
    const budget = answers['budget'];

    let filtered = TOYS_DATA;

    // Filter by grade/age range
    if (grade) {
      filtered = filtered.filter((item) => item.ageRange === grade || item.ageRange === 'all');
    }

    // Filter by academic interest / enrollment priority
    if (interest && filtered.some(item => item.interest === interest)) {
      filtered = filtered.filter((item) => item.interest === interest);
    }

    // Filter by monthly budget
    if (budget) {
      filtered = filtered.filter((item) => {
        if (budget === 'budget_low') return item.price <= 150;
        if (budget === 'budget_mid') return item.price > 150 && item.price <= 300;
        return item.price > 300;
      });
    }

    // Fallback if no exact matches are found
    if (filtered.length === 0 && grade) {
      filtered = TOYS_DATA.filter((item) => item.ageRange === grade || item.ageRange === 'all');
    }
    
    // Ultimate fallback: top 3 programs
    if (filtered.length === 0) {
      filtered = TOYS_DATA.slice(0, 3);
    }

    return filtered;
  };

  const currentQuestion = QUIZ_QUESTIONS[currentStep];
  const recommendedPrograms = showResults ? getRecommendations() : [];

  return (
    <div id="program-finder-quiz" className="bg-brand-cream border-3 border-brand-black p-6 md:p-10 shadow-[6px_6px_0px_0px_rgba(26,26,26,1)] max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
        <span className="p-1 bg-brand-red border border-brand-black flex items-center justify-center text-white">
          <Sparkles className="w-4 h-4 fill-white" />
        </span>
        <span className="text-xs font-black uppercase tracking-widest text-brand-black font-mono">Interactive Finder Engine</span>
      </div>

      <AnimatePresence mode="wait">
        {!showResults ? (
          <motion.div
            key={`step-${currentStep}`}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col"
          >
            {/* Quiz Header & Navigation */}
            <div className="flex justify-between items-center mb-6">
              <div className="text-left">
                <span className="text-[10px] text-stone-500 font-mono font-bold uppercase tracking-wider block">
                  Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <h3 className="text-brand-black text-2xl md:text-3xl font-black font-display tracking-tight uppercase leading-tight mt-1">
                  {currentQuestion.text}
                </h3>
              </div>

              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  className="p-2.5 text-brand-black bg-white hover:bg-brand-orange border-2 border-brand-black shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer transition-all shrink-0 ml-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Step Indicators */}
            <div className="flex gap-2 mb-8">
              {QUIZ_QUESTIONS.map((_, index) => (
                <div
                  key={index}
                  className={`h-3 border border-brand-black transition-all duration-300 ${
                    index <= currentStep ? 'bg-brand-red' : 'bg-white'
                  }`}
                  style={{ flex: 1 }}
                />
              ))}
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option) => {
                const isSelected = answers[currentQuestion.id] === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => handleSelectOption(currentQuestion.id, option.value)}
                    className={`p-5 border-2 border-brand-black text-left cursor-pointer transition-all duration-150 flex items-start gap-4 ${
                      isSelected
                        ? 'bg-brand-teal text-white shadow-none translate-x-1 translate-y-1'
                        : 'bg-white text-brand-black hover:border-brand-red hover:shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] hover:-translate-y-0.5 shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'
                    }`}
                  >
                    <span className="text-3xl p-2 bg-brand-cream border border-brand-black select-none leading-none shrink-0 text-brand-black">
                      {option.icon}
                    </span>
                    <div>
                      <p className={`font-black font-display text-base uppercase tracking-tight ${isSelected ? 'text-white' : 'text-brand-black'}`}>
                        {option.label}
                      </p>
                      {option.description && (
                        <p className={`text-xs mt-1 leading-snug font-medium ${isSelected ? 'text-teal-100' : 'text-stone-500'}`}>
                          {option.description}
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col"
          >
            {/* Results Title */}
            <div className="text-center md:text-left mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="text-left">
                <h3 className="text-brand-black text-3xl font-black font-display uppercase tracking-tight">
                  We found the Perfect Programs!
                </h3>
                <p className="text-stone-600 text-xs font-semibold mt-1">
                  Hand-selected options based on your answers. Pop by our center at Taman Kledang Sentosa, Ipoh to visit!
                </p>
              </div>

              <button
                onClick={resetQuiz}
                className="self-center md:self-start px-4 py-2.5 text-xs font-black uppercase tracking-wider text-brand-black bg-brand-orange border-2 border-brand-black shadow-[3px_3px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_rgba(26,26,26,1)] hover:bg-white flex items-center gap-1.5 cursor-pointer transition-all whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restart Quiz</span>
              </button>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {recommendedPrograms.map((program) => {
                const isAdded = cartIds.includes(program.id);
                return (
                  <div
                    key={program.id}
                    className="bg-white border-2 border-brand-black shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] overflow-hidden flex flex-col justify-between"
                  >
                    <div className="relative aspect-video bg-brand-cream overflow-hidden border-b-2 border-brand-black">
                      <img
                        src={program.image}
                        alt={program.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-2 left-2 bg-brand-red text-white text-[9px] font-black uppercase tracking-wider px-2 py-1 border border-brand-black">
                        Recommended
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                      <div className="text-left">
                        <h4 className="font-black text-sm text-brand-black font-display uppercase tracking-tight line-clamp-1">{program.name}</h4>
                        <p className="text-stone-500 text-[11px] line-clamp-2 mt-1 leading-snug font-medium">
                          {program.description}
                        </p>
                        <span className="text-[10px] font-black uppercase tracking-wider text-brand-black block mt-2 bg-brand-cream border border-brand-black px-2 py-0.5 w-fit">
                          Grade/Level: {program.ageLabel}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-stone-200 flex items-center justify-between mt-3">
                        <span className="font-black text-sm text-brand-black">RM {program.price}</span>
                        <button
                          onClick={() => onAddToCart(program)}
                          className={`px-3 py-1.5 border-2 border-brand-black font-black uppercase text-[10px] tracking-wider flex items-center gap-1 cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(26,26,26,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${
                            isAdded
                              ? 'bg-brand-teal text-white'
                              : 'bg-brand-cream text-brand-black hover:bg-brand-orange'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <BookmarkPlus className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Selected' : 'Select'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
