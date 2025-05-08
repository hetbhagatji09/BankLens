import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function PredictionDetails() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [loanApplication, setLoanApplication] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchLoanApplication = async () => {
      try {
        const response = await axios.get(`http://localhost:5321/${id}`)
        setLoanApplication(response.data)
      } catch (err) {
        setError('Failed to load application data')
      } finally {
        setLoading(false)
      }
    }
  
    if (id) {
      fetchLoanApplication()
    }
  }, [id])
  
  // Calculate monthly payment based on loan details
  const calculateMonthlyPayment = () => {
    if (!loanApplication) return "0.00"
    
    const loanAmount = loanApplication.loanAmount || 0
    const loanTerm = loanApplication.loanTerm || 36
    const interestRate = loanApplication.interestRate || 0
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12
    
    // Calculate monthly payment using the loan formula
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
    
    return isNaN(payment) ? "0.00" : payment.toFixed(2)
  }

  // Calculate total repayment amount
  const calculateTotalRepayment = () => {
    const monthlyPayment = parseFloat(calculateMonthlyPayment())
    const loanTerm = loanApplication?.loanTerm || 36
    
    return (monthlyPayment * loanTerm).toFixed(2)
  }

  // Calculate total interest paid
  const calculateTotalInterest = () => {
    const totalRepayment = parseFloat(calculateTotalRepayment())
    const loanAmount = loanApplication?.loanAmount || 0
    
    return (totalRepayment - loanAmount).toFixed(2)
  }

  if (loading) {
    return <div>Loading application data...</div>
  }

  if (error) {
    return <div className="error-message">{error}</div>
  }

  if (!loanApplication) {
    return <div>No application data found.</div>
  }

  // Check if loan is approved based on Status field
  const approved = loanApplication.status === true
  const confidence = loanApplication.confidence || 0

  return (
    <div className="prediction-details">
      <div className={`prediction-result ${approved ? 'approved' : 'rejected'}`}>
        <div className="result-icon">
          {approved ? <FaCheckCircle /> : <FaTimesCircle />}
        </div>
        <div className="result-content">
          <h3 className="result-status">
            Loan {approved ? 'Approved' : 'Rejected'}
          </h3>
          <div className="confidence-container">
            <span className="confidence-label">Confidence:</span>
            <div className="confidence-bar-container">
              <div 
                className={`confidence-bar ${approved ? 'approved' : 'rejected'}`} 
                style={{ width: `${(confidence*100).toFixed(2)}%` }}
              ></div>
            </div>
            <span className="confidence-value">{(confidence*100).toFixed(2)}%</span>
          </div>
        </div>
      </div>
      
      <div className="loan-details card">
        <h3 className="card-title">
          <FaInfoCircle className="title-icon" />
          Loan Details
        </h3>
        
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Interest Rate:</span>
            <span className="detail-value">{loanApplication.interestRate || 0}%</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Loan Amount:</span>
            <span className="detail-value">₹{(loanApplication.loanAmount || 0).toLocaleString()}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Loan Term:</span>
            <span className="detail-value">{loanApplication.loanTerm || 36} months</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Total Repayment:</span>
            <span className="detail-value">
            ₹{parseFloat(calculateTotalRepayment()).toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}
            </span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Monthly Payment:</span>
            <span className="detail-value">₹{calculateMonthlyPayment()}</span>
          </div>
          
          <div className="detail-item">
            <span className="detail-label">Loan Purpose:</span>
            <span className="detail-value">{loanApplication.loanPurpose || 'N/A'}</span>
          </div>
        </div>
      </div>
      
      {approved && (
        <div className="payment-details card">
          <h3 className="card-title">
            <FaInfoCircle className="title-icon" />
            Payment Details
          </h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Monthly Payment:</span>
              <span className="detail-value">₹{calculateMonthlyPayment()}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Total Repayment:</span>
              <span className="detail-value">
              ₹{parseFloat(calculateTotalRepayment()).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Total Interest:</span>
              <span className="detail-value">
              ₹{parseFloat(calculateTotalInterest()).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
          </div>
          
          <div className="next-steps">
            <h4>Next Steps:</h4>
            <ol className="steps-list">
              <li>Review the loan terms and ensure they meet your needs</li>
              <li>Schedule an appointment with a loan officer to finalize the application</li>
              <li>Prepare necessary documentation (proof of income, ID, etc.)</li>
              <li>Sign the loan agreement and receive funds</li>
            </ol>
          </div>
        </div>
      )}
      
      {!approved && (
        <div className="risk-factors card">
          <h3 className="card-title">
            <FaExclamationTriangle className="title-icon" />
            Possible Risk Factors
          </h3>
          
          <div className="factors-list">
            {loanApplication.CreditScore < 650 && (
              <div className="factor-item">
                <span className="factor-name">Credit Score</span>
                <span className="factor-description">
                  Credit score of {loanApplication.CreditScore} is below optimal range
                </span>
              </div>
            )}
            
            {loanApplication.DTIRatio > 40 && (
              <div className="factor-item">
                <span className="factor-name">Debt-to-Income Ratio</span>
                <span className="factor-description">
                  DTI ratio of {loanApplication.DTIRatio}% exceeds recommended threshold
                </span>
              </div>
            )}
            
            {loanApplication.MonthsEmployed < 12 && (
              <div className="factor-item">
                <span className="factor-name">Employment History</span>
                <span className="factor-description">
                  Employment history of {loanApplication.MonthsEmployed} months is limited
                </span>
              </div>
            )}
            
            {loanApplication.LoanAmount > (loanApplication.Income * 0.5) && (
              <div className="factor-item">
                <span className="factor-name">Loan-to-Income Ratio</span>
                <span className="factor-description">
                  Loan amount is high relative to annual income
                </span>
              </div>
            )}
          </div>
          
          <div className="improvement-tips">
            <h4>How to Improve:</h4>
            <ul className="tips-list">
              <li>Pay down existing debts to improve debt-to-income ratio</li>
              <li>Make all bill payments on time to improve credit score</li>
              <li>Maintain stable employment for at least 12 months</li>
              <li>Consider a co-signer if available</li>
              <li>Apply for a smaller loan amount</li>
            </ul>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .prediction-details {
          animation: fadeIn 0.5s ease-out;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .card {
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .prediction-result {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .prediction-result.approved {
          background-color: rgba(46, 139, 87, 0.1);
          border-left: 5px solid #2e8b57;
        }
        
        .prediction-result.rejected {
          background-color: rgba(220, 20, 60, 0.1);
          border-left: 5px solid #dc143c;
        }
        
        .result-icon {
          font-size: 3rem;
          margin-right: 1.5rem;
        }
        
        .approved .result-icon {
          color: #2e8b57;
        }
        
        .rejected .result-icon {
          color: #dc143c;
        }
        
        .result-content {
          flex: 1;
        }
        
        .result-status {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
        }
        
        .approved .result-status {
          color: #1e6641;
        }
        
        .rejected .result-status {
          color: #a01a2f;
        }
        
        .confidence-container {
          display: flex;
          align-items: center;
        }
        
        .confidence-label {
          margin-right: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        
        .confidence-bar-container {
          flex: 1;
          height: 10px;
          background-color: #e2e8f0;
          border-radius: 5px;
          overflow: hidden;
          margin-right: 0.5rem;
        }
        
        .confidence-bar {
          height: 100%;
          border-radius: 5px;
          transition: width 1s ease-out;
        }
        
        .confidence-bar.approved {
          background-color: #2e8b57;
        }
        
        .confidence-bar.rejected {
          background-color: #dc143c;
        }
        
        .confidence-value {
          font-weight: 600;
          min-width: 50px;
        }
        
        .card-title {
          display: flex;
          align-items: center;
          font-size: 1.25rem;
          margin-top: 0;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #e2e8f0;
        }
        
        .title-icon {
          margin-right: 0.5rem;
          color: #3182ce;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        @media (max-width: 992px) {
          .details-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .detail-item {
          display: flex;
          flex-direction: column;
        }
        
        .detail-label {
          font-size: 0.875rem;
          color: #718096;
          margin-bottom: 0.25rem;
        }
        
        .detail-value {
          font-size: 1.125rem;
          font-weight: 600;
          color: #2d3748;
        }
        
        .next-steps,
        .improvement-tips {
          margin-top: 1.5rem;
          background-color: #f7fafc;
          padding: 1rem;
          border-radius: 6px;
        }
        
        .next-steps h4,
        .improvement-tips h4 {
          margin-top: 0;
          margin-bottom: 0.5rem;
          color: #3182ce;
        }
        
        .steps-list,
        .tips-list {
          margin: 0;
          padding-left: 1.5rem;
        }
        
        .steps-list li,
        .tips-list li {
          margin-bottom: 0.5rem;
        }
        
        .factors-list {
          margin: 0 0 1rem 0;
        }
        
        .factor-item {
          display: flex;
          flex-direction: column;
          padding: 0.75rem;
          background-color: #f7fafc;
          border-left: 3px solid #ed8936;
          margin-bottom: 0.5rem;
          border-radius: 0 6px 6px 0;
        }
        
        .factor-name {
          font-weight: 500;
          margin-bottom: 0.25rem;
          color: #4a5568;
        }
        
        .factor-description {
          font-size: 0.875rem;
          color: #718096;
        }
        
        .error-message {
          color: #dc143c;
          padding: 1rem;
          border: 1px solid #dc143c;
          border-radius: 6px;
          margin-bottom: 1.5rem;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default PredictionDetails