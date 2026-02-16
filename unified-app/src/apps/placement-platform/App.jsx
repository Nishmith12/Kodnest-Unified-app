import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Practice from './pages/Practice';
import Results from './pages/Results';
import History from './pages/History';
import Assessments from './pages/Assessments';
import Resources from './pages/Resources';
import Profile from './pages/Profile';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import Proof from './pages/Proof';

function App() {
    return (
        <Routes>
            <Route index element={<LandingPage />} />
            <Route path="dashboard" element={<DashboardLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="practice" element={<Practice />} />
                <Route path="practice/results" element={<Results />} />
                <Route path="practice/history" element={<History />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="07-test" element={<TestChecklist />} />
            <Route path="08-ship" element={<Ship />} />
            <Route path="proof" element={<Proof />} />
            <Route path="*" element={<Navigate to="/placement/" replace />} />
        </Routes>
    );
}

export default App;
