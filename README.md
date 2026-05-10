# QuantBenchX 🚀

**Distributed Benchmarking & Hosting Platform for Trading Infrastructure**

Built for the **IICPC Summer Hackathon 2026**.

## Problem Statement
In high-frequency trading (HFT) and modern crypto exchanges, matching engines and orderbooks are the critical bottlenecks. Contestants need a secure, distributed environment to upload their C++/Rust/Go/Node.js trading infrastructure and see how it performs under massive, bursty, distributed load.

## Features
- **Secure Containerized Sandboxing**: Submissions run in isolated Docker containers with CPU/memory limits.
- **Distributed Load Testing**: A simulated fleet of bots sends concurrent WebSocket and REST HTTP requests.
- **Real-time Telemetry**: Streams p50/p90/p99 latency, TPS, and error rates live to a dashboard via Socket.io.
- **Correctness Checker**: Sends deterministic orders to ensure price-time priority and accurate partial fills.
- **Global Leaderboard**: Ranks engines based on a composite score formula.
- **Premium Dashboard**: Glassmorphism UI with real-time charts using Recharts.

## Tech Stack
- **Frontend**: React + TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts
- **Backend**: Node.js, Express, Socket.io, Dockerode
- **Infrastructure**: Docker, Docker Compose
- **Database / Cache**: PostgreSQL, Redis (simulated via in-memory/mock logic for MVP)

## Quick Start (Docker Compose)
1. Clone the repository.
2. Run `docker-compose up --build -d` inside the `infra/` directory:
   ```bash
   cd infra
   docker-compose up --build
   ```
3. Open `http://localhost:5173` for the web interface.
4. Backend runs on `http://localhost:4000`.

## Testing the Sample Benchmark
1. Go to **Upload Engine** in the UI.
2. The example engine is available in `examples/sample-engine`. You can zip this folder.
3. Upload it via the UI (or use the mock upload button).
4. Navigate to the **Dashboard** -> **Benchmark**.
5. Set the simulated bot load and duration, then hit **Launch**.
6. View the live telemetry charts, and finally the **Leaderboard**.

## Docs
- [System Design](./docs/SYSTEM_DESIGN.md)
- [API Documentation](./docs/API_DOCS.md)
- [Benchmarking Strategy](./docs/BENCHMARKING_STRATEGY.md)
- [Security Model](./docs/SECURITY_MODEL.md)

## Future Scope
- **Kubernetes Integration**: For true multi-node distributed benchmarking.
- **eBPF Profiling**: To show deep kernel-level network latency to contestants.
- **WASM Support**: Instead of Docker, run pure WebAssembly matching engines for microsecond cold starts.

---
*Developed for IICPC 2026.*
