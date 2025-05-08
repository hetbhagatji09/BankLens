import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUpload, FaTimesCircle } from 'react-icons/fa'

function CustomerForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    income: '',
    loanAmount: '',
    creditScore: '',
    monthsEmployed: '',
    numCreditLines: '',
    interestRate: '',
    loanTerm: '',
    dtiratio: '',
    education: '',
    employmentType: '',
    maritalStatus: '',
    hasMortgage: '',
    hasDependents: '',
    loanPurpose: '',
    hasCoSigner: '',
    bankStatement: null
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileName, setFileName] = useState('')
  
  const employmentTypes = ['Full-time', 'Part-time', 'Self-employed', 'Unemployed']
  const maritalStatuses = ['Single', 'Married', 'Divorced']
  const educationLevels = ["Bachelor's", "Master's", 'High School', 'PhD']
  const loanPurposes = [
    'Home',
    'Car',
    'Education',
    'Business',
    'Personal',
    'Debt Consolidation',
    'Medical',
    'Other'
  ]
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.ms-excel' || 
          file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'text/csv') {
        setFormData(prev => ({ ...prev, bankStatement: file }))
        setFileName(file.name)
        setErrors(prev => ({ ...prev, bankStatement: null }))
      } else {
        setErrors(prev => ({ ...prev, bankStatement: 'Please upload a PDF, Excel, or CSV file' }))
      }
    }
  }
  
  const clearFile = () => {
    setFormData(prev => ({ ...prev, bankStatement: null }))
    setFileName('')
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.age || formData.age < 18) newErrors.age = 'Age must be at least 18'
    if (!formData.income || formData.income <= 0) newErrors.income = 'Income is required'
    if (!formData.loanAmount || formData.loanAmount <= 0) newErrors.loanAmount = 'Loan amount is required'
    if (!formData.creditScore || formData.creditScore < 300 || formData.creditScore > 900) {
      newErrors.creditScore = 'Credit score must be between 300 and 900'
    }
    if (!formData.monthsEmployed || formData.monthsEmployed < 0) {
      newErrors.monthsEmployed = 'Months employed must be 0 or greater'
    }
    if (!formData.numCreditLines || formData.numCreditLines < 0) {
      newErrors.numCreditLines = 'Number of credit lines must be 0 or greater'
    }
    if (!formData.interestRate || formData.interestRate < 0) {
      newErrors.interestRate = 'Interest rate must be greater than 0'
    }
    if (!formData.loanTerm) newErrors.loanTerm = 'Loan term is required'
    if (!formData.dtiratio || formData.dtiratio < 0 || formData.dtiratio > 1) {
      newErrors.dtiratio = 'DTI ratio must be between 0 and 1'
    }
    if (!formData.education) newErrors.education = 'Education is required'
    if (!formData.employmentType) newErrors.employmentType = 'Employment type is required'
    if (!formData.maritalStatus) newErrors.maritalStatus = 'Marital status is required'
    if (!formData.loanPurpose) newErrors.loanPurpose = 'Loan purpose is required'
    if (!formData.bankStatement) newErrors.bankStatement = 'Bank statement is required'
    
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
  
    const form = new FormData()
    
    // Create a copy of formData without the bankStatement file
    const loanData = { ...formData }
    delete loanData.bankStatement
    
    // Add numeric values as numbers, not strings
    Object.keys(loanData).forEach(key => {
      if (['age', 'income', 'loanAmount', 'creditScore', 'monthsEmployed', 
           'numCreditLines', 'interestRate', 'loanTerm', 'dtiratio'].includes(key)) {
        loanData[key] = Number(loanData[key])
      }
      
      if (['hasMortgage', 'hasDependents', 'hasCoSigner'].includes(key)) {
        loanData[key] = loanData[key] === "1" ? 1 : 0
      }
    })
    
    // Append the loan data as JSON string
    form.append('loan-data', JSON.stringify(loanData))
    
    // Append the bank statement file
    if (formData.bankStatement) {
      form.append('csv-file', formData.bankStatement)
    }
  
    try {
      const response = await fetch('http://localhost:5321/loan-applications', {
        method: 'POST',
        body: form
      })
  
      if (!response.ok) {
        throw new Error('Failed to submit application')
      }
  
      const result = await response.json()
  
      navigate(`/application/${result.id}/result`, {
        state: {
          customerData: loanData,
          result: result
        }
      })
    } catch (error) {
      console.error('Submission error:', error)
      setErrors({ submit: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <form onSubmit={handleSubmit} className="customer-form">
      <div className="form-section">
        <h3 className="section-title">Personal Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${errors.name ? 'error' : ''}`}
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              className={`form-control ${errors.age ? 'error' : ''}`}
              value={formData.age}
              onChange={handleChange}
              min="18"
              placeholder="Enter age"
            />
            {errors.age && <div className="error-message">{errors.age}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="education" className="form-label">Education Level</label>
            <select
              id="education"
              name="education"
              className={`form-control ${errors.education ? 'error' : ''}`}
              value={formData.education}
              onChange={handleChange}
            >
              <option value="">Select education level</option>
              {educationLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            {errors.education && <div className="error-message">{errors.education}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="employmentType" className="form-label">Employment Type</label>
            <select
              id="employmentType"
              name="employmentType"
              className={`form-control ${errors.employmentType ? 'error' : ''}`}
              value={formData.employmentType}
              onChange={handleChange}
            >
              <option value="">Select employment type</option>
              {employmentTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            {errors.employmentType && <div className="error-message">{errors.employmentType}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="monthsEmployed" className="form-label">Months Employed</label>
            <input
              type="number"
              id="monthsEmployed"
              name="monthsEmployed"
              className={`form-control ${errors.monthsEmployed ? 'error' : ''}`}
              value={formData.monthsEmployed}
              onChange={handleChange}
              min="0"
              placeholder="Enter months employed"
            />
            {errors.monthsEmployed && <div className="error-message">{errors.monthsEmployed}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="maritalStatus" className="form-label">Marital Status</label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              className={`form-control ${errors.maritalStatus ? 'error' : ''}`}
              value={formData.maritalStatus}
              onChange={handleChange}
            >
              <option value="">Select marital status</option>
              {maritalStatuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            {errors.maritalStatus && <div className="error-message">{errors.maritalStatus}</div>}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">Financial Information</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="income" className="form-label">Monthly Income</label>
            <input
              type="number"
              id="income"
              name="income"
              className={`form-control ${errors.income ? 'error' : ''}`}
              value={formData.income}
              onChange={handleChange}
              min="0"
              placeholder="Enter monthly income"
            />
            {errors.income && <div className="error-message">{errors.income}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="creditScore" className="form-label">Credit Score</label>
            <input
              type="number"
              id="creditScore"
              name="creditScore"
              className={`form-control ${errors.creditScore ? 'error' : ''}`}
              value={formData.creditScore}
              onChange={handleChange}
              min="300"
              max="900"
              placeholder="Enter credit score (300-900)"
            />
            {errors.creditScore && <div className="error-message">{errors.creditScore}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="numCreditLines" className="form-label">Number of Credit Lines</label>
            <input
              type="number"
              id="numCreditLines"
              name="numCreditLines"
              className={`form-control ${errors.numCreditLines ? 'error' : ''}`}
              value={formData.numCreditLines}
              onChange={handleChange}
              min="0"
              placeholder="Enter number of credit lines"
            />
            {errors.numCreditLines && <div className="error-message">{errors.numCreditLines}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="dtiratio" className="form-label">DTI Ratio (0-1)</label>
            <input
              type="number"
              id="dtiratio"
              name="dtiratio"
              className={`form-control ${errors.dtiratio ? 'error' : ''}`}
              value={formData.dtiratio}
              onChange={handleChange}
              min="0"
              max="1"
              step="0.01"
              placeholder="Enter DTI ratio"
            />
            {errors.dtiratio && <div className="error-message">{errors.dtiratio}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Has Mortgage</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasMortgage"
                  value="1"
                  checked={formData.hasMortgage === "1"}
                  onChange={handleChange}
                /> Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasMortgage"
                  value="0"
                  checked={formData.hasMortgage === "0"}
                  onChange={handleChange}
                /> No
              </label>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Has Dependents</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasDependents"
                  value="1"
                  checked={formData.hasDependents === "1"}
                  onChange={handleChange}
                /> Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasDependents"
                  value="0"
                  checked={formData.hasDependents === "0"}
                  onChange={handleChange}
                /> No
              </label>
            </div>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Bank Statement (Last 6 Months)</label>
            <div className={`file-upload ${errors.bankStatement ? 'error' : ''}`}>
              <input
                type="file"
                id="bankStatement"
                name="bankStatement"
                onChange={handleFileChange}
                accept=".pdf,.xls,.xlsx,.csv"
                className="file-input"
              />
              <div className="file-upload-content">
                <FaUpload className="upload-icon" />
                <span className="upload-text">
                  {fileName || 'Upload PDF, Excel, or CSV file'}
                </span>
                {fileName && (
                  <button 
                    type="button" 
                    className="clear-file" 
                    onClick={clearFile}
                  >
                    <FaTimesCircle />
                  </button>
                )}
              </div>
            </div>
            {errors.bankStatement && <div className="error-message">{errors.bankStatement}</div>}
          </div>
        </div>
      </div>
      
      <div className="form-section">
        <h3 className="section-title">Loan Details</h3>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loanAmount" className="form-label">Loan Amount</label>
            <input
              type="number"
              id="loanAmount"
              name="loanAmount"
              className={`form-control ${errors.loanAmount ? 'error' : ''}`}
              value={formData.loanAmount}
              onChange={handleChange}
              min="0"
              placeholder="Enter loan amount"
            />
            {errors.loanAmount && <div className="error-message">{errors.loanAmount}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="interestRate" className="form-label">Interest Rate (%)</label>
            <input
              type="number"
              id="interestRate"
              name="interestRate"
              className={`form-control ${errors.interestRate ? 'error' : ''}`}
              value={formData.interestRate}
              onChange={handleChange}
              min="0"
              step="0.1"
              placeholder="Enter interest rate"
            />
            {errors.interestRate && <div className="error-message">{errors.interestRate}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="loanTerm" className="form-label">Loan Term (Months)</label>
            <select
              id="loanTerm"
              name="loanTerm"
              className={`form-control ${errors.loanTerm ? 'error' : ''}`}
              value={formData.loanTerm}
              onChange={handleChange}
            >
              <option value="">Select loan term</option>
              <option value="12">12 months</option>
              <option value="24">24 months</option>
              <option value="36">36 months</option>
              <option value="48">48 months</option>
              <option value="60">60 months</option>
              <option value="72">72 months</option>
              <option value="84">84 months</option>
              <option value="120">120 months</option>
              <option value="180">180 months</option>
              <option value="240">240 months</option>
              <option value="360">360 months</option>
            </select>
            {errors.loanTerm && <div className="error-message">{errors.loanTerm}</div>}
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="loanPurpose" className="form-label">Loan Purpose</label>
            <select
              id="loanPurpose"
              name="loanPurpose"
              className={`form-control ${errors.loanPurpose ? 'error' : ''}`}
              value={formData.loanPurpose}
              onChange={handleChange}
            >
              <option value="">Select loan purpose</option>
              {loanPurposes.map(purpose => (
                <option key={purpose} value={purpose}>{purpose}</option>
              ))}
            </select>
            {errors.loanPurpose && <div className="error-message">{errors.loanPurpose}</div>}
          </div>
          
          <div className="form-group">
            <label className="form-label">Has Co-Signer</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasCoSigner"
                  value="1"
                  checked={formData.hasCoSigner === "1"}
                  onChange={handleChange}
                /> Yes
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="hasCoSigner"
                  value="0"
                  checked={formData.hasCoSigner === "0"}
                  onChange={handleChange}
                /> No
              </label>
            </div>
          </div>
        </div>
      </div>
      
      {errors.submit && (
        <div className="alert alert-danger">{errors.submit}</div>
      )}
      
      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
          Cancel
        </button>
        <button 
          type="submit" 
          className="btn btn-primary" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processing...' : 'Submit Application'}
        </button>
      </div>
      
      <style jsx>{`
        .customer-form {
          max-width: 100%;
        }
        
        .form-section {
          background-color: var(--neutral-0);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          padding: var(--space-4);
          margin-bottom: var(--space-4);
        }
        
        .section-title {
          margin-top: 0;
          margin-bottom: var(--space-3);
          font-size: var(--font-size-lg);
          color: var(--primary);
          border-bottom: 1px solid var(--neutral-200);
          padding-bottom: var(--space-2);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        
        @media (max-width: 992px) {
          .form-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        
        .radio-group {
          display: flex;
          gap: var(--space-3);
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          cursor: pointer;
        }
        
        .file-upload {
          position: relative;
          border: 2px dashed var(--neutral-300);
          border-radius: var(--border-radius-sm);
          padding: var(--space-3);
          text-align: center;
          cursor: pointer;
          transition: all var(--transition-quick);
        }
        
        .file-upload:hover {
          border-color: var(--primary);
        }
        
        .file-upload.error {
          border-color: var(--error);
        }
        
        .file-input {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }
        
        .file-upload-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        }
        
        .upload-icon {
          font-size: var(--font-size-xl);
          color: var(--primary);
        }
        
        .upload-text {
          color: var(--neutral-600);
        }
        
        .clear-file {
          background: none;
          border: none;
          color: var(--error);
          cursor: pointer;
          padding: var(--space-1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-3);
          margin-top: var(--space-4);
        }
        
        .form-actions .btn {
          min-width: 150px;
        }
      `}</style>
    </form>
  )
}

export default CustomerForm
