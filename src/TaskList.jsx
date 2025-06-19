function TaskList({ tasks, deleteTask, toggleComplete }) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <span 
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
            onClick={() => toggleComplete(task.id)}
          >
            {task.text}
          </span>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;