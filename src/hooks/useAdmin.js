// ============================================
// PageTurner Books - useAdmin Hook
// ============================================
// Restores ALL admin.js features:
// - Data loading (books, orders, faqs)
// - Chat logs from localStorage
// - Search & filter (books, orders)
// - Computed: stats, revenue, low stock
// - Analytics: intents, sessions, genres
// - Actions: clear logs, refresh, export
// ============================================

import { useState, useCallback, useEffect, useMemo } from 'react';
import { booksDatabase, genreEmojis } from '../data/booksData';
import { ordersDatabase } from '../data/ordersData';
import { faqDatabase } from '../data/faqData';
import { exportAdminData } from '../utils/exportChat';

export function useAdmin() {
  // ==========================================
  // DATA STATE
  // ==========================================
  const [books] = useState(booksDatabase);
  const [orders] = useState(ordersDatabase);
  const [faqs] = useState(faqDatabase);
  const [chatLogs, setChatLogs] = useState([]);

  // ==========================================
  // UI STATE
  // ==========================================
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Search & Filter
  const [bookSearch, setBookSearch] = useState('');
  const [bookGenreFilter, setBookGenreFilter] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState('');

  // ==========================================
  // LOAD CHAT LOGS ON MOUNT
  // ==========================================
  // 👇 PUT loadChatLogs HERE
  const loadChatLogs = useCallback(() => {
    try {
      const logs = JSON.parse(localStorage.getItem("chatLogs") || "[]");
      setChatLogs(logs);
      console.log(`💬 Chat Logs: ${logs.length}`);
    } catch (e) {
      console.error("Failed to load chat logs:", e);
      setChatLogs([]);
    }
  }, []);

  // 👇 THEN useEffect
  useEffect(() => {
    loadChatLogs();
    console.log('✅ Admin dashboard initialized');
    console.log(`📚 Books: ${books.length}`);
    console.log(`📦 Orders: ${orders.length}`);
    console.log(`❓ FAQs: ${faqs.length}`);
  }, [books.length, orders.length, faqs.length, loadChatLogs]);


  // ==========================================
  // COMPUTED: BOOK GENRES LIST
  // ==========================================
  const bookGenres = useMemo(() => {
    return [...new Set(books.map(b => b.genre))].sort();
  }, [books]);

  // ==========================================
  // COMPUTED: FILTERED BOOKS
  // ==========================================
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = !bookSearch ||
        book.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
        book.author.toLowerCase().includes(bookSearch.toLowerCase()) ||
        book.id.toLowerCase().includes(bookSearch.toLowerCase());

      const matchesGenre = !bookGenreFilter || book.genre === bookGenreFilter;

      return matchesSearch && matchesGenre;
    });
  }, [books, bookSearch, bookGenreFilter]);

  // ==========================================
  // COMPUTED: FILTERED ORDERS
  // ==========================================
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = !orderSearch ||
        order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.customer.toLowerCase().includes(orderSearch.toLowerCase()) ||
        order.email.toLowerCase().includes(orderSearch.toLowerCase());

      const matchesStatus = !orderStatusFilter || order.status === orderStatusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearch, orderStatusFilter]);

  // ==========================================
  // COMPUTED: DASHBOARD STATS
  // ==========================================
  const totalRevenue = useMemo(() => {
    return orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);
  }, [orders]);

  const totalStock = useMemo(() => {
    return books.reduce((sum, b) => sum + b.stock, 0);
  }, [books]);

  const lowStockBooks = useMemo(() => {
    return books.filter(b => b.stock < 10);
  }, [books]);

  const orderStatusSummary = useMemo(() => {
    const summary = { Delivered: 0, Shipped: 0, Processing: 0, Cancelled: 0 };
    orders.forEach(o => {
      if (summary[o.status] !== undefined) summary[o.status]++;
    });
    return summary;
  }, [orders]);

  // ==========================================
  // COMPUTED: ANALYTICS
  // ==========================================
  const intentStats = useMemo(() => {
    const intents = {
      'Book Queries': { count: 0, color: 'bg-purple-500' },
      'Order Tracking': { count: 0, color: 'bg-blue-500' },
      'FAQ': { count: 0, color: 'bg-green-500' },
      'Recommendations': { count: 0, color: 'bg-pink-500' },
      'Genre Browse': { count: 0, color: 'bg-amber-500' },
      'Greetings': { count: 0, color: 'bg-teal-500' },
      'Other': { count: 0, color: 'bg-gray-500' }
    };

    chatLogs.forEach(log => {
      const intent = (log.intent || '').toLowerCase();
      const msg = (log.userMessage || '').toLowerCase();

      if (intent === 'order' || msg.includes('order') || msg.includes('track') || /o\d{4}/i.test(msg)) {
        intents['Order Tracking'].count++;
      } else if (intent === 'recommend' || msg.includes('recommend') || msg.includes('suggest')) {
        intents['Recommendations'].count++;
      } else if (intent === 'category' || msg.includes('genre') || msg.includes('fiction') ||
        msg.includes('fantasy') || msg.includes('thriller') || msg.includes('self-help')) {
        intents['Genre Browse'].count++;
      } else if (intent === 'faq' || msg.includes('delivery') || msg.includes('shipping') ||
        msg.includes('refund') || msg.includes('payment') || msg.includes('cancel')) {
        intents['FAQ'].count++;
      } else if (intent === 'browse' || msg.includes('book') || msg.includes('catalog') ||
        msg.includes('browse') || msg.includes('search') || msg.includes('available')) {
        intents['Book Queries'].count++;
      } else if (intent === 'greeting' || msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
        intents['Greetings'].count++;
      } else {
        intents['Other'].count++;
      }
    });

    const total = chatLogs.length || 1;
    return Object.entries(intents)
      .map(([name, data]) => ({
        name,
        count: data.count,
        percentage: Math.round((data.count / total) * 100),
        color: data.color
      }))
      .sort((a, b) => b.count - a.count);
  }, [chatLogs]);

  const uniqueSessions = useMemo(() => {
    const sessions = new Set(chatLogs.map(log => log.sessionId));
    return sessions.size;
  }, [chatLogs]);

  const avgMessagesPerSession = useMemo(() => {
    if (uniqueSessions === 0) return 0;
    return chatLogs.length / uniqueSessions;
  }, [chatLogs, uniqueSessions]);

  const todayMessages = useMemo(() => {
    const today = new Date().toDateString();
    return chatLogs.filter(log =>
      new Date(log.timestamp).toDateString() === today
    ).length;
  }, [chatLogs]);

  const genrePopularity = useMemo(() => {
    const genres = {};
    const allGenresList = [
      'Self-Help', 'Fiction', 'Fantasy', 'Finance', 'Productivity',
      'History', 'Spirituality', 'Business', 'Biography', 'Thriller', 'Sci-Fi'
    ];
    allGenresList.forEach(g => { genres[g] = 0; });

    chatLogs.forEach(log => {
      const msg = (log.userMessage || '').toLowerCase();
      const gkw = {
        'self-help': 'Self-Help', 'self help': 'Self-Help',
        'fiction': 'Fiction', 'fantasy': 'Fantasy', 'finance': 'Finance',
        'productivity': 'Productivity', 'history': 'History',
        'spirituality': 'Spirituality', 'business': 'Business',
        'biography': 'Biography', 'thriller': 'Thriller',
        'sci-fi': 'Sci-Fi', 'science fiction': 'Sci-Fi'
      };
      for (const [keyword, genre] of Object.entries(gkw)) {
        if (msg.includes(keyword)) {
          genres[genre]++;
          break;
        }
      }
    });

    return Object.entries(genres)
      .map(([name, count]) => ({
        name,
        count,
        emoji: genreEmojis[name] || '📚',
        percentage: Math.round(
          (count / (Object.values(genres).reduce((a, b) => a + b, 0) || 1)) * 100
        )
      }))
      .filter(g => g.count > 0)
      .sort((a, b) => b.count - a.count);
  }, [chatLogs]);

  // ==========================================
  // ACTIONS
  // ==========================================
  const clearLogs = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all chat logs? This action cannot be undone.')) {
      localStorage.removeItem('chatLogs');
      setChatLogs([]);
      console.log('🗑️ Chat logs cleared');
    }
  }, []);

  const refreshLogs = useCallback(() => {
    loadChatLogs();
    console.log('🔄 Chat logs refreshed');
  }, [loadChatLogs]);

  const handleExportData = useCallback(() => {
    exportAdminData(books, orders, faqs, chatLogs, {
      totalRevenue,
      totalStock,
      intentStats,
      uniqueSessions,
      avgMessagesPerSession
    });
  }, [books, orders, faqs, chatLogs, totalRevenue, totalStock, intentStats, uniqueSessions, avgMessagesPerSession]);

  // ==========================================
  // RETURN
  // ==========================================
  return {
    // Data
    books,
    orders,
    faqs,
    chatLogs,
    genreEmojis,

    // UI State
    currentTab,
    setCurrentTab,
    sidebarOpen,
    setSidebarOpen,

    // Search & Filter
    bookSearch,
    setBookSearch,
    bookGenreFilter,
    setBookGenreFilter,
    orderSearch,
    setOrderSearch,
    orderStatusFilter,
    setOrderStatusFilter,

    // Computed
    bookGenres,
    filteredBooks,
    filteredOrders,
    totalRevenue,
    totalStock,
    lowStockBooks,
    orderStatusSummary,

    // Analytics
    intentStats,
    uniqueSessions,
    avgMessagesPerSession,
    todayMessages,
    genrePopularity,

    // Actions
    clearLogs,
    refreshLogs,
    exportData: handleExportData
  };
}

export default useAdmin;