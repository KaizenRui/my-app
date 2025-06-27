import { useState } from 'react';

function TaskForm({ addTask, deadline, setDeadline }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      addTask(text); // 👈 delegate logic to App
      setText('');
      setDeadline('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter task..."
        className="task-input"
        required
      />
      <input
        type="datetime-local"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="deadline-input"
      />
      <button type="submit" className="add-button">
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;