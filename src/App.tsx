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
import HelpContact from './pages/HelpContact';
import Notifications from './pages/Notifications';
import AboutUs from './pages/AboutUs';
// MODULE_IMPORTS_START
// MODULE_IMPORTS_END

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* MODULE_PROVIDERS_START */}
    {/* MODULE_PROVIDERS_END */}
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<HomePage />} />
            <Route path="graphs" element={<GraphsAnalysis />} />
            <Route path="ai" element={<AIPrediction />} />
            <Route path="/dashboard/notifications" element={<Notifications />} />
            <Route path="help" element={<HelpContact />} />
            <Route path="/dashboard/about" element={<AboutUs />} />
          </Route>
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/auth/error" element={<AuthError />} />
          {/* MODULE_ROUTES_START */}
          {/* MODULE_ROUTES_END */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
    {/* MODULE_PROVIDERS_CLOSE */}
  </QueryClientProvider>
);

export default App;
