# ProjectHub

> Final Year Engineering Project Development & AI/ML Mentorship Platform

Full-stack web application built with React, Node.js, Express, MongoDB, Tailwind CSS, and Razorpay.

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS v4
- **Backend**: Node.js + Express
- **Database**: MongoDB + Mongoose
- **Auth**: JWT + bcrypt
- **Payments**: Razorpay (test mode)
- **Email**: Nodemailer

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Git

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd ProjectHub

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Setup

**Server** — Copy `server/.env.example` to `server/.env` and fill in:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/projecthub
JWT_SECRET=your_secret_here
RAZORPAY_KEY_ID=rzp_test_xxx
RAZORPAY_KEY_SECRET=your_razorpay_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
CLIENT_URL=http://localhost:5173
```

**Client** — Create `client/.env`:
```
VITE_API_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=rzp_test_xxx
```

### 3. Seed Sample Data

```bash
cd server
node seed.js
```
This creates:
- **Admin**: projecthub4you@gmail.com / admin123
- **Student**: rahul@example.com / student123
- 6 sample projects + 2 payments

### 4. Run Development Servers

```bash
# Terminal 1 — Backend
cd server
npm start

# Terminal 2 — Frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Deployment

### Frontend — Vercel
```bash
cd client
npm run build
# Deploy dist/ to Vercel
```

### Backend — Render
1. Create a new Web Service on Render
2. Set root directory to `server`
3. Build command: `npm install`
4. Start command: `node server.js`
5. Set environment variables from `.env`

### MongoDB — Atlas
Use MongoDB Atlas free tier. Replace `MONGO_URI` with your Atlas connection string.

## Project Structure
```
ProjectHub/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Theme & Auth contexts
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Route pages
│   │   ├── services/        # API helpers
│   │   └── index.css        # Tailwind + custom styles
│   ├── vite.config.js
│   └── package.json
│
├── server/                  # Express backend
│   ├── config/              # DB connection
│   ├── controllers/         # Route handlers
│   ├── middleware/           # Auth, admin, errors
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── utils/               # Email helper
│   ├── seed.js              # Data seeder
│   └── server.js            # Entry point
│
└── README.md
```

## License
MIT
