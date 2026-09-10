# Tech & Design Lab

Two portfolio products exploring opposite sides of product quality: keeping technical systems reliable and making user experiences understandable.

InfraWatch demonstrates IT/DevOps interface design and a real server health endpoint. UX Lab demonstrates research planning, interactive usability testing and server-side response analysis. Both are independent full-stack demos with deliberately different visual systems.

## Live products

| Product | Audience | Core experience | Live demo |
| --- | --- | --- | --- |
| **InfraWatch** | Developers, IT and platform teams | Inspect system health, run an API check, simulate outages, add monitors and review incidents. | [Open InfraWatch](https://infrawatch-brown.vercel.app) |
| **UX Lab** | Product designers and UX researchers | Complete a mobile usability study, submit a rating and receive a calculated usability score. | [Open UX Lab](https://uxlab-lovat.vercel.app) |

## Why these projects belong together

Both products communicate system state under uncertainty:

- InfraWatch turns runtime signals into an actionable incident overview.
- UX Lab turns participant behavior into evidence a product team can use.

The pair demonstrates information architecture, state design, data presentation and implementation across technical and human-centered domains.

## Architecture

```text
tech-design-lab/
├── apps/
│   ├── infrawatch/  # Monitoring UI + health-check API
│   └── uxlab/       # Research UI + response-analysis API
├── .github/workflows/ci.yml
└── package.json
```

Technology used across the repository:

- React 19 and TypeScript;
- Vite production builds;
- Vercel serverless functions;
- responsive, product-specific CSS;
- GitHub Actions matrix builds.

## Backend endpoints

### InfraWatch

`GET /api/health` performs a server-side health check and returns the deployment region, Node runtime, function uptime, measured latency and service states.

Example response:

```json
{
  "region": "iad1",
  "runtime": "node-v20.x",
  "latency": 35,
  "services": [{ "name": "API Gateway", "status": "operational" }]
}
```

### UX Lab

`POST /api/analyze` accepts a task rating and completion time. It normalizes the inputs and returns a usability score, difficulty classification and suggested research insight.

```json
{
  "rating": 4,
  "taskSeconds": 42
}
```

## Run locally

Requirements: Node.js 20+ and npm.

```bash
git clone https://github.com/ry2811/tech-design-lab.git
cd tech-design-lab
npm install
npm run dev:infrawatch
```

Use `npm run dev:uxlab` for the research product. To run a frontend together with its serverless API, enter that app directory and use `vercel dev`.

Build both apps:

```bash
npm run build
```

## Deployment

Create two Vercel projects from the same repository and set their Root Directory values to:

- `apps/infrawatch`
- `apps/uxlab`

## Portfolio scope

These applications are interactive portfolio demonstrations. The infrastructure incidents, participant records and business values are simulated. My contribution includes product framing, UX/UI design, frontend engineering and serverless API implementation. Detailed decisions and proposed validation methods are documented in each app's `CASE_STUDY.md`.
