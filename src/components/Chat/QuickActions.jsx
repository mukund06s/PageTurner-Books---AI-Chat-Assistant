// ============================================
// PageTurner Books - Quick Actions (Enhanced)
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

const quickActions = [
  { label: 'Browse Books', message: 'Show me all available books', emoji: '📚',
    gradient: 'from-amber-500/20 to-orange-500/20 dark:from-amber-500/10 dark:to-orange-500/10 hover:from-amber-500/30 hover:to-orange-500/30 border-amber-300/50 dark:border-amber-500/20 text-amber-800 dark:text-amber-300' },
  { label: 'Track Order', message: 'Track my order O1001', emoji: '📦',
    gradient: 'from-blue-500/20 to-cyan-500/20 dark:from-blue-500/10 dark:to-cyan-500/10 hover:from-blue-500/30 hover:to-cyan-500/30 border-blue-300/50 dark:border-blue-500/20 text-blue-800 dark:text-blue-300' },
  { label: 'FAQ', message: 'What are your delivery charges?', emoji: '❓',
    gradient: 'from-green-500/20 to-emerald-500/20 dark:from-green-500/10 dark:to-emerald-500/10 hover:from-green-500/30 hover:to-emerald-500/30 border-green-300/50 dark:border-green-500/20 text-green-800 dark:text-green-300' },
  { label: 'Recommendations', message: 'Recommend me a self-help book', emoji: '⭐',
    gradient: 'from-pink-500/20 to-rose-500/20 dark:from-pink-500/10 dark:to-rose-500/10 hover:from-pink-500/30 hover:to-rose-500/30 border-pink-300/50 dark:border-pink-500/20 text-pink-800 dark:text-pink-300' },
  { label: 'Genres', message: 'What genres are available?', emoji: '🏷️',
    gradient: 'from-purple-500/20 to-violet-500/20 dark:from-purple-500/10 dark:to-violet-500/10 hover:from-purple-500/30 hover:to-violet-500/30 border-purple-300/50 dark:border-purple-500/20 text-purple-800 dark:text-purple-300' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 400, damping: 20 }
  }
};

function QuickActions({ onQuickMessage }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap justify-center gap-2.5 sm:gap-3"
    >
      {quickActions.map((action) => (
        <motion.button
          key={action.label}
          variants={itemVariants}
          whileHover={{ scale: 1.06, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onQuickMessage(action.message)}
          className={`chip px-4 py-2.5 bg-gradient-to-br ${action.gradient} rounded-2xl text-sm flex items-center shadow-sm border backdrop-blur-sm font-medium`}
        >
          <span className="mr-2 text-base">{action.emoji}</span>
          {action.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

export default QuickActions;