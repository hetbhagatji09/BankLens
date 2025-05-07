import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom'

function AuthLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Redirect if user is already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard')
    }
  }, [user, navigate])

  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-content">
          <Outlet />
        </div>
      </div>
      <style jsx>{`
        .auth-layout {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, var(--primary-dark) 0%, var(--secondary-dark) 100%);
        }
        
        .auth-container {
          width: 100%;
          max-width: 450px;
          padding: var(--space-3);
        }
        
        .auth-content {
          background-color: var(--neutral-0);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-lg);
          padding: var(--space-5);
          animation: fadeIn 0.5s ease-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default AuthLayout