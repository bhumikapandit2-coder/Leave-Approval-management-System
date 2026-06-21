import { useState, useEffect } from 'react';
import api from '../api';

export default function EmployeeDashboard() {
  const [leaves, setLeaves] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ start_date: '', end_date: '', reason: '' });

  const fetchLeaves = async () => {
    try {
      const res = await api.get('leaves/');
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('leaves/', formData);
      setShowModal(false);
      setFormData({ start_date: '', end_date: '', reason: '' });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="flex-between mb-4">
        <h2>My Leave Requests</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Apply Leave</button>
      </div>

      <div className="glass-panel" style={{ padding: '20px' }}>
        {leaves.length === 0 ? (
          <p className="text-secondary text-center">No leave requests found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.start_date}</td>
                  <td>{leave.end_date}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`badge badge-${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="glass-panel modal-content animate-fade-in">
            <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="mb-4">Apply for Leave</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input type="date" className="form-control" required 
                  value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input type="date" className="form-control" required 
                  value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Reason</label>
                <textarea className="form-control" rows="3" required
                  value={formData.reason} onChange={e => setFormData({...formData, reason: e.target.value})}></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Submit Request</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
