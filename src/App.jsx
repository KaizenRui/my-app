import React, { useEffect, useState } from 'react';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/tasks', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.error('Error fetching tasks:', err));
  }, []);

  function addTask(e) {
    e.preventDefault();

    fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ content: taskInput })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks(prev => [...prev, newTask]);
        setTaskInput('');
      });
  }

  function deleteTask(id) {
    fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(() => {
        setTasks(prev => prev.filter(task => task._id !== id));
      });
  }

  function toggleStatus(id) {
    fetch(`http://localhost:5000/tasks/${id}/status`, {
      method: 'POST',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(updatedTask => {
        setTasks(prev =>
          prev.map(task =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      });
  }``

  return (
    <div>
      <h2>Task List</h2>

      <form onSubmit={addTask}>
        <input
          value={taskInput}
          onChange={e => setTaskInput(e.target.value)}
          placeholder="Enter task"
          required
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.done ? 'line-through' : 'none' }}
              onClick={() => toggleStatus(task._id)}
            >
              {task.content}
            </span>
            <button onClick={() => deleteTask(task._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
