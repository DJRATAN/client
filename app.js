require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const workoutRoutes = require('./routes/workouts');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// --- 1. Swagger Configuration Component ---
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Workout Tracker API',
      version: '1.0.0',
      description: 'API Documentation for COMP2068 Assignment 2',
    },
    servers: [
      { 
        // This ensures Swagger works both locally and on your Vercel URL
        url: process.env.CLIENT_URL ? `https://${process.env.CLIENT_URL}` : `http://localhost:${PORT}` 
      }
    ],
  },
  apis: ['./routes/*.js'], // Points to your route files for documentation
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// ------------------------------------------

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

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API, DB, Routes, and Swagger are all LIVE',
    timestamp: new Date().toISOString(),
    docs: '/api-docs'
  });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}

module.exports = app;