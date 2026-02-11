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


🚀 Quick Start
📋 Prerequisites

Node.js 18+ (Recommended: 24.x)

npm (comes with Node)

Git

n8n (Optional – app works with local mock fallback)

You can check your Node version:

node -v

📦 Installation
# Clone the repository
git clone https://github.com/YOUR_USERNAME/bookstore-chat-react.git

# Navigate into project
cd bookstore-chat-react

# Install dependencies
npm install

# Start development server
npm start


App will open at:

http://localhost:3000

🧠 How Backend Works

This project supports two modes:

1️⃣ Without n8n (Default – Mock Mode)

If n8n is not running:

The app automatically uses the local mockResponseEngine.js

All features still work

No configuration required

Perfect for demo and testing.

2️⃣ With n8n (Full Automation Mode – Optional)

Install and run n8n:

npm install -g n8n
n8n start


Open editor:

http://localhost:5678


Then:

Import workflow from:

n8n-workflows/bookstore-main.json


Activate the workflow

Webhook URL will be:

http://localhost:5678/webhook-test/bookstore-chat


Make sure your chatService.js is pointing to this URL.

## 📁 Project Structure

```text
bookstore-chat-react/
├── public/
│   └── index.html

├── src/
│   ├── index.js                    # Entry point
│   ├── index.css                   # Immersive theme + animations + glassmorphism
│   ├── App.js                      # Router + Toast Provider + Auth/Theme Providers
│
│   ├── components/
│   │
│   │   ├── Chat/
│   │   │   ├── ChatWindow.jsx          # Enhanced chat layout (particles + scroll btn)
│   │   │   ├── ChatMessage.jsx         # Animated gradient message bubbles
│   │   │   ├── ChatInput.jsx           # Input form with glow + micro-interactions
│   │   │   ├── TypingIndicator.jsx     # Animated typing dots
│   │   │   ├── WelcomeScreen.jsx       # Animated welcome with glow logo
│   │   │   ├── QuickActions.jsx        # Animated chip-style quick buttons
│   │   │   ├── ErrorMessage.jsx        # Error with retry (toast integrated)
│   │   │   └── FloatingParticles.jsx   # NEW: Floating book particles background
│   │   │
│   │   ├── Admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsCards.jsx
│   │   │   ├── RecentActivity.jsx
│   │   │   ├── BooksTable.jsx
│   │   │   ├── OrdersTable.jsx
│   │   │   ├── FaqList.jsx
│   │   │   ├── Analytics.jsx
│   │   │   └── ChatLogs.jsx
│   │   │
│   │   ├── Auth/
│   │   │   └── LoginPage.jsx
│   │   │
│   │   └── Layout/
│   │       ├── Header.jsx              # Enhanced header (logo nav + toast UX)
│   │       └── Footer.jsx              # Enhanced footer with gradient branding
│
│   ├── hooks/
│   │   ├── useChat.js                  # Chat logic (toast-based clear + persistent chat)
│   │   ├── useAdmin.js
│   │   ├── useSound.js
│   │   ├── useVoiceInput.js
│   │   └── useDarkMode.js
│
│   ├── services/
│   │   ├── chatService.js              # Webhook + analytics tracking
│   │   └── mockResponseEngine.js       # Offline fallback engine
│
│   ├── data/
│   │   ├── booksData.js
│   │   ├── ordersData.js
│   │   └── faqData.js
│
│   ├── context/
│   │   ├── ThemeContext.js
│   │   └── AuthContext.js
│
│   └── utils/
│       ├── formatMessage.js
│       └── exportChat.js
│
├── n8n-workflows/
│   └── bookstore-main.json             # n8n workflow export
│
├── tailwind.config.js
├── package.json                        # Added: react-hot-toast
└── README.md
