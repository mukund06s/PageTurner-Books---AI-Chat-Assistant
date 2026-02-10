// ============================================
// PageTurner Books - useSound Hook
// ============================================
// Restores: Sound toggle, message sent/received
// sounds using Web Audio API oscillator
// Restored from original chat.js sound logic
// and sound.js SoundManager class
// ============================================

import { useState, useRef, useCallback, useEffect } from 'react';

export function useSound() {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    return localStorage.getItem('soundEnabled') !== 'false';
  });

  const audioContextRef = useRef(null);

  // Initialize audio context
  useEffect(() => {
    try {
      audioContextRef.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    } catch (e) {
      console.warn('Audio context not supported');
    }
  }, []);

  // Play a tone helper
  const playTone = useCallback((frequency, duration, volume) => {
    if (!soundEnabled || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;

      // Resume context if suspended (browser autoplay policy)
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + duration
      );

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn('Could not play sound:', e);
    }
  }, [soundEnabled]);

  // Message sent sound (lower pitch, shorter)
  const playMessageSent = useCallback(() => {
    playTone(600, 0.1, 0.1);
  }, [playTone]);

  // Message received sound (higher pitch, longer)
  const playMessageReceived = useCallback(() => {
    playTone(800, 0.2, 0.15);
  }, [playTone]);

  // Toggle sound on/off
  const toggleSound = useCallback(() => {
    setSoundEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('soundEnabled', newValue);

      // Play a confirmation beep when enabling
      if (newValue && audioContextRef.current) {
        // Need to play after state updates
        setTimeout(() => {
          try {
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') ctx.resume();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.value = 800;
            osc.type = 'sine';
            gain.gain.setValueAtTime(0.15, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.2);
          } catch (e) {
            // Ignore
          }
        }, 50);
      }

      return newValue;
    });
  }, []);

  return {
    soundEnabled,
    toggleSound,
    playMessageSent,
    playMessageReceived
  };
}

export default useSound;