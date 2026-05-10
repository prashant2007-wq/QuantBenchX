import { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Server, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BenchmarkConfig() {
  const navigate = useNavigate();
  const [config, setConfig] = useState({
    bots: 1000,
    duration: 60,
    rps: 5000,
  });

  const handleStart = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/benchmarks/start', {
        method: 'POST'
      });
      const data = await res.json();
      navigate('/benchmark/live', { state: { benchmarkId: data.id } });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl"
      >
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="w-8 h-8 text-neonCyan" />
          <h1 className="text-3xl font-bold text-slate-100">Benchmark Configuration</h1>
        </div>

        <div className="space-y-8">
          <div>
            <label className="block text-slate-400 mb-2 font-medium">Distributed Bot Count</label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                min="100" max="10000" step="100"
                value={config.bots}
                onChange={e => setConfig({...config, bots: parseInt(e.target.value)})}
                className="w-full accent-neonCyan"
              />
              <span className="text-xl font-mono text-neonCyan w-20">{config.bots}</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2 font-medium">Target Requests/Sec (TPS)</label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                min="500" max="50000" step="500"
                value={config.rps}
                onChange={e => setConfig({...config, rps: parseInt(e.target.value)})}
                className="w-full accent-neonPurple"
              />
              <span className="text-xl font-mono text-neonPurple w-20">{config.rps}</span>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-2 font-medium">Duration (Seconds)</label>
            <div className="flex items-center space-x-4">
              <input 
                type="range" 
                min="10" max="300" step="10"
                value={config.duration}
                onChange={e => setConfig({...config, duration: parseInt(e.target.value)})}
                className="w-full accent-white"
              />
              <span className="text-xl font-mono text-white w-20">{config.duration}s</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <Server className="w-6 h-6 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Sandbox Limits</p>
                <p className="text-slate-300 font-medium">2 vCPU, 2GB RAM</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center space-x-3">
              <Zap className="w-6 h-6 text-slate-400" />
              <div>
                <p className="text-sm text-slate-500">Traffic Pattern</p>
                <p className="text-slate-300 font-medium">Bursty, Random Pairs</p>
              </div>
            </div>
          </div>

          <button 
            onClick={handleStart}
            className="w-full mt-8 py-4 bg-neonCyan text-black font-bold text-lg rounded-xl hover:bg-cyan-400 transition-all flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(6,182,212,0.3)]"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>Launch Distributed Load Test</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
