import { useCallback, useRef, useState } from 'react';

export const useVoiceGuidance = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string, options?: { rate?: number; pitch?: number }) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options?.rate || 0.9;
    utterance.pitch = options?.pitch || 1;
    utterance.volume = 1;

    // Try to find a calm, pleasant voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      voice => voice.name.includes('Samantha') || 
               voice.name.includes('Karen') ||
               voice.name.includes('Female') ||
               voice.lang.startsWith('en')
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [voiceEnabled]);

  const speakInstruction = useCallback((instruction: string) => {
    speak(instruction, { rate: 0.85, pitch: 1 });
  }, [speak]);

  const speakFeedback = useCallback((feedback: string) => {
    speak(feedback, { rate: 0.95, pitch: 1.05 });
  }, [speak]);

  const speakPoseIntro = useCallback((poseName: string, description: string) => {
    speak(`Now, let's practice ${poseName}. ${description}`, { rate: 0.85 });
  }, [speak]);

  const speakCountdown = useCallback((seconds: number) => {
    if (seconds <= 5 && seconds > 0) {
      speak(seconds.toString(), { rate: 1.2, pitch: 1.1 });
    }
  }, [speak]);

  const speakEncouragement = useCallback(() => {
    const encouragements = [
      "Wonderful! You're doing great.",
      "Excellent form! Keep breathing.",
      "Beautiful! Stay present.",
      "Great job! Feel the stretch.",
      "Perfect! Maintain your balance.",
    ];
    const random = encouragements[Math.floor(Math.random() * encouragements.length)];
    speak(random, { rate: 0.9 });
  }, [speak]);

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const toggleVoice = useCallback(() => {
    if (voiceEnabled) {
      stopSpeaking();
    }
    setVoiceEnabled(!voiceEnabled);
  }, [voiceEnabled, stopSpeaking]);

  return {
    isSpeaking,
    voiceEnabled,
    speak,
    speakInstruction,
    speakFeedback,
    speakPoseIntro,
    speakCountdown,
    speakEncouragement,
    stopSpeaking,
    toggleVoice,
  };
};
