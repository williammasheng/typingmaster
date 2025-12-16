import React from 'react';
import { motion } from 'framer-motion';

interface VirtualKeyboardProps {
  activeChar: string;
}

const ROWS = [
  [
    { key: '`', width: 'w-10' }, { key: '1', width: 'w-10' }, { key: '2', width: 'w-10' }, { key: '3', width: 'w-10' }, { key: '4', width: 'w-10' }, { key: '5', width: 'w-10' }, { key: '6', width: 'w-10' }, { key: '7', width: 'w-10' }, { key: '8', width: 'w-10' }, { key: '9', width: 'w-10' }, { key: '0', width: 'w-10' }, { key: '-', width: 'w-10' }, { key: '=', width: 'w-10' }, { key: 'Backspace', width: 'w-16 text-xs' }
  ],
  [
    { key: 'Tab', width: 'w-14 text-xs' }, { key: 'Q', width: 'w-10' }, { key: 'W', width: 'w-10' }, { key: 'E', width: 'w-10' }, { key: 'R', width: 'w-10' }, { key: 'T', width: 'w-10' }, { key: 'Y', width: 'w-10' }, { key: 'U', width: 'w-10' }, { key: 'I', width: 'w-10' }, { key: 'O', width: 'w-10' }, { key: 'P', width: 'w-10' }, { key: '[', width: 'w-10' }, { key: ']', width: 'w-10' }, { key: '\\', width: 'w-10' }
  ],
  [
    { key: 'Caps', width: 'w-16 text-xs' }, { key: 'A', width: 'w-10' }, { key: 'S', width: 'w-10' }, { key: 'D', width: 'w-10' }, { key: 'F', width: 'w-10' }, { key: 'G', width: 'w-10' }, { key: 'H', width: 'w-10' }, { key: 'J', width: 'w-10' }, { key: 'K', width: 'w-10' }, { key: 'L', width: 'w-10' }, { key: ';', width: 'w-10' }, { key: "'", width: 'w-10' }, { key: 'Enter', width: 'w-20 text-xs' }
  ],
  [
    { key: 'Shift', width: 'w-20 text-xs' }, { key: 'Z', width: 'w-10' }, { key: 'X', width: 'w-10' }, { key: 'C', width: 'w-10' }, { key: 'V', width: 'w-10' }, { key: 'B', width: 'w-10' }, { key: 'N', width: 'w-10' }, { key: 'M', width: 'w-10' }, { key: ',', width: 'w-10' }, { key: '.', width: 'w-10' }, { key: '/', width: 'w-10' }, { key: 'Shift', width: 'w-24 text-xs' }
  ],
  [
    { key: 'Space', width: 'w-64' } // Space bar
  ]
];

// Helper to determine finger mapping and color
const getFingerInfo = (char: string) => {
  const c = char.toUpperCase();
  
  // Left Pinky (Red/Pink)
  if (['1','Q','A','Z','`','TAB','CAPS','SHIFT'].includes(c)) return { name: '左手小指', color: 'border-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.6)] bg-pink-500/20 text-pink-300' };
  // Left Ring (Orange)
  if (['2','W','S','X'].includes(c)) return { name: '左手无名指', color: 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.6)] bg-orange-500/20 text-orange-300' };
  // Left Middle (Yellow)
  if (['3','E','D','C'].includes(c)) return { name: '左手中指', color: 'border-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.6)] bg-yellow-400/20 text-yellow-200' };
  // Left Index (Green)
  if (['4','5','R','T','F','G','V','B'].includes(c)) return { name: '左手食指', color: 'border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.6)] bg-emerald-400/20 text-emerald-200' };
  
  // Right Index (Cyan)
  if (['6','7','Y','U','H','J','N','M'].includes(c)) return { name: '右手食指', color: 'border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] bg-cyan-400/20 text-cyan-200' };
  // Right Middle (Blue)
  if (['8','I','K',','].includes(c)) return { name: '右手中指', color: 'border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.6)] bg-blue-500/20 text-blue-300' };
  // Right Ring (Indigo)
  if (['9','O','L','.'].includes(c)) return { name: '右手无名指', color: 'border-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)] bg-indigo-500/20 text-indigo-300' };
  // Right Pinky (Purple)
  if (['0','-','=','P','[',']','\\',';','\'','/','ENTER','BACKSPACE'].includes(c)) return { name: '右手小指', color: 'border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] bg-purple-500/20 text-purple-300' };
  
  // Thumb (Gray)
  if (c === ' ' || c === 'SPACE') return { name: '大拇指', color: 'border-slate-400 shadow-[0_0_15px_rgba(148,163,184,0.6)] bg-slate-400/20 text-slate-200' };

  return { name: '', color: '' };
};

const VirtualKeyboard: React.FC<VirtualKeyboardProps> = ({ activeChar }) => {
  // Normalize active char for matching
  const target = activeChar === ' ' ? 'Space' : activeChar.toUpperCase();
  const fingerInfo = getFingerInfo(activeChar);

  return (
    <div className="flex flex-col items-center mt-12 p-6 rounded-2xl bg-slate-200/50 dark:bg-black/40 border border-slate-300 dark:border-white/5 backdrop-blur-sm select-none">
      <div className="flex flex-col gap-2 mb-4">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-2 justify-center">
            {row.map((btn) => {
              // Check if this key is active
              // Handle special mapping logic if needed, simple UpperCase match for now
              let isActive = false;
              
              if (btn.key === 'Space') {
                isActive = activeChar === ' ';
              } else if (btn.key.length === 1) {
                // Character keys
                isActive = btn.key === activeChar.toUpperCase();
                
                // Also highlight shift if needed? (Skipped for simplicity in MVP)
              } 
              
              // Style calculation
              const baseStyle = "h-10 md:h-12 flex items-center justify-center rounded-md text-sm md:text-base font-mono transition-all duration-100 border-b-4";
              const inactiveStyle = "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400";
              const activeStyle = fingerInfo.color || "border-cyber-primary bg-cyber-primary/20 text-cyber-primary shadow-[0_0_10px_rgba(0,240,255,0.5)]";

              return (
                <motion.div
                  key={btn.key}
                  className={`${btn.width} ${baseStyle} ${isActive ? activeStyle : inactiveStyle} ${isActive ? 'translate-y-1 border-b-0' : ''}`}
                  animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                >
                  {btn.key === 'Space' ? ' ' : btn.key}
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="h-8 flex items-center">
        {fingerInfo.name && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                key={activeChar} // Re-animate on char change
                className="flex items-center gap-2 px-4 py-1 rounded-full bg-slate-800 dark:bg-white/10 text-slate-100 dark:text-white text-sm font-mono border border-slate-600 dark:border-white/20"
            >
                <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
                建议指法: {fingerInfo.name}
            </motion.div>
        )}
      </div>
    </div>
  );
};

export default VirtualKeyboard;