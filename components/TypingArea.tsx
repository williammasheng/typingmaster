import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Exercise } from '../types';
import { useTypingEngine } from '../hooks/useTypingEngine';
import ResultModal from './ResultModal';
import VirtualKeyboard from './VirtualKeyboard';
import { ArrowLeft, RefreshCw, Cpu, Zap, Target, Volume2, VolumeX, Moon, Sun, User, HelpCircle, Search, AlertCircle, BarChart2 } from 'lucide-react';
import { playSound } from '../utils/sound';

interface TypingAreaProps {
  exercise: Exercise;
  onBack: () => void;
  onRestart: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const TypingArea: React.FC<TypingAreaProps> = ({ 
  exercise, 
  onBack, 
  onRestart,
  isDark,
  toggleTheme,
  soundEnabled,
  toggleSound
}) => {
  const {
    userInput,
    targetText,
    stats,
    status,
    handleInputChange,
    handleCompositionStart,
    handleCompositionEnd,
    reset,
    inputRef
  } = useTypingEngine(exercise.content, {
    onCorrect: () => playSound('correct', soundEnabled),
    onError: () => playSound('error', soundEnabled)
  });

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Play success sound on finish
  useEffect(() => {
    if (status === 'finished') {
      playSound('success', soundEnabled);
    }
  }, [status, soundEnabled]);

  const handleModalRestart = () => {
    reset();
    onRestart();
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  // Check if we are in "Poetry Mode" (Pinyin visualization)
  const isPoetryMode = !!exercise.pinyinData;
  const hasTranslation = !!exercise.translation;
  const isBasicMode = exercise.category === 'basic';

  // Get the next character to type for the Virtual Keyboard
  const nextChar = targetText[userInput.length] || '';

  // Custom renderer for Chinese Poetry with Pinyin
  const renderPoetryContent = () => {
    if (!exercise.pinyinData) return null;

    return (
      <div className="flex flex-wrap justify-center items-start content-start gap-y-16 gap-x-4 px-4 max-w-6xl mx-auto">
        {exercise.pinyinData.map((item, index) => {
          const isTyped = index < userInput.length;
          const isCurrent = index === userInput.length;
          const isError = isTyped && userInput[index] !== item.char;
          
          return (
            <div key={index} className="flex flex-col items-center">
              {/* Pinyin Line - Enlarged ~175% */}
              <div className={`text-3xl md:text-4xl font-mono mb-4 h-12 transition-colors duration-200 ${
                isCurrent 
                  ? 'text-cyber-primary dark:text-cyber-primary font-bold' 
                  : 'text-slate-400 dark:text-gray-500'
              }`}>
                {item.pinyin}
              </div>
              
              {/* Character Box - Enlarged to match Pinyin scale */}
              <div className={`
                relative flex items-center justify-center
                w-24 h-24 md:w-28 md:h-28 rounded-xl text-6xl md:text-7xl font-sans font-medium
                transition-all duration-200
                ${isCurrent 
                  ? 'bg-yellow-500 text-black shadow-[0_0_20px_rgba(234,179,8,0.6)] scale-110 z-10' 
                  : 'text-slate-700 dark:text-gray-500'}
                ${isTyped && !isError ? 'text-slate-400 dark:text-gray-600' : ''}
                ${isError ? 'bg-red-500/20 text-red-500' : ''}
              `}>
                {item.char}
                
                {/* Visual Cursor for current char */}
                {isCurrent && (
                   <motion.div 
                     layoutId="cursor"
                     className="absolute -bottom-3 w-2 h-2 bg-yellow-500 rounded-full"
                   />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Standard renderer for English/Basic
  const renderStandardContent = () => {
    const TypingComponent = (
       <div 
          className={`w-full relative min-h-[300px] font-mono leading-relaxed tracking-wide outline-none cursor-text select-none text-left
          ${hasTranslation ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'}
          `}
          onClick={handleContainerClick}
        >
          {/* Background Text (Target) - Rendered behind */}
          <div className="absolute inset-0 break-words whitespace-pre-wrap text-slate-300 dark:text-gray-700 pointer-events-none">
            {targetText}
          </div>

          {/* Foreground Text (Colored) - Rendered on top */}
          <div className="absolute inset-0 break-words whitespace-pre-wrap pointer-events-none">
            {targetText.split('').map((char, index) => {
              let colorClass = 'opacity-0'; // Default invisible
              let isCursor = index === userInput.length;

              if (index < userInput.length) {
                const userChar = userInput[index];
                if (userChar === char) {
                  colorClass = 'text-cyber-secondary dark:text-cyber-success dark:drop-shadow-[0_0_5px_rgba(0,255,159,0.5)] opacity-100';
                } else {
                  colorClass = 'text-cyber-accent bg-cyber-accent/10 opacity-100';
                }
              }

              return (
                <span key={index} className={`relative ${colorClass}`}>
                  {/* Blinking Cursor */}
                  {isCursor && (
                    <span className="absolute -left-[1px] -top-1 bottom-0 w-[2px] h-[1.2em] bg-cyber-secondary dark:bg-cyber-primary caret-custom shadow-[0_0_8px_#7000ff] dark:shadow-[0_0_8px_#00f0ff]"></span>
                  )}
                  {char}
                </span>
              );
            })}
             {/* Cursor at end */}
             {userInput.length === targetText.length && (
               <span className="inline-block w-[2px] h-[1em] bg-cyber-secondary dark:bg-cyber-primary caret-custom ml-1"></span>
             )}
          </div>
        </div>
    );

    if (hasTranslation) {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-7xl items-start">
          <div className="order-2 lg:order-1">
            {TypingComponent}
          </div>
          <div className="order-1 lg:order-2 glass-panel p-8 rounded-xl border border-slate-200 dark:border-white/10">
            <h3 className="text-sm font-bold text-slate-400 dark:text-gray-500 mb-4 uppercase tracking-widest flex items-center gap-2">
              <BookOpenIcon className="w-4 h-4" /> 译文参考
            </h3>
            <div className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 leading-loose font-sans">
              {exercise.translation}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-4xl flex flex-col items-center">
        {TypingComponent}
        
        {/* Render Virtual Keyboard only for Basic Drills */}
        {isBasicMode && status !== 'finished' && (
           <div className="mt-8 w-full max-w-3xl scale-90 md:scale-100 origin-top">
             <VirtualKeyboard activeChar={nextChar} />
           </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-slate-50 dark:bg-cyber-dark">
      {/* Top Navigation Bar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/20 backdrop-blur-sm z-10"
      >
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> 返回
          </button>
          <button 
             onClick={() => reset()}
            className="flex items-center gap-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            <RefreshCw size={16} /> 重打本节
          </button>
          
          {/* Enhanced Stats Display in Header */}
          <div className="hidden md:flex items-center gap-6 ml-6 pl-6 border-l border-slate-300 dark:border-white/10">
             <div className="flex flex-col items-center">
               <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">速度 (WPM)</span>
               <span className="text-xl font-bold font-mono text-cyber-secondary dark:text-cyber-primary">{stats.wpm}</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">错误数</span>
               <span className={`text-xl font-bold font-mono ${stats.errors > 0 ? 'text-red-500' : 'text-green-500'}`}>{stats.errors}</span>
             </div>
             <div className="flex flex-col items-center">
               <span className="text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-wider">进度 (完成/总计)</span>
               <span className="text-xl font-bold font-mono text-slate-700 dark:text-gray-300">
                 {userInput.length} <span className="text-slate-400 text-sm">/ {targetText.length}</span>
               </span>
             </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-lg md:text-xl font-bold text-slate-700 dark:text-gray-200 font-sans tracking-wide truncate max-w-xs md:max-w-md">
           {exercise.title} {exercise.author ? `· ${exercise.author}` : ''}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6">
           <div className="hidden md:flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm cursor-pointer hover:text-slate-900 dark:hover:text-white">
             <User size={16} /> 我的账号
           </div>
           <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 text-sm cursor-pointer hover:text-slate-900 dark:hover:text-white">
             <HelpCircle size={16} /> 帮助
           </div>
        </div>
      </motion.nav>

      {/* Main Content Area */}
      <motion.main 
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex-1 flex flex-col justify-center items-center relative p-4 md:p-12 overflow-y-auto"
        onClick={handleContainerClick}
      >
        {isPoetryMode ? renderPoetryContent() : renderStandardContent()}
        
        {/* Hidden Input */}
        <input
          ref={inputRef}
          type="text"
          className="opacity-0 absolute top-0 left-0 h-0 w-0"
          value={userInput}
          onChange={handleInputChange}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          autoComplete="off"
          spellCheck="false"
        />
      </motion.main>

      {/* Floating Settings (Theme/Sound) */}
      <div className="fixed bottom-6 right-6 flex gap-2 z-40">
          <button 
            onClick={toggleSound}
            className="p-3 bg-white dark:bg-white/10 text-slate-700 dark:text-gray-300 rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-transparent"
            title={soundEnabled ? "关闭音效" : "开启音效"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          <button 
            onClick={toggleTheme}
            className="p-3 bg-white dark:bg-white/10 text-slate-700 dark:text-gray-300 rounded-full shadow-lg hover:bg-slate-100 dark:hover:bg-white/20 transition-all border border-slate-200 dark:border-transparent"
            title={isDark ? "切换亮色模式" : "切换暗色模式"}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
      </div>

      <ResultModal 
        isOpen={status === 'finished'} 
        stats={stats} 
        onRestart={handleModalRestart}
        onHome={onBack}
      />
    </div>
  );
};

// Simple icon for translation section
const BookOpenIcon = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
  </svg>
);

export default TypingArea;