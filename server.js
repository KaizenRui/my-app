const express = require('express'); //a nodejs framework
const { Pool } = require('pg'); //allows multiple db query
const app = express();
const cors = require('cors'); //NOTE: MAKE SURE CORS INSTALLED

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres',
  password: 'montech122300',
  host: 'localhost',
  database: 'tasksdb',
  port: 5432,
});

app.post('/save-task', async (req, res) => {
  const { text } = req.body;
  await pool.query('INSERT INTO tasks(text, completed) VALUES($1, $2)', [text, false]);
  res.send('Task saved!');
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));