import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import api from './api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import EmployeeDashboard from './pages/EmployeeDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await api.get('auth/me/');
          setUser(res.data);
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading) return <div className="flex-center" style={{height: '100vh'}}>Loading...</div>;

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/login" element={user ? <Navigate to={user.role === 'Manager' ? '/manager' : '/employee'} /> : <Login setUser={setUser} />} />
        <Route path="/employee" element={user && user.role === 'Employee' ? <EmployeeDashboard /> : <Navigate to="/login" />} />
        <Route path="/manager" element={user && user.role === 'Manager' ? <ManagerDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={user ? (user.role === 'Manager' ? '/manager' : '/employee') : '/login'} />} />
      </Routes>
    </>
  );
}

export default App;
