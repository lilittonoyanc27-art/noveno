import React, { useState } from 'react';
import { FULL_TEXT_PARAGRAPHS, TextParagraph } from './communicationData';
import { speakSpanish, stopSpeech } from './speechUtils';
import { 
  Volume2, 
  VolumeX, 
  Eye, 
  EyeOff, 
  Sparkles, 
  BookOpen, 
  Check, 
  Copy, 
  Play, 
  Pause,
  Layers,
  ChevronDown
} from 'lucide-react';

interface FullTextViewProps {
  speed: number;
}

export const FullTextView: React.FC<FullTextViewProps> = ({ speed }) => {
  // Revealed paragraphs state - set of IDs whose Armenian translation is currently open
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set(['p1']));
  const [activeSpeechId, setActiveSpeechId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [readingAll, setReadingAll] = useState<boolean>(false);
  const [highlightedWord, setHighlightedWord] = useState<{ es: string; am: string } | null>(null);

  // Toggle reveal on Spanish click!
  const toggleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const revealAll = () => {
    setRevealedIds(new Set(FULL_TEXT_PARAGRAPHS.map((p) => p.id)));
  };

  const hideAll = () => {
    setRevealedIds(new Set());
  };

  const handlePlayAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    if (activeSpeechId === id) {
      stopSpeech();
      setActiveSpeechId(null);
      return;
    }
    setActiveSpeechId(id);
    speakSpanish(text, speed).then(() => {
      setActiveSpeechId(null);
    });
  };

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Read entire full text consecutively
  const handleReadEntireText = async () => {
    if (readingAll) {
      stopSpeech();
      setReadingAll(false);
      setActiveSpeechId(null);
      return;
    }

    setReadingAll(true);
    for (const para of FULL_TEXT_PARAGRAPHS) {
      // reveal this paragraph as it is read
      setRevealedIds((prev) => new Set(prev).add(para.id));
      setActiveSpeechId(para.id);
      await speakSpanish(para.es, speed);
    }
    setActiveSpeechId(null);
    setReadingAll(false);
  };

  return (
    <div className="space-y-6">
      {/* Header controls & helper */}
      <div className="bg-gradient-to-r from-indigo-50 via-blue-50 to-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold text-sm mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Texto completo / Լիարժեք տեքստ</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            Կտտացրեք ցանկացած <strong className="text-slate-900 font-semibold">իսպաներեն նախադասության</strong> վրա՝ հայերեն թարգմանությունը բացելու համար։
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleReadEntireText}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition ${
              readingAll
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
            }`}
          >
            {readingAll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            {readingAll ? 'Դադարեցնել ընթերցումը' : 'Լսել ամբողջ տեքստը'}
          </button>

          <button
            onClick={revealAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
          >
            <Eye className="w-3.5 h-3.5 text-indigo-600" />
            Բացել բոլորը
          </button>

          <button
            onClick={hideAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 transition"
          >
            <EyeOff className="w-3.5 h-3.5 text-slate-500" />
            Թաքցնել
          </button>
        </div>
      </div>

      {/* Paragraph list */}
      <div className="space-y-4">
        {FULL_TEXT_PARAGRAPHS.map((item, idx) => {
          const isRevealed = revealedIds.has(item.id);
          const isPlaying = activeSpeechId === item.id;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 bg-white ${
                isPlaying 
                  ? 'border-indigo-400 ring-2 ring-indigo-200 shadow-md' 
                  : isRevealed 
                  ? 'border-indigo-200 shadow-xs' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Spanish Clickable Area */}
              <div
                onClick={() => toggleReveal(item.id)}
                className="p-4 sm:p-5 cursor-pointer select-none group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 group-hover:bg-indigo-100 text-slate-600 group-hover:text-indigo-700 flex items-center justify-center text-xs font-bold transition">
                      {idx + 1}
                    </span>

                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          🇪🇸 Español
                        </span>
                        <span className="text-[11px] text-slate-400 group-hover:text-indigo-600 transition">
                          {isRevealed ? 'Սեղմեք՝ թարգմանությունը փակելու համար' : 'Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար'}
                        </span>
                      </div>

                      {/* Spanish Text */}
                      <p className="text-slate-900 font-medium text-base sm:text-lg leading-relaxed group-hover:text-indigo-950 transition">
                        {item.es}
                      </p>

                      {/* Keywords / vocabulary chips */}
                      {item.keywords && (
                        <div className="flex flex-wrap gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
                          {item.keywords.map((kw, kwIdx) => (
                            <button
                              key={kwIdx}
                              onClick={() => setHighlightedWord(highlightedWord?.es === kw.es ? null : kw)}
                              className={`text-[11px] px-2 py-0.5 rounded-md border transition ${
                                highlightedWord?.es === kw.es
                                  ? 'bg-indigo-600 text-white border-indigo-600 font-semibold'
                                  : 'bg-slate-50 hover:bg-indigo-50 text-slate-600 border-slate-200'
                              }`}
                              title={`${kw.es} = ${kw.am}`}
                            >
                              <span className="font-medium">{kw.es}</span>
                              {highlightedWord?.es === kw.es && (
                                <span className="ml-1 text-indigo-100 font-normal">→ {kw.am}</span>
                              )}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                    <button
                      onClick={(e) => handlePlayAudio(e, item.es, item.id)}
                      className={`p-2 rounded-lg transition ${
                        isPlaying
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                          : 'text-slate-500 hover:text-indigo-600 hover:bg-indigo-50'
                      }`}
                      title="Լսել իսպաներեն արտասանությունը"
                    >
                      {isPlaying ? <VolumeX className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => handleCopy(e, item.es, item.id)}
                      className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition hidden sm:block"
                      title="Պատճենել իսպաներենը"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>

                    <div className="p-2 text-slate-400 group-hover:text-indigo-600 transition">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isRevealed ? 'rotate-180 text-indigo-600' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Armenian Translation Block (Opens when clicked!) */}
              {isRevealed && (
                <div className="border-t border-indigo-100 bg-gradient-to-r from-emerald-50/50 via-indigo-50/30 to-blue-50/40 p-4 sm:p-5 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                        🇦🇲 Հայերեն
                      </span>
                    </div>

                    <div className="flex-1 space-y-2">
                      <p className="text-slate-900 font-semibold text-base sm:text-lg leading-relaxed">
                        {item.am}
                      </p>

                      <div className="flex items-center gap-3 pt-1 text-xs text-slate-500">
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-3.5 h-3.5" /> Ճշգրիտ թարգմանություն
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <button
                          onClick={() => toggleReveal(item.id)}
                          className="hover:underline text-indigo-600 font-medium"
                        >
                          Փակել
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
