// Web Speech API utility for Spanish pronunciation with Armenian phonetic aid
export const speakSpanish = (text: string, rate: number = 0.9): Promise<void> => {
  return new Promise((resolve) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported in this browser.');
      resolve();
      return;
    }

    window.speechSynthesis.cancel(); // cancel any active speech

    // Clean text for cleaner TTS (remove emojis or parenthesis symbols if needed)
    const cleanedText = text
      .replace(/[🇪🇸🇦🇲“”«»]/g, '')
      .replace(/¿/g, '')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'es-ES';
    utterance.rate = rate; // 0.8 to 1.0 is ideal for language learners
    utterance.pitch = 1.0;

    // Pick a natural Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(
      (v) => v.lang.startsWith('es') || v.lang.includes('Spanish')
    );
    if (esVoice) {
      utterance.voice = esVoice;
    }

    utterance.onend = () => resolve();
    utterance.onerror = () => resolve();

    window.speechSynthesis.speak(utterance);
  });
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};
