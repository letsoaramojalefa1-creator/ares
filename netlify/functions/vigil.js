// Server-side VIGIL endpoint. The Anthropic key never reaches the browser.
const reply = (code, obj) => ({ statusCode: code, headers: { 'content-type': 'application/json' }, body: JSON.stringify(obj) });

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return reply(405, { error: 'method' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return reply(503, { error: 'AI not configured' });

  const su = process.env.SUPABASE_URL, sk = process.env.SUPABASE_ANON_KEY;
  if (su && sk) {
    const token = (event.headers.authorization || '').replace(/^Bearer /i, '');
    if (!token) return reply(401, { error: 'auth' });
    const u = await fetch(su + '/auth/v1/user', { headers: { Authorization: 'Bearer ' + token, apikey: sk } });
    if (!u.ok) return reply(401, { error: 'auth' });
    const who = await u.json();
    if (process.env.ALLOWED_EMAIL && who.email !== process.env.ALLOWED_EMAIL) return reply(403, { error: 'forbidden' });
  } else if (process.env.ALLOW_ANON !== 'true') {
    return reply(401, { error: 'Sign-in service not configured' });
  }

  let body;
  try { body = JSON.parse(event.body || '{}'); } catch (e) { return reply(400, { error: 'bad json' }); }
  const messages = Array.isArray(body.messages)
    ? body.messages.slice(-14).map((m) => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: String(m.content).slice(0, 12000) }))
    : [];
  if (!messages.length || messages[messages.length - 1].role !== 'user') return reply(400, { error: 'bad messages' });

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', max_tokens: 1800, messages })
  });
  if (res.status === 429) return reply(429, { error: 'rate' });
  if (!res.ok) return reply(502, { error: 'upstream' });
  const data = await res.json();
  return reply(200, { text: (data.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n') });
};
