import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ApplicationFilters from '../components/history/ApplicationFilters.jsx'
import { FaEye, FaCheck, FaTimes } from 'react-icons/fa'

function History() {
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState([])
  const [filteredApplications, setFilteredApplications] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize] = useState(10)
  
  // Load applications on component mount
  // useEffect(() => {
  //   const fetchApplications = async () => {
  //     // Simulate API call
  //     await new Promise(resolve => setTimeout(resolve, 1000))
      
  //     // Generate sample applications
  //     const sampleApplications = Array.from({ length: 50 }, (_, index) => {
  //       const id = 1000 + index
  //       const approved = Math.random() > 0.3
  //       return {
  //         id,
  //         customerName: `Customer ${id}`,
  //         date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  //         amount: Math.floor(Math.random() * 90000) + 10000,
  //         status: approved ? 'Approved' : 'Rejected',
  //         confidence: approved 
  //           ? Math.floor(Math.random() * 20) + 80 
  //           : Math.floor(Math.random() * 30) + 40,
  //         loanPurpose: ['home', 'car', 'education', 'business', 'personal', 'debt-consolidation', 'medical', 'other'][
  //           Math.floor(Math.random() * 8)
  //         ]
  //       }
  //     })
      
  //     setApplications(sampleApplications)
  //     setFilteredApplications(sampleApplications)
  //     setTotalPages(Math.ceil(sampleApplications.length / pageSize))
  //     setLoading(false)
  //   }
    
  //   fetchApplications()
  // }, [pageSize])

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5321/all')
        if (!response.ok) {
          throw new Error('Failed to fetch applications')
        }
  
        const data = await response.json()
  
        // Format dates and calculate confidence if not present
        const formatted = data.map(app => ({
          ...app,
          date: new Date(app.createdDate).toISOString().split('T')[0],
          confidence: app.confidence ?? (app.status === 'Approved'
            ? Math.floor(Math.random() * 20) + 80
            : Math.floor(Math.random() * 30) + 40)
        }))
  
        setApplications(formatted)
        setFilteredApplications(formatted)
        setTotalPages(Math.ceil(formatted.length / pageSize))
        setLoading(false)
      } catch (error) {
        console.error('Error fetching applications:', error)
        setLoading(false)
      }
    }
  
    fetchApplications()
  }, [pageSize])
  
  
  // Handle filtering
  const handleFilter = (filters) => {
    let filtered = [...applications]
    
    // Filter by status
    if (filters.status) {
      filtered = filtered.filter(app => 
        app.status.toLowerCase() === filters.status.toLowerCase()
      )
    }
    
    // Filter by date range
    if (filters.dateRange) {
      const today = new Date()
      const todayStr = today.toISOString().split('T')[0]
      
      // Calculate date ranges
      const getDateBefore = (days) => {
        const date = new Date(today)
        date.setDate(today.getDate() - days)
        return date.toISOString().split('T')[0]
      }
      
      const dateRanges = {
        'today': { start: todayStr, end: todayStr },
        'this-week': { start: getDateBefore(7), end: todayStr },
        'this-month': { start: getDateBefore(30), end: todayStr },
        'last-month': { start: getDateBefore(60), end: getDateBefore(30) },
        'last-3-months': { start: getDateBefore(90), end: todayStr },
        'last-6-months': { start: getDateBefore(180), end: todayStr },
        'this-year': { start: getDateBefore(365), end: todayStr }
      }
      
      const range = dateRanges[filters.dateRange]
      if (range) {
        filtered = filtered.filter(app => 
          app.date >= range.start && app.date <= range.end
        )
      }
    }
    
    // Filter by loan amount
    if (filters.loanAmount) {
      const ranges = {
        '0-10000': { min: 0, max: 10000 },
        '10001-25000': { min: 10001, max: 25000 },
        '25001-50000': { min: 25001, max: 50000 },
        '50001-100000': { min: 50001, max: 100000 },
        '100001+': { min: 100001, max: Infinity }
      }
      
      const range = ranges[filters.loanAmount]
      if (range) {
        filtered = filtered.filter(app => 
          app.amount >= range.min && app.amount <= range.max
        )
      }
    }
    
    // Filter by loan purpose
    if (filters.loanPurpose) {
      filtered = filtered.filter(app => 
        app.loanPurpose === filters.loanPurpose
      )
    }
    
    setFilteredApplications(filtered)
    setTotalPages(Math.ceil(filtered.length / pageSize))
    setCurrentPage(1) // Reset to first page after filtering
  }
  
  // Handle sorting
  const handleSort = (field, direction) => {
    const sorted = [...filteredApplications].sort((a, b) => {
      if (field === 'date') {
        return direction === 'asc' 
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      } else if (field === 'amount') {
        return direction === 'asc' ? a.amount - b.amount : b.amount - a.amount
      } else if (field === 'confidence') {
        return direction === 'asc' ? a.confidence - b.confidence : b.confidence - a.confidence
      }
      return 0
    })
    
    setFilteredApplications(sorted)
  }
  
  // Handle search
  const handleSearch = (term) => {
    if (!term.trim()) {
      setFilteredApplications(applications)
      setTotalPages(Math.ceil(applications.length / pageSize))
      setCurrentPage(1)
      return
    }
    
    const normalizedTerm = term.toLowerCase()
    const searched = applications.filter(app => 
      app.customerName.toLowerCase().includes(normalizedTerm) ||
      app.id.toString().includes(normalizedTerm)
    )
    
    setFilteredApplications(searched)
    setTotalPages(Math.ceil(searched.length / pageSize))
    setCurrentPage(1)
  }
  
  // Get current page of applications
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return filteredApplications.slice(startIndex, endIndex)
  }
  
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading application history...</p>
      </div>
    )
  }

  return (
    <div className="history-page">
      <div className="page-header">
        <h1>Application History</h1>
        <p className="page-description">View and manage all loan applications</p>
      </div>
      
      <ApplicationFilters 
        onFilter={handleFilter}
        onSort={handleSort}
        onSearch={handleSearch}
      />
      
      <div className="card">
        <div className="applications-count">
          Showing {getCurrentPageData().length} of {filteredApplications.length} applications
        </div>
        
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Confidence</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageData().map((app) => (
                <tr key={app.id}>
                  <td>#{app.id}</td>
                  <td>{app.name}</td>
                  <td>{new Date(app.date).toLocaleDateString()}</td>
                  <td>₹{app.loanAmount.toLocaleString()}</td>
                  <td>
                    <span className="purpose-badge">
                      {app.loanPurpose.charAt(0).toUpperCase() + app.loanPurpose.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${app.status}`}>
                      {app.status === true ? <FaCheck /> : <FaTimes />}
                      <span className="status-text">{app.status}</span>
                    </span>
                  </td>
                  <td>
                    <div className="confidence-bar-container">
                      <div 
                        className={`confidence-bar ${app.status}`} 
                        style={{ width: `${(app.confidence*100).toFixed(2)}%` }}
                      ></div>
                      <span className="confidence-value">{(app.confidence*100).toFixed(2)}%</span>
                    </div>
                  </td>
                  <td>
                    <Link 
                      to={`/application/${app.id}/result`} 
                      className="action-button"
                      title="View Details"
                    >
                      <FaEye />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredApplications.length === 0 && (
          <div className="no-results">
            <p>No applications found matching your criteria.</p>
          </div>
        )}
        
        {filteredApplications.length > 0 && (
          <div className="pagination">
            <button 
              className="pagination-button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            
            <div className="pagination-pages">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                
                return (
                  <button
                    key={pageNum}
                    className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>
            
            <button 
              className="pagination-button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .history-page {
          animation: fadeIn 0.5s ease-out;
        }
        
        .page-header {
          margin-bottom: var(--space-4);
        }
        
        .page-description {
          color: var(--neutral-600);
          max-width: 600px;
        }
        
        .applications-count {
          color: var(--neutral-600);
          margin-bottom: var(--space-3);
          font-size: var(--font-size-sm);
        }
        
        .purpose-badge {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-sm);
          background-color: var(--neutral-100);
          font-size: var(--font-size-sm);
          color: var(--neutral-800);
        }
        
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 0.25rem 0.5rem;
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }
        
        .status-badge.approved {
          background-color: rgba(46, 139, 87, 0.1);
          color: var(--success);
        }
        
        .status-badge.rejected {
          background-color: rgba(220, 20, 60, 0.1);
          color: var(--error);
        }
        
        .status-text {
          margin-left: var(--space-1);
        }
        
        .confidence-bar-container {
          width: 100%;
          height: 20px;
          background-color: var(--neutral-200);
          border-radius: var(--border-radius-sm);
          position: relative;
          overflow: hidden;
        }
        
        .confidence-bar {
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          transition: width 0.5s ease;
        }
        
        .confidence-bar.true {
          background-color: var(--success);
        }
        
        .confidence-bar.false {
          background-color: var(--error);
        }
        
        .confidence-value {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          font-size: var(--font-size-xs);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-800);
        }
        
        .action-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: var(--primary-light);
          color: var(--neutral-0);
          transition: background-color var(--transition-quick);
        }
        
        .action-button:hover {
          background-color: var(--primary);
        }
        
        .no-results {
          padding: var(--space-4);
          text-align: center;
          color: var(--neutral-600);
        }
        
        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: var(--space-4);
          padding-top: var(--space-3);
          border-top: 1px solid var(--neutral-200);
        }
        
        .pagination-button {
          padding: var(--space-1) var(--space-3);
          background-color: var(--neutral-0);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          color: var(--neutral-800);
          cursor: pointer;
          transition: all var(--transition-quick);
        }
        
        .pagination-button:hover:not(:disabled) {
          background-color: var(--neutral-100);
        }
        
        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .pagination-pages {
          display: flex;
          gap: var(--space-1);
        }
        
        .pagination-page {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--border-radius-sm);
          border: 1px solid var(--neutral-300);
          background-color: var(--neutral-0);
          color: var(--neutral-800);
          cursor: pointer;
          transition: all var(--transition-quick);
        }
        
        .pagination-page:hover:not(.active) {
          background-color: var(--neutral-100);
        }
        
        .pagination-page.active {
          background-color: var(--secondary);
          color: var(--neutral-0);
          border-color: var(--secondary);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default History