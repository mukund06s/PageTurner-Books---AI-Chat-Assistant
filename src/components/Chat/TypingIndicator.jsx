// ============================================
// PageTurner Books - Typing Indicator
// ============================================
// Restores: Animated typing dots with bot avatar
// Enhanced: Framer Motion enter/exit animation
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start"
    >
      <div className="flex items-start space-x-3">
        {/* Bot Avatar */}
        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-amber-400 to-orange-500 dark:from-purple-500 dark:to-pink-500 rounded-xl flex items-center justify-center shadow-md">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
        </div>

        {/* Typing Bubble */}
        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-md px-5 py-4 shadow-md border border-gray-100 dark:border-gray-600">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot" />
            <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot" />
            <div className="w-2.5 h-2.5 bg-gray-400 dark:bg-gray-500 rounded-full typing-dot" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default TypingIndicator;