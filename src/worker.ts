interface Env {
  ASSETS: Fetcher;
}

const CANONICAL_HOST = 'edesigrs.monster';

function canonicalRedirect(request: Request): Response | null {
  const url = new URL(request.url);
  let changed = false;

  if (url.hostname === `www.${CANONICAL_HOST}`) {
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

  if (!changed) {
    return null;
  }

  return Response.redirect(url.toString(), 301);
}

export default {
  async fetch(request, env): Promise<Response> {
    const redirect = canonicalRedirect(request);
    if (redirect) {
      return redirect;
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
