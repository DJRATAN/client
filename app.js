

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const workoutRoutes = require('./routes/workouts');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fitness Workout Tracker API',
      version: '1.0.0',
      description: 'REST API for managing fitness workouts and exercises. Built with Express.js and MongoDB for COMP2068 Assignment 2.',
    },
    servers: [
      { url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}` }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/api/workouts', workoutRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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

module.exports = app;
