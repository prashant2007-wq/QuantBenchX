import { Link } from 'react-router-dom';
import { Activity, Cpu, UploadCloud, Trophy, LayoutDashboard, Share2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Activity className="w-8 h-8 text-neonCyan" />
          <span className="text-xl font-bold text-gradient tracking-wider">QuantBenchX</span>
        </Link>
        <div className="flex space-x-6">
          <Link to="/dashboard" className="flex items-center space-x-2 hover:text-neonCyan transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <Link to="/upload" className="flex items-center space-x-2 hover:text-neonCyan transition-colors">
            <UploadCloud className="w-4 h-4" />
            <span>Upload</span>
          </Link>
          <Link to="/leaderboard" className="flex items-center space-x-2 hover:text-neonPurple transition-colors">
            <Trophy className="w-4 h-4" />
            <span>Leaderboard</span>
          </Link>
          <Link to="/architecture" className="flex items-center space-x-2 hover:text-neonCyan transition-colors">
            <Share2 className="w-4 h-4" />
            <span>Architecture</span>
          </Link>
          <Link to="/benchmark/live" className="flex items-center space-x-2 hover:text-neonPurple transition-colors">
            <Cpu className="w-4 h-4" />
            <span>Live Bench</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
