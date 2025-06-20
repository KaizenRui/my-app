function TaskList({ tasks, deleteTask, toggleTask }) {
  if (tasks.length === 0) {
    return <p className="no-tasks">No tasks found</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map(task => (
        <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <div className="task-content" onClick={() => toggleTask(task.id)}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
              onClick={(e) => e.stopPropagation()}
            />
            <span className="task-text">{task.text}</span>
            <span className="task-deadline">{task.deadline}</span>
            <span className="task-status">
              {task.completed ? '✅' : '⏳'}
            </span>
          </div>
          <button 
            onClick={() => deleteTask(task.id)}
            className="delete-button"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;