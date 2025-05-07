import { FaUsers, FaCheckCircle, FaTimesCircle, FaChartLine } from 'react-icons/fa'

function Stats({ stats }) {
  const { totalApplications, approved, rejected, approvalRate } = stats || {
    totalApplications: 0,
    approved: 0,
    rejected: 0,
    approvalRate: 0
  }

  return (
    <div className="stats-container grid grid-cols-4 gap-4">
      <div className="stat-card total">
        <div className="stat-icon">
          <FaUsers />
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{totalApplications}</h3>
          <p className="stat-label">Total Applications</p>
        </div>
      </div>
      
      <div className="stat-card approved">
        <div className="stat-icon">
          <FaCheckCircle />
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{approved}</h3>
          <p className="stat-label">Approved</p>
        </div>
      </div>
      
      <div className="stat-card rejected">
        <div className="stat-icon">
          <FaTimesCircle />
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{rejected}</h3>
          <p className="stat-label">Rejected</p>
        </div>
      </div>
      
      <div className="stat-card rate">
        <div className="stat-icon">
          <FaChartLine />
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{approvalRate}%</h3>
          <p className="stat-label">Approval Rate</p>
        </div>
      </div>
      
      <style jsx>{`
        .stats-container {
          margin-bottom: var(--space-4);
        }
        
        .stat-card {
          display: flex;
          align-items: center;
          background-color: var(--neutral-0);
          padding: var(--space-3);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          transition: transform var(--transition-quick);
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
        }
        
        .stat-card.total {
          border-top: 4px solid var(--primary);
        }
        
        .stat-card.approved {
          border-top: 4px solid var(--success);
        }
        
        .stat-card.rejected {
          border-top: 4px solid var(--error);
        }
        
        .stat-card.rate {
          border-top: 4px solid var(--secondary);
        }
        
        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          margin-right: var(--space-3);
          font-size: var(--font-size-xl);
        }
        
        .total .stat-icon {
          background-color: rgba(28, 44, 91, 0.1);
          color: var(--primary);
        }
        
        .approved .stat-icon {
          background-color: rgba(46, 139, 87, 0.1);
          color: var(--success);
        }
        
        .rejected .stat-icon {
          background-color: rgba(220, 20, 60, 0.1);
          color: var(--error);
        }
        
        .rate .stat-icon {
          background-color: rgba(98, 71, 170, 0.1);
          color: var(--secondary);
        }
        
        .stat-content {
          flex: 1;
        }
        
        .stat-value {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          margin: 0 0 var(--space-1) 0;
          color: var(--neutral-800);
        }
        
        .stat-label {
          margin: 0;
          color: var(--neutral-600);
          font-size: var(--font-size-sm);
        }
        
        @media (max-width: 992px) {
          .stats-container {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .stats-container {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}

export default Stats