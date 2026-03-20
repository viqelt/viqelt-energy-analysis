import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/Home';
import GraphsAnalysis from './pages/GraphsAnalysis';
import AIPrediction from './pages/AIPrediction';
import HelpContact from './pages/HelpContact';
import AuthCallback from './pages/AuthCallback';
import AuthError from './pages/AuthError';
import Notifications from './pages/Notifications';
import AboutUs from './pages/AboutUs';

const queryClient = new QueryClient();

// 🔒 Protected Route — redirects to login if not authenticated
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = sessionStorage.getItem("veam-logged-in") === "true";
  if (!isLoggedIn) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="graphs" element={<GraphsAnalysis />} />
            <Route path="ai" element={<AIPrediction />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="help" element={<HelpContact />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/error" element={<AuthError />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
