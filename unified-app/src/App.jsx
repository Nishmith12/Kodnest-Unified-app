import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

// Import Sub-Apps
import JobTrackerApp from './apps/job-tracker/App.tsx';
import PlacementPlatformApp from './apps/placement-platform/App.jsx';
import ResumeBuilderApp from './apps/resume-builder/App.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                {/* Sub-App Routes using Splats */}
                <Route path="/jobs/*" element={<JobTrackerApp />} />
                <Route path="/placement/*" element={<PlacementPlatformApp />} />
                <Route path="/resume/*" element={<ResumeBuilderApp />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
