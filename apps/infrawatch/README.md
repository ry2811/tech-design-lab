# InfraWatch

A technical monitoring interface that gives engineering teams a concise picture of service health, latency and incident history.

## Features

- Call a deployed backend health check.
- Display region and measured server response time.
- Simulate service failure and recovery.
- Add a new service monitor.
- Expand incident history and inspect latency percentiles.

## API

`GET /api/health` measures server execution latency and returns the Vercel region, Node runtime, function uptime and service states.

## Development

```bash
npm install
npm run dev
```

Use `vercel dev` for the complete health-check flow. Production: [infrawatch-brown.vercel.app](https://infrawatch-brown.vercel.app).

See [CASE_STUDY.md](./CASE_STUDY.md) for incident-response design decisions.
