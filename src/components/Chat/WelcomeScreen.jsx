// ============================================
// PageTurner Books - Welcome Screen (Enhanced)
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import QuickActions from './QuickActions';

function WelcomeScreen({ onQuickMessage, conversationContext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="text-center py-8 sm:py-12"
    >
      {/* Animated Logo with Glow */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [0, 2, -2, 0],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative inline-block mb-8"
      >
        {/* Glow ring */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-purple-600 rounded-3xl blur-xl opacity-30 animate-pulse" />
        
        <div className="relative w-24 h-24 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-pink-500 dark:to-rose-500 rounded-3xl shadow-2xl flex items-center justify-center">
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>
      </motion.div>

      {/* Title with gradient text */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl sm:text-4xl font-serif font-bold mb-3"
      >
        <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 dark:from-purple-400 dark:via-pink-400 dark:to-rose-400 bg-clip-text text-transparent">
          Welcome to PageTurner Books!
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 dark:text-gray-300 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed"
      >
        I'm your AI-powered book assistant. Discover your next great read, 
        track orders, get personalized recommendations, or explore our collection!
      </motion.p>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="w-24 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-pink-500 rounded-full mx-auto mb-8"
      />

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <QuickActions onQuickMessage={onQuickMessage} />
      </motion.div>

      {/* Memory Indicator */}
      {conversationContext.questionsAsked > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 inline-flex items-center px-4 py-2 glass rounded-full text-xs text-purple-700 dark:text-purple-300 border border-purple-200/50 dark:border-purple-700/50"
        >
          <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse" />
          I remember our previous conversations!
        </motion.div>
      )}
    </motion.div>
  );
}

export default WelcomeScreen;