import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { FaBars, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import About from '../../pages/About.jsx';
import Contact from '../../pages/Contact.jsx';

function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [dropdownOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <button className="menu-button" onClick={toggleSidebar}>
            <FaBars />
          </button>
          <h2 className="navbar-brand">BankLens</h2>
        </div>

        <div className="navbar-right">
          {/* <Link to="/about" className="nav-link">About Us</Link> */}
          {/* <Link to="/contact" className="nav-link">Contact Us</Link> */}

          <div className="navbar-item user-dropdown">
            <button
              className="user-dropdown-toggle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <span className="user-avatar">
                <FaUser />
              </span>
              <span className="user-name">{user?.name || 'Bank Employee'}</span>
            </button>

            {dropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <p className="user-email">
                    {user?.email || 'employee@bank.com'}
                  </p>
                </div>
                <div className="dropdown-divider"></div>
                <Link to="/profile" className="dropdown-item">
                  <FaUser className="dropdown-icon" />
                  <span>Profile</span>
                </Link>
                <Link to="/settings" className="dropdown-item">
                  <FaCog className="dropdown-icon" />
                  <span>Settings</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button onClick={logout} className="dropdown-item">
                  <FaSignOutAlt className="dropdown-icon" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          background-color: var(--primary);
          color: var(--neutral-0);
          padding: var(--space-2) var(--space-4);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: all var(--transition-normal);
        }

        .navbar.scrolled {
          box-shadow: var(--shadow-md);
        }

        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-left {
          display: flex;
          align-items: center;
        }

        .navbar-brand {
          margin: 0 0 0 var(--space-3);
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          background: linear-gradient(to right, var(--neutral-0), var(--secondary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .menu-button {
          background: transparent;
          border: none;
          color: var(--neutral-0);
          font-size: var(--font-size-lg);
          cursor: pointer;
          padding: var(--space-1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color var(--transition-quick);
        }

        .menu-button:hover {
          color: var(--secondary-light);
        }

        .navbar-right {
          display: flex;
          align-items: center;
        }

        .nav-link {
          margin: 0 var(--space-2);
          color: var(--neutral-0);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition-quick);
        }

        .nav-link:hover {
          color: var(--secondary-light);
        }

        .navbar-item {
          margin-left: var(--space-3);
          position: relative;
        }

        .user-dropdown-toggle {
          background: transparent;
          border: none;
          color: var(--neutral-0);
          display: flex;
          align-items: center;
          cursor: pointer;
          padding: var(--space-1);
          transition: color var(--transition-quick);
        }

        .user-dropdown-toggle:hover {
          color: var(--secondary-light);
        }

        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: var(--space-2);
        }

        .user-name {
          display: none;
        }

        @media (min-width: 768px) {
          .user-name {
            display: block;
          }
        }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background-color: var(--neutral-0);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          width: 220px;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .dropdown-header {
          padding: var(--space-3);
          border-bottom: 1px solid var(--neutral-200);
        }

        .user-email {
          color: var(--neutral-600);
          font-size: var(--font-size-sm);
          margin: 0;
        }

        .dropdown-divider {
          height: 1px;
          background-color: var(--neutral-200);
          margin: 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          padding: var(--space-2) var(--space-3);
          color: var(--neutral-800);
          text-decoration: none;
          transition: background-color var(--transition-quick);
        }

        .dropdown-item:hover {
          background-color: var(--neutral-100);
        }

        .dropdown-icon {
          margin-right: var(--space-2);
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
