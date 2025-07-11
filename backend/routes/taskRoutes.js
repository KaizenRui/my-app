const express = require('express');
const router = express.Router();
const { 
  createTask, 
  getTasks, 
  deleteTask,
  setStatus
} = require('../controllers/taskController');

router.post('/', createTask);
router.get('/', getTasks);
router.delete('/:id', deleteTask);
router.post('/:id/status', setStatus);

module.exports = router;
