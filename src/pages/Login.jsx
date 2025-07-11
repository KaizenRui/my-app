import React, { useState } from 'react'; // ✅ import useState
import { useNavigate } from 'react-router-dom'; // ✅ import useNavigate

export default function Login() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ username: username.value, password: password.value })
    })
      .then(res => res.json())
      .then(data => {
        setMsg(data.message);
        if (data.success) {
          navigate('/App'); // go to dashboard page after success
        }
      })
      .catch(() => setMsg('Error occurred.'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Username" />
      <input name="password" type="password" placeholder="Password" />
      <button>Login</button>
      <p>{msg}</p>
    </form>
  );
}