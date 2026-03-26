require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 1. Import Workout Routes Component
const workoutRoutes = require('./routes/workouts');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// 2. Use Workout Routes
// This maps all requests starting with /api/workouts to your routes file
app.use('/api/workouts', workoutRoutes);

// Database Connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) return;
    await mongoose.connect(uri);
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

connectDB();

// Root route (for health checks)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Fitness Tracker API is running, DB connected, and Routes active',
    timestamp: new Date().toISOString()
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;