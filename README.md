# ARES

**ARES 2.1:** navy and sky-blue palette (replaces the 2.0 orange), a Jobs tab (application pipeline, follow-ups, a keyword-based fit check against your certifications and work log), a Dream Garage inside My WHY (your VW Polo TSI Edition 15 as the first target, plus future wishlist cars, with your own cost estimates), and AZ-901 added as a third exam dated 1 Dec 2026 with its code left exactly as given and a same-date warning against SC-500 since no conflicting time was given.

**ARES 2.0 (career journey):** `ares2.js` and `ares2.css` extend `app.js` without replacing it. They add the scroll-led career map, route explorer, salary intelligence, calendar (month, week, agenda, .ics export), practical-work log, four-part progress view and automatic light and dark themes by South African time. Salary figures come from public sources checked on 20 Oct 2026; refresh them in `A2SAL` inside `ares2.js` when you re-check.

A personal cybersecurity learning companion: daily briefing, weekly plan, certification tracking, SC-500 and general practice questions, and VIGIL, an AI mentor. Plain HTML, CSS and JavaScript with no build step.

## What is real, and what is not

| Feature | Status |
| --- | --- |
| Interface, practice questions, certifications, roadmap, check-ins | Working. Data is saved in your browser. |
| Login and cross-device sync | Working when Supabase is configured. Without it, ARES runs in local mode (no login, data stays on one device). |
| VIGIL chat and weekly plan | Needs the serverless function and an Anthropic API key. Without it VIGIL shows "unavailable". |
| Sunday schedule email | Not included. It needs a scheduler and an email provider. |
| Portfolio import | Paste or load JSON in Settings. There is no automatic repository sync. |

## 1. Put it on GitHub

```bash
git init && git add . && git commit -m "ARES"
git branch -M main
git remote add origin https://github.com/<you>/ares.git
git push -u origin main
```

Use a **private** repository if you do not want the code public. Never commit API keys: the only values in the repo are the public Supabase URL and anon key.

## 2. Set up login and sync (Supabase)

1. Create a project at supabase.com.
2. Open the SQL editor and run `supabase.sql`. It creates one table protected by row-level security, so each user can only read and write their own row.
3. Under Authentication > URL Configuration, set the Site URL to your deployed address (step 3), and add it to Redirect URLs.
4. Under Settings > API, copy the Project URL and the anon public key into `config.js`. Commit and push.
5. Sign in once from the deployed site to create your account. Then, under Authentication > Providers > Email, turn off "Allow new users to sign up" so nobody else can register.

## 3. Host it (Netlify)

1. In Netlify choose Add new site > Import from Git and select the repository. No build command is needed. `netlify.toml` sets the publish folder and the function.
2. Under Site configuration > Environment variables add:
   - `ANTHROPIC_API_KEY` (from console.anthropic.com)
   - `SUPABASE_URL` and `SUPABASE_ANON_KEY` (same values as `config.js`)
   - `ALLOWED_EMAIL` (your email, so only you can use VIGIL)
   - optional `ANTHROPIC_MODEL` (defaults to `claude-sonnet-5-5`; check the current model name in Anthropic's docs)
3. Deploy, then open the site, sign in with the emailed link and check that Settings has a Sign out button.

GitHub Pages also works for the static app and Supabase login, but it cannot run the VIGIL function, so VIGIL would be unavailable there. Cloudflare Pages or Vercel need the function rewritten for their format.

## 4. Smoke test checklist

- Sign-in link arrives, and you land on the startup animation, then the daily briefing.
- Refresh: the full animation does not replay on the same day.
- Check in, add a task, edit a certification date, then open the site on another device and confirm they appear.
- Practice > SC-500 practice: answer questions, then check the Certs tab shows your attempts.
- VIGIL: send a message. Week: generate a plan and save the image.
- Sign out and confirm the login screen returns.

## Notes

- Costs: VIGIL calls use your Anthropic account. `ALLOWED_EMAIL` and the sign-in check prevent others from using your key. Add a spend limit in the Anthropic console.
- Privacy: your records are stored as one text row per user in Supabase. VIGIL requests send a short summary of your learning records (not finances) to the Anthropic API.
- Offline: after a first visit the app shell opens offline, but sign-in, sync and VIGIL need a connection.
- The practice questions are original practice material, not official exam questions. Check current exam objectives on Microsoft Learn.
