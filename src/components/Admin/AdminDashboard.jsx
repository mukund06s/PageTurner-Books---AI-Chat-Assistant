// ============================================
// PageTurner Books - Admin Dashboard
// ============================================
// Restores ALL admin.html features:
// - Sidebar navigation
// - Top header with actions
// - Dashboard tab with stats + recent activity
// - Books tab with searchable table
// - Orders tab with filterable table
// - FAQ tab
// - Analytics tab (Part 7)
// - Chat Logs tab (Part 7)
// ============================================

import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import useAdmin from '../../hooks/useAdmin';
import Sidebar from './Sidebar';
import StatsCards from './StatsCards';
import RecentActivity from './RecentActivity';
import BooksTable from './BooksTable';
import OrdersTable from './OrdersTable';
import FaqList from './FaqList';
import Analytics from './Analytics';
import ChatLogs from './ChatLogs';

function AdminDashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const admin = useAdmin();

  // Sidebar badges
  const badges = {
    books: admin.books.length,
    orders: admin.orders.length,
    faq: admin.faqs.length,
    logs: admin.chatLogs.length
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

      {/* Sidebar */}
      <Sidebar
        currentTab={admin.currentTab}
        setCurrentTab={admin.setCurrentTab}
        sidebarOpen={admin.sidebarOpen}
        setSidebarOpen={admin.setSidebarOpen}
        badges={badges}
      />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">

        {/* Top Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 sticky top-0 z-30">
          {/* Mobile menu button */}
          <button
            onClick={() => admin.setSidebarOpen(true)}
            className="lg:hidden text-gray-600 dark:text-gray-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>

          {/* Tab Title */}
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white capitalize">
            {admin.currentTab}
          </h1>

          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            {/* Export */}
            <button
              onClick={admin.exportData}
              className="hidden sm:flex items-center space-x-2 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>Export</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {!darkMode ? (
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              )}
            </button>

            {/* Back to Chat */}
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              <span className="hidden sm:inline">Chat</span>
            </Link>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">

          {/* ==========================================
              DASHBOARD TAB
              ========================================== */}
          {admin.currentTab === 'dashboard' && (
            <>
              <StatsCards
                booksCount={admin.books.length}
                ordersCount={admin.orders.length}
                chatLogsCount={admin.chatLogs.length}
                lowStockCount={admin.lowStockBooks.length}
                totalRevenue={admin.totalRevenue}
                totalStock={admin.totalStock}
                bookGenresCount={admin.bookGenres.length}
                orderStatusSummary={admin.orderStatusSummary}
                todayMessages={admin.todayMessages}
                uniqueSessions={admin.uniqueSessions}
              />
              <RecentActivity
                orders={admin.orders}
                chatLogs={admin.chatLogs}
                onRefreshLogs={admin.refreshLogs}
              />
            </>
          )}

          {/* ==========================================
              BOOKS TAB
              ========================================== */}
          {admin.currentTab === 'books' && (
            <BooksTable
              books={admin.books}
              filteredBooks={admin.filteredBooks}
              bookSearch={admin.bookSearch}
              setBookSearch={admin.setBookSearch}
              bookGenreFilter={admin.bookGenreFilter}
              setBookGenreFilter={admin.setBookGenreFilter}
              bookGenres={admin.bookGenres}
              genreEmojis={admin.genreEmojis}
            />
          )}

          {/* ==========================================
              ORDERS TAB
              ========================================== */}
          {admin.currentTab === 'orders' && (
            <OrdersTable
              orders={admin.orders}
              filteredOrders={admin.filteredOrders}
              orderSearch={admin.orderSearch}
              setOrderSearch={admin.setOrderSearch}
              orderStatusFilter={admin.orderStatusFilter}
              setOrderStatusFilter={admin.setOrderStatusFilter}
            />
          )}

          {/* ==========================================
              FAQ TAB
              ========================================== */}
          {admin.currentTab === 'faq' && (
            <FaqList faqs={admin.faqs} />
          )}

          {/* ==========================================
              ANALYTICS TAB
              ========================================== */}
          {admin.currentTab === 'analytics' && (
            <Analytics
              intentStats={admin.intentStats}
              uniqueSessions={admin.uniqueSessions}
              avgMessagesPerSession={admin.avgMessagesPerSession}
              chatLogsCount={admin.chatLogs.length}
              todayMessages={admin.todayMessages}
              genrePopularity={admin.genrePopularity}
            />
          )}

          {/* ==========================================
              CHAT LOGS TAB
              ========================================== */}
          {admin.currentTab === 'logs' && (
            <ChatLogs
              chatLogs={admin.chatLogs}
              onRefresh={admin.refreshLogs}
              onClear={admin.clearLogs}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;