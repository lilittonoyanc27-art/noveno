/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { APP_METADATA } from './communicationData';
import { ElementsDiagram } from './ElementsDiagram';
import { FullTextView } from './FullTextView';
import { ElementsDetailView } from './ElementsDetailView';
import { QASectionView } from './QASectionView';
import { ShortTextView } from './ShortTextView';
import { FlashcardPractice } from './FlashcardPractice';
import { 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  FileText, 
  GraduationCap, 
  Layers, 
  Volume2, 
  SlidersHorizontal,
  Compass,
  MessageCircle,
  Eye,
  CheckCircle2
} from 'lucide-react';

type TabType = 'full' | 'elements' | 'qa' | 'short' | 'practice';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('full');
  const [speechSpeed, setSpeechSpeed] = useState<number>(0.9);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Notification Bar */}
      <div className="bg-indigo-900 text-indigo-100 text-xs py-2 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 bg-indigo-800 text-indigo-200 px-2.5 py-0.5 rounded-full font-bold">
          <Eye className="w-3.5 h-3.5 text-indigo-300" /> Ինտերակտիվ
        </span>
        <span>
          Կտտացրեք ցանկացած իսպաներեն նախադասության կամ հարցի վրա՝ հայերեն թարգմանությունը բացելու համար (Haz clic en el español para ver el armenio)
        </span>
      </div>

      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-700 to-blue-600 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                  Դաս 3 / Lección 3
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                  🇪🇸 Español ⇄ 🇦🇲 Հայերեն
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {APP_METADATA.titleEs}
              </h1>
              <p className="text-sm font-semibold text-indigo-700">
                {APP_METADATA.titleAm}
              </p>
            </div>
          </div>

          {/* Audio Speed Controls */}
          <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
            <div className="flex items-center gap-1.5 text-xs text-slate-600 font-medium">
              <Volume2 className="w-4 h-4 text-indigo-600" />
              <span className="hidden sm:inline">Արտասանության արագություն՝</span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSpeechSpeed(0.8)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  speechSpeed === 0.8
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
                title="Դանդաղ ընթերցում սովորողների համար"
              >
                0.8x (դանդաղ)
              </button>
              <button
                onClick={() => setSpeechSpeed(1.0)}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition ${
                  speechSpeed === 1.0
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
                title="Սովորական արագություն"
              >
                1.0x (նորմալ)
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <nav className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 pt-1 border-t border-slate-100 text-xs sm:text-sm font-semibold no-scrollbar">
            <button
              onClick={() => setActiveTab('full')}
              className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'full'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>1. Լիարժեք տեքստ (Texto completo)</span>
            </button>

            <button
              onClick={() => setActiveTab('elements')}
              className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'elements'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>2. 6 Տարրերը (Elementos)</span>
            </button>

            <button
              onClick={() => setActiveTab('qa')}
              className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'qa'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>3. 11 Հարց ու Պատասխան (Q&A)</span>
            </button>

            <button
              onClick={() => setActiveTab('short')}
              className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'short'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4 text-cyan-600" />
              <span>4. Կարճ տեքստ (Texto corto)</span>
            </button>

            <button
              onClick={() => setActiveTab('practice')}
              className={`py-2 px-3.5 rounded-xl transition flex items-center gap-2 whitespace-nowrap ${
                activeTab === 'practice'
                  ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-purple-600" />
              <span>5. Պրակտիկա, Թեստ և Բառարան</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Interactive Schematic visual diagram (displayed at top of study flow) */}
        {(activeTab === 'full' || activeTab === 'elements') && (
          <ElementsDiagram speed={speechSpeed} />
        )}

        {/* Tab 1: Full text */}
        {activeTab === 'full' && (
          <FullTextView speed={speechSpeed} />
        )}

        {/* Tab 2: 6 Main Elements */}
        {activeTab === 'elements' && (
          <ElementsDetailView speed={speechSpeed} />
        )}

        {/* Tab 3: Q&A */}
        {activeTab === 'qa' && (
          <QASectionView speed={speechSpeed} />
        )}

        {/* Tab 4: Short text */}
        {activeTab === 'short' && (
          <ShortTextView speed={speechSpeed} />
        )}

        {/* Tab 5: Practice & Flashcards */}
        {activeTab === 'practice' && (
          <FlashcardPractice speed={speechSpeed} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500 mt-12">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-semibold text-slate-700">
            3. ELEMENTOS DE LA COMUNICACIÓN / ՀԱՂՈՐԴԱԿՑՈՒԹՅԱՆ ՏԱՐՐԵՐԸ
          </p>
          <p>
            Emisor (Ուղարկող) • Receptor (Ստացող) • Mensaje (Հաղորդագրություն) • Código (Կոդ) • Canal (Կապուղի) • Contexto (Համատեքստ)
          </p>
          <p className="text-slate-400 text-[11px] pt-1">
            Կտտացրեք ցանկացած իսպաներեն նախադասության վրա՝ հայերեն թարգմանությունը տեսնելու համար։
          </p>
        </div>
      </footer>
    </div>
  );
}
