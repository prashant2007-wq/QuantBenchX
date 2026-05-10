import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award } from 'lucide-react';
import { io } from 'socket.io-client';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/leaderboard')
      .then(res => res.json())
      .then(data => setLeaderboard(data))
      .catch(console.error);

    const socket = io('http://localhost:4000');
    socket.on('leaderboard:update', (newEntry) => {
      setLeaderboard(prev => {
        const exists = prev.find(p => p.team === newEntry.team);
        if (exists) return prev.map(p => p.team === newEntry.team ? { ...p, ...newEntry } : p).sort((a, b) => b.score - a.score);
        return [...prev, { ...newEntry, rank: prev.length + 1 }].sort((a, b) => b.score - a.score);
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="text-center mb-12">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-slate-100 mb-4">Global Leaderboard</h1>
        <p className="text-slate-400 text-lg">Top tier matching engines ranked by throughput, latency, and correctness.</p>
      </div>

      <div className="glass rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 uppercase text-xs tracking-wider text-slate-400">
              <th className="p-6 font-semibold w-24">Rank</th>
              <th className="p-6 font-semibold">Team</th>
              <th className="p-6 font-semibold">Language</th>
              <th className="p-6 font-semibold text-right">Throughput (TPS)</th>
              <th className="p-6 font-semibold text-right">p99 Latency</th>
              <th className="p-6 font-semibold text-right">Correctness</th>
              <th className="p-6 font-semibold text-right text-neonCyan">Total Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <motion.tr 
                key={entry.team}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-6">
                  {index === 0 ? <Medal className="w-8 h-8 text-yellow-400" /> : 
                   index === 1 ? <Medal className="w-8 h-8 text-gray-400" /> : 
                   index === 2 ? <Medal className="w-8 h-8 text-amber-600" /> : 
                   <span className="text-xl font-bold text-slate-500 ml-2">#{index + 1}</span>}
                </td>
                <td className="p-6">
                  <div className="font-bold text-slate-200 text-lg">{entry.team}</div>
                </td>
                <td className="p-6 text-slate-400">{entry.language || 'N/A'}</td>
                <td className="p-6 text-right font-mono text-slate-300">{entry.tps.toLocaleString()}</td>
                <td className="p-6 text-right font-mono text-slate-300">{entry.p99}ms</td>
                <td className="p-6 text-right text-green-400 font-medium">{entry.correctness}%</td>
                <td className="p-6 text-right font-mono font-bold text-xl text-neonCyan">{entry.score.toFixed(1)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
