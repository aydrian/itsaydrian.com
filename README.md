# itsaydrian.com

Personal site for ItsAydrian LLC, built with Astro and deployed to Cloudflare Workers.

## Development

Requires Node.js >= 22.12.0 and Bun.

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Preview production build locally
bun run preview
```

## Deployment

### Manual

```bash
# Build and deploy to Cloudflare
bun run deploy
```

### CI/CD

The site deploys automatically via GitHub Actions:

- **Pull request**: Deploys a preview worker and comments the URL on the PR
- **Push to `main`**: Deploys to production (`itsaydrian-astro`)
- **Push to `refactor-astro`**: Builds to verify no issues, but does not deploy

Required repository secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## Project Structure

```
/
├── public/          # Static assets
├── src/
│   ├── layouts/     # Page layouts
│   ├── pages/       # Routes
│   ├── scripts/     # Client-side JS
│   └── styles/      # Global CSS
├── astro.config.mjs
└── wrangler.jsonc   # Cloudflare Worker config
```

## Tech Stack

- [Astro](https://astro.build/)
- [@astrojs/cloudflare](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
