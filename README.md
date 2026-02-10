# 📚 PageTurner Books - Chat Automation System

> AI-powered bookstore chat assistant built with React, Tailwind CSS, and n8n workflow automation.

![React](https://img.shields.io/badge/React-18-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.x-06B6D4)
![n8n](https://img.shields.io/badge/n8n-Workflow-FF6D5A)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### Chat Interface
- 💬 Real-time AI chat with typing simulation
- 🎤 Voice input (Web Speech API)
- 🔊 Sound notifications (Web Audio API)
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 💾 Session memory (localStorage)
- 📤 Chat export (TXT/JSON)
- 🔄 Retry on error with fallback
- 🧠 Context memory (remembers genres, orders, preferences)

### Admin Dashboard
- 📊 Dashboard with stat cards (books, orders, revenue, low stock)
- 📚 Books table with search and genre filter
- 📦 Orders table with search and status filter
- ❓ FAQ management view
- 📈 Analytics (intent distribution, session stats, genre popularity)
- 💬 Chat logs viewer with refresh/clear
- 🔐 Admin authentication (login/logout, remember me)
- 📥 Data export (JSON)

### n8n Workflow
- 🔗 Webhook-based architecture
- 🎯 Rule-based intent detection (7 intents)
- 📦 Order tracking handler (O1001-O1015)
- 📚 Book browse/search handler (25 books)
- ⭐ Recommendation handler (genre-aware)
- 🏷️ Category handler (11 genres)
- ❓ FAQ handler (8 FAQs with keyword matching)
- 👋 Greeting handler (context-aware)
- ❓ Fallback handler
- 🔄 Local mock engine fallback when n8n unavailable

### Dataset
- 📚 25 Books (B001-B025) across 11 genres
- 📦 15 Orders (O1001-O1015) with 4 statuses
- ❓ 8 FAQs with keyword-based matching
- 💰 INR (₹) currency

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Tailwind CSS, Framer Motion |
| State | React Hooks, Context API |
| Routing | React Router v6 |
| Backend Logic | n8n (webhook workflows) |
| Data | Local JSON (books, orders, FAQs) |
| Storage | localStorage, sessionStorage |
| Voice | Web Speech API |
| Sound | Web Audio API |

## 📁 Project Structure

```text
bookstore-chat-react/
├── public/
│   └── index.html
│
├── src/
│   ├── index.js                 # Entry point
│   ├── index.css               # Global styles + Tailwind
│   ├── App.js                  # Routing + providers
│   │
│   ├── components/
│   │   ├── Chat/
│   │   │   ├── ChatWindow.jsx       # Main chat page
│   │   │   ├── ChatMessage.jsx      # Message bubbles
│   │   │   ├── ChatInput.jsx        # Input form
│   │   │   ├── TypingIndicator.jsx  # Typing dots
│   │   │   ├── WelcomeScreen.jsx    # Welcome view
│   │   │   ├── QuickActions.jsx     # Quick action buttons
│   │   │   └── ErrorMessage.jsx     # Error with retry
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx   # Admin layout
│   │   │   ├── Sidebar.jsx          # Navigation sidebar
│   │   │   ├── StatsCards.jsx       # Dashboard stats
│   │   │   ├── RecentActivity.jsx   # Recent orders/chats
│   │   │   ├── BooksTable.jsx       # Books catalog
│   │   │   ├── OrdersTable.jsx      # Orders table
│   │   │   ├── FaqList.jsx          # FAQ display
│   │   │   ├── Analytics.jsx        # Analytics dashboard
│   │   │   └── ChatLogs.jsx         # Chat log viewer
│   │   │
│   │   ├── Auth/
│   │   │   └── LoginPage.jsx        # Admin login
│   │   │
│   │   └── Layout/
│   │       ├── Header.jsx           # Chat header
│   │       └── Footer.jsx           # Chat footer
│   │
│   ├── hooks/
│   │   ├── useChat.js               # Chat logic
│   │   ├── useAdmin.js              # Admin logic
│   │   ├── useSound.js              # Sound system
│   │   ├── useVoiceInput.js         # Voice input
│   │   └── useDarkMode.js           # Dark mode
│   │
│   ├── services/
│   │   ├── chatService.js           # Webhook + analytics
│   │   └── mockResponseEngine.js    # Local fallback
│   │
│   ├── data/
│   │   ├── booksData.js             # 25 books
│   │   ├── ordersData.js            # 15 orders
│   │   └── faqData.js               # 8 FAQs
│   │
│   ├── context/
│   │   ├── ThemeContext.js          # Dark mode
│   │   └── AuthContext.js           # Authentication
│   │
│   └── utils/
│       ├── formatMessage.js         # Markdown formatter
│       └── exportChat.js            # Chat export
│
├── n8n-workflows/
│   └── bookstore-main.json          # n8n workflow export
│
├── tailwind.config.js
├── package.json
└── README.md


