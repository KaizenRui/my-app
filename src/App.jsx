import { useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (newTask) => {
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>
      <TaskForm addTask={addTask} />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete} 
      />
    </div>
  );
}

export default App;