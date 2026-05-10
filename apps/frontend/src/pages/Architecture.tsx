import { motion } from 'framer-motion';
import { Database, Server, Cpu, Globe, RefreshCcw, Box } from 'lucide-react';

export default function Architecture() {
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-100 mb-4">System Architecture</h1>
        <p className="text-slate-400 text-lg">Distributed Benchmarking & Hosting Platform for Trading Infrastructure</p>
      </div>

      <div className="relative">
        <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-neonCyan via-neonPurple to-neonCyan opacity-20 transform -translate-x-1/2"></div>
        
        <ArchNode 
          icon={<Globe className="w-8 h-8 text-neonCyan" />}
          title="React Frontend"
          desc="Vite + Tailwind + Recharts. Connects via WebSocket for real-time telemetry streaming."
          align="left"
        />
        
        <ArchNode 
          icon={<Server className="w-8 h-8 text-neonPurple" />}
          title="API Gateway & WebSocket Server"
          desc="Node.js/Express. Handles auth, submission routing, and real-time state broadcast via Socket.io."
          align="right"
        />

        <ArchNode 
          icon={<Box className="w-8 h-8 text-slate-300" />}
          title="Docker Sandbox Runner"
          desc="Spawns isolated container per team. Imposes strict CPU/Memory cgroups. Runs user's custom matching engine."
          align="left"
        />

        <ArchNode 
          icon={<Cpu className="w-8 h-8 text-red-400" />}
          title="Distributed Load Generator"
          desc="Simulates massive bursty bot traffic. Measures p50/p90/p99 latency using high-resolution timers (hrtime)."
          align="right"
        />

        <ArchNode 
          icon={<RefreshCcw className="w-8 h-8 text-green-400" />}
          title="Correctness Checker"
          desc="Sends deterministic order sequences. Validates price-time priority, partial fills, and balance invariants."
          align="left"
        />

        <ArchNode 
          icon={<Database className="w-8 h-8 text-blue-400" />}
          title="Metrics Store (Postgres + Redis)"
          desc="Redis acts as Pub/Sub for telemetry. Postgres persistently stores historical benchmark series and leaderboard state."
          align="right"
        />
      </div>
    </div>
  );
}

function ArchNode({ icon, title, desc, align }: { icon: React.ReactNode, title: string, desc: string, align: 'left' | 'right' }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`flex flex-col lg:flex-row items-center mb-16 ${align === 'right' ? 'lg:flex-row-reverse' : ''}`}
    >
      <div className="lg:w-1/2 p-6">
        <div className={`glass p-8 rounded-2xl relative ${align === 'left' ? 'lg:mr-12' : 'lg:ml-12'}`}>
          <div className={`absolute top-1/2 transform -translate-y-1/2 w-12 h-1 bg-neonCyan opacity-20 hidden lg:block ${align === 'left' ? '-right-12' : '-left-12'}`}></div>
          <div className="mb-4">{icon}</div>
          <h3 className="text-xl font-bold text-slate-200 mb-2">{title}</h3>
          <p className="text-slate-400 leading-relaxed">{desc}</p>
        </div>
      </div>
      <div className="lg:w-1/2 flex justify-center hidden lg:flex">
        <div className="w-8 h-8 rounded-full bg-background border-4 border-neonCyan z-10"></div>
      </div>
    </motion.div>
  );
}
