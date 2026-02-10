// ============================================
// PageTurner Books - Analytics Component
// ============================================
// Restores ALL original analytics features:
// - Intent distribution with progress bars
// - Session statistics grid (4 cards)
// - Genre popularity from chat queries
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 }
  }
};

function Analytics({
  intentStats,
  uniqueSessions,
  avgMessagesPerSession,
  chatLogsCount,
  todayMessages,
  genrePopularity
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 lg:grid-cols-2 gap-6"
    >
      {/* ==========================================
          INTENT DISTRIBUTION
          ========================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Query Intent Distribution
        </h2>
        <div className="space-y-4">
          {intentStats.length > 0 ? (
            intentStats.map((intent, index) => (
              <div key={intent.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-300">{intent.name}</span>
                  <span className="font-medium text-gray-800 dark:text-white">
                    {intent.count} ({intent.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${intent.percentage}%` }}
                    transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                    className={`h-3 rounded-full ${intent.color}`}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
              No chat data yet. Start chatting to see analytics!
            </div>
          )}
        </div>
      </motion.div>

      {/* ==========================================
          SESSION STATISTICS
          ========================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Session Statistics
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {/* Unique Sessions */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-purple-50 dark:bg-purple-900/30 rounded-xl p-4 text-center"
          >
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              {uniqueSessions}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Unique Sessions</p>
          </motion.div>

          {/* Avg Messages per Session */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4 text-center"
          >
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {avgMessagesPerSession.toFixed(1)}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Msgs/Session</p>
          </motion.div>

          {/* Total Messages */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-green-50 dark:bg-green-900/30 rounded-xl p-4 text-center"
          >
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {chatLogsCount}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Messages</p>
          </motion.div>

          {/* Today's Messages */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="bg-orange-50 dark:bg-orange-900/30 rounded-xl p-4 text-center"
          >
            <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
              {todayMessages}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Today's Messages</p>
          </motion.div>
        </div>
      </motion.div>

      {/* ==========================================
          GENRE POPULARITY
          ========================================== */}
      <motion.div
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 lg:col-span-2"
      >
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-6">
          Genre Popularity (from Chat Queries)
        </h2>
        {genrePopularity.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {genrePopularity.map((genre, index) => (
              <motion.div
                key={genre.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.08, y: -3 }}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-center min-w-[100px] cursor-default"
              >
                <p className="text-2xl">{genre.emoji}</p>
                <p className="text-sm font-medium text-gray-800 dark:text-white mt-1">
                  {genre.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {genre.count} queries
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            No genre data yet. Chat about specific genres to see popularity stats!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Analytics;