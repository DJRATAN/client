
const express = require('express');
const router = express.Router();
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} = require('../controllers/workouts');

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - name
 *         - sets
 *         - reps
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the exercise
 *         sets:
 *           type: number
 *           description: Number of sets
 *         reps:
 *           type: number
 *           description: Number of reps per set
 *         weight:
 *           type: number
 *           description: Weight in lbs
 *         notes:
 *           type: string
 *           description: Additional notes
 *     Workout:
 *       type: object
 *       required:
 *         - name
 *         - duration
 *         - category
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the workout
 *         description:
 *           type: string
 *           description: Workout description
 *         date:
 *           type: string
 *           format: date
 *           description: Date of the workout
 *         duration:
 *           type: number
 *           description: Duration in minutes
 *         category:
 *           type: string
 *           enum: [Strength, Cardio, Flexibility, HIIT, CrossFit, Yoga, Other]
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 */

/**
 * @swagger
 * /api/workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     responses:
 *       200:
 *         description: List of all workouts
 */
router.get('/', getWorkouts);

/**
 * @swagger
 * /api/workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout found
 *       404:
 *         description: Workout not found
 */
router.get('/:id', getWorkout);

/**
 * @swagger
 * /api/workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       201:
 *         description: Workout created
 */
router.post('/', createWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   put:
 *     summary: Update a workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: Workout updated
 *       404:
 *         description: Workout not found
 */
router.put('/:id', updateWorkout);

/**
 * @swagger
 * /api/workouts/{id}:
 *   delete:
 *     summary: Delete a workout
 *     tags: [Workouts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Workout deleted
 *       404:
 *         description: Workout not found
 */
router.delete('/:id', deleteWorkout);

module.exports = router;
