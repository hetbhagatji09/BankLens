import { useState } from 'react'
import { FaFilter, FaSearch, FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'

function ApplicationFilters({ onFilter, onSort, onSearch }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState({
    status: '',
    dateRange: '',
    loanAmount: '',
    loanPurpose: ''
  })
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target
    const newFilters = { ...filters, [name]: value }
    setFilters(newFilters)
    onFilter(newFilters)
  }
  
  const handleSortChange = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc'
    setSortField(field)
    setSortDirection(direction)
    onSort(field, direction)
  }
  
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onSearch(value)
  }
  
  const toggleFilters = () => {
    setIsExpanded(!isExpanded)
  }
  
  const renderSortIcon = (field) => {
    if (field !== sortField) return <FaSort />
    return sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />
  }

  return (
    <div className="filters-container">
      <div className="filters-header">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search by customer name or ID..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        <button className="filter-toggle-btn" onClick={toggleFilters}>
          <FaFilter /> 
          <span>Filters</span>
        </button>
      </div>
      
      {isExpanded && (
        <div className="filters-expanded">
          <div className="filters-grid">
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                name="status"
                className="filter-select"
                value={filters.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Date Range</label>
              <select
                name="dateRange"
                className="filter-select"
                value={filters.dateRange}
                onChange={handleFilterChange}
              >
                <option value="">All Time</option>
                <option value="today">Today</option>
                <option value="this-week">This Week</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-months">Last 3 Months</option>
                <option value="last-6-months">Last 6 Months</option>
                <option value="this-year">This Year</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Loan Amount</label>
              <select
                name="loanAmount"
                className="filter-select"
                value={filters.loanAmount}
                onChange={handleFilterChange}
              >
                <option value="">All Amounts</option>
                <option value="0-10000">$0 - $10,000</option>
                <option value="10001-25000">$10,001 - $25,000</option>
                <option value="25001-50000">$25,001 - $50,000</option>
                <option value="50001-100000">$50,001 - $100,000</option>
                <option value="100001+">$100,001+</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">Loan Purpose</label>
              <select
                name="loanPurpose"
                className="filter-select"
                value={filters.loanPurpose}
                onChange={handleFilterChange}
              >
                <option value="">All Purposes</option>
                <option value="home">Home Purchase</option>
                <option value="car">Car Purchase</option>
                <option value="education">Education</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="debt-consolidation">Debt Consolidation</option>
                <option value="medical">Medical Expenses</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="sort-options">
            <span className="sort-label">Sort by:</span>
            <div className="sort-buttons">
              <button 
                className={`sort-button ${sortField === 'date' ? 'active' : ''}`}
                onClick={() => handleSortChange('date')}
              >
                Date {sortField === 'date' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </button>
              <button 
                className={`sort-button ${sortField === 'amount' ? 'active' : ''}`}
                onClick={() => handleSortChange('amount')}
              >
                Amount {sortField === 'amount' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </button>
              <button 
                className={`sort-button ${sortField === 'confidence' ? 'active' : ''}`}
                onClick={() => handleSortChange('confidence')}
              >
                Confidence {sortField === 'confidence' && (sortDirection === 'asc' ? <FaSortUp /> : <FaSortDown />)}
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .filters-container {
          background-color: var(--neutral-0);
          border-radius: var(--border-radius-md);
          box-shadow: var(--shadow-md);
          margin-bottom: var(--space-4);
          overflow: hidden;
          transition: all var(--transition-normal);
        }
        
        .filters-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-3);
          background-color: var(--neutral-50);
          border-bottom: 1px solid var(--neutral-200);
        }
        
        .search-container {
          flex: 1;
          margin-right: var(--space-3);
        }
        
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .search-icon {
          position: absolute;
          left: var(--space-2);
          color: var(--neutral-500);
        }
        
        .search-input {
          width: 100%;
          padding: var(--space-2) var(--space-2) var(--space-2) calc(var(--space-2) * 2 + 1rem);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-md);
          transition: border-color var(--transition-quick), box-shadow var(--transition-quick);
        }
        
        .search-input:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 0.2rem rgba(98, 71, 170, 0.25);
          outline: none;
        }
        
        .filter-toggle-btn {
          display: flex;
          align-items: center;
          background-color: var(--primary);
          color: var(--neutral-0);
          border: none;
          border-radius: var(--border-radius-sm);
          padding: var(--space-2) var(--space-3);
          cursor: pointer;
          transition: background-color var(--transition-quick);
        }
        
        .filter-toggle-btn:hover {
          background-color: var(--primary-dark);
        }
        
        .filter-toggle-btn svg {
          margin-right: var(--space-1);
        }
        
        .filters-expanded {
          padding: var(--space-3);
          background-color: var(--neutral-0);
          animation: expandFilters 0.3s ease-out;
        }
        
        .filters-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--space-3);
          margin-bottom: var(--space-3);
        }
        
        @media (max-width: 992px) {
          .filters-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 576px) {
          .filters-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-700);
          margin-bottom: var(--space-1);
        }
        
        .filter-select {
          padding: var(--space-2);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-md);
          transition: border-color var(--transition-quick), box-shadow var(--transition-quick);
        }
        
        .filter-select:focus {
          border-color: var(--secondary);
          box-shadow: 0 0 0 0.2rem rgba(98, 71, 170, 0.25);
          outline: none;
        }
        
        .sort-options {
          display: flex;
          align-items: center;
          padding-top: var(--space-3);
          border-top: 1px solid var(--neutral-200);
        }
        
        .sort-label {
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
          color: var(--neutral-700);
          margin-right: var(--space-3);
        }
        
        .sort-buttons {
          display: flex;
          gap: var(--space-2);
        }
        
        .sort-button {
          display: flex;
          align-items: center;
          padding: var(--space-1) var(--space-2);
          background-color: var(--neutral-100);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-sm);
          transition: all var(--transition-quick);
          cursor: pointer;
        }
        
        .sort-button:hover {
          background-color: var(--neutral-200);
        }
        
        .sort-button.active {
          background-color: var(--secondary-light);
          color: var(--neutral-0);
          border-color: var(--secondary);
        }
        
        .sort-button svg {
          margin-left: var(--space-1);
        }
        
        @keyframes expandFilters {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 500px; }
        }
      `}</style>
    </div>
  )
}

export default ApplicationFilters