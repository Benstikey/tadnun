# interview-questions.md — Full Question Bank

A reference for the interview phase. Use the Phase 1 questions in order.
These deeper questions are available if an answer is vague or needs elaboration.

---

## ELABORATION QUESTIONS (use when answers are thin)

### If the project description is vague:
- "What would make you say 'this project is done and working'?"
- "What's the manual version of this — what do you currently do by hand that this will replace?"
- "Who's the first person you'd show this to, and what would impress them?"

### If the tech stack is unclear:
- "Are you more comfortable with Python or JavaScript?"
- "Do you need a user interface, or is this a behind-the-scenes tool?"
- "Does it need to run somewhere specific, or is local fine?"

### If the data flow is unclear:
- "Walk me through one run of this from start to finish. What triggers it, what happens, what gets produced?"
- "What's the raw input — a file, an API response, user input, a database row?"
- "What format is the output — a file, a display, an email, a database entry?"

### If risks are unclear:
- "What's the part you're most unsure about technically?"
- "Have you tried building something like this before? What stopped you?"
- "What happens if an API is down or returns bad data?"

---

## PROJECT TYPE SIGNALS

Listen for these signals to detect project type early:

| They say... | Project type |
|-------------|-------------|
| "score", "indicator", "data release", "economic", "trading" | quant-tool |
| "dashboard", "users", "sign up", "login", "SaaS" | web-saas |
| "every day at X", "scheduled", "automated", "without me" | automation |
| "scrape", "parse", "transform", "pipeline", "ETL" | data-pipeline |
| "CLI", "command", "terminal", "personal tool" | cli-tool |
| "website", "landing page", "component" | frontend |
| "API", "endpoint", "REST", "webhook", "backend" | api-service |

---

## DOMAIN-SPECIFIC QUESTIONS

### If quant/financial:
- "What's the data freshness requirement — real-time, daily, weekly?"
- "What happens if data is stale or the API is down during a run?"
- "Do you need an audit trail of what data was used for each output?"
- "Will this run automatically or manually triggered?"

### If web app:
- "Who are the users and do they need accounts/auth?"
- "What's the core action users will take most often?"
- "Any specific performance requirements — load time, concurrent users?"
- "Mobile or desktop or both?"

### If automation:
- "What triggers the run — time, event, manual?"
- "What should happen if it fails — retry, notify, stop?"
- "Where should logs go?"
- "Should it be idempotent (safe to run twice)?"

### If data pipeline:
- "How often does new data arrive, and how much?"
- "What's the acceptable data loss — zero tolerance or best effort?"
- "Is there a schema you must match in the output?"
