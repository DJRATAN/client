const Workout = require('../models/Workout');

const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort('-date');
  res.status(200).json(workouts);
};

const getWorkout = async (req, res) => {
  const workout = await Workout.findById(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.status(200).json(workout);
};

const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

const updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.status(200).json(workout);
};

const deleteWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.id);
  if (!workout) return res.status(404).json({ message: 'Workout not found' });
  res.status(200).json({ message: 'Workout deleted successfully' });
};

module.exports = { getWorkouts, getWorkout, createWorkout, updateWorkout, deleteWorkout };