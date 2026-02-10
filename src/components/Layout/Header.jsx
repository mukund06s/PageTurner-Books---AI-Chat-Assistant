// ============================================
// PageTurner Books - Header (Enhanced)
// ============================================
// NEW: Logo navigates to home, enhanced styling,
// toast notifications, better animations
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

function Header({
  sessionId,
  soundEnabled,
  toggleSound,
  isListening,
  onVoiceInput,
  onClearChat,
  mobileMenuOpen,
  setMobileMenuOpen,
  onExportChat
}) {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <header className="glass-strong shadow-xl border-b border-white/20 dark:border-purple-500/10 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">

          {/* LOGO — Navigates to Home */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative logo-container">
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 dark:from-purple-500 dark:via-pink-500 dark:to-rose-500 rounded-xl shadow-lg flex items-center justify-center cursor-pointer"
              >
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </motion.div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-serif font-bold text-gray-800 dark:text-white group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                PageTurner Books
              </h1>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 flex items-center tracking-wider uppercase">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse" />
                AI Assistant Online
              </p>
            </div>
          </Link>

          {/* ACTIONS */}
          <div className="flex items-center space-x-2 sm:space-x-3">

            {/* Voice */}
            <button
              onClick={onVoiceInput}
              disabled={isListening}
              className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 hidden sm:block ${
                isListening
                  ? 'bg-red-100 dark:bg-red-900/50 animate-pulse glow-purple'
                  : 'bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm'
              }`}
              title="Voice Input"
            >
              {!isListening ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="6"/>
                </svg>
              )}
            </button>

            {/* Session Badge */}
            <div className="hidden md:flex items-center px-3 py-1.5 glass rounded-full text-xs text-amber-700 dark:text-purple-300 border border-amber-200/50 dark:border-purple-700/30">
              <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              <span className="font-mono">{sessionId.slice(-6)}</span>
            </div>

            {/* Export */}
            <button onClick={onExportChat}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hidden sm:block"
              title="Export Chat">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
            </button>

            {/* Sound */}
            <button onClick={toggleSound}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 hidden sm:block"
              title={soundEnabled ? 'Mute' : 'Unmute'}>
              {soundEnabled ? (
                <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
                </svg>
              )}
            </button>

            {/* Dark Mode */}
            <motion.button
              whileTap={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-white/60 dark:bg-gray-700/60 hover:bg-white dark:hover:bg-gray-600 backdrop-blur-sm transition-all duration-300 transform hover:scale-110"
              title={darkMode ? 'Light Mode' : 'Dark Mode'}>
              {!darkMode ? (
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              )}
            </motion.button>

            {/* Admin Link */}
            <Link to="/admin"
              className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-500 hover:via-pink-500 hover:to-rose-500 text-white text-sm font-medium rounded-xl shadow-lg btn-glow">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Admin
            </Link>

            {/* Mobile Menu */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-2.5 rounded-xl bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm">
              {!mobileMenuOpen ? (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden mt-3 pb-3 border-t border-gray-200/50 dark:border-gray-700/50 pt-3 space-y-2 overflow-hidden"
            >
              <div className="flex items-center justify-center px-3 py-2 glass rounded-xl text-xs text-amber-700 dark:text-purple-300">
                Session: <span className="font-mono ml-1">{sessionId.slice(-6)}</span>
              </div>
              <div className="flex justify-center space-x-2">
                <button onClick={() => { onExportChat(); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center px-4 py-2 glass rounded-xl text-sm text-gray-700 dark:text-gray-300">
                  📥 Export
                </button>
                <button onClick={() => { toggleSound(); setMobileMenuOpen(false); }}
                  className="flex-1 flex items-center justify-center px-4 py-2 glass rounded-xl text-sm text-gray-700 dark:text-gray-300">
                  {soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
                </button>
              </div>
              <button onClick={() => { onVoiceInput(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center px-4 py-2 glass rounded-xl text-sm text-gray-700 dark:text-gray-300">
                🎤 Voice Input
              </button>
              <Link to="/admin" className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium">
                ⚙️ Admin Dashboard
              </Link>
              <button onClick={() => { onClearChat(); setMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm">
                🗑️ Clear Chat
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;