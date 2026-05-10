# System Design Blueprint

## Architecture Overview
QuantBenchX relies on a microservice architecture built for horizontal scalability, specifically separating the benchmarking logic from the API gateway.

### Components
1. **Frontend (React/Vite)**
   - Communicates with the backend via REST for state changes.
   - Uses WebSockets to subscribe to high-frequency telemetry data streams.

2. **API Gateway & Manager (Node.js)**
   - Manages Users, Authentication, Teams.
   - Handles submission uploads, writes metadata to DB.
   - Triggers the build pipeline.

3. **Docker Sandbox Runner (Child Process/Dockerode)**
   - Clones the contestant's code.
   - Builds an isolated Docker image.
   - Spawns the container with strict limits (e.g., `--cpus 2`, `--memory 2g`).
   - Assigns a dynamically generated internal port to prevent conflicts.

4. **Distributed Load Generator (Node.js Workers / Go)**
   - Once the container is healthy, it spawns `N` worker threads.
   - Threads fire HTTP/WebSocket packets conforming to the standard Order schema.
   - Measures response times using `process.hrtime.bigint()`.

5. **Telemetry Pipeline (Redis PubSub)**
   - The load generator publishes aggregated metrics (TPS, p99 latency) every 1 second to a Redis stream.
   - The API Gateway consumes this stream and broadcasts it via Socket.io to the frontend.

6. **Correctness Validation Engine**
   - Runs **before** the stress test.
   - Submits deterministic sequences (e.g., Buy 10 @ $100, Sell 5 @ $90).
   - Validates the resulting fill events.
   - Calculates a correctness score (0-100%).

## Scoring Formula
`Total Score = (0.40 * TPS Score) + (0.25 * Latency Score) + (0.25 * Correctness) + (0.10 * Stability)`
