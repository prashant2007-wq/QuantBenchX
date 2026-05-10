# Security Model

Given that QuantBenchX runs arbitrary, unverified code submitted by hackathon contestants, security is paramount.

## Threat Vector
Contestants could submit malicious code designed to:
- Read environment variables of the host or other contestants.
- Access the Postgres/Redis database credentials.
- Mine cryptocurrency.
- Launch DDoS attacks from our infrastructure.

## Mitigations

### 1. Docker Sandboxing
All submissions are built and executed inside isolated Docker containers.
- `network_mode: bridge`: Containers are placed on a separate Docker bridge network, not `host`.
- No access to the backend `quantbenchx-network` where Redis and Postgres live.
- Internal port bindings only.

### 2. Resource Constraints (cgroups)
- `--cpus 2`: Restricts CPU usage so malicious infinite loops do not stall the physical node.
- `--memory 2g`: Prevents OOM crashes on the host machine.
- `--pids-limit 100`: Prevents fork bombs.

### 3. Build-Time Security
The Dockerfile build process runs without mounting sensitive host paths. Build timeout is set to 5 minutes to prevent infinite loops during the `npm install` or `cargo build` phase.

### 4. Ephemeral Storage
The `/app` or working directory inside the container is wiped after the benchmark concludes.

### 5. Seccomp and Capabilities
For advanced production, we would drop all Linux capabilities (`--cap-drop=ALL`) and use a strict seccomp profile, allowing only necessary syscalls (e.g., read, write, accept, bind).
