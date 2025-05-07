import { useState, useEffect } from 'react';
import { FaFileDownload, FaSearch } from 'react-icons/fa';
import { PDFDownloadLink } from '@react-pdf/renderer';
import RejectedLoansPDF from '../../components/reports/RejectedLoansPDF.jsx';

function RejectedLoans() {
  const [loading, setLoading] = useState(true);
  const [loans, setLoans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect(() => {
  //   const loadData = async () => {
  //     await new Promise(resolve => setTimeout(resolve, 1000));

  //     const sampleLoans = Array.from({ length: 15 }, (_, index) => ({
  //       id: 2000 + index,
  //       customerName: `Customer ${index + 1}`,
  //       amount: Math.floor(Math.random() * 90000) + 10000,
  //       date: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
  //       confidence: Math.floor(Math.random() * 30) + 40,
  //       reason: [
  //         'Low Credit Score',
  //         'High Debt-to-Income Ratio',
  //         'Insufficient Income',
  //         'Unstable Employment',
  //         'Poor Payment History'
  //       ][Math.floor(Math.random() * 5)]
  //     }));

  //     setLoans(sampleLoans);
  //     setLoading(false);
  //   };

  //   loadData();
  // }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Optional delay
  
        const response = await fetch('http://localhost:5321/reject');
        if (!response.ok) {
          throw new Error('Failed to fetch rejected loans');
        }
  
        const loansData = await response.json();
        setLoans(loansData);
      } catch (error) {
        console.error('Error loading rejected loans:', error);
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, []);
  
  const filteredLoans = loans.filter(loan => 
    loan.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loan.id.toString().includes(searchTerm)
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading rejected loans...</p>
      </div>
    );
  }

  return (
    <div className="rejected-loans-page">
      <div className="page-header">
        <div>
          <h1>Rejected Loans</h1>
          <p className="subtitle">List of all rejected loan applications</p>
        </div>
        
        <PDFDownloadLink
          document={<RejectedLoansPDF loans={filteredLoans} />}
          fileName="rejected-loans-report.pdf"
          className="download-button"
        >
          {({ loading }) => (
            loading ? 'Generating PDF...' : (
              <>
                <FaFileDownload />
                <span>Download Report</span>
              </>
            )
          )}
        </PDFDownloadLink>
      </div>

      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by customer name or ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container card">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Rejection Reason</th>
              <th>Date</th>
              <th>Confidence</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.map(loan => (
              <tr key={loan.id}>
                <td>#{loan.id}</td>
                <td>{loan.customerName}</td>
                <td>${loan.amount.toLocaleString()}</td>
                <td>{loan.reason}</td>
                <td>{new Date(loan.date).toLocaleDateString()}</td>
                <td>
                  <div className="confidence-bar-container">
                    <div 
                      className="confidence-bar"
                      style={{ width: `${loan.confidence}%` }}
                    ></div>
                    <span className="confidence-value">{loan.confidence}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .rejected-loans-page {
          animation: fadeIn 0.5s ease-out;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-4);
        }

        .subtitle {
          color: var(--neutral-600);
        }

        .download-button {
          display: flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-3);
          background-color: var(--primary);
          color: var(--neutral-0);
          border-radius: var(--border-radius-sm);
          text-decoration: none;
          transition: background-color var(--transition-quick);
        }

        .download-button:hover {
          background-color: var(--primary-dark);
        }

        .search-container {
          position: relative;
          margin-bottom: var(--space-4);
        }

        .search-icon {
          position: absolute;
          left: var(--space-3);
          top: 50%;
          transform: translateY(-50%);
          color: var(--neutral-500);
        }

        .search-input {
          width: 100%;
          padding: var(--space-2) var(--space-2) var(--space-2) calc(var(--space-3) * 2 + 1rem);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          font-size: var(--font-size-md);
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
          background-color: var(--error);
          position: absolute;
          left: 0;
          top: 0;
          transition: width 0.5s ease;
        }

        .confidence-value {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          color: var(--neutral-800);
          font-size: var(--font-size-sm);
          font-weight: var(--font-weight-medium);
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default RejectedLoans;