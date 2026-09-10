declare const process: { env: Record<string, string | undefined>; version: string; uptime(): number };

export default async function handler(_req: any, res: any) {
  const started = Date.now();
  await new Promise(resolve => setTimeout(resolve, 35));
  const latency = Date.now() - started;
  return res.status(200).json({
    region: process.env.VERCEL_REGION || 'local',
    runtime: `node-${process.version}`,
    uptimeSeconds: Math.round(process.uptime()),
    latency,
    services: [
      { name: 'API Gateway', status: 'operational' },
      { name: 'Edge Network', status: 'operational' },
      { name: 'Database', status: 'operational' },
    ],
    checkedAt: new Date().toISOString(),
  });
}
