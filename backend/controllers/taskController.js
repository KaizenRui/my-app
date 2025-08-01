const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new task
const createTask = async (req, res) => {
  const user = req.session.user;
  const { text, completed, deadline } = req.body;

  console.log("==> FULL SESSION:", req.session);

  try {
    const newTask = await prisma.task.create({
      data: {
        text: typeof text === 'string' ? text : 'Untitled Task',
        completed: typeof completed === 'boolean' ? completed : false,
        deadline: typeof deadline === 'string' ? deadline : 'No deadline',
        userId: user.id // Use session user ID
      },
    });

    console.log("==> Task created:", newTask);
    res.status(201).json(newTask);
  } catch (err) {
    console.error("❌ Create task failed:", err.message);
    res.status(500).json({ error: 'Failed to create task' });
  }
};

// Get tasks for logged-in user
const getTasks = async (req, res) => {
  const user = req.session.user;
  if (!user) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        id: 'asc'
      }
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error("❌ Get tasks failed:", err.message);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

// Delete a task by ID
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.delete({
      where: { id: parseInt(id) }
    });

    res.json({ message: `Task with id ${id} deleted` });
  } catch (err) {
    console.error("❌ Delete task failed:", err.message);
    res.status(500).json({ error: 'Failed to delete task' });
  }
};

// Mark a task as completed
const setStatus = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.task.update({
      where: { id: parseInt(id) },
      data: { completed: true }
    });

    res.json({ message: `Task with id ${id} marked as completed` });
  } catch (err) {
    console.error("❌ Update task status failed:", err.message);
    res.status(500).json({ error: 'Failed to update task status' });
  }
};

module.exports = {
  createTask,
  getTasks,
  deleteTask,
  setStatus,
};
