# 💰 SpendWise

A full-stack personal finance tracker built using the MERN Stack.

SpendWise helps users manage their income and expenses securely, visualize spending patterns, set monthly budgets, and export financial data.

---

## 🚀 Live Demo

Frontend:
https://spendwise-olive-rho.vercel.app

Backend API:
https://spendwise-pur6.onrender.com

---

## ✨ Features

- 🔐 JWT Authentication
- 🔒 Password Encryption using bcrypt
- 👤 User Registration & Login
- ➕ Add Transactions
- ✏️ Edit Transactions
- ❌ Delete Transactions
- 🔍 Search Transactions
- 📅 Filter by Date
- 💰 Monthly Budget Tracking
- 📊 Expense Distribution Chart
- 📈 Income / Expense Summary
- 📄 Export Transactions to CSV
- 🌙 Modern Dark UI
- ☁️ Fully Deployed

---

## 🛠 Tech Stack

### Frontend

- React
- React Router
- Axios
- CSS
- Chart.js

### Backend

- Node.js
- Express.js
- JWT
- bcrypt

### Database

- MongoDB Atlas
- Mongoose

### Deployment

- Vercel
- Render

---

## 📁 Folder Structure

frontend/
backend/

---

## 🔐 Authentication Flow

User

↓

Register

↓

Password hashed using bcrypt

↓

Stored in MongoDB

↓

Login

↓

JWT Generated

↓

Frontend stores Token

↓

Protected Routes

↓

Authorized API Requests

---

## 📡 API Endpoints

POST /api/auth/register

POST /api/auth/login

GET /api/transactions

POST /api/transactions

PUT /api/transactions/:id

DELETE /api/transactions/:id

---

## ⚙ Installation

```bash
git clone <repo-url>
```

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Backend

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
```

Frontend

```env
VITE_API_URL=
```

---

## Future Improvements

- User Profile
- Recurring Transactions
- Monthly Reports
- PDF Export
- Multiple Wallets
- Dark / Light Theme
- Email Notifications

---

## What I Learned

- MERN Stack Development
- REST APIs
- JWT Authentication
- MongoDB Atlas
- CRUD Operations
- React State Management
- Deployment using Vercel & Render
- Debugging CORS and Routing Issues

---

## Author

**Jayadeep Naidu**

GitHub:
https://github.com/sompallijayadeep8-ui

LinkedIn:
www.linkedin.com/in/jayadeep-sompalli-b127923b2
