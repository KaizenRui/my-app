// backend/controllers/taskController.js

const pool = require('../db'); // ✅ PostgreSQL connection setup

// 👉 Create a task and insert it into the DB
const createTask = async (req, res) => {
  const { text, completed, deadline } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (text, completed, deadline)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [text, completed || false, deadline || 'No deadline']
    );

    res.status(201).json(result.rows[0]); // ✅ Return the newly added task
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// 👉 Get all tasks from the DB
const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows); // ✅ Return all tasks
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// 👉 Delete a task from the DB by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.json({ message: `Task with id ${id} deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const setStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query('UPDATE tasks SET completed = true WHERE id = $1', [id]);
    res.json({ message: `Task with id ${id} marked as completed` });
  } catch (err) {
    console.error('Error updating task status:', err);
    res.status(500).json({ error: 'Something went wrong while updating status' });
  }
};


module.exports = {
  createTask,
  getTasks,
  deleteTask,
  setStatus,
};
