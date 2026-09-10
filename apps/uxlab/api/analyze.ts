export default function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST required' });
  const rating = Math.max(1, Math.min(5, Number(req.body?.rating || 3)));
  const taskSeconds = Math.max(10, Number(req.body?.taskSeconds || 42));
  const usabilityScore = Math.round((rating / 5 * 8 + Math.max(0, 2 - taskSeconds / 60)) * 10) / 10;
  return res.status(200).json({
    usabilityScore: Math.min(10, usabilityScore),
    difficulty: rating >= 4 ? 'Easy' : rating === 3 ? 'Neutral' : 'Difficult',
    insight: rating >= 4 ? 'The primary task flow is clear.' : 'Review labels and product hierarchy.',
    analyzedAt: new Date().toISOString(),
  });
}
