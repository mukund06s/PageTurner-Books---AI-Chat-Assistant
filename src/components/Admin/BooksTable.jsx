// ============================================
// PageTurner Books - Books Table
// ============================================
// Restores: Searchable, filterable books table
// with genre emoji icons, stock status colors,
// rating display, responsive design
// ============================================

import React from 'react';
import { motion } from 'framer-motion';

function BooksTable({
  books,
  filteredBooks,
  bookSearch,
  setBookSearch,
  bookGenreFilter,
  setBookGenreFilter,
  bookGenres,
  genreEmojis
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
          Book Catalog
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
            ({filteredBooks.length} of {books.length})
          </span>
        </h2>
        <div className="flex items-center space-x-3">
          {/* Search Input */}
          <div className="relative">
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <input
              type="text"
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              placeholder="Search books..."
              className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
          </div>

          {/* Genre Filter */}
          <select
            value={bookGenreFilter}
            onChange={(e) => setBookGenreFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          >
            <option value="">All Genres</option>
            {bookGenres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr>
              {['ID', 'Title', 'Author', 'Genre', 'Price', 'Stock', 'Rating'].map((header) => (
                <th key={header} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                <td className="px-6 py-4 text-sm font-mono text-gray-500 dark:text-gray-400">
                  {book.id}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="w-10 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center mr-3 text-white text-sm">
                      {genreEmojis[book.genre] || '📚'}
                    </div>
                    <span className="font-medium text-gray-800 dark:text-white text-sm">
                      {book.title}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  {book.author}
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    {book.genre}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-semibold text-green-600 dark:text-green-400">
                  ₹{book.price}
                </td>
                <td className="px-6 py-4">
                  <span className={`text-sm font-medium ${
                    book.stock > 15
                      ? 'text-green-600 dark:text-green-400'
                      : book.stock > 7
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                  }`}>
                    {book.stock} units
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                  ⭐ {book.rating}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="p-12 text-center">
          <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No books found matching your search</p>
        </div>
      )}
    </motion.div>
  );
}

export default BooksTable;