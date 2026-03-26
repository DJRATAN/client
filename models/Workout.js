const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  sets: { type: Number, required: true, min: 1 },
  reps: { type: Number, required: true, min: 1 },
  weight: { type: Number, default: 0 },
  notes: { type: String, trim: true, default: '' }
});

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  duration: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['Strength', 'Cardio', 'Flexibility', 'HIIT', 'CrossFit', 'Yoga', 'Other'],
    default: 'Strength'
  },
  exercises: [exerciseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);