const express = require('express');
const session = require('express-session');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const authRoute = require('./routes/authRoute');
const checkAuth = require('./routes/checkAuth');

const app = express();
const PORT = 5000; 

const allowedOrigins = ['http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: '12345',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}));

app.use('/tasks', taskRoutes);
app.use('/auth', authRoute);
app.use('/check-auth', checkAuth);

app.get('/', (req, res) => {
  res.send('Server is running...');   
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
