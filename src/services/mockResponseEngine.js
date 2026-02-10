// ============================================
// PageTurner Books - Mock Response Engine
// ============================================
// Local fallback when n8n webhook unavailable
// Full intent matching with priority system:
// 1. Order Tracking (O1001 format)
// 2. Direct Book/Author Search
// 3. Follow-up (more/another)
// 4. Recommendations
// 5. Genre/Category List
// 6. Specific Genre Browse
// 7. FAQ Matching
// 8. Browse/Catalog
// 9. Returning User Greeting
// 10. First-time Greeting
// 11. Thank You
// 12. Goodbye
// 13. Price Check
// 14. Stock Check
// 15. Fallback
// Restored from original chat.js
// ============================================

import { booksDatabase, genreEmojis } from '../data/booksData';
import { ordersDatabase } from '../data/ordersData';
import { faqDatabase } from '../data/faqData';

// ==========================================
// SMART BOOK SEARCH (restored from original)
// ==========================================
function searchBooks(msg) {
  const fillerWords = [
    'do', 'you', 'have', 'is', 'are', 'the', 'a', 'an', 'any', 'about',
    'tell', 'me', 'show', 'find', 'get', 'want', 'need', 'looking', 'for',
    'book', 'books', 'called', 'named', 'titled', 'by', 'of', 'and', 'in',
    'can', 'i', 'please', 'give', 'what', 'does', 'it', 'there', 'got',
    'search', 'check', 'know', 'available', 'stock'
  ];

  const searchWords = msg.toLowerCase().split(/\s+/)
    .filter(w => w.length > 2 && !fillerWords.includes(w));

  if (searchWords.length === 0) return [];

  const results = [];

  for (const book of booksDatabase) {
    const titleLower = book.title.toLowerCase();
    const authorLower = book.author.toLowerCase();
    let matchScore = 0;

    for (const word of searchWords) {
      if (titleLower.includes(word)) matchScore += 3;
      if (authorLower.includes(word)) matchScore += 2;
    }

    const searchPhrase = searchWords.join(' ');
    if (titleLower.includes(searchPhrase)) matchScore += 5;

    const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3);
    const titleMatchCount = titleWords.filter(tw => msg.includes(tw)).length;
    if (titleMatchCount >= 2 || (titleWords.length === 1 && titleMatchCount === 1)) {
      matchScore += 4;
    }

    if (matchScore > 0) {
      results.push({ ...book, matchScore });
    }
  }

  results.sort((a, b) => b.matchScore - a.matchScore);
  return results.slice(0, 5);
}

// ==========================================
// GENRE KEYWORDS MAP
// ==========================================
const genreKeywords = {
  'self-help': 'Self-Help', 'self help': 'Self-Help',
  'fiction': 'Fiction', 'fantasy': 'Fantasy', 'finance': 'Finance',
  'productivity': 'Productivity', 'history': 'History',
  'spirituality': 'Spirituality', 'business': 'Business',
  'biography': 'Biography', 'thriller': 'Thriller',
  'sci-fi': 'Sci-Fi', 'science fiction': 'Sci-Fi'
};

// ==========================================
// MAIN MOCK RESPONSE
// ==========================================
export function getMockResponse(message, context = {}) {
  const msg = message.toLowerCase().trim();

  // =============================================
  // PRIORITY 1: ORDER TRACKING
  // =============================================
  if (/o\d{4}/i.test(msg) || msg.includes('track') || msg.includes('order status') || msg.includes('where is my order')) {
    const orderMatch = msg.match(/o\d{4}/i);
    if (orderMatch) {
      const orderId = orderMatch[0].toUpperCase();
      const order = ordersDatabase.find(o => o.id === orderId);

      if (order) {
        const statusEmoji = { 'Delivered': '✅', 'Shipped': '🚚', 'Processing': '📦', 'Cancelled': '❌' };
        let response = `📦 **Order Status: ${order.id}**\n\n`;
        response += `${statusEmoji[order.status] || '📋'} **Status:** ${order.status}\n`;
        response += `• **Customer:** ${order.customer}\n`;
        response += `• **Book:** ${order.bookTitle}\n`;
        response += `• **Quantity:** ${order.quantity}\n`;
        response += `• **Total:** ₹${order.total}\n`;
        response += `• **Order Date:** ${order.orderDate}\n`;
        if (order.deliveryDate) {
          response += `• **Delivery Date:** ${order.deliveryDate}\n`;
        } else if (order.status === 'Processing') {
          response += `• **Delivery:** Estimated 3-5 working days after shipping\n`;
        } else if (order.status === 'Cancelled') {
          response += `• **Note:** This order has been cancelled\n`;
        }
        response += `\nNeed help with anything else?`;
        return { message: response, intent: 'order' };
      } else {
        return {
          message: `❓ I couldn't find order **${orderId}** in our system.\n\nPlease check the order ID and try again.\nValid order IDs: O1001 to O1015\n\n**Example:** "Track order O1001"`,
          intent: 'order'
        };
      }
    }
    return {
      message: `📋 **Order Tracking**\n\nTo track your order, please provide your order ID.\n\n**Example:** "Track order O1001" or "Status of O1005"\n\nAvailable order IDs: O1001 - O1015`,
      intent: 'order'
    };
  }

  // =============================================
  // PRIORITY 2: DIRECT BOOK SEARCH
  // =============================================
  const bookSearchResult = searchBooks(msg);
  if (bookSearchResult && bookSearchResult.length > 0 && bookSearchResult.length <= 8) {
    let response = `🔍 **Search Results** (${bookSearchResult.length} found)\n\n`;
    bookSearchResult.forEach((book, i) => {
      const stockStatus = book.stock > 10 ? '✅ In Stock' :
        book.stock > 0 ? `⚠️ Only ${book.stock} left!` : '❌ Out of Stock';
      const emoji = genreEmojis[book.genre] || '📚';
      response += `**${i + 1}. ${book.title}**\n`;
      response += `   👤 by ${book.author}\n`;
      response += `   ${emoji} ${book.genre} • ₹${book.price} • ${stockStatus}\n`;
      response += `   ⭐ ${book.rating}/5 — ${book.description}\n\n`;
    });
    if (bookSearchResult.length === 1) {
      response += `Would you like to check availability or see similar books?`;
    } else {
      response += `Would you like more details about any of these books?`;
    }
    return { message: response, intent: 'browse' };
  }

  // =============================================
  // PRIORITY 3: FOLLOW-UP
  // =============================================
  if (msg.includes('more') || msg.includes('another') || msg.includes('else') || msg.includes('other')) {
    if (context.lastIntent === 'recommend' || context.lastIntent === 'recommendation') {
      const genre = context.preferences?.favoriteGenre || 'Self-Help';
      const books = booksDatabase.filter(b => b.genre === genre);
      if (books.length > 0) {
        let response = `📚 **More ${genre} Recommendations**\n\n`;
        books.slice(0, 3).forEach((book, i) => {
          response += `${i + 1}. **${book.title}** by ${book.author}\n`;
          response += `   ₹${book.price} • ⭐ ${book.rating}/5\n\n`;
        });
        response += `Would you like to explore another genre?`;
        return { message: response, intent: 'recommend' };
      }
    }
    if (context.lastIntent === 'browse') {
      const remaining = booksDatabase.slice(6, 12);
      let response = `📖 **More Books from Our Catalog**\n\n`;
      remaining.forEach((book, i) => {
        const emoji = genreEmojis[book.genre] || '📚';
        response += `${i + 1}. **${book.title}** by ${book.author}\n`;
        response += `   ${emoji} ${book.genre} • ₹${book.price} • ${book.stock > 0 ? '✅ In Stock' : '❌ Out of Stock'}\n\n`;
      });
      response += `Want to search for a specific book or genre?`;
      return { message: response, intent: 'browse' };
    }
  }

  // =============================================
  // PRIORITY 4: RECOMMENDATIONS
  // =============================================
  if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('should i read') ||
    msg.includes('popular') || msg.includes('best book') || msg.includes('good book') ||
    msg.includes('top book')) {
    let genre = context.preferences?.favoriteGenre || null;
    for (const [keyword, g] of Object.entries(genreKeywords)) {
      if (msg.includes(keyword)) { genre = g; break; }
    }

    let books;
    if (genre) {
      books = booksDatabase.filter(b => b.genre === genre)
        .sort((a, b) => b.rating - a.rating).slice(0, 3);
    } else {
      books = [...booksDatabase].sort((a, b) => b.rating - a.rating).slice(0, 4);
    }

    const emoji = genre ? (genreEmojis[genre] || '📚') : '⭐';
    let response = `${emoji} **${genre ? genre + ' ' : ''}Recommendations**\n\n`;
    if (genre) response += `Top picks in **${genre}**:\n\n`;
    else response += `Here are our highest-rated books:\n\n`;

    books.forEach((book, i) => {
      const stars = '⭐'.repeat(Math.floor(book.rating));
      response += `**${i + 1}. ${book.title}**\n`;
      response += `   👤 by ${book.author}\n`;
      response += `   ${stars} (${book.rating}/5) • ₹${book.price}\n`;
      response += `   📝 ${book.description}\n\n`;
    });
    response += `💡 Want recommendations in a specific genre? Try:\n`;
    response += `"Recommend a thriller" or "Suggest finance books"`;
    return { message: response, intent: 'recommend' };
  }

  // =============================================
  // PRIORITY 5: GENRE LIST
  // =============================================
  if (msg.includes('genre') || msg.includes('categories') || msg.includes('category') ||
    msg.includes('types of books') || msg.includes('what kind')) {
    const genreCounts = {};
    booksDatabase.forEach(book => {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });
    let response = `📚 **Available Genres**\n\n`;
    response += `We have **${booksDatabase.length} books** across **${Object.keys(genreCounts).length} genres**:\n\n`;
    for (const [genre, count] of Object.entries(genreCounts)) {
      const emoji = genreEmojis[genre] || '📚';
      response += `${emoji} **${genre}**: ${count} book${count > 1 ? 's' : ''}\n`;
    }
    response += `\nTell me which genre you'd like to explore!\n`;
    response += `**Example:** "Show me fantasy books" or "Recommend a thriller"`;
    return { message: response, intent: 'category' };
  }

  // =============================================
  // PRIORITY 6: SPECIFIC GENRE BROWSE
  // =============================================
  for (const [keyword, genre] of Object.entries(genreKeywords)) {
    if (msg.includes(keyword) && !msg.includes('recommend') && !msg.includes('suggest')) {
      const books = booksDatabase.filter(b => b.genre === genre);
      const emoji = genreEmojis[genre] || '📚';
      let response = `${emoji} **${genre} Books** (${books.length} titles)\n\n`;
      books.forEach((book, i) => {
        const stockStatus = book.stock > 10 ? '✅ In Stock' :
          book.stock > 0 ? `⚠️ Only ${book.stock} left!` : '❌ Out of Stock';
        response += `${i + 1}. **${book.title}**\n`;
        response += `   👤 ${book.author} • ₹${book.price} • ${stockStatus}\n`;
        response += `   ⭐ ${book.rating}/5 — ${book.description}\n\n`;
      });
      response += `Would you like details about any of these books?`;
      return { message: response, intent: 'category', category: genre };
    }
  }

  // =============================================
  // PRIORITY 7: STORE TIMINGS
  // =============================================
  if (msg.includes('store') || msg.includes('timing') || msg.includes('timings') ||
    msg.includes('hours') || msg.includes('open') || msg.includes('close') ||
    msg.includes('when are you') || msg.includes('working hours') ||
    msg.includes('store time') || msg.includes('shop time') || msg.includes('schedule')) {
    return {
      message: `🕐 **Store Information**\n\nPageTurner Books is an **online bookstore** — we're available **24/7**! 🌐\n\n• **Website:** Always open for browsing and ordering\n• **Chat Support:** Available round the clock\n• **Order Processing:** Monday to Saturday, 9 AM - 7 PM IST\n• **Delivery:** 3-5 working days\n\nYou can place orders anytime! Is there anything else I can help with?`,
      intent: 'faq'
    };
  }

  // =============================================
  // PRIORITY 8: FAQ MATCHING
  // =============================================
  if (msg.includes('delivery') || msg.includes('shipping') || msg.includes('charges') ||
    msg.includes('cancel') || msg.includes('refund') || msg.includes('return') ||
    msg.includes('payment') || msg.includes('pay') || msg.includes('cod') ||
    msg.includes('cash') || msg.includes('how long') || msg.includes('free') ||
    msg.includes('cost') || msg.includes('fee') || msg.includes('upi') ||
    msg.includes('card') || msg.includes('net banking') || msg.includes('wallet')) {

    let bestMatch = null;
    let maxScore = 0;

    for (const faq of faqDatabase) {
      let score = 0;
      for (const keyword of faq.keywords) {
        if (msg.includes(keyword)) score++;
      }
      if (score > maxScore) {
        maxScore = score;
        bestMatch = faq;
      }
    }

    if (bestMatch && maxScore > 0) {
      let response = `❓ **${bestMatch.question}**\n\n`;
      response += `${bestMatch.answer}\n\n`;
      response += `---\nHave another question? Just ask!`;
      return { message: response, intent: 'faq' };
    }
  }

  // =============================================
  // PRIORITY 9: BROWSE CATALOG
  // =============================================
  if (msg.includes('browse') || msg.includes('catalog') || msg.includes('all books') ||
    msg.includes('show me') || msg.includes('list') || msg.includes('available books') ||
    msg.includes('what books') || msg.includes('your books') ||
    msg.includes('what do you have') || msg.includes('show books')) {
    const genreCounts = {};
    booksDatabase.forEach(book => {
      genreCounts[book.genre] = (genreCounts[book.genre] || 0) + 1;
    });
    let response = `📚 **Welcome to Our Book Catalog!**\n\nWe have **${booksDatabase.length} books** across these genres:\n\n`;
    for (const [genre, count] of Object.entries(genreCounts)) {
      const emoji = genreEmojis[genre] || '📚';
      response += `${emoji} **${genre}**: ${count} book${count > 1 ? 's' : ''}\n`;
    }
    response += `\n**Featured Books:**\n\n`;
    const featured = booksDatabase.slice(0, 6);
    featured.forEach((book, i) => {
      const inStock = book.stock > 0 ? '✅ In Stock' : '❌ Out of Stock';
      response += `${i + 1}. **${book.title}** by ${book.author}\n`;
      response += `   ₹${book.price} • ${book.genre} • ${inStock}\n\n`;
    });
    response += `Ask me about a specific genre or book for more details!`;
    return { message: response, intent: 'browse' };
  }

  // =============================================
  // PRIORITY 10: RETURNING GREETING
  // =============================================
  if ((msg.includes('hello') || msg.includes('hi') || msg.includes('hey') ||
    msg.includes('hii') || msg.includes('hiii') || msg.includes('namaste'))
    && context.questionsAsked > 1) {
    let greeting = `👋 **Welcome back!**\n\n`;
    if (context.preferences?.favoriteGenre) {
      greeting += `I remember you're interested in **${context.preferences.favoriteGenre}** books!\n\n`;
    }
    if (context.lastOrderChecked) {
      greeting += `Last time you checked on order **${context.lastOrderChecked}**. Want an update?\n\n`;
    }
    greeting += `How can I help you today?\n\n`;
    greeting += `📚 Browse Books | 📦 Track Order | ⭐ Recommendations | ❓ FAQ`;
    return { message: greeting, intent: 'greeting' };
  }

  // =============================================
  // PRIORITY 11: FIRST-TIME GREETING
  // =============================================
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey') ||
    msg.includes('hii') || msg.includes('hiii') || msg.includes('help') ||
    msg.includes('namaste') || msg.includes('good morning') ||
    msg.includes('good afternoon') || msg.includes('good evening') ||
    msg === 'yo' || msg === 'sup') {
    return {
      message: `👋 **Hello! Welcome to PageTurner Books!**\n\nI'm your AI assistant, here to help you discover your next great read!\n\n**What can I help you with today?**\n\n📚 **Browse Books** — "Show me all available books"\n🔍 **Search** — "Do you have Atomic Habits?"\n📦 **Track Order** — "Track order O1001"\n⭐ **Recommendations** — "Suggest a self-help book"\n🏷️ **Genres** — "What genres are available?"\n❓ **FAQ** — "What are your delivery charges?"\n\nJust type your question!`,
      intent: 'greeting'
    };
  }

  // =============================================
  // PRIORITY 12: THANK YOU
  // =============================================
  if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx') ||
    msg.includes('dhanyavaad') || msg.includes('shukriya')) {
    return {
      message: `😊 **You're welcome!**\n\nI'm happy I could help! Is there anything else you'd like to know?\n\nFeel free to ask about books, orders, or anything else!`,
      intent: 'thanks'
    };
  }

  // =============================================
  // PRIORITY 13: GOODBYE
  // =============================================
  if (msg.includes('bye') || msg.includes('goodbye') || msg.includes('see you') ||
    msg.includes('alvida') || msg.includes('good night')) {
    return {
      message: `👋 **Goodbye!**\n\nThanks for chatting with PageTurner Books!\n\n📚 Happy reading, and come back soon!`,
      intent: 'goodbye'
    };
  }

  // =============================================
  // PRIORITY 14: PRICE CHECK
  // =============================================
  if (msg.includes('price') || msg.includes('cost') || msg.includes('how much') ||
    msg.includes('kitna') || msg.includes('rate')) {
    const bookMatch = booksDatabase.find(book =>
      msg.includes(book.title.toLowerCase()) ||
      book.title.toLowerCase().split(' ').some(w => w.length > 3 && msg.includes(w))
    );
    if (bookMatch) {
      return {
        message: `💰 **Price Check: ${bookMatch.title}**\n\n• **Author:** ${bookMatch.author}\n• **Genre:** ${bookMatch.genre}\n• **Price:** ₹${bookMatch.price}\n• **Stock:** ${bookMatch.stock > 0 ? bookMatch.stock + ' available' : 'Out of stock'}\n• **Rating:** ⭐ ${bookMatch.rating}/5\n\nWould you like to browse more books?`,
        intent: 'browse'
      };
    }
  }

  // =============================================
  // PRIORITY 15: STOCK CHECK
  // =============================================
  if (msg.includes('stock') || msg.includes('in stock') || msg.includes('availability') ||
    msg.includes('available')) {
    const bookMatch = booksDatabase.find(book =>
      msg.includes(book.title.toLowerCase()) ||
      book.title.toLowerCase().split(' ').some(w => w.length > 3 && msg.includes(w))
    );
    if (bookMatch) {
      const status = bookMatch.stock > 10 ? '✅ In Stock' :
        bookMatch.stock > 0 ? `⚠️ Only ${bookMatch.stock} left!` : '❌ Out of Stock';
      return {
        message: `📦 **Stock Check: ${bookMatch.title}**\n\n${status}\n• **Available:** ${bookMatch.stock} units\n• **Price:** ₹${bookMatch.price}\n\nWant to check another book?`,
        intent: 'browse'
      };
    }
  }

  // =============================================
  // PRIORITY 16: FALLBACK
  // =============================================
  return {
    message: `🤔 I'm not quite sure how to help with that.\n\n**Here's what I can assist with:**\n\n📚 **Books** — "Do you have Atomic Habits?"\n📦 **Orders** — "Track order O1001"\n⭐ **Recommendations** — "Recommend a fantasy book"\n🏷️ **Genres** — "Show me self-help books"\n❓ **FAQ** — "What are your delivery charges?"\n🕐 **Store Info** — "What are your store timings?"\n\n**Try asking:**\n• "Do you have Dune?"\n• "Show me thriller books"\n• "Track order O1005"\n• "What payment methods do you accept?"`,
    intent: 'fallback'
  };
}

export default getMockResponse;