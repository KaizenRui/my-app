const checkauthController = (req, res) => {
  if (req.session && req.session.user) {
    res.json(req.session.user); // ✅ Send user info
  } else {
    res.status(401).json({ message: 'Please login first' });
  }
};

module.exports = { checkauthController };
