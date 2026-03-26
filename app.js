require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Root route to test deployment
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Fitness Tracker API is running on Vercel',
    timestamp: new Date().toISOString()
  });
});

// Simple dummy route for workouts to prevent "module not found" if you delete files
app.get('/api/workouts', (req, res) => {
  res.json([{ id: 1, message: "Workout route is working" }]);
});

// For Vercel, we export the app. 
// The "app.listen" is kept for local testing.
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;