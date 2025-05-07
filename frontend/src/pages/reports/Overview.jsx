import { useState, useEffect } from 'react';
import Chart from '../../components/dashboard/Chart.jsx';

function Overview() {
  const [loading, setLoading] = useState(true);
  const [yearlyData, setYearlyData] = useState(null);
  const [approvalRateData, setApprovalRateData] = useState(null);
  const [loanTypeData, setLoanTypeData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const yearly = {
        labels: ['2020', '2021', '2022', '2023'],
        datasets: [{
          label: 'Total Loan Amount (Millions)',
          data: [12.5, 15.8, 18.2, 22.4],
          backgroundColor: 'rgba(98, 71, 170, 0.6)',
          borderColor: 'rgba(98, 71, 170, 1)',
          borderWidth: 1
        }]
      };

      const approvalRate = {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
          label: 'Approval Rate (%)',
          data: [65, 70, 68, 72],
          backgroundColor: 'rgba(46, 139, 87, 0.6)',
          borderColor: 'rgba(46, 139, 87, 1)',
          borderWidth: 1
        }]
      };

      const loanTypes = {
        labels: ['Home', 'Business', 'Personal', 'Education', 'Vehicle'],
        datasets: [{
          label: 'Distribution by Loan Type',
          data: [35, 25, 20, 12, 8],
          backgroundColor: [
            'rgba(50, 74, 142, 0.7)',
            'rgba(98, 71, 170, 0.7)',
            'rgba(138, 111, 212, 0.7)',
            'rgba(157, 78, 221, 0.7)',
            'rgba(199, 125, 255, 0.7)'
          ],
          borderColor: [
            'rgba(50, 74, 142, 1)',
            'rgba(98, 71, 170, 1)',
            'rgba(138, 111, 212, 1)',
            'rgba(157, 78, 221, 1)',
            'rgba(199, 125, 255, 1)'
          ],
          borderWidth: 1
        }]
      };

      setYearlyData(yearly);
      setApprovalRateData(approvalRate);
      setLoanTypeData(loanTypes);
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading overview data...</p>
      </div>
    );
  }

  return (
    <div className="overview-page">
      <div className="page-header">
        <h1>Overview Report</h1>
        <p className="subtitle">Comprehensive analysis of loan applications and trends</p>
      </div>

      <div className="charts-grid">
        <div className="chart-card card">
          <h2>Yearly Loan Volume</h2>
          <Chart data={yearlyData} chartType="bar" />
        </div>

        <div className="chart-card card">
          <h2>Quarterly Approval Rate</h2>
          <Chart data={approvalRateData} chartType="line" />
        </div>

        <div className="chart-card card">
          <h2>Loan Type Distribution</h2>
          <Chart data={loanTypeData} chartType="doughnut" />
        </div>
      </div>

      <style jsx>{`
        .overview-page {
          animation: fadeIn 0.5s ease-out;
        }

        .page-header {
          margin-bottom: var(--space-4);
        }

        .subtitle {
          color: var(--neutral-600);
        }

        .charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
        }

        .chart-card {
          padding: var(--space-4);
        }

        .chart-card:last-child {
          grid-column: 1 / -1;
        }

        .chart-card h2 {
          margin-bottom: var(--space-3);
          color: var(--primary);
          font-size: var(--font-size-lg);
        }

        @media (max-width: 992px) {
          .charts-grid {
            grid-template-columns: 1fr;
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

export default Overview;