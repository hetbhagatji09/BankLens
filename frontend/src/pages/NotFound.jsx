import { Link } from 'react-router-dom'
import { FaHome, FaArrowLeft } from 'react-icons/fa'

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-icon">404</div>
        <h1>Page Not Found</h1>
        <p>The page you are looking for does not exist or has been moved.</p>
        
        <div className="action-buttons">
          <Link to="/" className="btn btn-primary">
            <FaHome className="btn-icon" />
            Go to Dashboard
          </Link>
          <button onClick={() => window.history.back()} className="btn btn-secondary">
            <FaArrowLeft className="btn-icon" />
            Go Back
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .not-found-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 80vh;
          text-align: center;
          padding: var(--space-4);
        }
        
        .not-found-content {
          max-width: 500px;
          animation: fadeIn 0.5s ease-out;
        }
        
        .not-found-icon {
          font-size: 6rem;
          font-weight: var(--font-weight-bold);
          margin-bottom: var(--space-3);
          color: var(--primary);
          text-shadow: 4px 4px 0 var(--secondary-light);
        }
        
        h1 {
          font-size: var(--font-size-2xl);
          margin-bottom: var(--space-3);
          color: var(--neutral-800);
        }
        
        p {
          font-size: var(--font-size-lg);
          color: var(--neutral-600);
          margin-bottom: var(--space-4);
        }
        
        .action-buttons {
          display: flex;
          gap: var(--space-3);
          justify-content: center;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          padding: var(--space-2) var(--space-4);
          font-size: var(--font-size-md);
        }
        
        .btn-icon {
          margin-right: var(--space-2);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 576px) {
          .action-buttons {
            flex-direction: column;
            width: 100%;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  )
}

export default NotFound