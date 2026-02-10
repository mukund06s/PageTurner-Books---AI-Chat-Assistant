// ============================================
// PageTurner Books - Stats Cards
// ============================================
// Restores: Total Books, Total Orders,
// Chat Messages, Low Stock alert cards
// with counts, revenue, sub-stats
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, type: 'spring', stiffness: 300, damping: 25 }
  })
};

function StatsCards({
  booksCount,
  ordersCount,
  chatLogsCount,
  lowStockCount,
  totalRevenue,
  totalStock,
  bookGenresCount,
  orderStatusSummary,
  todayMessages,
  uniqueSessions
}) {
  const stats = [
    {
      title: 'Total Books',
      value: booksCount,
      subtitle: `${totalStock} total units in stock`,
      badge: `${bookGenresCount} genres`,
      badgeColor: 'text-purple-500',
      iconBg: 'bg-purple-100 dark:bg-purple-900/50',
      iconColor: 'text-purple-600 dark:text-purple-400',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
    },
    {
      title: 'Total Orders',
      value: ordersCount,
      subtitle: `${orderStatusSummary.Delivered} delivered • ${orderStatusSummary.Shipped} shipped • ${orderStatusSummary.Processing} processing`,
      badge: `₹${totalRevenue.toLocaleString('en-IN')}`,
      badgeColor: 'text-green-500',
      iconBg: 'bg-green-100 dark:bg-green-900/50',
      iconColor: 'text-green-600 dark:text-green-400',
      icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z'
    },
    {
      title: 'Chat Messages',
      value: chatLogsCount,
      subtitle: `${uniqueSessions} unique sessions`,
      badge: `${todayMessages} today`,
      badgeColor: 'text-blue-500',
      iconBg: 'bg-blue-100 dark:bg-blue-900/50',
      iconColor: 'text-blue-600 dark:text-blue-400',
      icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    },
    {
      title: 'Low Stock Books',
      value: lowStockCount,
      subtitle: 'Books with <10 units',
      subtitleColor: 'text-orange-500',
      iconBg: 'bg-orange-100 dark:bg-orange-900/50',
      iconColor: 'text-orange-600 dark:text-orange-400',
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          custom={index}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
              <svg className={`w-6 h-6 ${stat.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}/>
              </svg>
            </div>
            {stat.badge && (
              <span className={`${stat.badgeColor} text-sm font-medium`}>
                {stat.badge}
              </span>
            )}
          </div>
          <h3 className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">{stat.title}</p>
          <p className={`text-xs mt-1 ${stat.subtitleColor || 'text-gray-400 dark:text-gray-500'}`}>
            {stat.subtitle}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;