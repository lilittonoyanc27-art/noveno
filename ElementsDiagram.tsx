import React, { useState } from 'react';
import { CommunicationElement, MAIN_ELEMENTS } from './communicationData';
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
  ArrowRight,
  Info
} from 'lucide-react';

interface ElementsDiagramProps {
  onSelectElement?: (el: CommunicationElement) => void;
  speed: number;
}

export const ElementsDiagram: React.FC<ElementsDiagramProps> = ({ speed }) => {
  const [activeElementId, setActiveElementId] = useState<string>('mensaje');
  const [showArmenianModal, setShowArmenianModal] = useState<boolean>(true);
  const [playingId, setPlayingId] = useState<string | null>(null);

  const activeElement = MAIN_ELEMENTS.find(e => e.id === activeElementId) || MAIN_ELEMENTS[2];

  const handleAudio = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    setPlayingId(id);
    speakSpanish(text, speed).then(() => setPlayingId(null));
  };

  const getIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case 'Send': return <Send className={className} />;
      case 'UserCheck': return <UserCheck className={className} />;
      case 'MessageSquare': return <MessageSquare className={className} />;
      case 'Code2': return <Code2 className={className} />;
      case 'Radio': return <Radio className={className} />;
      case 'Compass': return <Compass className={className} />;
      default: return <Sparkles className={className} />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 mb-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Սխեմա / Esquema
            </span>
            <span className="text-xs text-slate-500">
              Սեղմեք ցանկացած տարրի վրա՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Հաղորդակցության Մոդելը (Modelo de Comunicación)
          </h3>
        </div>

        <button
          onClick={() => setShowArmenianModal(!showArmenianModal)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          {showArmenianModal ? <EyeOff className="w-3.5 h-3.5 text-indigo-600" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
          {showArmenianModal ? 'Թաքցնել հայերենը' : 'Բացել հայերենը'}
        </button>
      </div>

      {/* Visual Interactive Map / Circuit */}
      <div className="relative bg-gradient-to-b from-slate-50 via-indigo-50/20 to-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 mb-6">
        {/* Contexto banner wrapping around top */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={() => setActiveElementId('contexto')}
            className={`group px-4 py-2.5 rounded-xl border transition-all duration-200 flex items-center gap-2.5 ${
              activeElementId === 'contexto'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200 border-rose-600 scale-105'
                : 'bg-white text-slate-700 hover:border-rose-300 border-slate-200 shadow-xs'
            }`}
          >
            <Compass className={`w-4 h-4 ${activeElementId === 'contexto' ? 'text-white' : 'text-rose-500'}`} />
            <div className="text-left">
              <span className="text-xs uppercase tracking-wider block font-semibold opacity-90">
                Շրջանակ / Marco
              </span>
              <span className="text-sm font-bold">
                Contexto
                {showArmenianModal && (
                  <span className={`ml-2 text-xs font-medium px-2 py-0.5 rounded ${
                    activeElementId === 'contexto' ? 'bg-rose-700/80 text-rose-100' : 'bg-rose-50 text-rose-700'
                  }`}>
                    Համատեքստ
                  </span>
                )}
              </span>
            </div>
            <span
              onClick={(e) => handleAudio(e, "El contexto", "contexto-btn")}
              className={`p-1 rounded-full hover:bg-black/10 transition ${playingId === 'contexto-btn' ? 'animate-pulse text-yellow-300' : ''}`}
              title="Լսել իսպաներեն"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Central communication flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center relative">
          {/* 1. EMISOR */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveElementId('emisor')}
              className={`w-full p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                activeElementId === 'emisor'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200 scale-105 ring-2 ring-blue-400'
                  : 'bg-white hover:border-blue-300 text-slate-800 border-slate-200 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                {getIcon('Send', 'w-6 h-6')}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-500 mb-0.5">
                1. Emisor
              </div>
              <div className="text-base font-bold">Ուղարկող</div>
              <div className="mt-2 text-xs opacity-90">
                {showArmenianModal ? "Նա, ով ուղարկում է հաղորդագրությունը" : "Es quien envía el mensaje"}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-blue-500/20">
                <Volume2 className="w-3 h-3" /> <span>Լսել արտասանությունը</span>
              </div>
            </button>
          </div>

          {/* 3, 4, 5 in Center: Canal, Mensaje, Código */}
          <div className="space-y-3">
            {/* CÓDIGO */}
            <button
              onClick={() => setActiveElementId('codigo')}
              className={`w-full p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                activeElementId === 'codigo'
                  ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-200 scale-102'
                  : 'bg-white hover:border-purple-300 text-slate-800 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-purple-500 uppercase">4. Código</div>
                  <div className="text-sm font-bold">
                    Կոդ (Նշաններ / Լեզու)
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                Օրինակ՝ Իսպաներեն
              </span>
            </button>

            {/* MENSAJE (Core payload) */}
            <button
              onClick={() => setActiveElementId('mensaje')}
              className={`w-full p-4 rounded-xl border transition-all text-center relative ${
                activeElementId === 'mensaje'
                  ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-200 scale-105 ring-2 ring-amber-300'
                  : 'bg-white hover:border-amber-300 text-slate-800 border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-center gap-2 mb-1">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span className="text-xs uppercase font-bold tracking-wider text-amber-500">
                  3. Mensaje
                </span>
              </div>
              <div className="text-base font-extrabold">Հաղորդագրություն</div>
              <div className="text-xs opacity-90 mt-1">
                {showArmenianModal ? "«Փոխանցվող տեղեկությունը»" : "«La información transmitida»"}
              </div>
              <div className="mt-2 text-[11px] inline-block px-2 py-0.5 rounded bg-amber-400/30 font-medium">
                Կտտացրեք՝ մանրամասները բացելու համար
              </div>
            </button>

            {/* CANAL */}
            <button
              onClick={() => setActiveElementId('canal')}
              className={`w-full p-3 rounded-xl border transition-all text-left flex items-center justify-between ${
                activeElementId === 'canal'
                  ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-200 scale-102'
                  : 'bg-white hover:border-cyan-300 text-slate-800 border-slate-200 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-cyan-100 text-cyan-600">
                  <Radio className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-cyan-500 uppercase">5. Canal</div>
                  <div className="text-sm font-bold">
                    Կապուղի (Միջոցը)
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200">
                Օդ, հեռախոս, ցանց
              </span>
            </button>
          </div>

          {/* 2. RECEPTOR */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setActiveElementId('receptor')}
              className={`w-full p-4 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                activeElementId === 'receptor'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200 scale-105 ring-2 ring-emerald-400'
                  : 'bg-white hover:border-emerald-300 text-slate-800 border-slate-200 shadow-sm'
              }`}
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                {getIcon('UserCheck', 'w-6 h-6')}
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-500 mb-0.5">
                2. Receptor
              </div>
              <div className="text-base font-bold">Ստացող</div>
              <div className="mt-2 text-xs opacity-90">
                {showArmenianModal ? "Նա, ով ստանում է հաղորդագրությունը" : "Es quien recibe el mensaje"}
              </div>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/20">
                <Volume2 className="w-3 h-3" /> <span>Լսել արտասանությունը</span>
              </div>
            </button>
          </div>
        </div>

        {/* Directional arrow description */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-500">
          <span>Ուղարկող (Emisor)</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-700">Կոդ + Կապուղի + Հաղորդագրություն</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          <span>Ստացող (Receptor)</span>
        </div>
      </div>

      {/* Active Element Detail Card (Click-to-reveal) */}
      <div className={`p-5 rounded-xl border transition-all ${activeElement.color.light} ${activeElement.color.border}`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${activeElement.color.bg}`}>
              {getIcon(activeElement.iconName, 'w-5 h-5')}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-slate-900">
                  {activeElement.number}. {activeElement.esName}
                </h4>
                <button
                  onClick={(e) => handleAudio(e, activeElement.esName, `active-${activeElement.id}`)}
                  className="p-1 rounded-full text-slate-500 hover:text-indigo-600 hover:bg-white transition"
                  title="Լսել իսպաներեն"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-white text-slate-600 border border-slate-200">
                  {activeElement.roleBadge}
                </span>
              </div>
              <p className="text-sm font-semibold text-indigo-700">
                Հայերեն թարգմանություն՝ {activeElement.amName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Սեղմեք իսպաներեն նախադասության վրա</span>
          </div>
        </div>

        {/* Definition row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div 
            onClick={() => handleAudio({ stopPropagation: () => {} } as any, activeElement.esDef, `def-${activeElement.id}`)}
            className="bg-white p-3.5 rounded-lg border border-slate-200/80 hover:border-indigo-400 hover:shadow-xs transition cursor-pointer group"
          >
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold text-indigo-700">🇪🇸 Սահմանումը իսպաներեն (սեղմեք լսելու)</span>
              <Volume2 className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:text-indigo-600" />
            </div>
            <p className="text-slate-800 font-medium text-sm">
              {activeElement.esDef}
            </p>
          </div>

          <div className="bg-white p-3.5 rounded-lg border border-indigo-100 shadow-xs">
            <div className="text-xs font-semibold text-emerald-700 mb-1">
              🇦🇲 Թարգմանությունը հայերեն
            </div>
            <p className="text-slate-800 font-medium text-sm">
              {activeElement.amDef}
            </p>
          </div>
        </div>

        {/* Example row */}
        <div className="mt-3 pt-3 border-t border-slate-200/60">
          <div className="text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-indigo-500" /> Գործնական օրինակ (Ejemplo)՝
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div 
              onClick={() => handleAudio({ stopPropagation: () => {} } as any, activeElement.esExample, `ex-${activeElement.id}`)}
              className="bg-white/80 p-2.5 rounded-lg border border-slate-200/70 hover:border-indigo-400 cursor-pointer text-slate-800 font-medium"
            >
              <span className="text-xs text-slate-500 block">🇪🇸 Իսպաներեն՝</span>
              {activeElement.esExample}
            </div>
            <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200/70 text-slate-800 font-medium">
              <span className="text-xs text-emerald-600 block">🇦🇲 Հայերեն՝</span>
              {activeElement.amExample}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
