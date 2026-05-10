import { useState, useEffect } from 'react';
import { Upload, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [submissions, setSubmissions] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/submissions')
      .then(res => res.json())
      .then(data => setSubmissions(data))
      .catch(console.error);
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">Contestant Dashboard</h1>
          <p className="text-slate-400 mt-2">Manage your submissions and run benchmarks</p>
        </div>
        <Link to="/upload" className="px-6 py-3 bg-neonPurple text-white font-bold rounded-lg hover:bg-purple-600 transition-all flex items-center space-x-2">
          <Upload className="w-5 h-5" />
          <span>New Submission</span>
        </Link>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 text-slate-300 font-semibold">Submission ID</th>
              <th className="p-4 text-slate-300 font-semibold">Team</th>
              <th className="p-4 text-slate-300 font-semibold">Status</th>
              <th className="p-4 text-slate-300 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No submissions yet. Upload your trading engine to get started.
                </td>
              </tr>
            ) : (
              submissions.map(sub => (
                <tr key={sub.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-slate-300 font-mono text-sm">{sub.id}</td>
                  <td className="p-4 text-slate-300">{sub.team}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-neonCyan/20 text-neonCyan rounded-full text-sm">
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link to="/benchmark/config" className="px-4 py-2 bg-neonCyan text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all inline-flex items-center space-x-2">
                      <Play className="w-4 h-4" />
                      <span>Benchmark</span>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
