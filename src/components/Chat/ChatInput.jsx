// ============================================
// PageTurner Books - Chat Input Component
// ============================================
// Restores: Textarea with auto-resize, send
// button, keyboard shortcuts, char counter,
// context indicator, clear button
// ============================================

import React, { useRef, useCallback } from 'react';

function ChatInput({
  inputMessage,
  setInputMessage,
  onSend,
  isTyping,
  conversationContext,
  messagesExist,
  onClearChat
}) {
  const textareaRef = useRef(null);

  // Auto-resize textarea
  const autoResize = useCallback((element) => {
    element.style.height = 'auto';
    element.style.height = Math.min(element.scrollHeight, 128) + 'px';
  }, []);

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim() && !isTyping) {
      onSend(inputMessage.trim());
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (inputMessage.trim() && !isTyping) {
        onSend(inputMessage.trim());
      }
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
      
      {/* Context Indicator */}
      {conversationContext.lastIntent && messagesExist && (
        <div className="mb-3 flex items-center justify-center">
          <div className="inline-flex items-center px-3 py-1 bg-purple-50 dark:bg-purple-900/20 rounded-full text-xs text-purple-600 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Last topic: </span>
            <span className="font-medium ml-1">{conversationContext.lastIntent}</span>
            {conversationContext.preferences?.favoriteGenre && (
              <span className="ml-2">
                • Genre: <span className="font-medium">{conversationContext.preferences.favoriteGenre}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Textarea */}
        <div className="flex-1 relative">
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              autoResize(e.target);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {}} 
            placeholder="Ask about books, orders, or FAQs..."
            rows="1"
            maxLength="500"
            disabled={isTyping}
            className={`w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-xl resize-none overflow-hidden focus:border-purple-500 dark:focus:border-purple-500 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-200 max-h-32 text-sm sm:text-base focus:outline-none focus:ring-0 ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          />

          {/* Character Count */}
          <span
            className={`absolute bottom-2 right-3 text-xs text-gray-400 transition-opacity duration-200 ${
              inputMessage.length > 50 ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {inputMessage.length}/500
          </span>
        </div>

        {/* Send Button */}
        <button
          type="submit"
          disabled={isTyping || !inputMessage.trim()}
          className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed rounded-xl shadow-lg text-white flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {!isTyping ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
        </button>
      </form>

      {/* Helper Text */}
      <div className="flex items-center justify-between mt-2 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center">
          <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs mr-1">Enter</kbd>
          to send
          <span className="mx-2">•</span>
          <kbd className="px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs mr-1">Shift+Enter</kbd>
          new line
        </span>
        {messagesExist && (
          <button
            onClick={onClearChat}
            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 flex items-center transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default React.memo(ChatInput);