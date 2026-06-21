import { useState, useEffect } from 'react';
import api from '../api';

export default function ManagerDashboard() {
  const [leaves, setLeaves] = useState([]);

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

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`leaves/${id}/`, { status });
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container animate-fade-in">
      <div className="mb-4">
        <h2>Team Leave Requests</h2>
        <p className="text-secondary">Review and manage leave requests from employees.</p>
      </div>

      <div className="glass-panel" style={{ padding: '20px' }}>
        {leaves.length === 0 ? (
          <p className="text-secondary text-center">No leave requests found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Dates</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td>
                    <strong>{leave.user_detail.first_name} {leave.user_detail.last_name}</strong>
                    <br/><small className="text-secondary">{leave.user_detail.username}</small>
                  </td>
                  <td>{leave.start_date} <br/><small className="text-secondary">to</small> {leave.end_date}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <span className={`badge badge-${leave.status.toLowerCase()}`}>
                      {leave.status}
                    </span>
                  </td>
                  <td>
                    {leave.status === 'Pending' && (
                      <div className="flex-center gap-2" style={{justifyContent: 'flex-start'}}>
                        <button className="btn btn-success" onClick={() => handleUpdateStatus(leave.id, 'Approved')} style={{padding: '5px 10px'}}>Approve</button>
                        <button className="btn btn-danger" onClick={() => handleUpdateStatus(leave.id, 'Rejected')} style={{padding: '5px 10px'}}>Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
