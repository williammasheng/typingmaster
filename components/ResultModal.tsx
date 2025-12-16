import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypingStats } from '../types';
import { RotateCcw, Home, Trophy, Activity, Target } from 'lucide-react';

interface ResultModalProps {
  stats: TypingStats;
  isOpen: boolean;
  onRestart: () => void;
  onHome: () => void;
}

const ResultModal: React.FC<ResultModalProps> = ({ stats, isOpen, onRestart, onHome }) => {
  if (!isOpen) return null;

  const getRank = (wpm: number) => {
    if (wpm < 30) return { title: "键盘萌新", color: "text-gray-400" };
    if (wpm < 60) return { title: "打字员", color: "text-blue-400" };
    if (wpm < 90) return { title: "网络潜行者", color: "text-purple-400" };
    return { title: "黑客大神", color: "text-cyber-primary" };
  };

  const rank = getRank(stats.wpm);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="relative max-w-lg w-full glass-panel rounded-2xl p-8 border border-white/10 dark:border-cyber-primary/30 overflow-hidden bg-white/10 dark:bg-black/40"
        >
          {/* Decorative Glitch Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyber-secondary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          <div className="text-center relative z-10">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`text-2xl font-cyber tracking-widest font-bold mb-2 ${rank.color}`}
            >
              任务完成
            </motion.div>
            
            <motion.h2 
              className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary mb-1"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              {stats.wpm}
            </motion.h2>
            <p className="text-sm text-slate-300 dark:text-gray-400 font-mono tracking-widest mb-6">速度 (WPM)</p>

            <motion.div 
              className={`text-xl font-bold font-cyber mb-8 ${rank.color} border py-1 px-4 inline-block rounded border-current shadow-[0_0_10px_currentColor]`}
              animate={{ textShadow: ["0 0 5px currentColor", "0 0 20px currentColor", "0 0 5px currentColor"] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              等级: {rank.title}
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-white/20 dark:border-white/10 flex flex-col items-center">
                <Target className="w-6 h-6 text-cyber-success mb-2" />
                <span className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{stats.accuracy}%</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">准确率</span>
              </div>
              <div className="bg-white/50 dark:bg-white/5 p-4 rounded-xl border border-white/20 dark:border-white/10 flex flex-col items-center">
                <Activity className="w-6 h-6 text-cyber-accent mb-2" />
                <span className="text-2xl font-bold font-mono text-slate-800 dark:text-white">{stats.timeElapsed}s</span>
                <span className="text-xs text-slate-500 dark:text-gray-400">用时</span>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={onHome}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-slate-900 dark:text-white font-medium transition-all hover:scale-105"
              >
                <Home size={18} />
                <span className="font-mono">返回主页</span>
              </button>
              <button
                onClick={onRestart}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyber-secondary to-cyber-primary text-white dark:text-black font-bold shadow-lg shadow-cyber-primary/25 hover:shadow-cyber-primary/50 transition-all hover:scale-105"
              >
                <RotateCcw size={18} />
                <span className="font-mono">再来一局</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ResultModal;