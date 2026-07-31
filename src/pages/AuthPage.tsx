/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, Sparkles, Disc, Key } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC = () => {
  const { login, register, navigate, showToast, skipGuest } = useApp();
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('Email address is required', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        login(email);
      } else if (mode === 'register') {
        if (!username) {
          showToast('Username is required', 'error');
          return;
        }
        register(username, email);
      } else {
        showToast(`Password recovery packet dispatched to ${email}!`, 'success');
        setMode('login');
      }
    }, 1000);
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login('rbh_pioneer@gmail.com');
    }, 1200);
  };

  const handleSkip = () => {
    skipGuest();
  };

  return (
    <div id="auth-page" className="w-full flex items-center justify-center min-h-[85vh] p-6 text-left relative overflow-y-auto">
      {/* Background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] rounded-full bg-[#BC13FE]/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full bg-[#00D2FF]/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-solid border-white/10 p-8 rounded-2xl backdrop-blur-md shadow-2xl z-10"
        id="auth-container-box"
      >
        {/* Branding Title */}
        <div className="flex items-center gap-3 justify-center mb-8">
          <div className="w-9 h-9 bg-gradient-to-tr from-[#BC13FE] to-[#00D2FF] rounded-xl flex items-center justify-center">
            <Disc className="w-5 h-5 text-white animate-spin-slow" />
          </div>
          <h2 className="text-xl font-black tracking-widest text-white">RBH MUSIC</h2>
        </div>

        <AnimatePresence mode="wait">
          {mode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-2xl font-black text-white tracking-tight">Welcome Back</h3>
                <button
                  type="button"
                  onClick={handleSkip}
                  className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs rounded-full border border-solid border-white/15 transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 shadow-sm"
                  id="skip-login-btn"
                >
                  <span>Skip</span>
                  <span className="text-[#00D2FF]">→</span>
                </button>
              </div>
              <p className="text-xs text-white/60 mb-6">Enter your credentials to connect with RBH Music sound system.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider">Password</label>
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[10px] text-[#00D2FF] hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#BC13FE] to-[#00D2FF] hover:brightness-110 active:scale-95 disabled:opacity-50 text-white font-extrabold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(188,19,254,0.35)] cursor-pointer"
                >
                  {loading ? 'Validating credentials...' : 'Login'}
                </button>
              </form>
            </motion.div>
          )}

          {mode === 'register' && (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <h3 className="text-2xl font-black text-white tracking-tight">Create RBH Music Account</h3>
              <p className="text-xs text-white/60 mt-1 mb-6">Initialize your personal acoustic stream portal.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">User Handle</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="text"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="RBHListener"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Secure Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-[#BC13FE] to-[#00D2FF] hover:brightness-110 text-white font-extrabold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(188,19,254,0.35)] cursor-pointer"
                >
                  {loading ? 'Booting account...' : 'Create Account'}
                </button>
              </form>
            </motion.div>
          )}

          {mode === 'forgot' && (
            <motion.div
              key="forgot"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <h3 className="text-2xl font-black text-white tracking-tight">Recover Credentials</h3>
              <p className="text-xs text-white/60 mt-1 mb-6">Reset your connection frequency credentials.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Registered Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="name@gmail.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-black/40 border border-solid border-white/10 rounded-xl text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#00D2FF] focus:shadow-[0_0_12px_rgba(0,210,255,0.2)] transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#BC13FE] hover:bg-[#BC13FE]/80 text-white font-extrabold text-xs rounded-xl transition-all shadow-[0_4px_16px_rgba(188,19,254,0.3)] cursor-pointer"
                >
                  Send Recovery Packet
                </button>
              </form>

              <button
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-white/40 hover:text-white mt-4 cursor-pointer"
              >
                Back to Login
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Third-Party Login Options */}
        {mode !== 'forgot' && (
          <div className="mt-8 pt-6 border-t border-solid border-white/10 space-y-4">
            <div className="relative text-center">
              <span className="bg-[#050505] px-3 text-[10px] text-white/30 font-extrabold uppercase tracking-wider">or connect via</span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 bg-white hover:bg-neutral-100 disabled:opacity-50 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer"
              id="google-signin-btn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Accounts</span>
            </button>

            {/* Toggle login vs register links */}
            {mode === 'register' && (
              <div className="text-center text-xs mt-4">
                <p className="text-white/40">
                  Already have a portal?{' '}
                  <button onClick={() => setMode('login')} className="text-[#00D2FF] hover:underline font-bold cursor-pointer bg-transparent border-none">
                    Login
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};
