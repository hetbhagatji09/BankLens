import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  FaChartBar,
  FaFileAlt,
  FaHistory,
  FaUserPlus,
  FaSignOutAlt,
  FaChartPie,
  FaCheckCircle,
  FaTimesCircle,
} from 'react-icons/fa';

function Sidebar({ isOpen }) {
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">BL</span>
          <h1 className="logo-text">BankLens</h1>
        </div>
      </div>

      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h5 className="nav-section-title">Main</h5>
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaChartBar className="nav-icon" />
                  <span className="nav-text">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/application/new"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaFileAlt className="nav-icon" />
                  <span className="nav-text">New Application</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaHistory className="nav-icon" />
                  <span className="nav-text">History</span>
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="nav-section">
            <h5 className="nav-section-title">Reports</h5>
            <ul className="nav-list">
              <li>
                <NavLink
                  to="/reports/overview"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaChartPie className="nav-icon" />
                  <span className="nav-text">Overview</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/approved"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaCheckCircle className="nav-icon" />
                  <span className="nav-text">Approved Loans</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/reports/rejected"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'active' : ''}`
                  }
                >
                  <FaTimesCircle className="nav-icon" />
                  <span className="nav-text">Rejected Loans</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button onClick={logout} className="logout-button">
          <FaSignOutAlt className="logout-icon" />
          <span className="logout-text">Logout</span>
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 250px;
          height: 100vh;
          background: linear-gradient(to bottom, var(--primary-dark), var(--primary));
          color: var(--neutral-0);
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1001;
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-normal);
          box-shadow: var(--shadow-lg);
        }
        
        .sidebar:not(.open) {
          transform: translateX(-100%);
        }
        
        .sidebar-header {
          padding: var(--space-4);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logo {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          width: 40px;
          height: 40px;
          border-radius: var(--border-radius-md);
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-bold);
          margin-right: var(--space-2);
        }
        
        .logo-text {
          font-size: var(--font-size-lg);
          margin: 0;
          background: linear-gradient(to right, var(--neutral-0), var(--secondary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--space-3) 0;
        }
        
        .nav-section {
          margin-bottom: var(--space-4);
        }
        
        .nav-section-title {
          padding: 0 var(--space-4);
          margin-bottom: var(--space-2);
          font-size: var(--font-size-xs);
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--neutral-400);
        }
        
        .nav-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: var(--space-2) var(--space-4);
          color: var(--neutral-300);
          text-decoration: none;
          transition: all var(--transition-quick);
          border-left: 3px solid transparent;
        }
        
        .nav-link:hover {
          background-color: rgba(255, 255, 255, 0.05);
          color: var(--neutral-0);
        }
        
        .nav-link.active {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--neutral-0);
          border-left-color: var(--secondary);
        }
        
        .nav-icon {
          margin-right: var(--space-2);
          font-size: var(--font-size-md);
        }
        
        .sidebar-footer {
          padding: var(--space-3) var(--space-4);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .logout-button {
          display: flex;
          align-items: center;
          width: 100%;
          padding: var(--space-2);
          background-color: rgba(255, 255, 255, 0.05);
          border: none;
          border-radius: var(--border-radius-sm);
          color: var(--neutral-300);
          cursor: pointer;
          transition: all var(--transition-quick);
        }
        
        .logout-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: var(--neutral-0);
        }
        
        .logout-icon {
          margin-right: var(--space-2);
        }
      `}</style>
    </aside>
  );
}

export default Sidebar;
