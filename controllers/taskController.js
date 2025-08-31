const Task = require('../models/taskModel');

// Create Task
function createTask(req, res) {
  const { title, description, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const task = Task.createTask({ title, description, status });
  res.status(201).json(task);
}

// Read All Tasks (with optional filtering/searching)
function getTasks(req, res) {
  let result = Task.getAllTasks();

  // Filtering
  if (req.query.status) {
    result = result.filter(t => t.status === req.query.status);
  }

  // Search
  if (req.query.search) {
    result = result.filter(t =>
      t.title.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  res.json(result);
}

// Read One Task
function getTaskById(req, res) {
  const id = parseInt(req.params.id);
  const task = Task.getTaskById(id);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
}

// Update Task
function updateTask(req, res) {
  const id = parseInt(req.params.id);
  const task = Task.updateTask(id, req.body);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json(task);
}

// Delete Task
function deleteTask(req, res) {
  const id = parseInt(req.params.id);
  const success = Task.deleteTask(id);
  if (!success) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.json({ message: 'Task deleted successfully' });
}

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
};
