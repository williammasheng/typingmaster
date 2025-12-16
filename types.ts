export type ExerciseCategory = 'basic' | 'english' | 'poetry';

export interface PinyinChar {
  char: string;
  pinyin: string;
}

export interface Exercise {
  id: string;
  category: ExerciseCategory;
  title: string;
  content: string;
  pinyinData?: PinyinChar[]; // Structured data for Pinyin display
  translation?: string; // Chinese translation for English articles
  author?: string;
}

export interface TypingStats {
  wpm: number;
  accuracy: number;
  cpm: number; // Characters per minute
  errors: number;
  totalChars: number;
  timeElapsed: number; // in seconds
}

export type TypingStatus = 'idle' | 'running' | 'finished';

export interface User {
  id: string;
  username: string;
  email?: string;
  isAnonymous: boolean;
  avatar?: string;
}