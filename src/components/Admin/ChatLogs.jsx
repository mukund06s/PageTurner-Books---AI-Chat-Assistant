// ============================================
// PageTurner Books - Chat Logs Component
// ============================================
// Restores ALL original chat logs features:
// - Scrollable log viewer with max height
// - Session ID display per log
// - User message + bot response panels
// - Intent badges per log entry
// - Timestamps
// - Refresh and Clear All actions
// - Empty state
// ============================================

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function ChatLogs({ chatLogs, onRefresh, onClear }) {
  // Reverse to show newest first
  const reversedLogs = [...chatLogs].reverse();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Chat Conversation Logs
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            ({chatLogs.length} entries)
          </span>
        </h2>
        <div className="flex items-center space-x-3">
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-200 dark:hover:bg-blue-900/50 text-sm font-medium transition-colors"
          >
            Refresh
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-200 dark:hover:bg-red-900/50 text-sm font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Logs List */}
      <div className="max-h-[600px] overflow-y-auto">
        <AnimatePresence>
          {reversedLogs.length > 0 ? (
            reversedLogs.map((log, index) => (
              <motion.div
                key={`${log.timestamp}-${index}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.03, 0.5) }}
                className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                      <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Meta Row */}
                    <div className="flex items-center justify-between mb-1 flex-wrap gap-1">
                      <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
                        {log.sessionId?.slice(-8) || 'unknown'}
                      </span>
                      <div className="flex items-center space-x-2">
                        {log.intent && (
                          <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                            {log.intent}
                          </span>
                        )}
                        <span className="text-xs text-gray-400 dark:text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* User Message */}
                    <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 mb-2">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        <strong>User:</strong>{' '}
                        <span>{log.userMessage}</span>
                      </p>
                    </div>

                    {/* Bot Response */}
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        <strong>Bot:</strong>{' '}
                        <span>
                          {log.botResponse
                            ? log.botResponse.substring(0, 200) +
                              (log.botResponse.length > 200 ? '...' : '')
                            : 'No response recorded'}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <p className="text-gray-500 dark:text-gray-400 text-lg font-medium mb-1">
                No chat logs yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Start a conversation on the chat page to see logs here.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default ChatLogs;