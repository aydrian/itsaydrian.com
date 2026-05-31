import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const { env } = locals.runtime;

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
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(inquiry),
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
