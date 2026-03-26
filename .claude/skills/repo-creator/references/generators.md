# generators.md — Templates for project-setup-antigravity

This file contains all the templates that SKILL.md references during Phase 3.
Read the relevant section only. Don't load everything — find your project type first.

## Table of Contents
1. [Project Type Detection](#detection)
2. [CLAUDE.md Templates](#claude-md)
3. [Directory Structures by Type](#directories)
4. [Agent Templates](#agents)
5. [Rules Templates](#rules)

---

## 1. PROJECT TYPE DETECTION {#detection}

Map interview answers → project type:

| Signals | Project Type |
|---------|-------------|
| Python + data processing + file output | `data-pipeline` |
| Python + financial data + scoring/analysis | `quant-tool` |
| Next.js/React + database + users | `web-saas` |
| API endpoints + no UI | `api-service` |
| Scripts that run on a schedule | `automation` |
| Python + CLI + personal use | `cli-tool` |
| Frontend only (no backend) | `frontend` |
| Full-stack (frontend + backend) | `fullstack` |

---

## 2. CLAUDE.md TEMPLATES {#claude-md}

### Template: quant-tool (Python financial/scoring tools)

```markdown
# CLAUDE.md — [Project Name]
# [Short tagline]
# Stack: Python | [Data sources] | [Output format]

---

## WHAT THIS PROJECT DOES

[2-3 sentences from the project brief. Be concrete.]

**User:** [who runs this]
**Input:** [where data comes from]
**Output:** [what gets produced]
**Frequency:** [when it runs]

---

## ARCHITECTURE

[ASCII diagram of the actual data flow]

Example:
Raw Data (APIs/CSVs)
     ↓
Fetch Layer (src/data/)
     ↓
Processing Layer (src/processing/)
     ↓
Scoring Layer (src/scoring/)
     ↓
Output Layer (src/output/) → Excel/CSV/Dashboard

---

## DIRECTORY MAP

src/
├── data/          [what's here]
├── processing/    [what's here]
├── scoring/       [what's here]
├── output/        [what's here]
└── utils/         [what's here]
tests/             [pytest test suite]
data/              [raw input files]
outputs/           [generated files]
.env.local         [API keys]

---

## NON-NEGOTIABLE RULES

1. All secrets in .env.local — never inline
2. Type hints on ALL function signatures
3. Max 300 lines per file
4. Read before writing — always grep first
5. Run pytest before declaring done
6. [Project-specific rule from interview]
7. [Project-specific rule from interview]

---

## DOMAIN RULES

[Generated from interview answers — e.g. for financial:]
- All scores must be bounded within [-3, +3]
- Never overwrite historical data — always append
- Validate external data before processing
- Log data fetch timestamps for audit trail

---

## API KEYS REQUIRED

[List from interview — names only]
- [KEY_NAME] — [what service, what it's used for]

---

## TESTING

Level: [from interview answer]
Run: pytest tests/ -v --cov=src
Coverage target: [80% / 90% / minimal]
Mock rule: ALL external API calls mocked in tests

---

## AGENT DELEGATION

| Agent | When |
|-------|------|
| planner | Before any new module |
| code-reviewer | After 50+ lines changed |
| tdd-guide | New scoring/processing modules |
| refactor-cleaner | Weekly |

## MODEL SELECTION

- Sonnet → 90% of tasks (data processing, parsing, output)
- Opus → Architecture decisions, complex algorithm design
- Haiku → File reading, test running, subagent exploration

---

## CRITICAL WARNINGS

[From their "what could go wrong" answer]
1. [Risk 1]: [how to handle it]
2. [Risk 2]: [how to handle it]
```

---

### Template: web-saas (Next.js + backend)

```markdown
# CLAUDE.md — [Project Name]
# [Tagline]
# Stack: Next.js [version] + [Backend] + [Database]

---

## WHAT THIS PROJECT DOES

[2-3 sentences]

**Users:** [who uses it]
**Core loop:** [what users do in the app]

---

## ARCHITECTURE

[User] → Next.js App (app/) → API Routes (app/api/) → [Backend Service] → [Database]

---

## DIRECTORY MAP

src/
├── app/
│   ├── api/          API routes
│   ├── (auth)/       Auth-protected pages
│   └── [feature]/    Feature pages
├── components/
│   ├── ui/           Primitive components
│   ├── forms/        Form components
│   └── layouts/      Layout components
├── hooks/            Custom React hooks
├── lib/              Utilities + API clients
└── types/            TypeScript definitions

---

## NON-NEGOTIABLE RULES

1. All secrets in .env.local
2. Type everything — TypeScript strict mode
3. Components max 150 lines — extract hooks when needed
4. No prop drilling past 2 levels — use context or state management
5. All API routes validate input before processing
6. [Project-specific rule]

---

## COMPONENT PATTERNS

- Server Components by default, Client Components only when needed
- Data fetching in Server Components or API routes — never in useEffect for initial load
- Forms: React Hook Form + Zod validation
- State: useState for local, [state lib] for global
- Error boundaries on all major sections

---

## API KEY TEMPLATE

[List from interview]

---

## TESTING

[From interview]
- Component tests: Vitest + React Testing Library
- API tests: Vitest with mocked db
- E2E: Playwright for critical paths

---

## AGENT DELEGATION

| Agent | When |
|-------|------|
| planner | Before any new feature/page |
| code-reviewer | PRs and significant changes |
| ux-reviewer | After UI changes |
| tdd-guide | New API routes and hooks |

## MODEL SELECTION

- Sonnet → Component building, API routes, styling
- Opus → Architecture decisions, auth flows, DB schema
- Haiku → File reading, refactor exploration
```

---

### Template: automation (Scripts + scheduled jobs)

```markdown
# CLAUDE.md — [Project Name]
# Automation: [what it automates]
# Stack: Python | [Trigger] | [Output]

---

## WHAT THIS DOES

[What it automates, how often, where output goes]

---

## PIPELINE

[Trigger] → [Step 1] → [Step 2] → [Output/Notification]

---

## RULES

1. Idempotent — running twice should not create duplicates
2. Every run writes to logs/YYYY-MM-DD.log
3. Failures must notify (never fail silently)
4. State tracked in .state/ (what was last processed)
5. Dry-run mode: --dry-run flag shows what WOULD happen
6. [Project-specific rule]
```

---

### Template: cli-tool (Personal Python scripts)

```markdown
# CLAUDE.md — [Project Name]
# CLI tool for [purpose]

---

## PURPOSE

[What this script/tool does and why]

---

## USAGE

python main.py [args]
python main.py --help

---

## ARCHITECTURE

[Simple flow]

---

## RULES

1. All config in config.yaml or .env.local
2. --dry-run and --verbose flags on all commands
3. Informative error messages (what failed AND what to do about it)
4. Output formats: human-readable by default, --json for scripting
```

---

## 3. DIRECTORY STRUCTURES BY TYPE {#directories}

### quant-tool
```
project/
├── CLAUDE.md
├── .env.local
├── .gitignore
├── README.md
├── requirements.txt
├── src/
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   └── [source]_fetcher.py
│   ├── processing/
│   │   ├── __init__.py
│   │   └── [transform].py
│   ├── scoring/           (if scoring project)
│   │   ├── __init__.py
│   │   └── [layer].py
│   ├── output/
│   │   ├── __init__.py
│   │   └── excel_writer.py
│   └── utils/
│       ├── __init__.py
│       └── helpers.py
├── tests/
│   ├── conftest.py
│   └── test_[module].py
├── data/
│   └── raw/
├── outputs/
└── .claude/
    ├── agents/
    ├── skills/
    ├── rules/common/
    └── sessions/
```

### web-saas
```
project/
├── CLAUDE.md
├── .env.local
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── api/
│   ├── components/
│   │   ├── ui/
│   │   └── layouts/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── .claude/
    ├── agents/
    ├── skills/
    ├── rules/common/
    └── sessions/
```

### automation
```
project/
├── CLAUDE.md
├── .env.local
├── .gitignore
├── requirements.txt
├── main.py
├── scripts/
│   └── [task].py
├── config/
│   └── settings.yaml
├── logs/
├── .state/
└── .claude/
    ├── agents/
    ├── rules/common/
    └── sessions/
```

---

## 4. AGENT TEMPLATES {#agents}

### api-debugger.md (generate when project has external APIs)

```markdown
---
name: api-debugger
description: Debug external API failures. Use when API calls return unexpected responses, rate limit errors, or schema changes.
tools: Read, Bash, Grep
model: claude-sonnet-4-6
---

Debug the API failure systematically:

1. Check the error type (network / auth / rate limit / schema / data)
2. Inspect the actual response: `print(response.json())`
3. Check if API key is loaded: `os.environ.get('KEY_NAME')`
4. Test with minimal request first, add complexity back
5. Check API documentation for recent changes
6. Implement retry logic with exponential backoff if rate limiting

Pattern for robust API calls:
\`\`\`python
import time
def fetch_with_retry(url, params, max_retries=3):
    for attempt in range(max_retries):
        try:
            resp = requests.get(url, params=params, timeout=30)
            resp.raise_for_status()
            return resp.json()
        except requests.HTTPError as e:
            if e.response.status_code == 429:
                time.sleep(2 ** attempt)  # exponential backoff
                continue
            raise
    raise RuntimeError(f"API failed after {max_retries} attempts")
\`\`\`
```

### data-validator.md (generate when project processes data)

```markdown
---
name: data-validator
description: Validate data schemas, check for missing values, and ensure data quality before processing.
tools: Read, Bash
model: claude-haiku-4-5-20251001
---

Validate the data:
1. Check schema: required columns present?
2. Check types: are values the expected dtype?
3. Check nulls: where are missing values, is that expected?
4. Check ranges: are numeric values within expected bounds?
5. Check duplicates: any unexpected duplicate rows/keys?

Report issues clearly:
- CRITICAL: data is unusable
- WARNING: data is usable but something is off
- INFO: data looks fine, here's the summary
```

---

## 5. RULES TEMPLATES {#rules}

### security.md (customize based on their API keys)

```markdown
# security.md

## API Keys
- All keys in .env.local — never inline
- Load with: from dotenv import load_dotenv; load_dotenv('.env.local')
- Never log env values
- Keys expected in this project: [LIST FROM INTERVIEW]

## Git
- .env.local in .gitignore — verified before every commit
- git diff --staged | grep -i "key\|secret\|token" before committing

## Input Validation
- Validate all external data schemas before processing
- Never eval() or exec() external data
- Sanitize before writing to files or databases
```

### testing.md (customize based on their testing level)

For Critical level:
```markdown
# testing.md
## Coverage: 90%+ on core modules
## Approach: TDD — tests before implementation
## Run: pytest tests/ -v --cov=src --cov-report=term-missing
## Mock: ALL external API calls — never hit live in tests
```

For Moderate level:
```markdown
# testing.md
## Coverage: 80% on core logic modules
## Approach: tests after implementation, before PR
## Run: pytest tests/ -v
## Mock: All external calls mocked
```

For Minimal level:
```markdown
# testing.md
## Coverage: Core functions only
## Approach: Manual testing + smoke tests
## Run: pytest tests/ -v
```
