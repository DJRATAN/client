# Fitness Workout Tracker API

 
REST API for managing fitness workouts and exercises. Built with Express.js and MongoDB.

## Tech Stack
- Node.js / Express.js
- MongoDB / Mongoose
- Swagger for API documentation

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/workouts` | Fetch all workouts |
| GET | `/api/workouts/:id` | Fetch a single workout |
| POST | `/api/workouts` | Create a new workout |
| PUT | `/api/workouts/:id` | Update a workout |
| DELETE | `/api/workouts/:id` | Delete a workout |

## Data Model

**Workout** (parent) contains nested **Exercises** (child array):

```json
{
  "name": "Morning Push Day",
  "description": "Upper body strength training",
  "date": "2026-03-17",
  "duration": 60,
  "category": "Strength",
  "exercises": [
    { "name": "Bench Press", "sets": 4, "reps": 8, "weight": 135, "notes": "Flat bar" },
    { "name": "Shoulder Press", "sets": 3, "reps": 10, "weight": 65, "notes": "" }
  ]
}
```

## Setup

1. Clone the repo
2. Run `npm install`
3. Create a `.env` file with: `PORT`, `MONGODB_URI`, `CLIENT_URL`
4. Run `npm run dev` for development or `npm start` for production

## Swagger Docs

Production URL: *[will be updated after deployment]*

Local: `http://localhost:3001/api-docs`
