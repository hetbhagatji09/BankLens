import { FaCheckCircle, FaTimesCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'
import { useState } from 'react';

// const [data, setData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

function PredictionDetails({ result, customerData }) {
  const { approved, confidence, riskFactors } = result || {
    approved: false,
    confidence: 0,
    riskFactors: []
  }
  
  // Calculate estimated interest rate based on credit score and other factors
  // This is a simplified model for demonstration
  const calculateInterestRate = () => {
    const baseRate = 5.99
    const creditScore = parseInt(customerData?.creditScore || "700")
    
    let creditScoreAdjustment = 0
    if (creditScore >= 800) creditScoreAdjustment = -1.5
    else if (creditScore >= 750) creditScoreAdjustment = -1.0
    else if (creditScore >= 700) creditScoreAdjustment = -0.5
    else if (creditScore >= 650) creditScoreAdjustment = 0
    else if (creditScore >= 600) creditScoreAdjustment = 0.5
    else if (creditScore >= 550) creditScoreAdjustment = 1.0
    else creditScoreAdjustment = 2.0
    
    // Adjust for employment status
    const employmentStatus = customerData?.employmentStatus || ""
    let employmentAdjustment = 0
    if (employmentStatus === "unemployed") employmentAdjustment = 1.5
    else if (employmentStatus === "part-time") employmentAdjustment = 0.5
    else if (employmentStatus === "self-employed") employmentAdjustment = 0.3
    
    // Loan amount factor
    const loanAmount = parseInt(customerData?.loanAmount || "0")
    let loanAmountAdjustment = 0
    if (loanAmount > 100000) loanAmountAdjustment = 0.2
    else if (loanAmount < 10000) loanAmountAdjustment = -0.2
    
    const interestRate = (baseRate + creditScoreAdjustment + employmentAdjustment + loanAmountAdjustment).toFixed(2)
    
    return interestRate
  }
  
  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    const loanAmount = parseInt(customerData?.loanAmount || "0")
    const loanTerm = parseInt(customerData?.loanTerm || "36")
    const interestRate = parseFloat(calculateInterestRate())
    
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12
    
    // Calculate monthly payment using the loan formula
    const payment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -loanTerm))
    
    return isNaN(payment) ? "0.00" : payment.toFixed(2)
  }

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
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <span className="confidence-value">{confidence}%</span>
          </div>
        </div>
      </div>
      
      {approved && (
        <div className="approval-details card">
          <h3 className="card-title">
            <FaInfoCircle className="title-icon" />
            Loan Terms
          </h3>
          
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-label">Loan Amount:</span>
              <span className="detail-value">${parseInt(customerData?.loanAmount || "0").toLocaleString()}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Interest Rate:</span>
              <span className="detail-value">{calculateInterestRate()}%</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Loan Term:</span>
              <span className="detail-value">{customerData?.loanTerm || "36"} months</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Monthly Payment:</span>
              <span className="detail-value">${calculateMonthlyPayment()}</span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Total Repayment:</span>
              <span className="detail-value">
                ${(parseFloat(calculateMonthlyPayment()) * parseInt(customerData?.loanTerm || "36")).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
            
            <div className="detail-item">
              <span className="detail-label">Total Interest:</span>
              <span className="detail-value">
                ${((parseFloat(calculateMonthlyPayment()) * parseInt(customerData?.loanTerm || "36")) - parseInt(customerData?.loanAmount || "0")).toLocaleString(undefined, {
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
      
      {riskFactors && riskFactors.length > 0 && (
        <div className="risk-factors card">
          <h3 className="card-title">
            <FaExclamationTriangle className="title-icon" />
            Risk Factors
          </h3>
          
          <ul className="factors-list">
            {riskFactors.map((factor, index) => (
              <li key={index} className="factor-item">
                <span className="factor-name">{factor}</span>
                <span className="factor-description">
                  {factor === 'Credit Score' && 'Credit score below optimal range'}
                  {factor === 'Debt-to-Income Ratio' && 'High ratio of existing debt to income'}
                  {factor === 'Employment History' && 'Limited employment history or instability'}
                </span>
              </li>
            ))}
          </ul>
          
          <div className="improvement-tips">
            <h4>How to Improve:</h4>
            <ul className="tips-list">
              <li>Pay down existing debts to improve debt-to-income ratio</li>
              <li>Make all bill payments on time to improve credit score</li>
              <li>Maintain stable employment for at least 2 years</li>
              <li>Consider a co-signer if available</li>
              <li>Apply for a smaller loan amount</li>
            </ul>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .prediction-details {
          animation: fadeIn 0.5s ease-out;
        }
        
        .prediction-result {
          display: flex;
          align-items: center;
          padding: var(--space-4);
          border-radius: var(--border-radius-md);
          margin-bottom: var(--space-4);
        }
        
        .prediction-result.approved {
          background-color: rgba(46, 139, 87, 0.1);
          border-left: 5px solid var(--success);
        }
        
        .prediction-result.rejected {
          background-color: rgba(220, 20, 60, 0.1);
          border-left: 5px solid var(--error);
        }
        
        .result-icon {
          font-size: 3rem;
          margin-right: var(--space-4);
        }
        
        .approved .result-icon {
          color: var(--success);
        }
        
        .rejected .result-icon {
          color: var(--error);
        }
        
        .result-content {
          flex: 1;
        }
        
        .result-status {
          font-size: var(--font-size-xl);
          font-weight: var(--font-weight-bold);
          margin: 0 0 var(--space-2) 0;
        }
        
        .approved .result-status {
          color: var(--success-dark);
        }
        
        .rejected .result-status {
          color: var(--error-dark);
        }
        
        .confidence-container {
          display: flex;
          align-items: center;
        }
        
        .confidence-label {
          margin-right: var(--space-2);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-700);
        }
        
        .confidence-bar-container {
          flex: 1;
          height: 10px;
          background-color: var(--neutral-200);
          border-radius: 5px;
          overflow: hidden;
          margin-right: var(--space-2);
        }
        
        .confidence-bar {
          height: 100%;
          border-radius: 5px;
          background-color: var(--primary);
          transition: width 1s ease-out;
        }
        
        .confidence-bar.approved {
          background-color: var(--success);
        }
        
        .confidence-bar.rejected {
          background-color: var(--error);
        }
        
        .confidence-value {
          font-weight: var(--font-weight-bold);
          min-width: 50px;
        }
        
        .card-title {
          display: flex;
          align-items: center;
          font-size: var(--font-size-lg);
          margin-top: 0;
          margin-bottom: var(--space-3);
          padding-bottom: var(--space-2);
          border-bottom: 1px solid var(--neutral-200);
        }
        
        .title-icon {
          margin-right: var(--space-2);
          color: var(--primary);
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-4);
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
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
          margin-bottom: var(--space-1);
        }
        
        .detail-value {
          font-size: var(--font-size-lg);
          font-weight: var(--font-weight-bold);
          color: var(--neutral-900);
        }
        
        .next-steps,
        .improvement-tips {
          margin-top: var(--space-4);
          background-color: var(--neutral-50);
          padding: var(--space-3);
          border-radius: var(--border-radius-sm);
        }
        
        .next-steps h4,
        .improvement-tips h4 {
          margin-top: 0;
          margin-bottom: var(--space-2);
          color: var(--primary);
        }
        
        .steps-list,
        .tips-list {
          margin: 0;
          padding-left: var(--space-4);
        }
        
        .steps-list li,
        .tips-list li {
          margin-bottom: var(--space-2);
        }
        
        .factors-list {
          list-style: none;
          padding: 0;
          margin: 0 0 var(--space-3) 0;
        }
        
        .factor-item {
          display: flex;
          flex-direction: column;
          padding: var(--space-2);
          background-color: var(--neutral-100);
          border-left: 3px solid var(--warning);
          margin-bottom: var(--space-2);
          border-radius: 0 var(--border-radius-sm) var(--border-radius-sm) 0;
        }
        
        .factor-name {
          font-weight: var(--font-weight-medium);
          margin-bottom: var(--space-1);
          color: var(--neutral-800);
        }
        
        .factor-description {
          font-size: var(--font-size-sm);
          color: var(--neutral-600);
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