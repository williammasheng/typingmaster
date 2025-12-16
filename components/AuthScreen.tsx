import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from '../types';
import { mockLogin, mockRegister, mockAnonymousLogin } from '../utils/api';
import { Logo } from './Logo';
import { User as UserIcon, Mail, Lock, ArrowRight, Ghost, Loader2 } from 'lucide-react';

interface AuthScreenProps {
  onLoginSuccess: (user: User) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let user;
      if (isLogin) {
        user = await mockLogin(email, password);
      } else {
        user = await mockRegister(username, email, password);
      }
      onLoginSuccess(user);
    } catch (err) {
      setError('认证失败，请检查您的输入或稍后再试。');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      const user = await mockAnonymousLogin();
      onLoginSuccess(user);
    } catch (err) {
      setError('无法进入匿名模式');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black overflow-hidden relative p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-200 via-slate-100 to-slate-300 dark:from-slate-900 dark:via-[#050505] dark:to-black"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
               <Logo className="w-16 h-16 drop-shadow-[0_0_15px_rgba(0,240,255,0.5)]" />
            </div>
            <h1 className="text-3xl font-bold font-cyber text-slate-800 dark:text-white mb-2">
              键盘大师
            </h1>
            <p className="text-slate-500 dark:text-gray-400 text-sm font-mono">
              {isLogin ? '识别身份 // 接入系统' : '注册新用户 // 建立连接'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative group">
                <UserIcon className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-cyber-primary transition-colors" />
                <input
                  type="text"
                  placeholder="用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-slate-800 dark:text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all"
                  required
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-cyber-primary transition-colors" />
              <input
                type="email"
                placeholder="电子邮箱"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-slate-800 dark:text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all"
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-slate-400 group-focus-within:text-cyber-primary transition-colors" />
              <input
                type="password"
                placeholder="密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-100 dark:bg-black/40 border border-slate-300 dark:border-white/10 rounded-lg py-3 pl-10 pr-4 text-slate-800 dark:text-white focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary transition-all"
                required
              />
            </div>
            
            {isLogin && (
               <div className="text-right">
                 <a href="#" className="text-xs text-slate-500 hover:text-cyber-primary transition-colors">忘记密码?</a>
               </div>
            )}

            {error && (
              <div className="text-red-500 text-xs text-center font-mono bg-red-500/10 py-2 rounded">
                ERROR: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyber-secondary to-cyber-primary text-white font-bold py-3 rounded-lg shadow-lg shadow-cyber-primary/20 hover:shadow-cyber-primary/40 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? '登 录' : '注 册'} <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px bg-slate-300 dark:bg-white/10 flex-1"></div>
            <span className="text-slate-400 text-xs">OR</span>
            <div className="h-px bg-slate-300 dark:bg-white/10 flex-1"></div>
          </div>

          {/* Anonymous Login */}
          <button
            onClick={handleGuestLogin}
            className="w-full bg-transparent border border-slate-300 dark:border-white/20 text-slate-600 dark:text-slate-300 font-medium py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-all flex justify-center items-center gap-2"
          >
            <Ghost className="w-5 h-5" /> 游客试玩
          </button>

          {/* Toggle Login/Register */}
          <div className="mt-6 text-center text-sm text-slate-500 dark:text-gray-400">
            {isLogin ? '还没有账号? ' : '已有账号? '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              className="text-cyber-primary hover:underline font-bold ml-1"
            >
              {isLogin ? '立即注册' : '直接登录'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthScreen;