require('dotenv').config();
require('express-async-errors');
const path = require('path');
const express = require('express');
const app = express();

// Security & Middleware
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

// Database & Routes
const connectDB = require('./db/connect');
const workoutRouter = require('./routes/workouts');

// Swagger Setup - Use process.cwd() for Vercel compatibility
const swaggerPath = path.join(process.cwd(), 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerPath);

app.use(express.json());
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(xss());

// Swagger UI with CDN Fix for Vercel
const swaggerOptions = {
  customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
  customJs: [
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
  ]
};

// Routes
app.get('/', (req, res) => res.send('<h1>Anti Gravity API</h1><a href="/api-docs">Docs</a>'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, swaggerOptions));
app.use('/api/workouts', workoutRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // Only connect if URI exists to prevent silent crash
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from Environment Variables");
    }
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.error('FATAL STARTUP ERROR:', error.message);
  }
};

start();