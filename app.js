const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const cors = require("cors");

const app = express();

// Body Parser Middleware
app.use(express.json());

// MongoDB Connection
const dbURI = 'mongodb+srv://zuhaibahmeds27:1mv16EC!125@zuhaibtest.qnb4qux.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use(cors());
// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Server Setup
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
