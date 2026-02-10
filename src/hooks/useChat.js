// ============================================
// PageTurner Books - useChat Hook
// ============================================
// Restores ALL features from original chat.js:
// - Session ID management
// - Message history (localStorage)
// - Conversation context (sessionStorage)
// - Context tracking (genre, order, author)
// - Send message + receive response
// - Typing simulation
// - Quick actions
// - Retry last message
// - Clear chat
// - New session
// - Chat stats
// - Analytics logging
// ============================================

import { useState, useCallback, useRef, useEffect } from 'react';
import { sendToWebhook, getTypingDelay, logAnalytics } from '../services/chatService';

// ==========================================
// SESSION ID GENERATOR
// ==========================================
function getOrCreateSessionId() {
  let sessionId = sessionStorage.getItem('chatSessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('chatSessionId', sessionId);
  }
  return sessionId;
}

// ==========================================
// DEFAULT CONTEXT
// ==========================================
const DEFAULT_CONTEXT = {
  lastIntent: null,
  lastBookMentioned: null,
  lastGenreViewed: null,
  lastOrderChecked: null,
  questionsAsked: 0,
  topicsDiscussed: [],
  preferences: {
    favoriteGenre: null,
    favoriteAuthor: null,
    priceRange: null
  },
  conversationStarted: null,
  conversationDuration: 0
};

// ==========================================
// GENRE KEYWORDS for context extraction
// ==========================================
const GENRE_KEYWORDS = {
  'self-help': 'Self-Help',
  'self help': 'Self-Help',
  'fiction': 'Fiction',
  'fantasy': 'Fantasy',
  'finance': 'Finance',
  'productivity': 'Productivity',
  'history': 'History',
  'spirituality': 'Spirituality',
  'business': 'Business',
  'biography': 'Biography',
  'thriller': 'Thriller',
  'sci-fi': 'Sci-Fi',
  'science fiction': 'Sci-Fi'
};

// ==========================================
// AUTHOR KEYWORDS for context extraction
// ==========================================
const AUTHOR_KEYWORDS = [
  'james clear', 'paulo coelho', 'rowling', 'kiyosaki', 'cal newport',
  'hector garcia', 'morgan housel', 'harari', 'eckhart tolle', 'napoleon hill',
  'tolkien', 'harper lee', 'george orwell', 'mark manson', 'peter thiel',
  'eric ries', 'david goggins', 'alex michaelides', 'frank herbert',
  'andy weir', 'patrick rothfuss', 'stieg larsson', 'tara westover'
];

// ==========================================
// MAIN HOOK
// ==========================================
export function useChat() {
  // Session ID
  const [sessionId] = useState(() => getOrCreateSessionId());
  const [sessionStartTime] = useState(() => new Date().toLocaleTimeString());

  // Messages state
  const [messages, setMessages] = useState([]);

  // UI state
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);

  // Conversation context
  const [conversationContext, setConversationContext] = useState({ ...DEFAULT_CONTEXT });

  // Ref for chat container scrolling
  const chatContainerRef = useRef(null);

  // ==========================================
  // LOAD FROM STORAGE ON MOUNT
  // ==========================================
  useEffect(() => {
    // Load chat history
    try {
      const savedHistory = localStorage.getItem(`chatHistory_${sessionId}`);
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        setMessages(parsed);
        console.log(`📂 Loaded ${parsed.length} messages from history`);
      }
    } catch (e) {
      console.error('Failed to load chat history:', e);
    }

    // Load conversation context
    try {
      const savedContext = sessionStorage.getItem('chatContext');
      if (savedContext) {
        const parsed = JSON.parse(savedContext);
        setConversationContext(prev => ({ ...prev, ...parsed }));
        console.log('📂 Loaded conversation context');
      }
    } catch (e) {
      console.error('Failed to load context:', e);
    }

    // Set conversation start time if new session
    setConversationContext(prev => {
      if (!prev.conversationStarted) {
        return { ...prev, conversationStarted: new Date().toISOString() };
      }
      return prev;
    });

    console.log('🚀 Chat initialized with session:', sessionId);
  }, [sessionId]);

  // ==========================================
  // SAVE TO STORAGE ON CHANGES
  // ==========================================
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(
          `chatHistory_${sessionId}`,
          JSON.stringify(messages)
        );
      } catch (e) {
        console.error('Failed to save chat history:', e);
      }
    }
  }, [messages, sessionId]);

  useEffect(() => {
    try {
      sessionStorage.setItem('chatContext', JSON.stringify(conversationContext));
    } catch (e) {
      console.error('Failed to save context:', e);
    }
  }, [conversationContext]);

  // ==========================================
  // SCROLL TO BOTTOM
  // ==========================================
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, []);

  // Auto-scroll when messages change or typing
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // ==========================================
  // GET CONVERSATION DURATION
  // ==========================================
  const getConversationDuration = useCallback(() => {
    if (!conversationContext.conversationStarted) return 0;
    const start = new Date(conversationContext.conversationStarted);
    const now = new Date();
    return Math.round((now - start) / 60000);
  }, [conversationContext.conversationStarted]);

  // ==========================================
  // UPDATE CONTEXT based on message + response
  // (Restored from original chat.js updateContext)
  // ==========================================
  const updateContext = useCallback((userMessage, response) => {
    const msg = userMessage.toLowerCase();

    setConversationContext(prev => {
      const updated = { ...prev };

      // Update last intent
      if (response.intent) {
        updated.lastIntent = response.intent;
        if (!updated.topicsDiscussed.includes(response.intent)) {
          updated.topicsDiscussed = [...updated.topicsDiscussed, response.intent];
        }
      }

      // Extract book mentions
      if (response.bookMentioned) {
        updated.lastBookMentioned = response.bookMentioned;
      }

      // Extract genre preferences
      for (const [keyword, genre] of Object.entries(GENRE_KEYWORDS)) {
        if (msg.includes(keyword)) {
          updated.lastGenreViewed = genre;
          updated.preferences = {
            ...updated.preferences,
            favoriteGenre: genre
          };
          break;
        }
      }

      // Extract order ID mentions (O1001 format)
      const orderMatch = msg.match(/o\d{4}/i);
      if (orderMatch) {
        updated.lastOrderChecked = orderMatch[0].toUpperCase();
      }

      // Extract author mentions
      for (const author of AUTHOR_KEYWORDS) {
        if (msg.includes(author)) {
          updated.preferences = {
            ...updated.preferences,
            favoriteAuthor: author
              .split(' ')
              .map(w => w.charAt(0).toUpperCase() + w.slice(1))
              .join(' ')
          };
          break;
        }
      }

      // Update conversation duration
      updated.conversationDuration = getConversationDuration();

      console.log('📝 Updated context:', updated);
      return updated;
    });
  }, [getConversationDuration]);

  // ==========================================
  // SEND MESSAGE (Main function)
  // Restored from original chat.js sendMessage
  // ==========================================
  const sendMessage = useCallback(async (messageText) => {
    const message = messageText.trim();
    if (!message || isTyping) return;

    // Clear error
    setError(null);
    setLastMessage(message);

    // Create user message object
    const userMessage = {
      role: 'user',
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      fullTimestamp: new Date().toISOString()
    };

    // Add user message
    setMessages(prev => [...prev, userMessage]);

    // Update questions count
    setConversationContext(prev => ({
      ...prev,
      questionsAsked: prev.questionsAsked + 1
    }));

    // Show typing
    setIsTyping(true);

    try {
      // Build context for webhook
      const contextForWebhook = {
        ...conversationContext,
        conversationDuration: getConversationDuration()
      };

      // Call webhook (falls back to mock automatically)
      const response = await sendToWebhook(message, sessionId, contextForWebhook);

      // Get response text
      const responseText = response.message || response.reply || response.response || 'I received your message!';

      // Simulate natural typing delay
      const delay = getTypingDelay(responseText.length);
      await new Promise(resolve => setTimeout(resolve, delay));

      // Update conversation context
      updateContext(message, response);

      // Create bot message object
      const botMessage = {
        role: 'bot',
        content: responseText,
        timestamp: new Date().toLocaleTimeString(),
        fullTimestamp: new Date().toISOString(),
        intent: response.intent || 'unknown',
        data: response.data || null
      };

      // Add bot message
      setMessages(prev => [...prev, botMessage]);

      // Log analytics
      logAnalytics(sessionId, message, responseText, response.intent, conversationContext);

      return { success: true, response: botMessage };
    } catch (err) {
      console.error('Chat error:', err);
      setError(err.message || 'Failed to get response. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setIsTyping(false);
    }
  }, [isTyping, sessionId, conversationContext, getConversationDuration, updateContext]);

  // ==========================================
  // QUICK MESSAGE (restored)
  // ==========================================
  const sendQuickMessage = useCallback((message) => {
    sendMessage(message);
  }, [sendMessage]);

  // ==========================================
  // RETRY LAST MESSAGE (restored)
  // ==========================================
  const retryLastMessage = useCallback(() => {
    if (lastMessage) {
      setError(null);
      sendMessage(lastMessage);
    }
  }, [lastMessage, sendMessage]);

  // ==========================================
  // CLEAR CHAT (restored)
  // ==========================================
// ==========================================
// CLEAR CHAT (Enhanced — no confirm dialog)
// ==========================================
  const clearChat = useCallback(() => {
    setMessages([]);
    setConversationContext({
      ...DEFAULT_CONTEXT,
      conversationStarted: new Date().toISOString()
    });
    setError(null);
    setLastMessage(null);

    localStorage.removeItem(`chatHistory_${sessionId}`);
    sessionStorage.removeItem('chatContext');

    console.log('🗑️ Chat cleared');
  }, [sessionId]);

   

  // ==========================================
  // START NEW SESSION (restored)
  // ==========================================
  const startNewSession = useCallback(() => {
    // Save current history
    try {
      localStorage.setItem(
        `chatHistory_${sessionId}`,
        JSON.stringify(messages)
      );
    } catch (e) {
      console.error('Failed to save before new session:', e);
    }

    sessionStorage.removeItem('chatSessionId');
    
    setMessages([]);
    setConversationContext({
      ...DEFAULT_CONTEXT,
      conversationStarted: new Date().toISOString()
    });
    setError(null);
    setLastMessage(null);
    sessionStorage.removeItem('chatContext');

    console.log('🆕 New session started');
    window.location.reload();
  }, [sessionId, messages]);

  // ==========================================
  // GET CHAT STATS (restored)
  // ==========================================
  const getChatStats = useCallback(() => {
    return {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === 'user').length,
      botMessages: messages.filter(m => m.role === 'bot').length,
      sessionDuration: getConversationDuration(),
      topicsDiscussed: conversationContext.topicsDiscussed.length,
      questionsAsked: conversationContext.questionsAsked
    };
  }, [messages, conversationContext, getConversationDuration]);

  // ==========================================
  // RETURN ALL STATE AND ACTIONS
  // ==========================================
  return {
    // State
    messages,
    isTyping,
    error,
    sessionId,
    sessionStartTime,
    lastMessage,
    conversationContext,
    chatContainerRef,

    // Actions
    sendMessage,
    sendQuickMessage,
    retryLastMessage,
    clearChat,
    startNewSession,
    setError,
    getChatStats,
    getConversationDuration,
    scrollToBottom
  };
}

export default useChat;