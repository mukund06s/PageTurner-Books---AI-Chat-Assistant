// ============================================
// PageTurner Books - Chat Window (Enhanced)
// ============================================
// NEW: Floating particles, toast notifications,
// no confirm dialog for clear, persistent chat
// when navigating, scroll-to-bottom button
// ============================================

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import toast from 'react-hot-toast';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import FloatingParticles from './FloatingParticles';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import WelcomeScreen from './WelcomeScreen';
import ErrorMessage from './ErrorMessage';
import useChat from '../../hooks/useChat';
import useSound from '../../hooks/useSound';
import useVoiceInput from '../../hooks/useVoiceInput';
import { exportChatAsText } from '../../utils/exportChat';

function ChatWindow() {
  const {
    messages,
    isTyping,
    error,
    sessionId,
    sessionStartTime,
    conversationContext,
    chatContainerRef,
    sendMessage,
    sendQuickMessage,
    retryLastMessage,
    clearChat,
    setError,
    getConversationDuration
  } = useChat();

  const { soundEnabled, toggleSound, playMessageSent, playMessageReceived } = useSound();
  const { isListening, startListening } = useVoiceInput();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  // Handle send with sound + toast
  const handleSend = async (message) => {
    playMessageSent();
    const result = await sendMessage(message);
    if (result?.success) {
      playMessageReceived();
    }
    setInputMessage('');
  };

  // Voice input
  const handleVoiceInput = () => {
    startListening((transcript) => {
      setInputMessage(transcript);
      toast.success('Voice captured: "' + transcript.substring(0, 40) + '..."');
    });
  };

  // Export with toast
  const handleExport = useCallback(() => {
    if (messages.length === 0) {
      toast.error('No messages to export!');
      return;
    }
    exportChatAsText(messages, sessionId, {
      ...conversationContext,
      conversationDuration: getConversationDuration()
    });
    toast.success('Chat exported successfully! 📥');
  }, [messages, sessionId, conversationContext, getConversationDuration]);

  // Clear chat with toast (no confirm dialog)
  const handleClearChat = useCallback(() => {
    if (messages.length === 0) {
      toast('Chat is already empty', { icon: '💬' });
      return;
    }
    clearChat();
    toast.success('Chat cleared! ✨');
  }, [messages, clearChat]);

  // Sound toggle with toast
  const handleSoundToggle = useCallback(() => {
    toggleSound();
    toast(soundEnabled ? 'Sound muted 🔇' : 'Sound enabled 🔊', {
      icon: soundEnabled ? '🔇' : '🔊',
      duration: 1500,
    });
  }, [toggleSound, soundEnabled]);

  // Scroll detection for scroll-to-bottom button
  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 200);
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatContainerRef]);

  return (
    <div className="min-h-screen flex flex-col bg-animated bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-950 dark:via-purple-950/50 dark:to-gray-950 transition-colors duration-700">
      
      {/* Floating Book Particles */}
      <FloatingParticles />

      {/* Header */}
      <Header
        sessionId={sessionId}
        soundEnabled={soundEnabled}
        toggleSound={handleSoundToggle}
        isListening={isListening}
        onVoiceInput={handleVoiceInput}
        onClearChat={handleClearChat}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onExportChat={handleExport}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col relative z-10">
        
        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 glass-strong rounded-3xl shadow-2xl border border-white/30 dark:border-purple-500/10 flex flex-col overflow-hidden glow-hover"
        >
          {/* Messages Area */}
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 chat-container relative"
          >
            {/* Welcome Screen */}
            <AnimatePresence>
              {messages.length === 0 && !isTyping && (
                <WelcomeScreen
                  onQuickMessage={sendQuickMessage}
                  conversationContext={conversationContext}
                />
              )}
            </AnimatePresence>

            {/* Messages */}
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <ChatMessage
                  key={`${message.fullTimestamp}-${index}`}
                  message={message}
                  index={index}
                />
              ))}
            </AnimatePresence>

            {/* Typing */}
            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <ErrorMessage
                  error={error}
                  onRetry={retryLastMessage}
                  onDismiss={() => setError(null)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Scroll to Bottom Button */}
          <AnimatePresence>
            {showScrollBtn && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToBottom}
                className="absolute bottom-24 right-6 w-10 h-10 bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg flex items-center justify-center scroll-top-btn z-20"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                </svg>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Input Area */}
          <ChatInput
            inputMessage={inputMessage}
            setInputMessage={setInputMessage}
            onSend={handleSend}
            isTyping={isTyping}
            conversationContext={conversationContext}
            messagesExist={messages.length > 0}
            onClearChat={handleClearChat}
          />
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 flex flex-wrap justify-center gap-3 text-xs text-gray-500 dark:text-gray-400"
        >
          <span className="flex items-center glass px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 mr-1.5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            {messages.length} messages
          </span>
          <span className="flex items-center glass px-3 py-1.5 rounded-full">
            <svg className="w-3.5 h-3.5 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Started: {sessionStartTime}
          </span>
          {conversationContext.questionsAsked > 0 && (
            <span className="flex items-center glass px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {conversationContext.questionsAsked} questions
            </span>
          )}
          {conversationContext.topicsDiscussed.length > 0 && (
            <span className="flex items-center glass px-3 py-1.5 rounded-full">
              <svg className="w-3.5 h-3.5 mr-1.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
              </svg>
              {conversationContext.topicsDiscussed.length} topics
            </span>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ChatWindow;