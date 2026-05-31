import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';

export const prerender = false;

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

  // Honeypot — bots fill hidden fields; silently succeed so they think it worked
  if (formData.get('website')) {
    return json({ success: true }, 200);
  }

  const name = trim(formData.get('name'));
  const email = trim(formData.get('email'));
  const destination = trim(formData.get('destination')) ?? '';
  const message = trim(formData.get('message'));

  if (!name || !email || !message) {
    return json({ success: false, error: 'Please fill out all required fields.' }, 400);
  }

  if (!email.includes('@') || !email.includes('.')) {
    return json({ success: false, error: 'Please enter a valid email address.' }, 400);
  }

  const timestamp = Date.now();
  const id = crypto.randomUUID();
  const inquiry = {
    id,
    name,
    email,
    destination,
    message,
    submittedAt: new Date(timestamp).toISOString(),
  };

  try {
    await env.TRAVEL_INQUIRIES.put(
      `inquiry:${timestamp}:${id}`,
      JSON.stringify(inquiry),
      { metadata: { name, email, destination, submittedAt: inquiry.submittedAt } }
    );
  } catch (err) {
    console.error('KV write failed:', err);
    return json({ success: false, error: 'Something went wrong. Please try again.' }, 500);
  }

  const webhookUrl = env.WEBHOOK_URL;
  if (webhookUrl) {
    const token = env.WEBHOOK_AUTH_TOKEN;
    try {
      const body = JSON.stringify(inquiry);
      const sig = token ? await hmacSha256(token, body) : '';
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(sig ? { 'X-Hub-Signature-256': `sha256=${sig}` } : {}),
        },
        body,
      });
    } catch (err) {
      console.error('Webhook failed:', err);
    }
  }

  return json({ success: true }, 200);
};

function trim(value: FormDataEntryValue | null): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
