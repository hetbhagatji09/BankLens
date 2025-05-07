import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    }
    
    return newErrors
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // In a real app, you would validate credentials with an API
      // This is a simplified version for demo purposes
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // For demo, allowing any login
      const userData = {
        id: '1',
        name: 'Bank Employee',
        email: formData.email,
        role: 'loan_officer'
      }
      
      login(userData)
      navigate('/dashboard')
    } catch (error) {
      setErrors({ submit: 'Invalid email or password' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-header">
        <div className="logo-container">
          <div className="logo-icon">LP</div>
          <h1 className="logo-text">LoanPredictPro</h1>
        </div>
        <p className="subtitle">Sign in to access the loan prediction system</p>
      </div>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            <FaUser className="input-icon" />
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'error' : ''}`}
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            <FaLock className="input-icon" />
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? 'error' : ''}`}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <div className="error-message">{errors.password}</div>}
        </div>
        
        <div className="form-options">
          <div className="remember-me">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
        </div>
        
        {errors.submit && (
          <div className="alert alert-danger">{errors.submit}</div>
        )}
        
        <button 
          type="submit" 
          className="btn btn-primary btn-block login-button" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Signing in...' : 'Sign in'}
          {!isSubmitting && <FaSignInAlt className="button-icon" />}
        </button>
      </form>
      
      <div className="login-footer">
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
      
      <style jsx>{`
        .login-page {
          max-width: 400px;
          margin: 0 auto;
        }
        
        .login-header {
          text-align: center;
          margin-bottom: var(--space-4);
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--space-3);
        }
        
        .logo-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--border-radius-md);
          background: linear-gradient(135deg, var(--secondary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: var(--font-weight-bold);
          font-size: var(--font-size-lg);
          color: var(--neutral-0);
          margin-right: var(--space-2);
        }
        
        .logo-text {
          font-size: var(--font-size-xl);
          margin: 0;
          background: linear-gradient(to right, var(--primary), var(--secondary));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          color: var(--neutral-600);
          margin-top: var(--space-2);
        }
        
        .login-form {
          margin-bottom: var(--space-4);
        }
        
        .form-group {
          margin-bottom: var(--space-3);
        }
        
        .form-label {
          display: flex;
          align-items: center;
          margin-bottom: var(--space-2);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-800);
        }
        
        .input-icon {
          margin-right: var(--space-2);
          color: var(--primary);
        }
        
        .form-control {
          display: block;
          width: 100%;
          padding: 0.75rem;
          font-size: var(--font-size-md);
          line-height: 1.5;
          color: var(--neutral-800);
          background-color: var(--neutral-0);
          background-clip: padding-box;
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          transition: border-color var(--transition-quick), box-shadow var(--transition-quick);
        }
        
        .form-control:focus {
          color: var(--neutral-900);
          background-color: var(--neutral-0);
          border-color: var(--secondary);
          outline: 0;
          box-shadow: 0 0 0 0.2rem rgba(98, 71, 170, 0.25);
        }
        
        .form-control.error {
          border-color: var(--error);
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-size-sm);
          margin-top: var(--space-1);
        }
        
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--space-3);
          font-size: var(--font-size-sm);
        }
        
        .remember-me {
          display: flex;
          align-items: center;
        }
        
        .remember-me input {
          margin-right: var(--space-1);
        }
        
        .forgot-password {
          color: var(--primary);
        }
        
        .login-button {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .button-icon {
          margin-left: var(--space-2);
        }
        
        .login-footer {
          text-align: center;
          color: var(--neutral-600);
          font-size: var(--font-size-sm);
        }
        
        .login-footer a {
          color: var(--primary);
          font-weight: var(--font-weight-medium);
        }
      `}</style>
    </div>
  )
}

export default Login