import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import multer from 'multer';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: '*' }
});

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

// Mock Database
const submissions: Record<string, any> = {};
const benchmarks: Record<string, any> = {};

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  res.json({ token: 'mock-token', user: { id: 1, role: 'Contestant' } });
});
app.post('/api/auth/login', (req, res) => {
  res.json({ token: 'mock-token', user: { id: 1, role: 'Contestant' } });
});

// Submissions Routes
app.post('/api/submissions/upload', upload.single('file'), (req, res) => {
  const id = Date.now().toString();
  submissions[id] = { id, status: 'Uploaded', filename: req.file?.filename, team: 'Team AlphaQuant' };
  res.json(submissions[id]);
});

app.get('/api/submissions', (req, res) => {
  res.json(Object.values(submissions));
});

app.get('/api/submissions/:id', (req, res) => {
  res.json(submissions[req.params.id]);
});

app.post('/api/submissions/:id/build', (req, res) => {
  const { id } = req.params;
  if (submissions[id]) submissions[id].status = 'Building';
  
  // Simulate build
  setTimeout(() => {
    if (submissions[id]) submissions[id].status = 'Running';
    io.emit('benchmark:log', { message: 'Build successful for ' + id });
  }, 2000);
  
  res.json({ message: 'Build started' });
});

app.post('/api/submissions/:id/run', (req, res) => {
  const { id } = req.params;
  if (submissions[id]) submissions[id].status = 'Benchmarking';
  res.json({ message: 'Run started' });
});

// Benchmark Routes
app.post('/api/benchmarks/start', (req, res) => {
  const id = Date.now().toString();
  benchmarks[id] = { id, status: 'Running', metrics: [] };
  
  // Simulate telemetry
  let i = 0;
  const interval = setInterval(() => {
    i++;
    const tps = Math.floor(Math.random() * 500) + 1000;
    const p99 = Math.random() * 5 + 1;
    const metric = { tps, p99, timestamp: Date.now() };
    benchmarks[id].metrics.push(metric);
    
    io.emit('benchmark:metric', metric);
    
    if (i >= 15) {
      clearInterval(interval);
      benchmarks[id].status = 'Completed';
      io.emit('benchmark:complete', { id });
      
      // Update leaderboard
      io.emit('leaderboard:update', {
        id,
        team: 'Team AlphaQuant',
        tps: 1200,
        p99: 2.5,
        score: 95
      });
    }
  }, 1000);

  res.json(benchmarks[id]);
});

app.get('/api/leaderboard', (req, res) => {
  res.json([
    { rank: 1, team: 'Team AlphaQuant', language: 'Rust', tps: 15420, p99: 1.2, correctness: 100, stability: 99, score: 98.5, status: 'Completed' },
    { rank: 2, team: 'Team ZeroLatency', language: 'C++', tps: 14800, p99: 1.5, correctness: 100, stability: 95, score: 95.2, status: 'Completed' },
    { rank: 3, team: 'Team MarketForge', language: 'Go', tps: 12000, p99: 2.1, correctness: 98, stability: 99, score: 88.0, status: 'Completed' },
    { rank: 4, team: 'Team RustStreet', language: 'Rust', tps: 8500, p99: 4.5, correctness: 100, stability: 80, score: 75.0, status: 'Completed' },
    { rank: 5, team: 'Team OrderFlow', language: 'Node.js', tps: 3200, p99: 15.0, correctness: 85, stability: 70, score: 55.0, status: 'Completed' }
  ]);
});

io.on('connection', (socket: any) => {
  console.log('Client connected:', socket.id);
});

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
