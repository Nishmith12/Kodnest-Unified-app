import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Saved from './pages/Saved';
import Digest from './pages/Digest';
import Settings from './pages/Settings';
import Proof from './pages/Proof';

import TestPage from './pages/TestPage';
import ShipPage from './pages/ShipPage';

import NotFound from './pages/NotFound';

import { JobProvider } from './context/JobContext';

function App() {
  return (
    <JobProvider>
      <Layout>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="saved" element={<Saved />} />
          <Route path="digest" element={<Digest />} />
          <Route path="settings" element={<Settings />} />
          <Route path="proof" element={<Proof />} />
          <Route path="07-test" element={<TestPage />} />
          <Route path="08-ship" element={<ShipPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </JobProvider>
  );
}

export default App;
