
const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Exercise name is required'],
    trim: true
  },
  sets: {
    type: Number,
    required: [true, 'Number of sets is required'],
    min: [1, 'Must have at least 1 set']
  },
  reps: {
    type: Number,
    required: [true, 'Number of reps is required'],
    min: [1, 'Must have at least 1 rep']
  },
  weight: {
    type: Number,
    default: 0,
    min: [0, 'Weight cannot be negative']
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  }
});
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  date: {
    type: Date,
    default: Date.now
  },
  duration: {
    type: Number,
    required: [true, 'Duration in minutes is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'CrossFit', 'Yoga', 'Other'],
    default: 'Strength'
  },
  exercises: [exerciseSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Workout', workoutSchema);
