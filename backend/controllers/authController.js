const pool = require('../db');

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  try {

    const query = 'SELECT * FROM users WHERE username = $1';
    const values = [username];

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    const user = result.rows[0];

    // ❗ You should use bcrypt here, but for now we'll do plain-text comparison
    if (password !== user.password) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password'
      });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    res.status(200).json({
      success: true,
      message: 'Login success'
    });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
const logout = (req, res) => {
  req.session.user = null; 

  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Error logging out');
    }

    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: false,
      sameSite: 'lax'
    });

    res.send('Logged out');
  });
};



module.exports = { login, logout };
