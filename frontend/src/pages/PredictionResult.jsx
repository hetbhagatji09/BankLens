import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PredictionDetails from '../components/prediction/PredictionDetails.jsx';
import { FaArrowLeft, FaFileAlt, FaChartBar } from 'react-icons/fa';

function PredictionResult() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    // Check if we have data from the location state
    if (location.state?.result && location.state?.customerData) {
      setResult(location.state.result);
      setCustomerData(location.state.customerData);
      setLoading(false);
    } else {
      // Simulate fetching data from an API
      const fetchData = async () => {
        // Wait for simulated API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Random result for demo purposes
        const randomResult = {
          approved: Math.random() > 0.3,
          confidence: Math.floor(Math.random() * 30) + 70,
          riskFactors: [
            'Credit Score',
            'Debt-to-Income Ratio',
            'Employment History',
          ].filter(() => Math.random() > 0.5),
        };

        // Sample customer data
        const sampleCustomerData = {
          fullName: 'John Smith',
          age: '35',
          income: '65000',
          creditScore: '720',
          loanAmount: '25000',
          loanTerm: '36',
          employmentStatus: 'full-time',
        };

        setResult(randomResult);
        setCustomerData(sampleCustomerData);
        setLoading(false);
      };

      fetchData();
    }
  }, [id, location.state]);

  const goBack = () => {
    navigate(-1);
  };

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Processing prediction results...</p>
      </div>
    );
  }

  return (
    <div className="prediction-result-page">
      <div className="page-header">
        <div className="header-left">
          <button className="back-button" onClick={goBack}>
            <FaArrowLeft />
            <span>Back</span>
          </button>
          <div>
            <h1>Loan Prediction Result</h1>
            <p className="loan-id">Application #{id}</p>
          </div>
        </div>

        <div className="header-actions">
          <button className="action-button">
            <FaFileAlt />
            <span>Export PDF</span>
          </button>
          <button className="action-button primary" onClick={goToDashboard}>
            <FaChartBar />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      <PredictionDetails result={result} customerData={customerData} />

      <style jsx>{`
        .prediction-result-page {
          animation: fadeIn 0.5s ease-out;
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--space-4);
        }
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: var(--primary);
          font-size: var(--font-size-md);
          cursor: pointer;
          margin-right: var(--space-3);
          padding: var(--space-2);
          transition: color var(--transition-quick);
        }
        
        .back-button:hover {
          color: var(--primary-dark);
        }
        
        .back-button svg {
          margin-right: var(--space-1);
        }
        
        .loan-id {
          color: var(--neutral-600);
          margin: 0;
        }
        
        .header-actions {
          display: flex;
          gap: var(--space-2);
        }
        
        .action-button {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--space-2) var(--space-3);
          background-color: var(--neutral-100);
          border: 1px solid var(--neutral-300);
          border-radius: var(--border-radius-sm);
          color: var(--neutral-800);
          font-size: var(--font-size-md);
          cursor: pointer;
          transition: all var(--transition-quick);
        }
        
        .action-button:hover {
          background-color: var(--neutral-200);
        }
        
        .action-button.primary {
          background-color: var(--primary);
          border-color: var(--primary);
          color: var(--neutral-0);
        }
        
        .action-button.primary:hover {
          background-color: var(--primary-dark);
        }
        
        .action-button svg {
          margin-right: var(--space-2);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            gap: var(--space-3);
          }
          
          .header-actions {
            width: 100%;
          }
          
          .action-button {
            flex: 1;
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default PredictionResult;
