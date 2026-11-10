import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

// UGC brief intake for /ugc/. Kept separate from /api/contact (travel inquiries)
// so briefs never land in the travel pipeline. Every brief is stored in KV under
// `ugc-brief:`; if UGC_WEBHOOK_URL is set it is also forwarded to Hermes as an
// `event_type: "ugc_brief"` payload, signed like the travel webhook.

export const prerender = false;

const LIMITS = {
  name: 120,
  email: 200,
  brand: 120,
  product: 500,
  usage: 80,
  budget: 80,
  timeline: 120,
  message: 5000,
  deliverable: 60,
};

async function hmacSha256(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw', new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export const POST: APIRoute = async ({ request }) => {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ success: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: bots fill hidden fields; pretend it worked.
  if (formData.get('website')) {
    return json({ success: true }, 200);
  }

  const name = field(formData, 'name', LIMITS.name);
  const email = field(formData, 'email', LIMITS.email);
  const brand = field(formData, 'brand', LIMITS.brand);
  const message = field(formData, 'message', LIMITS.message);
  const product = field(formData, 'product', LIMITS.product) ?? '';
  const usage = field(formData, 'usage', LIMITS.usage) ?? '';
  const budget = field(formData, 'budget', LIMITS.budget) ?? '';
  const timeline = field(formData, 'timeline', LIMITS.timeline) ?? '';
  const deliverables = formData
    .getAll('deliverables')
    .filter((v): v is string => typeof v === 'string')
    .map((v) => v.trim().slice(0, LIMITS.deliverable))
    .filter(Boolean)
    .slice(0, 12);

  if (!name || !email || !brand || !message) {
    return json({ success: false, error: 'Please fill in your name, email, brand and the brief.' }, 400);
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ success: false, error: 'Please enter a valid email address.' }, 400);
  }

  const timestamp = Date.now();
  const id = crypto.randomUUID();
  const brief = {
    id,
    name,
    email,
    brand,
    product,
    deliverables,
    usage,
    budget,
    timeline,
    message,
    submittedAt: new Date(timestamp).toISOString(),
  };

  try {
    // TRAVEL_INQUIRIES is the site's general inbox namespace; the key prefix keeps briefs separate.
    await env.TRAVEL_INQUIRIES.put(
      `ugc-brief:${timestamp}:${id}`,
      JSON.stringify(brief),
      { metadata: { name, email, brand, budget, submittedAt: brief.submittedAt } }
    );
  } catch (err) {
    console.error('KV write failed:', err);
    return json({ success: false, error: 'Something went wrong. Please try again, or email howdy@itsaydrian.com.' }, 500);
  }

  const webhookUrl = env.UGC_WEBHOOK_URL;
  if (webhookUrl) {
    const token = env.UGC_WEBHOOK_AUTH_TOKEN ?? env.WEBHOOK_AUTH_TOKEN;
    try {
      const body = JSON.stringify({ event_type: 'ugc_brief', ...brief });
      const sig = token ? await hmacSha256(token, body) : '';
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sig ? { 'X-Hub-Signature-256': `sha256=${sig}` } : {}),
        },
        body,
      });
      if (!response.ok) console.error('UGC webhook responded with', response.status);
    } catch (err) {
      console.error('UGC webhook failed:', err);
    }
  } else {
    console.warn('UGC_WEBHOOK_URL is not set; brief stored in KV only:', id);
  }

  return json({ success: true }, 200);
};

function field(formData: FormData, key: string, max: number): string | null {
  const value = formData.get(key);
  if (typeof value !== 'string') return null;
  const trimmed = value.trim().slice(0, max);
  return trimmed || null;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
