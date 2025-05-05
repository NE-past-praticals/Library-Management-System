const express = require('express');
const cors = require('cors');
const app = express();

const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/bookRoutes'); 


const authMiddleware = require('./middleware/authMiddleware');

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/books', authMiddleware, bookRoutes);

module.exports = app;
