import React, { useState, useEffect, useCallback, useRef } from 'react';
import { TypingStats, TypingStatus } from '../types';

interface UseTypingEngineOptions {
  onCorrect?: () => void;
  onError?: () => void;
}

interface UseTypingEngineReturn {
  userInput: string;
  targetText: string;
  status: TypingStatus;
  stats: TypingStats;
  cursorIndex: number;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleCompositionStart: () => void;
  handleCompositionEnd: (e: React.CompositionEvent<HTMLInputElement>) => void;
  reset: (newText?: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const useTypingEngine = (initialText: string, options?: UseTypingEngineOptions): UseTypingEngineReturn => {
  const [targetText, setTargetText] = useState(initialText);
  const [userInput, setUserInput] = useState('');
  const [status, setStatus] = useState<TypingStatus>('idle');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [stats, setStats] = useState<TypingStats>({
    wpm: 0,
    accuracy: 100,
    cpm: 0,
    errors: 0,
    totalChars: 0,
    timeElapsed: 0,
  });
  
  // Ref to track if user is currently using IME (Input Method Editor for Chinese/Japanese)
  const isComposing = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  const calculateStats = useCallback(() => {
    if (!startTime) return;
    
    const now = Date.now();
    const durationMinutes = (now - startTime) / 60000;
    const durationSeconds = (now - startTime) / 1000;
    
    if (durationMinutes <= 0) return;

    // Count errors
    let errorCount = 0;
    for (let i = 0; i < userInput.length; i++) {
      if (userInput[i] !== targetText[i]) {
        errorCount++;
      }
    }

    // Standard WPM formula: (All characters / 5) / minutes
    const grossWPM = (userInput.length / 5) / durationMinutes;
    const netWPM = Math.max(0, grossWPM - (errorCount / durationMinutes));
    
    // Accuracy
    const accuracy = userInput.length > 0 
      ? Math.max(0, ((userInput.length - errorCount) / userInput.length) * 100)
      : 100;

    setStats({
      wpm: Math.round(netWPM),
      cpm: Math.round(userInput.length / durationMinutes),
      accuracy: Math.round(accuracy),
      errors: errorCount,
      totalChars: userInput.length,
      timeElapsed: Math.round(durationSeconds),
    });
  }, [userInput, targetText, startTime]);

  // Timer effect
  useEffect(() => {
    if (status === 'running') {
      timerRef.current = window.setInterval(calculateStats, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [status, calculateStats]);

  // Finish check
  useEffect(() => {
    if (userInput.length === targetText.length && targetText.length > 0) {
      setStatus('finished');
      calculateStats(); // Final calc
    }
  }, [userInput, targetText, calculateStats]);

  const startIfNeeded = () => {
    if (status === 'idle') {
      setStatus('running');
      setStartTime(Date.now());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // If composing (IME open), do not update main input state yet
    if (isComposing.current) return;

    startIfNeeded();
    
    const value = e.target.value;
    const lastCharIndex = value.length - 1;
    
    // Prevent typing more than target length
    if (value.length <= targetText.length && status !== 'finished') {
      // Check last character if it's an addition
      if (value.length > userInput.length) {
        if (value[lastCharIndex] === targetText[lastCharIndex]) {
          options?.onCorrect?.();
        } else {
          options?.onError?.();
        }
      }
      
      setUserInput(value);
    }
  };

  const handleCompositionStart = () => {
    isComposing.current = true;
    startIfNeeded();
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    isComposing.current = false;
    // On composition end, the input value is finalized (e.g., Chinese character selected)
    const value = e.currentTarget.value;
    if (value.length <= targetText.length && status !== 'finished') {
      // Simplified sound logic for IME block input (play correct if length increased)
      if (value.length > userInput.length) {
         options?.onCorrect?.();
      }
      setUserInput(value);
    }
  };

  const reset = (newText?: string) => {
    setStatus('idle');
    setUserInput('');
    setStartTime(null);
    setStats({ wpm: 0, accuracy: 100, cpm: 0, errors: 0, totalChars: 0, timeElapsed: 0 });
    if (newText) setTargetText(newText);
    
    // Focus back on input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  return {
    userInput,
    targetText,
    status,
    stats,
    cursorIndex: userInput.length,
    handleInputChange,
    handleCompositionStart,
    handleCompositionEnd,
    reset,
    inputRef
  };
};