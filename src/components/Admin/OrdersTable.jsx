// ============================================
// PageTurner Books - Orders Table
// ============================================
// Restores: Searchable orders table with
// status badges, customer info, filtering
// by status, responsive layout
// ============================================

import React from 'react';
import { motion } from 'framer-motion';
import { statusColors } from '../../data/ordersData';

function OrdersTable({
  orders,
  filteredOrders,
  orderSearch,
  setOrderSearch,
  orderStatusFilter,
  setOrderStatusFilter
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden"
    >
      {/* Header with Search & Filter */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
          Orders
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            ({filteredOrders.length} of {orders.length})
          </span>
        </h2>
        <div className="flex items-center space-x-3">
          {/* Search */}
          <input
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            placeholder="Search by ID, Customer, or Email..."
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white w-64 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          />

          {/* Status Filter */}
          <select
            value={orderStatusFilter}
            onChange={(e) => setOrderStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {['Order ID', 'Customer', 'Book', 'Qty', 'Total', 'Status', 'Date'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono font-medium text-purple-600 dark:text-purple-400">
                  {order.id}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm text-gray-800 dark:text-white">{order.customer}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{order.email}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300 max-w-xs truncate">
                  {order.bookTitle || order.books}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {order.quantity}
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-gray-800 dark:text-white">
                  ₹{order.total.toLocaleString('en-IN')}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {order.orderDate || order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No orders found matching your search</p>
        </div>
      )}
    </motion.div>
  );
}

export default OrdersTable;