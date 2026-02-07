# 📚 PageTurner Books - AI Chat Assistant

An intelligent chatbot system for a bookstore, built with modern web technologies and n8n workflow automation.

![PageTurner Books Demo](assets/demo-screenshot.png)

## 🌟 Features

### Customer Chat Interface
- 💬 Real-time AI-powered chat assistant
- 📚 Browse and search book catalog
- 📦 Track orders by Order ID
- ⭐ Personalized book recommendations
- ❓ FAQ answers (hours, shipping, returns, etc.)
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive design
- 💾 Chat history persistence

### Admin Dashboard
- 🔐 Secure login authentication
- 📊 Analytics dashboard with intent statistics
- 📖 Book catalog management view
- 📦 Order management view
- 💬 Chat logs viewer
- 📈 Session statistics

### n8n Backend
- 🔀 Intelligent intent detection
- 🎯 Rule-based routing
- 📝 Context-aware responses
- ⚡ Real-time webhook processing

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | HTML5, Tailwind CSS, Alpine.js, Vanilla JS |
| Backend Logic | n8n Workflow Automation |
| Data Storage | JSON files / Google Sheets |
| Authentication | localStorage + sessionStorage |
| Deployment | Vercel/Netlify (Frontend), n8n Cloud/Local (Backend) |

## 📁 Project Structure
bookstore-chat-assignment/
├── index.html # Main chat interface
├── admin.html # Admin dashboard
├── login.html # Admin login page
├── css/
│ └── custom.css # Custom styles
├── js/
│ ├── chat.js # Chat logic
│ ├── admin.js # Admin dashboard logic
│ └── auth.js # Authentication logic
├── data/
│ ├── books.json # Book catalog data
│ ├── orders.json # Orders data
│ └── faq.json # FAQ data
├── n8n-workflows/
│ └── bookstore-main.json # n8n workflow export
├── assets/
│ └── demo-screenshot.png
└── README.md

text
