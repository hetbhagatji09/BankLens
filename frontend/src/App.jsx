import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import AuthLayout from './layouts/AuthLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NewApplication from './pages/NewApplication.jsx';
import PredictionResult from './pages/PredictionResult.jsx';
import History from './pages/History.jsx';
import ApprovedLoans from './pages/reports/ApprovedLoans.jsx';
import RejectedLoans from './pages/reports/RejectedLoans.jsx';
import OverView from './pages/reports/Overview.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import NotFound from './pages/NotFound.jsx';
import './App.css';

function App() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute user={user} />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/application/new" element={<NewApplication />} />
          <Route
            path="/application/:id/result"
            element={<PredictionResult />}
          />
          <Route path="/history" element={<History />} />
          <Route path="/reports/approved" element={<ApprovedLoans />} />
          <Route path="/reports/rejected" element={<RejectedLoans />} />
          <Route path="/reports/overview" element={<OverView />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Route>

      {/* Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Protected Route Component
function ProtectedRoute({ user }) {
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

// Import Outlet for ProtectedRoute
import { Outlet } from 'react-router-dom';

export default App;
