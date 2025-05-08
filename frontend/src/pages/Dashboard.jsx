import { useState, useEffect } from 'react';
import RecentApplications from '../components/dashboard/RecentApplications.jsx';
import Chart from '../components/dashboard/Chart.jsx';
import axios from 'axios';

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [recentApplications, setRecentApplications] = useState([]);
  const [monthlyData, setMonthlyData] = useState(null);
  const [distributionData, setDistributionData] = useState(null);

  // useEffect(() => {
  //   const loadData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 1000));

  //     const applications = [
  //       {
  //         id: 1203,
  //         customerName: 'John Smith',
  //         date: '2023-10-15',
  //         amount: 25000,
  //         status: 'Approved',
  //         confidence: 86,
  //       },
  //       {
  //         id: 1202,
  //         customerName: 'Emily Johnson',
  //         date: '2023-10-14',
  //         amount: 45000,
  //         status: 'Rejected',
  //         confidence: 34,
  //       },
  //       {
  //         id: 1201,
  //         customerName: 'Michael Brown',
  //         date: '2023-10-13',
  //         amount: 10000,
  //         status: 'Approved',
  //         confidence: 92,
  //       },
  //       {
  //         id: 1200,
  //         customerName: 'Sarah Wilson',
  //         date: '2023-10-12',
  //         amount: 75000,
  //         status: 'Approved',
  //         confidence: 78,
  //       },
  //       {
  //         id: 1199,
  //         customerName: 'David Lee',
  //         date: '2023-10-11',
  //         amount: 30000,
  //         status: 'Rejected',
  //         confidence: 45,
  //       },
  //     ];

  //     const monthly = {
  //       labels: [
  //         'Jan',
  //         'Feb',
  //         'Mar',
  //         'Apr',
  //         'May',
  //         'Jun',
  //         'Jul',
  //         'Aug',
  //         'Sep',
  //         'Oct',
  //         'Nov',
  //         'Dec',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Approved',
  //           data: [12, 19, 15, 17, 22, 24, 20, 18, 24, 16, 0, 0],
  //           backgroundColor: 'rgba(46, 139, 87, 0.6)',
  //           borderColor: 'rgba(46, 139, 87, 1)',
  //           borderWidth: 1,
  //         },
  //         {
  //           label: 'Rejected',
  //           data: [8, 7, 5, 9, 8, 6, 10, 5, 7, 12, 0, 0],
  //           backgroundColor: 'rgba(220, 20, 60, 0.6)',
  //           borderColor: 'rgba(220, 20, 60, 1)',
  //           borderWidth: 1,
  //         },
  //       ],
  //     };

  //     const distribution = {
  //       labels: [
  //         'Home',
  //         'Car',
  //         'Education',
  //         'Business',
  //         'Personal',
  //         'Debt Consolidation',
  //         'Medical',
  //       ],
  //       datasets: [
  //         {
  //           label: 'Loan Distribution',
  //           data: [35, 20, 15, 10, 8, 7, 5],
  //           backgroundColor: [
  //             'rgba(50, 74, 142, 0.7)',
  //             'rgba(98, 71, 170, 0.7)',
  //             'rgba(138, 111, 212, 0.7)',
  //             'rgba(157, 78, 221, 0.7)',
  //             'rgba(199, 125, 255, 0.7)',
  //             'rgba(114, 9, 183, 0.7)',
  //             'rgba(74, 42, 128, 0.7)',
  //           ],
  //           borderColor: [
  //             'rgba(50, 74, 142, 1)',
  //             'rgba(98, 71, 170, 1)',
  //             'rgba(138, 111, 212, 1)',
  //             'rgba(157, 78, 221, 1)',
  //             'rgba(199, 125, 255, 1)',
  //             'rgba(114, 9, 183, 1)',
  //             'rgba(74, 42, 128, 1)',
  //           ],
  //           borderWidth: 1,
  //         },
  //       ],
  //     };

  //     setRecentApplications(applications);
  //     setMonthlyData(monthly);
  //     setDistributionData(distribution);
  //     setLoading(false);
  //   };

  //   loadData();
  // }, []);

  // useEffect(() => {
  //   const loadData = async () => {
  //     setLoading(true);
  
  //     // Optional delay
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  
  //     // Fetch recent applications
  //     try {
  //       const res = await fetch('http://localhost:5321/');
  //       if (!res.ok) throw new Error('Failed to fetch recent applications');
  //       const data = await res.json();
  //       setRecentApplications(data);
  //     } catch (error) {
  //       console.error('Recent Applications Error:', error);
  //     }
  
  //     // Fetch monthly chart data
  //     try {
  //       const res = await fetch('http://localhost:5321/monthly');
  //       if (!res.ok) throw new Error('Failed to fetch monthly data');
  //       const data = await res.json();
  //       setMonthlyData(data);
  //     } catch (error) {
  //       console.error('Monthly Data Error:', error);
  //     }
  
  //     // Fetch distribution chart data
  //     try {
  //       const res = await fetch('http://localhost:5321/pie-chart');
  //       if (!res.ok) throw new Error('Failed to fetch distribution data');
  //       const data = await res.json();
  //       setDistributionData(data);
  //     } catch (error) {
  //       console.error('Distribution Data Error:', error);
  //     }
  
  //     setLoading(false);
  //   };
  
  //   loadData();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      // Fetch Monthly Chart Data
      try {
        const monthlyRes = await fetch('http://localhost:5321/monthly');
        if (!monthlyRes.ok) throw new Error('Failed to fetch monthly data');
        const monthly = await monthlyRes.json();
        
        const monthlyChartData = {
           labels: ['Jan','Feb','Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec'],
          datasets: [
            {
              label: 'Approved',
              data:monthly.Approve ,
              backgroundColor: 'rgba(46, 139, 87, 0.6)',
              borderColor: 'rgba(46, 139, 87, 1)',
              borderWidth: 1,

            },
            {
              label: 'Rejected',
              data: monthly.Reject,
              backgroundColor: 'rgba(220, 20, 60, 0.6)',
              borderColor: 'rgba(220, 20, 60, 1)',
              borderWidth: 1,
            }
          ]
        };
        
        setMonthlyData(monthlyChartData);
      } catch (error) {
        console.error('Monthly Data Error:', error);
      }

      // Fetch Distribution Chart Data
      try {
        const distributionRes = await fetch('http://localhost:5321/pie-chart');
        if (!distributionRes.ok) throw new Error('Failed to fetch distribution data');
        const distribution = await distributionRes.json();
        console.log(distribution);
        
        // Define your colors array
        const backgroundColors = [
          'rgba(50, 74, 142, 0.7)',
          'rgba(98, 71, 170, 0.7)',
          'rgba(138, 111, 212, 0.7)',
          'rgba(157, 78, 221, 0.7)',
          'rgba(199, 125, 255, 0.7)',
          'rgba(114, 9, 183, 0.7)',
          'rgba(74, 42, 128, 0.7)',
        ];
        
        const borderColors = [
          'rgba(50, 74, 142, 1)',
          'rgba(98, 71, 170, 1)',
          'rgba(138, 111, 212, 1)',
          'rgba(157, 78, 221, 1)',
          'rgba(199, 125, 255, 1)',
          'rgba(114, 9, 183, 1)',
          'rgba(74, 42, 128, 1)',
        ];
      
        const distributionChartData = {
          labels: distribution.Purpose,
          datasets: [
            {
              label: 'Purpose Count',
              data: distribution.PurposeCount,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1
            }
          ]
        };
        
        setDistributionData(distributionChartData);
      } catch (error) {
        console.error('Distribution Data Error:', error);
      }

      setLoading(false);
    

    try {
      // Fetch pie chart data using fetch
      const distributionRes = await fetch('http://localhost:5321/pie-chart');
      if (!distributionRes.ok) throw new Error('Failed to fetch distribution data');
      const distribution = await distributionRes.json();
      console.log(distribution);

      const distributionChartData = {
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
      };

      setDistributionData(distributionChartData);

      // Fetch applications using axios
      const response = await axios.get('http://localhost:5321/firstFive');
      const data = response.data;

      
      

      setRecentApplications(data);
      // setFilteredApplications(firstFive);
      // setTotalPages(1);
    } catch (error) {
      console.error('Error fetching applications:', error);
      setLoading(false);
    }
    };
    fetchData();
  }, []);
  

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="charts-container">
        <div className="chart-card card">
          <h2 className="chart-title">Monthly Applications</h2>
          <Chart data={monthlyData} chartType="bar" />
        </div>

        <div className="chart-card card">
          <h2 className="chart-title">Loan Purpose Distribution</h2>
          <Chart data={distributionData} chartType="doughnut" />
        </div>
      </div>

      <RecentApplications applications={recentApplications} />

      <style jsx>{`
        .dashboard {
          animation: fadeIn 0.5s ease-out;
        }
        
        .page-header {
          margin-bottom: var(--space-4);
        }
        
        .charts-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: var(--space-4);
          margin-bottom: var(--space-4);
        }
        
        .chart-card {
          padding: var(--space-3);
        }
        
        .chart-title {
          margin-top: 0;
          margin-bottom: var(--space-3);
          font-size: var(--font-size-lg);
          color: var(--neutral-800);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 50vh;
        }
        
        @media (max-width: 992px) {
          .charts-container {
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

export default Dashboard;