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

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => 
    filter === 'all' || 
    (filter === 'open' && !task.completed) || 
    (filter === 'completed' && task.completed)
  );

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm 
        addTask={addTask} 
        deadline={newDeadline} 
        setDeadline={setNewDeadline} 
      />
      
      <div className="filter-buttons">
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('open')}
          className={filter === 'open' ? 'active' : ''}
        >
          Open
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <TaskList 
        tasks={filteredTasks} 
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

export default App;