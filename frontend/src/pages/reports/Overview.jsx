import { useState, useEffect } from 'react';
import Chart from '../../components/dashboard/Chart.jsx';

function Overview() {
  const [loading, setLoading] = useState(true);
  const [yearlyData, setYearlyData] = useState(null);
  const [approvalRateData, setApprovalRateData] = useState(null);
  const [loanTypeData, setLoanTypeData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const distributionRes = await fetch('http://localhost:5321/pie-chart');
        if (!distributionRes.ok) throw new Error('Failed to fetch distribution data');
        const distribution = await distributionRes.json();
  
        setLoanTypeData({
          labels: distribution.Purpose,
          datasets: [
            {
              label: 'Purpose Count',
              data: distribution.PurposeCount,
              backgroundColor: [
                '#6366F1', '#EC4899', '#F59E0B', '#10B981', '#3B82F6', '#EF4444'
              ],
              borderWidth: 1
            }
          ]
        });
  
        const yearlyRes = await fetch('http://localhost:5321/yearData');
        if (!yearlyRes.ok) throw new Error('Failed to fetch yearly data');
        const yearly = await yearlyRes.json();
  
        setYearlyData({
          labels: yearly.Years, 
          datasets: [{
            label: 'Total Loan Amount',
            data: yearly.TotalAmount,
            backgroundColor: 'rgba(98, 71, 170, 0.6)',
            borderColor: 'rgba(98, 71, 170, 1)',
            borderWidth: 1
          }]
        });
  
        const approvalRes = await fetch('http://localhost:5321/quaterData');
        // console.log(approvalRes.response)
        if (!approvalRes.ok) throw new Error('Failed to fetch approval rate data');
        const approval = await approvalRes.json();
  
        setApprovalRateData({
          labels: ['Q1','Q2','Q3','Q4'],
          datasets: [{
            label: 'Approval Rate in Quaters (%)',
            data: approval,
            backgroundColor: 'rgba(46, 139, 87, 0.6)',
            borderColor: 'rgba(46, 139, 87, 1)',
            borderWidth: 1
          }]
        });
  
      } catch (error) {
        console.error('Data Fetch Error:', error);
      }
  
      setLoading(false);
    };
  
    fetchData();
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