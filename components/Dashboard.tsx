import React from 'react';
import { motion } from 'framer-motion';
import { ExerciseCategory, User } from '../types';
import { BookOpen, ScrollText, Keyboard, Moon, Sun, Volume2, VolumeX, LogOut } from 'lucide-react';
import { Logo } from './Logo';

interface DashboardProps {
  user: User;
  onSelectCategory: (category: ExerciseCategory) => void;
  onLogout: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  user,
  onSelectCategory, 
  onLogout,
  isDark, 
  toggleTheme, 
  soundEnabled, 
  toggleSound 
}) => {
  const cards = [
    {
      id: 'basic',
      title: '基础指法训练',
      desc: '初始化神经通路。校准手指位置与反应速度，奠定肌肉记忆基础。',
      icon: <Keyboard className="w-12 h-12 text-cyber-primary" />,
      color: 'hover:border-cyber-primary hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]',
      gradient: 'from-cyber-primary/20 to-transparent'
    },
    {
      id: 'english',
      title: '英语四级模拟',
      desc: '处理标准化语言数据块。全真模拟英语四级阅读段落，提升输入流畅度。',
      icon: <BookOpen className="w-12 h-12 text-cyber-secondary" />,
      color: 'hover:border-cyber-secondary hover:shadow-[0_0_30px_rgba(112,0,255,0.2)]',
      gradient: 'from-cyber-secondary/20 to-transparent'
    },
    {
      id: 'poetry',
      title: '中华古诗词库',
      desc: '访问传统文化数据库。练习经典古诗词输入，体验韵律与键击的共鸣。',
      icon: <ScrollText className="w-12 h-12 text-cyber-success" />,
      color: 'hover:border-cyber-success hover:shadow-[0_0_30px_rgba(0,255,159,0.2)]',
      gradient: 'from-cyber-success/20 to-transparent'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-200 via-slate-50 to-white dark:from-slate-900 dark:via-[#020204] dark:to-black -z-10 transition-colors duration-300"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyber-primary to-transparent opacity-50"></div>

      {/* Top Bar (Settings + User) */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
         {/* User Profile */}
         <div className="flex items-center gap-3 bg-white/50 dark:bg-white/5 px-4 py-2 rounded-full border border-black/5 dark:border-white/10 backdrop-blur-md">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 dark:text-white leading-none">
                {user.username}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-gray-400 font-mono uppercase">
                {user.isAnonymous ? 'GUEST_MODE' : 'LEVEL_1'}
              </span>
            </div>
            <button 
              onClick={onLogout}
              className="ml-2 text-slate-400 hover:text-red-500 transition-colors"
              title="退出登录"
            >
              <LogOut size={16} />
            </button>
         </div>

         {/* Settings Controls */}
         <div className="flex gap-4">
            <button 
              onClick={toggleSound}
              className="p-3 rounded-full glass-panel hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-gray-300"
              title={soundEnabled ? "关闭音效" : "开启音效"}
            >
              {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full glass-panel hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-700 dark:text-gray-300"
              title={isDark ? "切换亮色模式" : "切换暗色模式"}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>
      </div>

      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 mt-12 md:mt-0"
      >
        <div className="flex justify-center mb-8">
           <div className="relative">
              <div className="absolute inset-0 bg-cyber-primary/20 blur-xl rounded-full"></div>
              <Logo className="w-24 h-24 md:w-32 md:h-32 drop-shadow-[0_0_10px_rgba(0,240,255,0.3)] relative z-10" />
           </div>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-black font-sans text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600 dark:from-white dark:via-gray-200 dark:to-gray-500 tracking-tight mb-4 drop-shadow-sm dark:drop-shadow-lg">
          键盘大师
        </h1>
        <p className="text-cyber-secondary dark:text-cyber-primary/80 font-mono tracking-[0.3em] text-sm uppercase font-bold">
          神经接口已连接 // 准备输入
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(card.id as ExerciseCategory)}
            className={`group relative glass-panel rounded-2xl p-8 cursor-pointer transition-all duration-300 border border-white/40 dark:border-white/5 ${card.color}`}
          >
            {/* Inner Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-b ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 p-4 bg-white/50 dark:bg-black/40 rounded-xl w-fit backdrop-blur-sm border border-black/5 dark:border-white/5 shadow-inner">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold font-sans text-slate-800 dark:text-white mb-3 group-hover:tracking-wider transition-all">
                {card.title}
              </h3>
              <p className="text-slate-600 dark:text-gray-400 font-sans text-sm leading-relaxed">
                {card.desc}
              </p>
              
              <div className="mt-auto pt-8 flex items-center text-xs font-mono text-slate-500 dark:text-gray-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                <span className="w-2 h-2 bg-current rounded-full mr-2 animate-pulse"></span>
                SYSTEM_ONLINE
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <footer className="absolute bottom-8 text-center text-slate-400 dark:text-gray-600 text-xs font-mono">
        v2.1.0 // 键盘大师 // 安全连接
      </footer>
    </div>
  );
};

export default Dashboard;