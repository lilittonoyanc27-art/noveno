import React, { useState } from 'react';
import { SHORT_TEXT } from './communicationData';
import { speakSpanish } from './speechUtils';
import { Volume2, Eye, EyeOff, BookOpen, Sparkles, FileText, Check } from 'lucide-react';

interface ShortTextViewProps {
  speed: number;
}

export const ShortTextView: React.FC<ShortTextViewProps> = ({ speed }) => {
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set(['st1', 'st2']));
  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setRevealedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakSpanish(text, speed).then(() => setPlayingId(null));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm mb-1">
            <FileText className="w-4 h-4" />
            <span>Texto corto / Կարճ տեքստ</span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900">
            Ամփոփ համառոտ տեքստ (Resumen Breve)
          </h3>
          <p className="text-xs text-slate-500">
            Սեղմեք իսպաներեն հատվածի վրա՝ հայերեն թարգմանությունը բացելու կամ փակելու համար
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setRevealedIds(new Set(['st1', 'st2']))}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Բացել հայերենը
          </button>
          <button
            onClick={() => setRevealedIds(new Set())}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" /> Թաքցնել
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {SHORT_TEXT.paragraphs.map((p, idx) => {
          const isOpen = revealedIds.has(p.id);

          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:border-indigo-300 transition"
            >
              {/* Spanish block (Click to toggle Armenian!) */}
              <div
                onClick={() => toggle(p.id)}
                className="p-5 cursor-pointer select-none bg-gradient-to-br from-white to-slate-50/50 hover:to-indigo-50/20 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        🇪🇸 Español #{idx + 1}
                      </span>
                      <span className="text-[11px] text-slate-400 group-hover:text-indigo-600 transition">
                        {isOpen ? 'Սեղմեք՝ հայերենը փակելու համար' : 'Սեղմեք՝ հայերեն թարգմանությունը բացելու համար'}
                      </span>
                    </div>

                    <p className="text-slate-900 font-semibold text-base sm:text-lg leading-relaxed group-hover:text-indigo-950 transition">
                      {p.es}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={(e) => handleAudio(e, p.es, p.id)}
                      className={`p-2 rounded-lg transition ${
                        playingId === p.id
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                          : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
                      }`}
                      title="Լսել իսպաներեն"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Armenian block (Revealed) */}
              {isOpen && (
                <div className="p-5 border-t border-indigo-100 bg-gradient-to-r from-emerald-50/40 via-teal-50/30 to-indigo-50/20">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      🇦🇲 Հայերեն
                    </span>
                    <div className="space-y-1 flex-1">
                      <p className="text-slate-900 font-bold text-base sm:text-lg leading-relaxed">
                        {p.am}
                      </p>
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
