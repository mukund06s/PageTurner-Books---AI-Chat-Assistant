// ============================================
// PageTurner Books - Login Page
// ============================================
// Restores ALL original login.html features:
// - Gradient header with logo
// - Username/password inputs with icons
// - Show/hide password toggle
// - Remember me checkbox
// - Error/success messages with animations
// - Loading spinner on submit
// - Demo credentials display
// - Back to chat link
// - Floating decorations
// - Gradient border animation
// - Shake on error
// ============================================

import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, getRememberedUser } = useAuth();

  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Load remembered user
  useEffect(() => {
    const remembered = getRememberedUser();
    if (remembered) {
      setUsername(remembered);
      setRememberMe(true);
    }
  }, [getRememberedUser]);

  // Handle login submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password, rememberMe);
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 1000);
    } catch (err) {
      setError(err.message);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">

      {/* ==========================================
          BACKGROUND PATTERN
          ========================================== */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(120, 58, 237, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)
          `
        }}
      />

      {/* ==========================================
          FLOATING DECORATIONS
          ========================================== */}
      <motion.div
        animate={{ y: [0, -15, 0], x: [0, 15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] left-[8%] w-16 h-16 rounded-2xl bg-purple-500/10 backdrop-blur-sm border border-purple-500/10 flex items-center justify-center"
      >
        <span className="text-2xl opacity-40">📚</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0], x: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-[15%] right-[12%] w-12 h-12 rounded-xl bg-pink-500/10 backdrop-blur-sm border border-pink-500/10 flex items-center justify-center"
      >
        <span className="text-xl opacity-40">📖</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-[20%] left-[15%] w-14 h-14 rounded-2xl bg-blue-500/10 backdrop-blur-sm border border-blue-500/10 flex items-center justify-center"
      >
        <span className="text-xl opacity-40">✨</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[25%] right-[10%] w-10 h-10 rounded-xl bg-amber-500/10 backdrop-blur-sm border border-amber-500/10 flex items-center justify-center"
      >
        <span className="text-lg opacity-40">🔖</span>
      </motion.div>

      {/* ==========================================
          LOGIN CARD
          ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm relative z-10"
      >
        {/* Card with gradient border */}
        <div className="gradient-border">
          <motion.div
            animate={shake ? { x: [0, -6, 6, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="bg-gray-900/95 backdrop-blur-xl rounded-2xl card-glow overflow-hidden"
          >
            {/* ==========================================
                HEADER
                ========================================== */}
            <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 px-6 py-5 text-center relative overflow-hidden">
              {/* Pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 left-4 text-4xl">📚</div>
                <div className="absolute bottom-1 right-6 text-3xl">📖</div>
              </div>

              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 6, scale: 1.1 }}
                  className="inline-flex items-center justify-center w-14 h-14 bg-white/20 backdrop-blur rounded-xl mb-3 cursor-pointer"
                >
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </motion.div>
                <h1 className="text-xl font-serif font-bold text-white">Admin Portal</h1>
                <p className="text-white/60 text-xs mt-1">PageTurner Books</p>
              </div>
            </div>

            {/* ==========================================
                FORM
                ========================================== */}
            <div className="px-6 py-5">
              <form onSubmit={handleSubmit} className="space-y-4">

                {/* Error Message */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-500/15 border border-red-500/30 text-red-400 px-3 py-2.5 rounded-xl text-xs flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {error}
                  </motion.div>
                )}

                {/* Success Message */}
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-green-500/15 border border-green-500/30 text-green-400 px-3 py-2.5 rounded-xl text-xs flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2 flex-shrink-0 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                    Login successful! Redirecting...
                  </motion.div>
                )}

                {/* Username */}
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">Username</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      required
                      autoComplete="username"
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-gray-400 text-xs font-medium mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      required
                      autoComplete="current-password"
                      className="w-full pl-10 pr-10 py-2.5 bg-gray-800/80 border border-gray-700 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      {!showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 rounded border-gray-600 bg-gray-800 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="ml-2 text-xs text-gray-500 group-hover:text-gray-300 transition-colors">
                      Remember me
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !username || !password}
                  className="w-full py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center"
                >
                  {loading && (
                    <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                    </svg>
                  )}
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-4 px-3 py-2.5 bg-gray-800/50 rounded-xl border border-gray-700/50">
                <p className="text-gray-500 text-[10px] text-center mb-1.5 uppercase tracking-widest font-medium">
                  Demo Credentials
                </p>
                <div className="flex justify-center items-center space-x-3 text-xs">
                  <span className="text-gray-400">
                    <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">admin</code>
                  </span>
                  <span className="text-gray-600">/</span>
                  <span className="text-gray-400">
                    <code className="text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">admin123</code>
                  </span>
                </div>
              </div>

              {/* Back to Chat */}
              <Link
                to="/"
                className="mt-3 flex items-center justify-center text-gray-500 hover:text-gray-300 text-xs transition-colors group"
              >
                <svg className="w-3.5 h-3.5 mr-1 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
                </svg>
                Back to Chat
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-[10px] mt-4">
          © 2025 PageTurner Books • Powered by n8n
        </p>
      </motion.div>
    </div>
  );
}

export default LoginPage;