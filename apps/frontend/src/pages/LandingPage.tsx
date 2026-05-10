import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Activity, Server, BarChart3 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-6xl font-extrabold mb-6 tracking-tight">
          Distributed <span className="text-gradient">Benchmarking</span> & <span className="text-gradient">Hosting</span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          The ultimate platform for testing trading infrastructure. Upload your orderbook or matching engine, 
          deploy it in an isolated sandbox, and subject it to massive distributed trading bot traffic.
        </p>
        <div className="flex space-x-4 justify-center">
          <Link to="/upload" className="px-8 py-4 bg-neonCyan text-black font-bold rounded-full hover:bg-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.5)]">
            Submit Engine
          </Link>
          <Link to="/leaderboard" className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
            View Leaderboard
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full max-w-6xl">
        <FeatureCard 
          icon={<Shield className="w-8 h-8 text-neonCyan" />}
          title="Secure Sandboxing"
          desc="Your trading engine runs in isolated Docker containers with strict CPU, memory, and network constraints."
        />
        <FeatureCard 
          icon={<Zap className="w-8 h-8 text-neonPurple" />}
          title="Distributed Load"
          desc="Simulate bursty traffic from thousands of concurrent bots sending limit and market orders."
        />
        <FeatureCard 
          icon={<Activity className="w-8 h-8 text-neonCyan" />}
          title="Real-Time Telemetry"
          desc="Live streaming of TPS, p50/p90/p99 latency, and error rates via WebSocket."
        />
        <FeatureCard 
          icon={<Server className="w-8 h-8 text-neonPurple" />}
          title="Correctness Validation"
          desc="Automated checks for price-time priority, valid matching, and rejection of invalid orders."
        />
        <FeatureCard 
          icon={<BarChart3 className="w-8 h-8 text-neonCyan" />}
          title="Live Leaderboard"
          desc="Real-time rankings based on a composite score of throughput, latency, correctness, and stability."
        />
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="glass p-8 rounded-2xl flex flex-col items-start"
    >
      <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-slate-200">{title}</h3>
      <p className="text-slate-400 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
