import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, Clock, ServerCrash, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveBenchmark() {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [status, setStatus] = useState('Initializing Sandbox...');
  const navigate = useNavigate();

  useEffect(() => {
    const socket = io('http://localhost:4000');
    
    socket.on('benchmark:metric', (data) => {
      setStatus('Running Load Generator...');
      setMetrics(prev => [...prev.slice(-20), data]);
    });

    socket.on('benchmark:complete', () => {
      setStatus('Benchmark Complete');
      setTimeout(() => navigate('/leaderboard'), 3000);
    });

    return () => {
      socket.disconnect();
    };
  }, [navigate]);

  const latestMetric = metrics[metrics.length - 1] || { tps: 0, p99: 0 };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center space-x-3">
            <Activity className="w-8 h-8 text-neonCyan animate-pulse" />
            <span>Live Telemetry</span>
          </h1>
          <p className="text-slate-400 mt-2">Streaming real-time metrics from isolated container</p>
        </div>
        <div className="glass px-6 py-3 rounded-full border border-neonCyan/30">
          <span className="text-neonCyan font-mono">{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Current TPS" value={latestMetric.tps.toLocaleString()} suffix="req/s" color="text-neonCyan" />
        <StatCard title="p99 Latency" value={latestMetric.p99.toFixed(2)} suffix="ms" color="text-neonPurple" />
        <StatCard title="Error Rate" value="0.00" suffix="%" color="text-green-400" />
        <StatCard title="Correctness" value="100" suffix="/ 100" color="text-slate-100" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 rounded-2xl h-[400px]">
          <h3 className="text-lg font-bold text-slate-200 mb-4">Throughput (TPS)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="timestamp" tick={false} stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#161622', borderColor: '#333' }} />
              <Line type="monotone" dataKey="tps" stroke="#06b6d4" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 rounded-2xl h-[400px]">
          <h3 className="text-lg font-bold text-slate-200 mb-4">p99 Latency (ms)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={metrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="timestamp" tick={false} stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip contentStyle={{ backgroundColor: '#161622', borderColor: '#333' }} />
              <Line type="monotone" dataKey="p99" stroke="#a855f7" strokeWidth={3} dot={false} isAnimationActive={false} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({ title, value, suffix, color }: { title: string, value: string | number, suffix: string, color: string }) {
  return (
    <div className="glass p-6 rounded-2xl">
      <h4 className="text-slate-400 text-sm font-medium mb-2">{title}</h4>
      <div className="flex items-baseline space-x-2">
        <span className={`text-4xl font-bold font-mono ${color}`}>{value}</span>
        <span className="text-slate-500 font-medium">{suffix}</span>
      </div>
    </div>
  );
}
