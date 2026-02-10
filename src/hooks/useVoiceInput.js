// ============================================
// PageTurner Books - useVoiceInput Hook
// ============================================
// Restores: Web Speech API voice input
// Features: Start/stop listening, transcript
// capture, error handling, browser support
// Restored from original chat.js startVoiceInput
// ============================================

import { useState, useCallback, useRef } from 'react';

export function useVoiceInput() {
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);

  // Check browser support
  const isSupported =
    typeof window !== 'undefined' &&
    ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);

  // Start voice input
  const startListening = useCallback((onResult) => {
    if (!isSupported) {
      setVoiceError(
        'Voice input is not supported in your browser. Please use Chrome or Edge.'
      );
      return;
    }

    // Create recognition instance
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognitionRef.current = recognition;
    setIsListening(true);
    setVoiceError(null);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      console.log('🎤 Voice input:', transcript);

      if (onResult && typeof onResult === 'function') {
        onResult(transcript);
      }
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      setIsListening(false);

      if (event.error === 'no-speech') {
        setVoiceError('No speech detected. Please try again.');
      } else if (event.error === 'not-allowed') {
        setVoiceError(
          'Microphone access denied. Please allow microphone permissions.'
        );
      } else if (event.error === 'network') {
        setVoiceError('Network error. Please check your internet connection.');
      } else {
        setVoiceError('Voice input failed: ' + event.error);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    try {
      recognition.start();
      console.log('🎤 Listening for voice input...');
    } catch (e) {
      setIsListening(false);
      console.error('Failed to start voice recognition:', e);
      setVoiceError('Failed to start voice input. Please try again.');
    }
  }, [isSupported]);

  // Stop voice input
  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  // Clear voice error
  const clearVoiceError = useCallback(() => {
    setVoiceError(null);
  }, []);

  return {
    isListening,
    voiceError,
    isSupported,
    startListening,
    stopListening,
    clearVoiceError
  };
}

export default useVoiceInput;