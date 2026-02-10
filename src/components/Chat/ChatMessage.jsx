// ============================================
// PageTurner Books - Chat Message (Enhanced)
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { formatMessage } from '../../utils/formatMessage';

const messageVariants = {
  hidden: (isUser) => ({
    opacity: 0,
    x: isUser ? 30 : -30,
    y: 10,
    scale: 0.9
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 25,
      mass: 0.8
    }
  }
};

function ChatMessage({ message, index }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      custom={isUser}
      variants={messageVariants}
      initial="hidden"
      animate="visible"
      layout
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* BOT MESSAGE */}
      {!isUser && (
        <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%]">
          {/* Bot Avatar */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: 5 }}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 dark:from-purple-500 dark:via-pink-500 dark:to-rose-500 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
          </motion.div>

          <div className="msg-bot rounded-2xl rounded-tl-md px-4 py-3 shadow-md transition-all duration-300">
            <div
              className="text-gray-800 dark:text-gray-100 text-sm sm:text-base whitespace-pre-wrap leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
            />
            <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/50 dark:border-gray-600/50">
              <span className="text-[10px] text-gray-400 dark:text-gray-500 font-mono">
                {message.timestamp}
              </span>
              {message.intent && (
                <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400 rounded-full font-medium">
                  {message.intent}
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* USER MESSAGE */}
      {isUser && (
        <div className="flex items-start space-x-3 max-w-[85%] sm:max-w-[75%]">
          <div className="msg-user rounded-2xl rounded-tr-md px-4 py-3 shadow-lg transition-all duration-300">
            <p className="text-white text-sm sm:text-base">
              {message.content}
            </p>
            <span className="text-[10px] text-purple-200/70 mt-1.5 block text-right font-mono">
              {message.timestamp}
            </span>
          </div>

          {/* User Avatar */}
          <motion.div
            whileHover={{ scale: 1.15, rotate: -5 }}
            className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default React.memo(ChatMessage);