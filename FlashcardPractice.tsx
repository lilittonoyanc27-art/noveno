import React, { useState } from 'react';
import { VOCABULARY, MAIN_ELEMENTS, VocabularyItem } from './communicationData';
import { speakSpanish } from './speechUtils';
import { 
  Volume2, 
  RotateCw, 
  Check, 
  X, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Search, 
  Eye, 
  EyeOff,
  Shuffle
} from 'lucide-react';

interface FlashcardPracticeProps {
  speed: number;
}

export const FlashcardPractice: React.FC<FlashcardPracticeProps> = ({ speed }) => {
  const [activeTab, setActiveTab] = useState<'cards' | 'glossary' | 'quiz'>('cards');

  // Flashcards state
  const [cards, setCards] = useState<VocabularyItem[]>(VOCABULARY);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [knownCount, setKnownCount] = useState<number>(0);

  // Glossary state
  const [glossaryFilter, setGlossaryFilter] = useState<string>('');
  const [revealedVocab, setRevealedVocab] = useState<Set<string>>(new Set(VOCABULARY.map(v => v.id)));

  // Quiz state
  const QUIZ_ITEMS = [
    {
      qAm: "Ո՞վ է ուղարկում հաղորդագրությունը (Es quien envía el mensaje)։",
      options: ["Emisor", "Receptor", "Canal", "Contexto"],
      correct: "Emisor",
      explain: "El emisor es la persona que envía el mensaje (Ուղարկողը այն մարդն է, ով ուղարկում է հաղորդագրությունը)։"
    },
    {
      qAm: "Ո՞վ է ստանում հաղորդագրությունը (Es quien recibe el mensaje)։",
      options: ["Código", "Receptor", "Canal", "Emisor"],
      correct: "Receptor",
      explain: "El receptor es la persona que recibe el mensaje (Ստացողը այն մարդն է, ով ստանում է հաղորդագրությունը)։"
    },
    {
      qAm: "Ի՞նչ է հաղորդագրությունը (Mensaje)։",
      options: ["La situación", "El medio", "La información que se transmite", "El sistema de signos"],
      correct: "La información que se transmite",
      explain: "El mensaje es la información que se transmite (Հաղորդագրությունը փոխանցվող տեղեկությունն է)։"
    },
    {
      qAm: "Ի՞նչ է կոդը (Código)։",
      options: ["El aire o internet", "El sistema de signos (ej. una lengua)", "La persona que recibe", "La situación"],
      correct: "El sistema de signos (ej. una lengua)",
      explain: "El código es el sistema de signos que usamos para comunicarnos, por ejemplo el español։"
    },
    {
      qAm: "Ի՞նչ է կապուղին (Canal)։",
      options: ["El medio por el que se transmite el mensaje", "La persona emisora", "El idioma", "El contexto"],
      correct: "El medio por el que se transmite el mensaje",
      explain: "El canal es el medio: teléfono, carta, aire, Internet (Կապուղին այն միջոցն է, որով փոխանցվում է հաղորդագրությունը)։"
    },
    {
      qAm: "Ի՞նչ է համատեքստը (Contexto)։",
      options: ["Una carta", "La situación en la que ocurre la comunicación", "El receptor", "El idioma"],
      correct: "La situación en la que ocurre la comunicación",
      explain: "El contexto es la situación en la que se produce la comunicación (Համատեքստը այն իրավիճակն է, որտեղ տեղի է ունենում հաղորդակցությունը)։"
    }
  ];

  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const currentCard = cards[currentIndex] || cards[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = (known: boolean) => {
    if (known) setKnownCount(prev => prev + 1);
    setIsFlipped(false);
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleShuffleCards = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleQuizAnswer = (option: string) => {
    if (selectedOption !== null) return;
    setSelectedOption(option);
    if (option === QUIZ_ITEMS[quizIndex].correct) {
      setQuizScore(prev => prev + 1);
    }
  };

  const handleNextQuiz = () => {
    setSelectedOption(null);
    if (quizIndex < QUIZ_ITEMS.length - 1) {
      setQuizIndex(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedOption(null);
    setQuizScore(0);
    setQuizFinished(false);
  };

  const toggleVocab = (id: string) => {
    setRevealedVocab(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredVocab = VOCABULARY.filter(v => {
    if (!glossaryFilter.trim()) return true;
    const q = glossaryFilter.toLowerCase();
    return v.es.toLowerCase().includes(q) || v.am.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* Sub tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('cards')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'cards'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" /> Քարտեր (Flashcards)
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'quiz'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Թեստ (Quiz)
          </button>
          <button
            onClick={() => setActiveTab('glossary')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'glossary'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Search className="w-4 h-4" /> Բառարան (Glosario)
          </button>
        </div>

        {activeTab === 'cards' && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">
              Յուրացված՝ {knownCount} / {cards.length}
            </span>
            <button
              onClick={handleShuffleCards}
              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition"
              title="Խառնել քարտերը"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 1. FLASHCARDS TAB */}
      {activeTab === 'cards' && (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Քարտ {currentIndex + 1} / {cards.length}
            </span>
          </div>

          {/* Flashcard container */}
          <div
            onClick={handleFlip}
            className={`relative min-h-[260px] sm:min-h-[280px] rounded-3xl p-6 sm:p-8 cursor-pointer select-none transition-all duration-300 shadow-md flex flex-col justify-between ${
              isFlipped
                ? 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-emerald-200'
                : 'bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 text-white shadow-indigo-200'
            }`}
          >
            <div className="flex items-center justify-between text-xs opacity-80">
              <span className="uppercase tracking-widest font-semibold">
                {isFlipped ? '🇦🇲 Հայերեն թարգմանություն' : '🇪🇸 Իսպաներեն բառ / արտահայտություն'}
              </span>
              <span className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full font-medium">
                <RotateCw className="w-3 h-3" /> Սեղմեք շրջելու համար
              </span>
            </div>

            {/* Central content */}
            <div className="text-center py-6">
              {!isFlipped ? (
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {currentCard.es}
                  </h3>
                  {currentCard.pronunciation && (
                    <p className="text-xs text-indigo-200 font-medium">
                      Արտասանություն՝ [{currentCard.pronunciation}]
                    </p>
                  )}
                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(currentCard.es, speed);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-semibold transition"
                    >
                      <Volume2 className="w-3.5 h-3.5" /> Լսել իսպաներեն
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    {currentCard.am}
                  </h3>
                  <p className="text-xs text-emerald-100">
                    Իսպաներեն՝ <strong className="text-white">{currentCard.es}</strong>
                  </p>
                </div>
              )}
            </div>

            {/* Footer hint */}
            <div className="text-center text-xs opacity-75">
              {isFlipped ? 'Սեղմեք նորից՝ իսպաներենին վերադառնալու համար' : 'Սեղմեք քարտի վրա՝ հայերեն թարգմանությունը տեսնելու համար'}
            </div>
          </div>

          {/* Flashcard Action Buttons */}
          <div className="flex items-center justify-between gap-4 mt-6">
            <button
              onClick={() => handleNextCard(false)}
              className="flex-1 py-3 px-4 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-xs transition flex items-center justify-center gap-2"
            >
              <RotateCw className="w-4 h-4 text-slate-400" /> Կրկնել հետո
            </button>
            <button
              onClick={() => handleNextCard(true)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm transition flex items-center justify-center gap-2"
            >
              <Check className="w-4 h-4" /> Գիտեմ (Հաջորդը)
            </button>
          </div>
        </div>
      )}

      {/* 2. QUIZ TAB */}
      {activeTab === 'quiz' && (
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {!quizFinished ? (
            <div>
              <div className="flex items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                    Հարց {quizIndex + 1} / {QUIZ_ITEMS.length}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                    {QUIZ_ITEMS[quizIndex].qAm}
                  </h4>
                </div>
                <div className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
                  Միավորներ՝ {quizScore}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {QUIZ_ITEMS[quizIndex].options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === QUIZ_ITEMS[quizIndex].correct;

                  let btnStyle = "border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-800";
                  if (selectedOption !== null) {
                    if (isCorrect) {
                      btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-200";
                    } else if (isSelected) {
                      btnStyle = "bg-rose-50 border-rose-400 text-rose-900 ring-2 ring-rose-200";
                    } else {
                      btnStyle = "opacity-50 border-slate-200";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(option)}
                      disabled={selectedOption !== null}
                      className={`w-full p-4 rounded-xl border text-left font-semibold text-sm transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          speakSpanish(option, speed);
                        }}
                        className="p-1 text-slate-400 hover:text-indigo-600"
                        title="Լսել իսպաներեն"
                      >
                        <Volume2 className="w-4 h-4" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {selectedOption !== null && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-6">
                  <p className="text-xs font-semibold text-slate-600 mb-1">Բացատրություն՝</p>
                  <p className="text-sm font-medium text-slate-900">{QUIZ_ITEMS[quizIndex].explain}</p>
                </div>
              )}

              {selectedOption !== null && (
                <button
                  onClick={handleNextQuiz}
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-xs transition"
                >
                  {quizIndex < QUIZ_ITEMS.length - 1 ? 'Հաջորդ հարցը' : 'Տեսնել արդյունքները'}
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">
                Գերազանց է։
              </h3>
              <p className="text-slate-600 text-sm">
                Ձեր արդյունքը՝ <strong className="text-slate-900 font-bold">{quizScore}</strong> {QUIZ_ITEMS.length}-ից։
              </p>
              <div className="pt-4">
                <button
                  onClick={restartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition"
                >
                  Կրկնել թեստը
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. GLOSSARY TAB */}
      {activeTab === 'glossary' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={glossaryFilter}
                onChange={(e) => setGlossaryFilter(e.target.value)}
                placeholder="Որոնել բառարանում (հայերեն կամ իսպաներեն)..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRevealedVocab(new Set(VOCABULARY.map(v => v.id)))}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition"
              >
                Բացել բոլորը
              </button>
              <button
                onClick={() => setRevealedVocab(new Set())}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
              >
                Թաքցնել բոլորը
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredVocab.map((item) => {
              const isOpen = revealedVocab.has(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleVocab(item.id)}
                  className="bg-white p-4 rounded-xl border border-slate-200 hover:border-indigo-300 hover:shadow-xs transition cursor-pointer select-none group"
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded mr-1.5">
                        🇪🇸
                      </span>
                      <strong className="text-base text-slate-900 group-hover:text-indigo-900 transition">
                        {item.es}
                      </strong>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakSpanish(item.es, speed);
                      }}
                      className="p-1 text-slate-400 hover:text-indigo-600 transition"
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.pronunciation && (
                    <div className="text-[11px] text-slate-400 mb-2">
                      [{item.pronunciation}]
                    </div>
                  )}

                  {isOpen ? (
                    <div className="pt-2 border-t border-slate-100 text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                      <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.5 rounded">
                        🇦🇲
                      </span>
                      <span>{item.am}</span>
                    </div>
                  ) : (
                    <div className="pt-2 text-xs text-indigo-600 font-medium flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Սեղմեք հայերենը տեսնելու համար
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
