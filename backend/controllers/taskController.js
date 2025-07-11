const pool = require('../db');

const createTask = async (req, res) => {
  const { text, completed, deadline } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO tasks (text, completed, deadline)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [text, completed || false, deadline || 'No deadline']
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

const getTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

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
