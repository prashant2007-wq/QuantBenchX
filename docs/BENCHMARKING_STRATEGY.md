# Benchmarking Strategy

## 1. Workload Generation
Instead of a simple synchronous loop, QuantBenchX uses a distributed or multi-threaded worker model to generate load.
- **Warm-up Phase**: Sends 100 requests per second for 5 seconds to warm up JIT compilers (e.g., V8 for Node, JVM) or allow cache lines to settle.
- **Ramp-up Phase**: Exponentially increases bots/TPS over the next 10 seconds.
- **Sustained Load**: Hits the engine with configured RPS for the main duration.
- **Bursty Traffic Simulation**: Randomly introduces spikes of 5x RPS for 200ms to test order queueing mechanisms.

## 2. Latency Measurement
- Timers use `process.hrtime.bigint()` (or equivalent monotonic high-res clocks) to measure down to the nanosecond.
- **Coordinated Omission**: To prevent the classic load testing problem where delayed responses artificially skew percentiles, load generation uses an open-model (sending requests at scheduled intervals regardless of whether previous ones returned).

## 3. Order Distribution
- 70% Limit Orders
- 20% Market Orders
- 10% Cancel Orders
- Symbol distribution: Uniform across 10 dummy symbols (e.g., AAPL, MSFT, BTC).

## 4. Metrics Aggregation
Percentiles are calculated via an HDR Histogram to handle millions of data points without memory exhaustion.
