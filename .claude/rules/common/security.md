# Security — Tadnun

## Secrets
- All keys in `.env.local` — never inline in code
- `.env*` is already in .gitignore — verify before every commit
- Never log environment variable values
- API keys will be managed in a dedicated folder when added

## Contact Form
- Validate all form inputs server-side before processing
- Sanitize user input — never render raw HTML from form fields
- Rate-limit form submissions when backend is added
- CSRF protection via Next.js built-in mechanisms

## Content Security
- No `dangerouslySetInnerHTML` unless absolutely required and sanitized
- External links: always `rel="noopener noreferrer"` on `target="_blank"`
- No `eval()` or dynamic code execution

## Git
- Review `git diff --staged` before committing
- Never commit `.env.local`, credentials, or API keys
- Keep `.gitignore` up to date with new secret patterns
