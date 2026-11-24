# Deployment and integrations

The Next.js application lives in `frontend`. Production deployment is not performed by this project change.

## Local setup

1. Copy `frontend/.env.example` to `frontend/.env.local`.
2. Add only the values needed for the features you want to exercise. Keep server credentials out of source control and never use a `NEXT_PUBLIC_` prefix for secrets.
3. Start the app with `npm run dev` from `frontend`.

The repository ignores `.env` files other than `.env.example`. Do not paste secret values into tickets, logs, or client code.

## GitHub activity and profile showcase

The `/github` page reads the account configured by `site.github` in `frontend/src/data/site.ts`.

- Public profile and public repositories are requested from `https://api.github.com/users/{login}` and `https://api.github.com/users/{login}/repos`. The profile README is requested from `https://api.github.com/repos/{login}/{login}/readme`.
- Profile, README, and repository calls use public repository/profile data and do not need `GITHUB_TOKEN`.
- The contribution calendar and contribution-category counts use `https://api.github.com/graphql` and require a server-side `GITHUB_TOKEN`.
- The client receives profile/dashboard data, never the token. Do not rename it to a `NEXT_PUBLIC_*` variable.
- `GITHUB_CACHE_SECONDS` controls the in-process dashboard cache and defaults to 3600 seconds (with a 60-second minimum). GitHub REST/GraphQL requests also use Next's one-hour data cache. The public `/api/github` response itself is marked `private, max-age=0, must-revalidate`.
- Repository cards show up to eight non-fork public repositories ordered by last update. A separate link opens the full public repository list on GitHub.
- If GitHub rate-limits or cannot be reached, the page keeps available public data and shows a truthful unavailable state for fields that could not be loaded.

For local authenticated contribution data, set `GITHUB_TOKEN` in `frontend/.env.local`. For deployment, add `GITHUB_TOKEN` to the hosting provider's server environment settings. Configure `GITHUB_CACHE_SECONDS` only if the default cache period needs adjustment. Use a token with only the access needed for public contribution data.

## Contact email through Resend

The form posts to `/api/contact`. That server route validates name, email, subject, and message; checks a honeypot; applies a process-local rate limit; then sends the message to Resend.

- `RESEND_API_KEY` authorizes the server request. It is never sent to browser code.
- `CONTACT_EMAIL` is the destination inbox and is also shown as a public email link when set.
- `RESEND_FROM_EMAIL` is the sender identity. Its domain/address must be permitted by the Resend account and verified for sending.
- The visitor's submitted address is used as `reply_to`, not as the sender.
- Missing settings return an unavailable response. Provider rejection or network failure returns an error response; the form does not show success for either case.
- A successful API response means Resend accepted the request, not that the recipient inbox has confirmed delivery. Check message status and delivery events in the Resend dashboard. This project has no delivery webhook.

For local sending, set all three variables in `frontend/.env.local`, then use only an authorized test recipient. No console email provider is implemented. For production, set all three variables in the hosting provider's environment settings. Add and verify the sender domain in Resend and publish the DNS records Resend requires for sending (including SPF/DKIM where requested). After changing environment settings, redeploy so the server runtime uses the new values.

The rate limiter is a module-level in-memory `Map` allowing five requests per IP in ten minutes per running instance. It is useful as a basic local guard but is not shared across Vercel/serverless instances and resets on restarts. For stronger production abuse protection, configure platform-level rate limiting or a shared store before relying on this control for sustained traffic; no paid store is included here.

## Production deployment

1. Import the repository into Vercel and set the project root to `frontend`.
2. Use `npm run build` and the standard Next.js output settings.
3. Set `NEXT_PUBLIC_SITE_URL` to the production origin so absolute metadata, sitemap, and robots URLs use the correct host.
4. Add the server-side GitHub/Resend variables above in Vercel project settings for the appropriate environments. Do not put API keys in public build variables.
5. Redeploy after configuration changes.
6. Verify the deployed routes, canonical metadata, sitemap, robots output, responsive layouts, and browser console. Separately confirm GitHub contribution data and Resend message acceptance/delivery in their provider dashboards.

Environment variables documented here are requirements, not proof that local or production credentials are configured. The presence of a successful form response is not proof of inbox delivery.
