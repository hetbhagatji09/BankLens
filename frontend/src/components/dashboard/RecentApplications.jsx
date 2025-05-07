import { Link } from 'react-router-dom'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'

function RecentApplications({ applications }) {
  if (!applications || applications.length === 0) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold mb-4">Recent Applications</h2>
        <p className="text-neutral-500">No recent applications found.</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">Recent Applications</h2>
        <Link to="/history" className="view-all-link">View All</Link>
      </div>
      
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Confidence</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id}>
                <td>#{app.id.toString().padStart(5, '0')}</td>
                <td>{app.customerName}</td>
                <td>{new Date(app.date).toLocaleDateString()}</td>
                <td>${app.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${app.status.toLowerCase()}`}>
                    {app.status === 'Approved' ? <FaCheck /> : <FaTimes />}
                    <span className="status-text">{app.status}</span>
                  </span>
                </td>
                <td>
                  <div className="confidence-bar-container">
                    <div 
                      className={`confidence-bar ${app.status.toLowerCase()}`} 
                      style={{ width: `${app.confidence}%` }}
                    ></div>
                    <span className="confidence-value">{app.confidence}%</span>
                  </div>
                </td>
                <td>
                  <Link 
                    to={`/application/${app.id}/result`} 
                    className="action-button"
                    title="View Details"
                  >
                    <FaEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <style jsx>{`
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
        }
        
        .card-title {
          margin: 0;
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          color: var(--neutral-800);
        }
        
        .view-all-link {
          color: var(--secondary);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          transition: color var(--transition-quick);
        }
        
        .view-all-link:hover {
          color: var(--secondary-dark);
          text-decoration: underline;
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }
        
        .status-badge.approved {
          background-color: rgba(46, 139, 87, 0.1);
          color: var(--success);
        }
        
        .status-badge.rejected {
          background-color: rgba(220, 20, 60, 0.1);
          color: var(--error);
        }
        
        .status-text {
          margin-left: var(--space-1);
        }
        
        .confidence-bar-container {
          width: 100%;
          height: 20px;
          background-color: var(--neutral-200);
          border-radius: var(--border-radius-sm);
          position: relative;
          overflow: hidden;
        }
        
        .confidence-bar {
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          transition: width 0.5s ease;
        }
        
        .confidence-bar.approved {
          background-color: var(--success);
        }
        
        .confidence-bar.rejected {
          background-color: var(--error);
        }
        
        .confidence-value {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-800);
        }
        
        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--neutral-0);
          transition: background-color var(--transition-quick);
        }
        
        .action-button:hover {
          background-color: var(--primary);
        }
      `}</style>
    </div>
  )
}

export default RecentApplications