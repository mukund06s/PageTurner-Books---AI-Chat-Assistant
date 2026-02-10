// ============================================
// PageTurner Books - Error Message Component
// ============================================
// Restores: Error display with retry button
// and dismiss option, shake animation
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

function ErrorMessage({ error, onRetry, onDismiss }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="flex justify-center"
    >
      <motion.div
        animate={{ x: [0, -5, 5, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
        className="bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl flex items-center space-x-3 shadow-md border border-red-200 dark:border-red-800"
      >
        {/* Warning Icon */}
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>

        {/* Error Text */}
        <span className="text-sm">{error}</span>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="ml-2 px-3 py-1.5 bg-red-200 dark:bg-red-800 rounded-lg hover:bg-red-300 dark:hover:bg-red-700 text-sm font-medium transition-colors duration-200 btn-press"
        >
          Retry
        </button>

        {/* Dismiss Button */}
        <button
          onClick={onDismiss}
          className="p-1 hover:bg-red-200 dark:hover:bg-red-800 rounded-lg transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </motion.div>
    </motion.div>
  );
}

export default ErrorMessage;