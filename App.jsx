import { useState, useEffect } from 'react'; // ✅ ADDED
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newDeadline, setNewDeadline] = useState('');

  // ✅ ADDED: fetch tasks from backend on load
useEffect(() => {
  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();

      console.log('✅ Received from backend:', data);

      if (!Array.isArray(data)) {
        throw new Error('Expected an array but got: ' + JSON.stringify(data));
      }

      setTasks(data);
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      setTasks([]); // prevent crash
    }
  };

  fetchTasks();
}, []);


  const addTask = async (text) => {
    const newTask = {
      text: text,
      completed: false,
      deadline: newDeadline || 'No deadline'
    };

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });

      const savedTask = await response.json();
      setTasks([...tasks, savedTask]);
      setNewDeadline('');
    } catch (error) {
      console.error('❌ Error saving task:', error);
    }
  };

 const deleteTask = async (id) => {
  try {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
    });

    setTasks(tasks.filter(task => task.id !== id));
  } catch (error) {
    console.error('❌ Error deleting task:', error);
  }
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
