# Library Management System

A modern, full-stack Library Management System built with Node.js, Express, Sequelize, and React (Ant Design, Framer Motion, Chart.js). This project allows users to register, log in, manage their books, and view analytics with a beautiful, animated UI.

---

## 📁 Project Structure

```
Library Management System/
├── backend/      # Express.js REST API server
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── server.js
│   └── ...
├── frontend/     # React.js client app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── ...
│   └── ...
└── README.md
```

---

## 🚀 Features

- User authentication (JWT-based)
- Add, edit, delete, and view books
- Dashboard with sidebar navigation
- Animated UI using Framer Motion
- Analytics charts (books per year)
- Customizable pagination
- Responsive and modern Ant Design interface

---

## 🛠️ Backend Tech Stack & Dependencies

- **Node.js**
- **Express.js**
- **Sequelize** (ORM)
- **SQLite** (or your preferred DB)
- **bcrypt** (password hashing)
- **jsonwebtoken** (JWT auth)
- **cors**
- **dotenv**
- **nodemon** (dev only)

Install backend dependencies:
```sh
cd backend
npm install
```

---

## 🖥️ Frontend Tech Stack & Dependencies

- **React** (CRA)
- **Ant Design** (UI components)
- **Framer Motion** (animations)
- **axios** (API calls)
- **react-chartjs-2** & **chart.js** (charts)
- **react-router-dom** (routing)
- **react-toastify** (notifications)

Install frontend dependencies:
```sh
cd frontend
npm install
```

---

## ⚙️ Running Locally

1. **Start the backend:**
   ```sh
   cd backend
   npm run dev
   ```
   Backend runs at `http://localhost:5000`

2. **Start the frontend:**
   ```sh
   cd frontend
   npm start
   ```
   Frontend runs at `http://localhost:3000`

- The frontend uses a proxy (`setupProxy.js`) to forward `/api` requests to the backend.
- Environment variables (backend): set up a `.env` file as needed (see `.env.example` if provided).

---

## 🗝️ Example .env for Backend

Create a `.env` file in the `backend/` directory with the following contents:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
DB_DIALECT=sqlite
DB_STORAGE=./database.sqlite
# Or for other DBs:
# DB_HOST=localhost
# DB_USER=your_db_user
# DB_PASS=your_db_password
# DB_NAME=library_db
```

---

## 📦 Deployment

- Push the entire project (both `backend/` and `frontend/` folders) to your GitHub repository.
- For production, you may want to:
  - Serve the frontend build from the backend (see Create React App docs)
  - Use environment variables for secrets/URLs
  - Set up a production database

---

## 📝 Author & License

- Built by ISHEMAH
- MIT License

---


## 💡 Tips
- For any issues, check the browser console and backend logs.
- Customize styles and analytics as you wish!
