# UX Lab

A research workspace connecting study setup, participant experience and synthesized findings in a single product flow.

## Features

- Complete a five-step mobile usability study.
- Select a product and rate task difficulty.
- Submit behavior to a server-side analysis endpoint.
- Update the usability score from the API response.
- Review themes, evidence frequency and participant quotes.

## API

`POST /api/analyze` accepts `rating` and `taskSeconds`, normalizes the input and returns a usability score, difficulty category and research insight.

## Development

```bash
npm install
npm run dev
```

Use `vercel dev` to include response analysis. Production: [uxlab-lovat.vercel.app](https://uxlab-lovat.vercel.app).

See [CASE_STUDY.md](./CASE_STUDY.md) for research workflow decisions.
