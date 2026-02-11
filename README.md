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

Setup Guide
Running the Frontend (React Application)
🔹 Option 1 – Use Live Deployment (Recommended)

The application is deployed on Vercel and can be accessed directly:

https://pageturner-books.vercel.app


No local setup required.

🔹 Option 2 – Run Locally
Step 1: Clone Repository
git clone https://github.com/mukund06s/PageTurner-Books---AI-Chat-Assistant.git
cd PageTurner-Books---AI-Chat-Assistant

Step 2: Install Dependencies
npm install

Step 3: Start Development Server
npm start


Application runs at:

http://localhost:3000

Importing Workflow into n8n

The backend automation is built using n8n workflow.

Step 1: Install n8n (If not installed)
npm install -g n8n

Step 2: Start n8n
n8n start


Open n8n editor:

http://localhost:5678

Step 3: Import Workflow

Open n8n Editor

Click Import

Select file:

n8n-workflows/bookstore-main.json


Activate the workflow

Step 4: Webhook URL

After activation, webhook endpoint will be:

http://localhost:5678/webhook-test/bookstore-chat


Make sure chatService.js points to this webhook URL.

4.3 Environment Variables

Currently, the project does not require complex environment variables.

However, for production configuration, the following can be used:

Frontend (.env file)
REACT_APP_WEBHOOK_URL=http://localhost:5678/webhook-test/bookstore-chat


In production, this can point to deployed n8n cloud URL.

Example:

REACT_APP_WEBHOOK_URL=https://your-n8n-instance/webhook/bookstore-chat

5. n8n Workflow Export

The n8n workflow file is included inside the project:

n8n-workflows/bookstore-main.json

Workflow Includes:

Webhook Trigger (POST)

Intent Detection (Code Node – Regex based)

Switch Node (7 Intent Routes)

Order Tracking Handler

Book Search Handler

Recommendation Handler

Genre Handler

FAQ Handler

Greeting Handler

Fallback Handler

Standardized JSON Response

How to Export Workflow (If Required Again)

Inside n8n:

Open Workflow

Click Export

Save as JSON file

This generates:

bookstore-main.json


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


Screenshots:
<img width="1915" height="1079" alt="image" src="https://github.com/user-attachments/assets/b280db8d-b1b2-41c2-a0d0-952c62f6ebdf" />
