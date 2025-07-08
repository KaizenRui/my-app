const express           = require('express');                  // import express
const router            = express.Router();                    // create a mini router instance
const { 
  createTask, 
  getTasks, 
  deleteTask,
  setStatus
}                         = require('../controllers/taskController');  // import controller functions

router.post('/',         createTask);                          // POST /tasks        → create a new task
router.get('/',          getTasks);                            // GET /tasks         → get all tasks
router.delete('/:id',    deleteTask);                          // DELETE /tasks/:id  → delete a specific task by ID
router.post('/:id/status',    setStatus);

module.exports = router;                                       // export the router for use in index.js
