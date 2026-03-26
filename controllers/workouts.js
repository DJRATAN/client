const fs = require('fs');
const path = require('path');
const dataFilePath = path.join(__dirname, '../../data.json');

const readData = () => {
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const rawData = fs.readFileSync(dataFilePath);
    return JSON.parse(rawData);
  } catch (error) {
    console.error('Error reading data:', error);
    return [];
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing data:', error);
  }
};

const getWorkouts = async (req, res) => {
  try {
    const workouts = readData();
    workouts.sort((a, b) => new Date(b.date) - new Date(a.date));
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workouts', error: error.message });
  }
};

const getWorkout = async (req, res) => {
  try {
    const workouts = readData();
    const workout = workouts.find((w) => w._id === req.params.id);
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout', error: error.message });
  }
};

const createWorkout = async (req, res) => {
  try {
    const workouts = readData();
    const newWorkout = { ...req.body, _id: Date.now().toString() };
    workouts.push(newWorkout);
    writeData(workouts);
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ message: 'Error creating workout', error: error.message });
  }
};

const updateWorkout = async (req, res) => {
  try {
    const workouts = readData();
    const index = workouts.findIndex((w) => w._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    workouts[index] = { ...workouts[index], ...req.body, _id: req.params.id };
    writeData(workouts);
    res.status(200).json(workouts[index]);
  } catch (error) {
    res.status(400).json({ message: 'Error updating workout', error: error.message });
  }
};

const deleteWorkout = async (req, res) => {
  try {
    const workouts = readData();
    const index = workouts.findIndex((w) => w._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    workouts.splice(index, 1);
    writeData(workouts);
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout', error: error.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
};
