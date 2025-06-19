function TaskList({ tasks }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <span style={{ 
            textDecoration: task.completed ? 'line-through' : 'none' 
          }}>
            {task.text} 
            <small> (Due: {task.deadline})</small>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;