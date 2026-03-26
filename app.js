require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// 1. Database Connection Component
const connectDB = async () => {
  try {
    let uri = process.env.MONGODB_URI;
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  } finally {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📚 Swagger docs at http://localhost:${PORT}/api-docs`);
    });
  }
};

connectDB();
app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Fitness Tracker API is running & Database connected',
    timestamp: new Date().toISOString()
  });
});

// For Vercel deployment
if (process.env.CLIENT_URL !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;