import { useState } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newDeadline, setNewDeadline] = useState('');

  const addTask = (text) => {
    setTasks([...tasks, {
      id: Date.now(),
      text,
      completed: false,
      deadline: newDeadline || 'No deadline'
    }]);
    setNewDeadline('');
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' || 
    (filter === 'open' && !task.completed) || 
    (filter === 'completed' && task.completed)
  );

  return (
    <div>
      <TaskForm 
        addTask={addTask} 
        deadline={newDeadline} 
        setDeadline={setNewDeadline} 
      />
      
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('open')}>Open</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
      </div>

      <TaskList tasks={filteredTasks} />
    </div>
  );
}

export default App;