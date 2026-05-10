# API Documentation

## Authentication
### `POST /api/auth/register`
Creates a new team.

### `POST /api/auth/login`
Returns a JWT for the user.

## Submissions
### `POST /api/submissions/upload`
Accepts `multipart/form-data` with a zip file.
**Response**: `{ "id": "123", "status": "Uploaded" }`

### `GET /api/submissions`
Returns an array of submissions for the current user.

### `POST /api/submissions/:id/build`
Triggers the Docker build phase. Emits `benchmark:log` websocket events.

### `POST /api/submissions/:id/run`
Prepares the environment to run the submission.

## Benchmarks
### `POST /api/benchmarks/start`
Starts the distributed load generator against the running container.
**Payload**: `{ "bots": 1000, "duration": 60, "rps": 5000 }`
**Response**: Returns Benchmark ID. Subscribes client to live telemetry.

## Leaderboard
### `GET /api/leaderboard`
Returns the sorted top-K ranking based on the composite score.

## WebSockets
- **`benchmark:metric`**: Fired 1x per second during load test.
  `{ "tps": 4200, "p99": 1.2, "timestamp": 169000000 }`
- **`benchmark:log`**: Fired for container build/run stdout/stderr.
- **`benchmark:complete`**: Fired when the benchmark finishes.
- **`leaderboard:update`**: Fired when a new score alters the leaderboard.
