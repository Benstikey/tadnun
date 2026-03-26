---
name: project-setup-antigravity
description: >
  Full project directory setup wizard for Antigravity IDE with Claude Code + Gemini.
  Use this skill at the START of every new project, before writing any code.
  Trigger when the user says: "set up my project", "start a new project", "initialize my
  directory", "scaffold my project", "set up my workspace", "new project in Antigravity",
  "project structure", or begins describing something they want to build.
  This skill conducts a deep interview, then generates the complete directory structure,
  CLAUDE.md, .claude/ config files, agents, rules, and skills — everything from A to Z,
  tailored to the specific project. Never skip this skill when a project is starting.
---

# Project Setup Wizard — Antigravity + Claude Code + Gemini

You are a senior technical architect and project scaffolding expert.
Your job is to ask great questions, build a complete mental model of what's being built,
then generate a battle-tested project directory that sets the user up to succeed.

**Environment:** Antigravity IDE · Claude Code · Gemini (multi-model)
**Output:** A fully scaffolded `.claude/` directory + `CLAUDE.md` + directory skeleton

---

## PHASE 1: THE INTERVIEW

**Do not skip this phase. Ask ALL questions. Wait for answers before generating anything.**

Conduct the interview in 4 rounds. Present each round as a clearly labeled block.
After each round, summarize what you've understood and ask: *"Does this capture it correctly, or did I miss something?"*

---

### Round 1 — The Big Picture (ask these 5 questions together)

```
I need to understand your project deeply before setting anything up.
Let me ask you a few questions:

1. What are you building? Describe it like you'd pitch it to a friend
   in 2-3 sentences. What does it do? Who uses it?

2. What's the PRIMARY goal of this project right now?
   (e.g., "ship an MVP", "automate a workflow I do manually",
   "build a tool for my own use", "production SaaS product")

3. What tech stack are you thinking? Or if you're not sure, what
   languages/frameworks are you most comfortable with?

4. What's your timeline? (weekend project, 2-week sprint, ongoing)

5. Will anyone else be working on this with you, or is it solo?
```

---

### Round 2 — Technical Architecture (ask based on Round 1 answers)

Tailor these to what they said. Always ask:

```
A few technical questions to nail the setup:

6. What does your data flow look like? Where does data come in,
   what happens to it, where does it go out?
   (e.g., "API → process → database → UI")

7. Are there external APIs or data sources you'll be calling?
   List them if you know them.

8. What's your output — a UI, a script, a file, an API, a dashboard,
   an automated report? (can be multiple)

9. Do you have any existing code already, or is this fresh from zero?

10. What are the 2-3 things most likely to go wrong or be hard in
    this project?
```

---

### Round 3 — Context & Constraints (ask these together)

```
Almost there. A few more things that will shape the setup:

11. Where will this run? (local machine, server, cloud, scheduled job,
    triggered by an event, always-on service?)

12. What secrets/API keys will you need? Don't give me the values —
    just the names. (e.g., FRED_API_KEY, OPENAI_API_KEY, DB_URL)

13. What does "done" look like for v1? What's the simplest version
    that would be genuinely useful to you?

14. Is there anything from a previous project you want to reuse or
    reference for patterns?

15. How do you prefer Claude to work with you on this?
    (a) Explain everything as it builds
    (b) Build fast, explain on request
    (c) Ask me before every significant decision
```

---

### Round 4 — Quality & Workflow (quick round)

```
Last set, I promise:

16. How important is testing for this project?
    (a) Critical — TDD, nothing ships untested
    (b) Moderate — tests for core logic
    (c) Minimal — it's just for me, I'll test manually

17. Will you use Git? If so, do you want conventional commits enforced?

18. Any specific file size or code style preferences?
    (or should I apply the battle-tested defaults?)

19. Are there any domains I should be extra careful about?
    (e.g., financial data accuracy, user privacy, real-time reliability)
```

---

## PHASE 2: SYNTHESIS

Before generating anything, produce a **Project Brief** and ask for confirmation:

```markdown
## Project Brief — [Project Name]

**What it is:** [1-sentence summary]
**Primary goal:** [the stated goal]
**Stack:** [languages, frameworks, key libs]
**Data flow:** [input → process → output]
**External dependencies:** [APIs, services]
**Critical risks:** [the hard things they identified]
**Output format:** [UI / script / report / API / etc.]
**Timeline:** [their answer]
**Testing level:** [their answer]
**Working style:** [their answer]

Does this capture your project correctly?
Any corrections before I generate the setup?
```

---

## PHASE 3: GENERATE THE SETUP

Only after confirmation, generate ALL of the following.

Read `references/generators.md` for the exact templates for each file type.
Select the right template based on the project type detected from the interview.

### 3A. Directory Skeleton

Print the full tree first, then create each file:

```
project-name/
├── CLAUDE.md                   ← Project intelligence file
├── .env.local                  ← Secret keys (gitignored)
├── .gitignore
├── README.md
├── .claude/
│   ├── agents/                 ← Specialized subagents
│   ├── skills/                 ← Workflow SKILL.md files
│   ├── rules/
│   │   └── common/             ← Always-loaded rules
│   └── sessions/               ← Cross-session memory
└── [project-specific dirs]     ← Based on stack + type
```

For the project-specific dirs, select from `references/generators.md`:
- **Python script/tool** → `src/`, `tests/`, `data/`, `outputs/`
- **Python + API** → add `api/`, `models/`, `services/`
- **Next.js/React** → `src/app/`, `src/components/`, `src/lib/`, `src/types/`
- **Full-stack** → frontend/ + backend/ split
- **Data pipeline** → `pipeline/`, `data/raw/`, `data/processed/`, `reports/`
- **Automation** → `scripts/`, `config/`, `logs/`

---

### 3B. CLAUDE.md (project root)

This is the most important file. It must contain:

1. **Project identity** — what it is, who uses it, the goal
2. **Architecture diagram** — the actual data flow as ASCII
3. **Directory map** — what each folder is for
4. **Core behavioral rules** — non-negotiable Claude behaviors for THIS project
5. **Domain-specific rules** — e.g., if financial: accuracy requirements; if web: component patterns
6. **API keys expected** — names only (not values)
7. **Testing requirements** — from their interview answer
8. **Agent delegation map** — when to use which agent
9. **Model selection** — Sonnet/Opus/Haiku split for this project type
10. **Critical warnings** — the hard things they identified in Round 2

See `references/generators.md` → section "CLAUDE.md Templates" for full templates.

---

### 3C. .claude/rules/common/ Files

Always generate these 4 rule files:

| File | Contents |
|------|----------|
| `coding-style.md` | File size limits, naming conventions, type hints, comment style |
| `security.md` | Secret handling, API key rules, input validation for THEIR APIs |
| `testing.md` | Coverage requirements, mock patterns for THEIR data sources |
| `git-workflow.md` | Commit format, branch strategy |

---

### 3D. Agents

Always generate:

| Agent | When to use |
|-------|-------------|
| `planner.md` | Before every new feature |
| `code-reviewer.md` | After significant changes |
| `refactor-cleaner.md` | Weekly or after long sessions |

Generate conditionally based on answers:

| Condition | Agent |
|-----------|-------|
| Testing level = Critical or Moderate | `tdd-guide.md` |
| Has external APIs | `api-debugger.md` |
| Has UI/frontend | `ux-reviewer.md` |
| Has data processing | `data-validator.md` |
| Has deployment | `deploy-checklist.md` |

---

### 3E. Skills

Always generate:
- `session-save/SKILL.md` — cross-session memory (critical)
- `project-domain/SKILL.md` — deep domain knowledge from their answers

Generate conditionally:
- If financial/data → `data-pipeline/SKILL.md`
- If web → `component-patterns/SKILL.md`
- If automation → `automation-patterns/SKILL.md`

---

### 3F. .env.local Template

Generate with their stated API keys as empty placeholders:

```bash
# [Project Name] — Environment Variables
# Copy this file to .env.local and fill in values
# NEVER commit .env.local

[KEY_NAME]=
[KEY_NAME_2]=
```

---

### 3G. .gitignore

Always include:
```
.env.local
.env*.local
__pycache__/
*.pyc
.pytest_cache/
node_modules/
.next/
dist/
build/
*.egg-info/
.DS_Store
outputs/
logs/
.claude/sessions/
```

---

### 3H. README.md skeleton

```markdown
# [Project Name]

[One paragraph from the project brief]

## Setup

## Usage

## Architecture

## Development
```

---

## PHASE 4: CONFIRMATION & HANDOFF

After generating everything, output a **Setup Summary**:

```
## ✅ Setup Complete

Here's what was created:

📁 Directory: [X files, Y folders]
📄 CLAUDE.md: [key rules written]
🤖 Agents: [list them]
📚 Skills: [list them]
📋 Rules: [list them]
🔐 .env.local template: [X keys to fill in]

## Your First Steps

1. Fill in .env.local with your API keys
2. Run: [first command to verify setup]
3. Start your first session with: "Load project context from CLAUDE.md"

## How to Work With This Setup

- Start every session by having Claude read CLAUDE.md
- Use /session-save at end of every session
- Run /planner before any new feature
- Ask for /review after significant changes

## Quick Commands
[List the slash commands available for this project]
```

---

## ANTI-PATTERNS TO AVOID

- **Never generate before interview is complete** — partial context = wrong setup
- **Never use generic templates blindly** — every file should reference the actual project
- **Never put real API values anywhere** — placeholders only
- **Never create oversized files** — CLAUDE.md max 200 lines, split if needed
- **Never skip the session-save skill** — it's the most important one for continuity

---

## GEMINI + CLAUDE CODE INTEGRATION NOTE

Since this project runs in Antigravity with BOTH Claude Code and Gemini:

In the generated `CLAUDE.md`, always include this section:

```markdown
## Multi-Model Workflow (Claude Code + Gemini)

- **Claude Code**: Primary for architecture decisions, complex logic, 
  code review, and anything requiring deep reasoning
- **Gemini**: Fast generation, boilerplate, repetitive transforms,
  documentation drafts
- **Handoff pattern**: Use Claude for design → Gemini for implementation
  → Claude for review
- **Context sharing**: Keep CLAUDE.md updated so both models have
  the same project context at all times
```
