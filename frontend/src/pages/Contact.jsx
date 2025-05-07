import { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSubmitSuccess(true)
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="contact-page">
      <div className="hero-section">
        <h1>Contact Us</h1>
        <p className="subtitle">Get in touch with our support team</p>
      </div>
      
      <div className="content-section">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>How to Reach Us</h2>
            
            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">
                  <FaPhone />
                </div>
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
                <p>Mon-Fri, 9:00 AM - 6:00 PM</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaEnvelope />
                </div>
                <h3>Email</h3>
                <p>support@loanpredictpro.com</p>
                <p>24/7 Response Time</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaMapMarkerAlt />
                </div>
                <h3>Address</h3>
                <p>123 Finance Street</p>
                <p>New York, NY 10001</p>
              </div>
              
              <div className="info-card">
                <div className="info-icon">
                  <FaClock />
                </div>
                <h3>Business Hours</h3>
                <p>Monday - Friday</p>
                <p>9:00 AM - 6:00 PM EST</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container">
            <div className="form-card">
              <h2>Send Us a Message</h2>
              
              {submitSuccess ? (
                <div className="success-message">
                  <h3>Thank you for your message!</h3>
                  <p>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${errors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                    {errors.name && <div className="error-message">{errors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${errors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={`form-control ${errors.subject ? 'error' : ''}`}
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Enter message subject"
                    />
                    {errors.subject && <div className="error-message">{errors.subject}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-control ${errors.message ? 'error' : ''}`}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Enter your message"
                      rows="5"
                    ></textarea>
                    {errors.message && <div className="error-message">{errors.message}</div>}
                  </div>
                  
                  {errors.submit && (
                    <div className="alert alert-danger">{errors.submit}</div>
                  )}
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-block" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-page {
          animation: fadeIn 0.5s ease-out;
        }
        
        .hero-section {
          text-align: center;
          padding: var(--space-6) 0;
          background: linear-gradient(135deg, var(--primary-dark), var(--secondary-dark));
          color: var(--neutral-0);
          border-radius: var(--border-radius-lg);
          margin-bottom: var(--space-6);
        }
        
        .hero-section h1 {
          font-size: var(--font-size-3xl);
          margin-bottom: var(--space-3);
        }
        
        .subtitle {
          font-size: var(--font-size-lg);
          color: var(--neutral-200);
        }
        
        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-4);
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-6);
        }
        
        .contact-info h2,
        .contact-form-container h2 {
          color: var(--primary);
          margin-bottom: var(--space-4);
        }
        
        .info-cards {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
        }
        
        .info-card {
          background-color: var(--neutral-0);
          padding: var(--space-4);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          text-align: center;
        }
        
        .info-icon {
          font-size: var(--font-size-2xl);
          color: var(--secondary);
          margin-bottom: var(--space-3);
        }
        
        .info-card h3 {
          color: var(--primary);
          margin-bottom: var(--space-2);
        }
        
        .info-card p {
          color: var(--neutral-600);
          margin: 0;
          font-size: var(--font-size-sm);
        }
        
        .form-card {
          background-color: var(--neutral-0);
          padding: var(--space-4);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
        }
        
        .success-message {
          text-align: center;
          padding: var(--space-4);
        }
        
        .success-message h3 {
          color: var(--success);
          margin-bottom: var(--space-2);
        }
        
        .success-message p {
          color: var(--neutral-600);
        }
        
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          .info-cards {
            margin-bottom: var(--space-4);
          }
        }
        
        @media (max-width: 576px) {
          .info-cards {
            grid-template-columns: 1fr;
          }
          
          .hero-section {
            padding: var(--space-4);
          }
          
          .hero-section h1 {
            font-size: var(--font-size-2xl);
          }
          
          .subtitle {
            font-size: var(--font-size-md);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default Contact