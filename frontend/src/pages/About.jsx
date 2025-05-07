import { FaChartLine, FaShieldAlt, FaClock, FaUsers } from 'react-icons/fa'

function About() {
  return (
    <div className="about-page">
      <div className="hero-section">
        <h1>About LoanPredictPro</h1>
        <p className="subtitle">Revolutionizing loan predictions with AI-powered intelligence</p>
      </div>
      
      <div className="content-section">
        <div className="mission-section">
          <h2>Our Mission</h2>
          <p>
            At LoanPredictPro, we're committed to transforming the loan approval process through 
            advanced machine learning and data analytics. Our goal is to help financial institutions 
            make faster, more accurate lending decisions while reducing risk and improving customer 
            satisfaction.
          </p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <FaChartLine />
            </div>
            <h3>Smart Analytics</h3>
            <p>
              Advanced AI algorithms analyze multiple data points to provide accurate loan predictions
              based on comprehensive risk assessment.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaShieldAlt />
            </div>
            <h3>Secure Processing</h3>
            <p>
              Bank-grade security measures ensure all customer data and transactions are protected
              with the highest level of encryption.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaClock />
            </div>
            <h3>Quick Decisions</h3>
            <p>
              Real-time processing and instant predictions help reduce loan approval time from days
              to minutes.
            </p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <FaUsers />
            </div>
            <h3>Customer Focus</h3>
            <p>
              User-friendly interface and transparent process make loan applications simpler and
              more accessible for customers.
            </p>
          </div>
        </div>
        
        <div className="stats-section">
          <div className="stat-item">
            <h3>95%</h3>
            <p>Prediction Accuracy</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Partner Banks</p>
          </div>
          <div className="stat-item">
            <h3>1M+</h3>
            <p>Loans Processed</p>
          </div>
          <div className="stat-item">
            <h3>24/7</h3>
            <p>System Availability</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about-page {
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
          max-width: 600px;
          margin: 0 auto;
        }
        
        .content-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--space-4);
        }
        
        .mission-section {
          text-align: center;
          margin-bottom: var(--space-6);
        }
        
        .mission-section h2 {
          color: var(--primary);
          margin-bottom: var(--space-3);
        }
        
        .mission-section p {
          max-width: 800px;
          margin: 0 auto;
          color: var(--neutral-700);
          font-size: var(--font-size-lg);
          line-height: 1.6;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-6);
        }
        
        .feature-card {
          background-color: var(--neutral-0);
          padding: var(--space-4);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          text-align: center;
          transition: transform var(--transition-normal);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
        }
        
        .feature-icon {
          font-size: var(--font-size-2xl);
          color: var(--secondary);
          margin-bottom: var(--space-3);
        }
        
        .feature-card h3 {
          color: var(--primary);
          margin-bottom: var(--space-2);
        }
        
        .feature-card p {
          color: var(--neutral-600);
          font-size: var(--font-size-sm);
          line-height: 1.5;
        }
        
        .stats-section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-4);
          margin-top: var(--space-6);
        }
        
        .stat-item {
          text-align: center;
          padding: var(--space-4);
          background-color: var(--neutral-0);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
        }
        
        .stat-item h3 {
          font-size: var(--font-size-2xl);
          color: var(--secondary);
          margin-bottom: var(--space-2);
        }
        
        .stat-item p {
          color: var(--neutral-600);
          font-size: var(--font-size-sm);
          margin: 0;
        }
        
        @media (max-width: 992px) {
          .features-grid,
          .stats-section {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .features-grid,
          .stats-section {
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

export default About