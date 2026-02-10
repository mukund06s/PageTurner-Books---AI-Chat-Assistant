// ============================================
// PageTurner Books - Recent Activity
// ============================================
// Restores: Recent Orders and Recent Chats
// side-by-side panels on dashboard
// ============================================

import React from 'react';
import { statusColors } from '../../data/ordersData';

function RecentActivity({ orders, chatLogs, onRefreshLogs }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* Recent Orders */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Orders</h2>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {orders.slice(0, 5).map((order) => (
            <div key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">
                    <span className="font-mono text-purple-600 dark:text-purple-400">{order.id}</span>
                    {' — '}{order.customer}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {order.bookTitle || order.books} • ₹{order.total}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || ''}`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Chats */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Chats</h2>
          <button
            onClick={onRefreshLogs}
            className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
          >
            Refresh
          </button>
        </div>
        <div className="divide-y divide-gray-100 dark:divide-gray-700">
          {chatLogs.slice(-5).reverse().map((log, index) => (
            <div key={index} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              <p className="text-sm text-gray-800 dark:text-white font-medium truncate">
                {log.userMessage}
              </p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
                {log.intent && (
                  <span className="text-xs px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full">
                    {log.intent}
                  </span>
                )}
              </div>
            </div>
          ))}
          {chatLogs.length === 0 && (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No chat messages yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentActivity;