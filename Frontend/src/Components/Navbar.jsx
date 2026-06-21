import { useNavigate, Link } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">LeaveManager</Link>
      <div className="flex-center gap-4">
        {user ? (
          <>
            <span className="text-secondary">Hello, {user.first_name} ({user.role})</span>
            <button onClick={handleLogout} className="btn btn-outline">Logout</button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </nav>
  );
}
