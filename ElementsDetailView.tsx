import React, { useState } from 'react';
import { MAIN_ELEMENTS, CommunicationElement } from './communicationData';
import { speakSpanish } from './speechUtils';
import { 
  Send, 
  UserCheck, 
  MessageSquare, 
  Code2, 
  Radio, 
  Compass, 
  Volume2, 
  Eye, 
  EyeOff, 
  Sparkles,
  ChevronDown,
  Info,
  Check
} from 'lucide-react';

interface ElementsDetailViewProps {
  speed: number;
}

export const ElementsDetailView: React.FC<ElementsDetailViewProps> = ({ speed }) => {
  // Revealed states for each element card
  const [revealedCards, setRevealedCards] = useState<Record<string, { def: boolean; example: boolean }>>({
    emisor: { def: true, example: true },
    receptor: { def: false, example: false },
    mensaje: { def: false, example: false },
    codigo: { def: false, example: false },
    canal: { def: false, example: false },
    contexto: { def: false, example: false },
  });

  const [playingId, setPlayingId] = useState<string | null>(null);

  const toggleElementDef = (id: string) => {
    setRevealedCards(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        def: !prev[id]?.def
      }
    }));
  };

  const toggleElementExample = (id: string) => {
    setRevealedCards(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        example: !prev[id]?.example
      }
    }));
  };

  const revealAll = () => {
    const all: Record<string, { def: boolean; example: boolean }> = {};
    MAIN_ELEMENTS.forEach(el => {
      all[el.id] = { def: true, example: true };
    });
    setRevealedCards(all);
  };

  const hideAll = () => {
    const all: Record<string, { def: boolean; example: boolean }> = {};
    MAIN_ELEMENTS.forEach(el => {
      all[el.id] = { def: false, example: false };
    });
    setRevealedCards(all);
  };

  const handleAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakSpanish(text, speed).then(() => setPlayingId(null));
  };

  const getIcon = (name: string) => {
    switch (name) {
      case 'Send': return <Send className="w-5 h-5 text-blue-600" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-emerald-600" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-amber-600" />;
      case 'Code2': return <Code2 className="w-5 h-5 text-purple-600" />;
      case 'Radio': return <Radio className="w-5 h-5 text-cyan-600" />;
      case 'Compass': return <Compass className="w-5 h-5 text-rose-600" />;
      default: return <Sparkles className="w-5 h-5 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200">
        <div>
          <h3 className="font-bold text-slate-900 text-base">
            6 Հիմնական տարրերը (6 Elementos Principales)
          </h3>
          <p className="text-xs text-slate-500">
            Կտտացրեք ցանկացած իսպաներեն բլոկի վրա՝ հայերեն թարգմանությունն ու բացատրությունը բացելու համար
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={revealAll}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" /> Բացել բոլորը
          </button>
          <button
            onClick={hideAll}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition flex items-center gap-1.5"
          >
            <EyeOff className="w-3.5 h-3.5" /> Թաքցնել բոլորը
          </button>
        </div>
      </div>

      {/* Grid of the 6 elements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {MAIN_ELEMENTS.map((el) => {
          const cardState = revealedCards[el.id] || { def: false, example: false };

          return (
            <div
              key={el.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
            >
              {/* Card Header */}
              <div className={`p-4 border-b ${el.color.border} ${el.color.light} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center">
                    {getIcon(el.iconName)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        {el.number}. ELEMENTO
                      </span>
                      <span className="text-xs font-medium px-2 py-0.2 rounded-full bg-white text-slate-700 border border-slate-200">
                        {el.roleBadge}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <h4 className="text-lg font-bold text-slate-900">
                        {el.esName}
                      </h4>
                      <span className="text-sm font-semibold text-slate-500">
                        / {el.amName}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handleAudio(e, el.esName, `name-${el.id}`)}
                  className={`p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition ${
                    playingId === `name-${el.id}` ? 'ring-2 ring-indigo-400 animate-pulse text-indigo-600' : ''
                  }`}
                  title="Լսել իսպաներեն արտասանությունը"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 space-y-4">
                {/* 1. Definition Section (Clickable) */}
                <div
                  onClick={() => toggleElementDef(el.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none group ${
                    cardState.def 
                      ? 'bg-slate-50/80 border-indigo-200' 
                      : 'bg-slate-50 hover:bg-indigo-50/30 border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                      🇪🇸 Սահմանում (սեղմեք թարգմանելու)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleAudio(e, el.esDef, `def-${el.id}`)}
                        className="text-slate-400 hover:text-indigo-600 transition p-1"
                        title="Լսել իսպաներեն"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs text-indigo-600 font-medium">
                        {cardState.def ? 'Թաքցնել' : 'Բացել'}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-900 font-medium text-sm sm:text-base">
                    {el.esDef}
                  </p>

                  {/* Armenian translation revealed */}
                  {cardState.def && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 text-emerald-900 bg-emerald-50/60 p-2.5 rounded-lg">
                      <span className="text-xs font-semibold text-emerald-800 block mb-0.5">
                        🇦🇲 Հայերեն թարգմանություն՝
                      </span>
                      <p className="text-sm font-semibold text-slate-900">
                        {el.amDef}
                      </p>
                    </div>
                  )}
                </div>

                {/* 2. Example Section (Clickable) */}
                <div
                  onClick={() => toggleElementExample(el.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none group ${
                    cardState.example 
                      ? 'bg-amber-50/40 border-amber-300' 
                      : 'bg-white hover:bg-amber-50/20 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-600" />
                      Օրինակ / Ejemplo (սեղմեք)
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleAudio(e, el.esExample, `ex-${el.id}`)}
                        className="text-slate-400 hover:text-amber-700 transition p-1"
                        title="Լսել իսպաներեն"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs text-amber-700 font-medium">
                        {cardState.example ? 'Թաքցնել' : 'Բացել'}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-800 font-medium text-sm">
                    <span className="text-xs font-bold text-amber-700 mr-1.5">🇪🇸</span>
                    {el.esExample}
                  </p>

                  {/* Armenian Example translation */}
                  {cardState.example && (
                    <div className="mt-2.5 pt-2.5 border-t border-amber-200/80 text-slate-900">
                      <p className="text-sm font-semibold text-emerald-900 bg-emerald-50/70 p-2.5 rounded-lg border border-emerald-200/60">
                        <span className="text-xs font-bold text-emerald-700 mr-1.5 block mb-0.5">🇦🇲 Հայերեն օրինակ՝</span>
                        {el.amExample}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
