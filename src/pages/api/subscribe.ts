import type { APIRoute } from 'astro';

export const prerender = false;

const WORKER_URL = 'https://itsaydrian-subscriber.aydrian.workers.dev/subscribe';

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid request.' }, 400);
  }

  const { email, name, tag, website } = body;

  // Honeypot — bots fill hidden fields; silently succeed so they think it worked
  if (website) {
    return json({ success: true, message: 'Check your email to confirm your subscription.' }, 201);
  }

  if (!email || typeof email !== 'string') {
    return json({ success: false, error: 'Please enter your email address.' }, 400);
  }

  if (!email.includes('@') || !email.includes('.')) {
    return json({ success: false, error: 'Please enter a valid email address.' }, 400);
  }

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.trim(),
        ...(name ? { name: (name as string).trim() } : {}),
        ...(tag ? { tag } : {}),
      }),
    });

    if (res.status === 201) {
      return json({ success: true, message: 'Check your email to confirm your subscription.' }, 201);
    }

    if (res.status === 429) {
      return json({ success: false, error: 'Too many attempts. Please try again later.' }, 429);
    }

    if (res.status === 400) {
      const data = await res.json().catch(() => ({})) as Record<string, unknown>;
      return json({ success: false, error: (data.message as string) || 'Invalid email address.' }, 400);
    }

    return json({ success: false, error: 'Something went wrong. Please try again.' }, 500);
  } catch {
    return json({ success: false, error: 'Something went wrong. Please try again.' }, 500);
  }
};

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}
