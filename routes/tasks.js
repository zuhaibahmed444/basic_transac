const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Create Task
router.post('/create', authMiddleware, async (req, res) => {
  const { description , amount , transactionType} = req.body;

  try {
    const newTask = new Task({
      user: req.user.id,
      description,
      amount,
      transactionType
    });

    const task = await newTask.save();

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update Task
router.put('/update/:id', authMiddleware, async (req, res) => {
  const { description, completed , amount} = req.body;

  // Build task object
  const taskFields = {};
  if (description) taskFields.description = description;
  if (amount) taskFields.amount = amount;
  if (completed !== undefined) taskFields.completed = completed;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, { $set: taskFields }, { new: true });

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get Tasks
router.get('/get', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete Task
router.delete('/delete/:id', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: 'Task not found' });

    // Ensure user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
