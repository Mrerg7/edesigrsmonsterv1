const CANONICAL_HOST = 'edesigrs.monster';

interface Env {
  ASSETS: Fetcher;
}

const SECURITY_HEADERS: Record<string, string> = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy':
    "default-src 'self'; img-src 'self' data: https://imagedelivery.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/lead' && request.method === 'POST') {
      return handleLead(request);
    }

    if (url.pathname === '/api/view' && request.method === 'GET') {
      return json({ viewers: pseudoViewers() });
    }

    const redirect = canonicalRedirect(request);
    if (redirect) {
      return redirect;
    }

    const assetResponse = await env.ASSETS.fetch(request);
    const response = new Response(assetResponse.body, assetResponse);

    for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
      response.headers.set(key, value);
    }

    if (!response.headers.has('Link') && !hasFileExtension(url.pathname)) {
      const canonical = new URL(url.pathname, `https://${CANONICAL_HOST}`);
      if (!canonical.pathname.endsWith('/')) canonical.pathname += '/';
      response.headers.set('Link', `<${canonical.href}>; rel="canonical"`);
    }

    if (url.pathname.endsWith('.xml')) {
      response.headers.set('Content-Type', 'application/xml; charset=utf-8');
    }

    return response;
  },
} satisfies ExportedHandler<Env>;

function canonicalRedirect(request: Request): Response | null {
  const url = new URL(request.url);

  // Skip local / preview hosts so wrangler/astro preview keep working.
  if (
    url.hostname === 'localhost' ||
    url.hostname === '127.0.0.1' ||
    url.hostname.endsWith('.workers.dev')
  ) {
    return null;
  }

  let changed = false;

  if (url.hostname === `www.${CANONICAL_HOST}` || url.hostname !== CANONICAL_HOST) {
    url.hostname = CANONICAL_HOST;
    changed = true;
  }

  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    changed = true;
  }

  if (url.pathname === '/index.html' || url.pathname === '/index.html/') {
    url.pathname = '/';
    changed = true;
  }

  if (!url.pathname.endsWith('/') && !hasFileExtension(url.pathname)) {
    url.pathname += '/';
    changed = true;
  }

  if (!changed) {
    return null;
  }

  return new Response(null, {
    status: 301,
    headers: {
      Location: url.toString(),
      'Cache-Control': 'public, max-age=86400',
      'X-Robots-Tag': 'noindex',
      Link: `<${url.toString()}>; rel="canonical"`,
    },
  });
}

async function handleLead(request: Request): Promise<Response> {
  try {
    const data = (await request.json()) as {
      email?: string;
      name?: string;
      intent?: string;
      offer?: string;
      source?: string;
    };

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return json({ ok: false, error: 'Valid email required' }, 400);
    }

    return json({
      ok: true,
      message: 'Thanks — we will follow up within 24 hours.',
      received: {
        email: data.email,
        name: data.name ?? '',
        intent: data.intent ?? 'inquiry',
        offer: data.offer ?? '',
        source: data.source ?? 'site',
      },
    });
  } catch {
    return json({ ok: false, error: 'Invalid request body' }, 400);
  }
}

function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...SECURITY_HEADERS,
    },
  });
}

function hasFileExtension(pathname: string): boolean {
  const segment = pathname.split('/').pop() ?? '';
  return segment.includes('.');
}

function pseudoViewers(): number {
  const hour = new Date().getUTCHours();
  return 4 + ((hour * 7) % 11);
}
