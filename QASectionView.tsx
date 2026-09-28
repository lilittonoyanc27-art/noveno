import React, { useState } from 'react';
import { QUESTIONS_AND_ANSWERS, QuestionAnswer } from './communicationData';
import { speakSpanish } from './speechUtils';
import { 
  HelpCircle, 
  Volume2, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  Search, 
  RotateCcw,
  MessageCircleQuestion,
  ChevronDown
} from 'lucide-react';

interface QASectionViewProps {
  speed: number;
}

export const QASectionView: React.FC<QASectionViewProps> = ({ speed }) => {
  // Map of question ID to boolean flags for question translation and answer reveal
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, { qArm: boolean; answerEs: boolean; aArm: boolean }>>({
    1: { qArm: true, answerEs: true, aArm: true }
  });

  const [searchFilter, setSearchFilter] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleQArm = (id: number) => {
    setRevealedQuestions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        qArm: !prev[id]?.qArm,
        // if user opens question, keep whatever answer state was
        answerEs: prev[id]?.answerEs ?? true,
        aArm: prev[id]?.aArm ?? false
      }
    }));
  };

  const toggleAnswerArm = (id: number) => {
    setRevealedQuestions(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        qArm: prev[id]?.qArm ?? true,
        answerEs: true,
        aArm: !prev[id]?.aArm
      }
    }));
  };

  const toggleEntireCard = (id: number) => {
    const current = revealedQuestions[id];
    const isFullyOpen = current?.qArm && current?.aArm;
    setRevealedQuestions(prev => ({
      ...prev,
      [id]: {
        qArm: !isFullyOpen,
        answerEs: true,
        aArm: !isFullyOpen
      }
    }));
  };

  const revealAllTranslations = () => {
    const all: Record<number, { qArm: boolean; answerEs: boolean; aArm: boolean }> = {};
    QUESTIONS_AND_ANSWERS.forEach(item => {
      all[item.id] = { qArm: true, answerEs: true, aArm: true };
    });
    setRevealedQuestions(all);
  };

  const hideAllTranslations = () => {
    const all: Record<number, { qArm: boolean; answerEs: boolean; aArm: boolean }> = {};
    QUESTIONS_AND_ANSWERS.forEach(item => {
      all[item.id] = { qArm: false, answerEs: true, aArm: false };
    });
    setRevealedQuestions(all);
  };

  const hideAllAnswersForPractice = () => {
    const all: Record<number, { qArm: boolean; answerEs: boolean; aArm: boolean }> = {};
    QUESTIONS_AND_ANSWERS.forEach(item => {
      all[item.id] = { qArm: false, answerEs: false, aArm: false };
    });
    setRevealedQuestions(all);
  };

  const handleAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakSpanish(text, speed).then(() => setPlayingId(null));
  };

  const filteredList = QUESTIONS_AND_ANSWERS.filter(item => {
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      item.esQuestion.toLowerCase().includes(q) ||
      item.amQuestion.toLowerCase().includes(q) ||
      item.esAnswer.toLowerCase().includes(q) ||
      item.amAnswer.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner & Filter */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
              <MessageCircleQuestion className="w-4 h-4" />
              <span>Preguntas y respuestas / Հարցեր և պատասխաններ</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Բոլոր 11 Հարցերն ու Պատասխանները
            </h3>
            <p className="text-xs text-slate-500">
              Կտտացրեք հարցի կամ պատասխանի վրա՝ հայերեն թարգմանությունը բացելու համար
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={revealAllTranslations}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" /> Բացել հայերենը
            </button>
            <button
              onClick={hideAllTranslations}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
            >
              <EyeOff className="w-3.5 h-3.5" /> Թաքցնել հայերենը
            </button>
            <button
              onClick={hideAllAnswersForPractice}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 transition flex items-center gap-1.5"
              title="Ինքնաստուգման ռեժիմ՝ թաքցնել պատասխանները"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Ինքնաստուգում (թեստ)
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Որոնել հարցերում կամ պատասխաններում (հայերեն կամ իսպաներեն)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white transition"
          />
          {searchFilter && (
            <button
              onClick={() => setSearchFilter('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 px-1"
            >
              Մաքրել
            </button>
          )}
        </div>
      </div>

      {/* List of Q&As */}
      <div className="space-y-4">
        {filteredList.map((item) => {
          const state = revealedQuestions[item.id] || { qArm: false, answerEs: true, aArm: false };
          const isQOpen = !!state.qArm;
          const isAOpen = !!state.aArm;
          const isAnsVisible = state.answerEs !== false;

          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 transition-all"
            >
              {/* Question container */}
              <div
                onClick={() => toggleQArm(item.id)}
                className="p-4 sm:p-5 bg-gradient-to-r from-slate-50/80 to-indigo-50/20 border-b border-slate-100 cursor-pointer select-none group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                      {item.id}
                    </span>

                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded">
                          Pregunta {item.id}
                        </span>
                        <span className="text-[11px] text-slate-400 group-hover:text-indigo-600 transition">
                          {isQOpen ? 'Կտտացրեք՝ թարգմանությունը փակելու համար' : 'Կտտացրեք՝ հարցի հայերենը բացելու համար'}
                        </span>
                      </div>

                      {/* Spanish Question */}
                      <p className="text-slate-900 font-bold text-base sm:text-lg group-hover:text-indigo-900 transition">
                        🇪🇸 {item.esQuestion}
                      </p>

                      {/* Armenian Question (Revealed on click!) */}
                      {isQOpen && (
                        <div className="mt-2 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-950">
                          <span className="text-xs font-semibold text-emerald-700 block mb-0.5">
                            🇦🇲 Հարցը հայերեն՝
                          </span>
                          <p className="text-base font-bold text-slate-900">
                            {item.amQuestion}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={(e) => handleAudio(e, item.esQuestion, `q-${item.id}`)}
                      className={`p-2 rounded-lg transition ${
                        playingId === `q-${item.id}`
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                          : 'text-slate-400 hover:text-indigo-600 hover:bg-white'
                      }`}
                      title="Լսել հարցի իսպաներեն արտասանությունը"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform ${
                        isQOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Answer container */}
              <div className="p-4 sm:p-5">
                {isAnsVisible ? (
                  <div
                    onClick={() => toggleAnswerArm(item.id)}
                    className="cursor-pointer select-none group/ans"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                            Respuesta / Պատասխան
                          </span>
                          <span className="text-[11px] text-slate-400 group-hover/ans:text-indigo-600">
                            {isAOpen ? 'Սեղմեք՝ հայերենը փակելու համար' : 'Սեղմեք՝ հայերեն պատասխանը բացելու համար'}
                          </span>
                        </div>

                        {/* Spanish Answer */}
                        <div className="flex items-baseline gap-2">
                          <span className="text-xs font-bold text-slate-500">🇪🇸</span>
                          <p className="text-slate-800 font-semibold text-sm sm:text-base group-hover/ans:text-indigo-900 transition">
                            {item.esAnswer}
                          </p>
                        </div>

                        {/* Armenian Answer (Revealed on click!) */}
                        {isAOpen ? (
                          <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50/30 border border-emerald-200">
                            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide block mb-1">
                              🇦🇲 Հայերեն պատասխան՝
                            </span>
                            <p className="text-slate-900 font-semibold text-sm sm:text-base">
                              {item.amAnswer}
                            </p>
                          </div>
                        ) : (
                          <div className="pt-1">
                            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md hover:bg-indigo-100 transition">
                              <Eye className="w-3.5 h-3.5" /> Տեսնել հայերեն պատասխանը
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={(e) => handleAudio(e, item.esAnswer, `a-${item.id}`)}
                          className={`p-2 rounded-lg transition ${
                            playingId === `a-${item.id}`
                              ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                              : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                          }`}
                          title="Լսել պատասխանի արտասանությունը"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Practice mode hidden answer */
                  <div className="text-center py-4 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                    <p className="text-xs text-slate-500 mb-2 font-medium">
                      Պատասխանը թաքցված է ինքնաստուգման համար։ Փորձեք ինքնուրույն պատասխանել։
                    </p>
                    <button
                      onClick={() => toggleAnswerArm(item.id)}
                      className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-lg shadow-xs transition"
                    >
                      Ցույց տալ պատասխանը
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {filteredList.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">Որոնմամբ ոչինչ չգտնվեց «{searchFilter}» բառով։</p>
            <button
              onClick={() => setSearchFilter('')}
              className="mt-2 text-xs text-indigo-600 font-semibold hover:underline"
            >
              Մաքրել որոնումը
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
