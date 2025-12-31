import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { LoginPage } from './modules/auth/pages/LoginPage';
import { EmployeeDashboardPage } from './modules/expenses/pages/EmployeeDashboardPage';
import { NewExpensePage } from './modules/expenses/pages/NewExpensePage';
import { AdminDashboardPage } from './modules/admin/pages/AdminDashboardPage';
import { ProtectedRoute } from './components/layout/ProtectedRoute';

import { AdminReportsPage } from './modules/admin/pages/AdminReportsPage';
import { AdminTeamPage } from './modules/admin/pages/AdminTeamPage';
import { AdminSettingsPage } from './modules/admin/pages/AdminSettingsPage';
import { ToastContainer } from './components/ui/ToastContainer';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Employee Routes */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <EmployeeDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/expenses/new" element={
          <ProtectedRoute>
            <NewExpensePage />
          </ProtectedRoute>
        } />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/reports" element={
          <ProtectedRoute>
            <AdminReportsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/team" element={
          <ProtectedRoute>
            <AdminTeamPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/settings" element={
          <ProtectedRoute>
            <AdminSettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
