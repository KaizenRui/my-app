function TaskForm({ addTask, deadline, setDeadline }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Task..."
      />
      <input
        type="text"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        placeholder="Deadline (optional)"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskForm;