import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import BenchmarkConfig from './pages/BenchmarkConfig';
import LiveBenchmark from './pages/LiveBenchmark';
import Leaderboard from './pages/Leaderboard';
import Architecture from './pages/Architecture';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground grid-bg">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/benchmark/config" element={<BenchmarkConfig />} />
            <Route path="/benchmark/live" element={<LiveBenchmark />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/architecture" element={<Architecture />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
