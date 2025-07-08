const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'regie' && password === '1234') {
    req.session.user = { username, role: 'user' };
    return res.status(200).json({
      success: true,
      message: 'Login success'
    });
  }

  res.status(401).json({
    success: false,
    message: 'Invalid credentials'
  });
};


const logout = (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).send('Error logging out');
    res.clearCookie('connect.sid');
    res.send('Logged out');
  });
};

module.exports = { login, logout};
