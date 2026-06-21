import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('auth/login/', { username, password });
      localStorage.setItem('token', res.data.access);
      setUser(res.data.user);
      if (res.data.user.role === 'Manager') {
        navigate('/manager');
      } else {
        navigate('/employee');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="container flex-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        {error && <div style={{ color: 'var(--danger)', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input 
              type="text" 
              className="form-control" 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password} 
              onChange={e => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Login</button>
        </form>
      </div>
    </div>
  );
}
