# Tadnun Outbound GTM Automation

Fully autonomous outbound sales pipeline that finds Moroccan businesses,
scores them against your ICP, finds their email, and sends a personalized
3-touch email sequence — sector-specific, in French.

## Setup (one-time)

### 1. Get API Keys

| Service | Free Tier | Sign Up |
|---------|-----------|---------|
| **Google Places API** | $200/month credit (~6,000 lookups) | [Google Cloud Console](https://console.cloud.google.com/) → Enable "Places API (New)" → Create API key |
| **Resend** | 3,000 emails/month, 100/day | [resend.com](https://resend.com) → Sign up → Get API key |

### 2. Verify Your Domain in Resend

Go to Resend dashboard → Domains → Add `tadnun.com` → Add the DNS records they give you.
This lets you send from `outreach@tadnun.com` (or any @tadnun.com address).

### 3. Set Environment Variables

Add to `.env.local`:

```bash
# Outbound GTM
GOOGLE_PLACES_API_KEY=your_google_places_api_key_here
RESEND_API_KEY=re_your_resend_api_key_here
OUTBOUND_SENDER_EMAIL=outreach@tadnun.com
OUTBOUND_SENDER_NAME=Wassim — Tadnun
```

### 4. Start the Automation

```bash
# Start the autonomous cron scheduler (runs 24/7)
npm run outbound:cron
```

That's it. The system runs itself from here.

## What Happens Automatically

| When | What |
|------|------|
| **Monday 8:00 AM** | Finds new businesses via Google Places (rotates through sectors & cities) |
| **Daily 9:00 AM** | Scores → enriches (finds emails) → enrolls → sends due emails |
| **Friday 5:00 PM** | Prints weekly report |

## Manual Commands

```bash
npm run outbound                # Show help
npm run outbound:pipeline       # Run the full pipeline once (score → enrich → enroll → send)
npm run outbound:prospect       # Find new businesses now
npm run outbound:send           # Send due emails now
npm run outbound:report         # Print weekly report
npm run outbound:stats          # Quick pipeline stats
npm run outbound:cron           # Start cron scheduler
```

## Architecture

```
scripts/outbound/
├── config.ts       Configuration (sectors, cities, timing, env vars)
├── db.ts           SQLite database (prospects, sequences, activity log)
├── prospector.ts   Google Places API → find businesses
├── scorer.ts       ICP scoring engine (0-100)
├── enricher.ts     Find emails from business websites
├── templates.ts    3-touch email sequences per sector (French)
├── sequencer.ts    Schedule emails for enrolled prospects
├── sender.ts       Send via Resend API
├── reporter.ts     Weekly pipeline reports
├── cron.ts         Autonomous cron scheduler
└── run.ts          CLI entry point
```

## Pipeline Flow

```
Google Places API → New Prospects
        ↓
   ICP Scoring (0-100)
        ↓ (score >= 60)
   Email Enrichment (scrape websites)
        ↓ (email found)
   Sequence Enrollment (3 emails scheduled)
        ↓
   Day 0: Pain + Proof email
   Day 3: Case Study email
   Day 7: Breakup email
```

## Database

SQLite database stored at `data/outbound.db`. Zero config, file-based, persists between runs.

## Sectors Covered

| Tier | Sectors | Cities |
|------|---------|--------|
| **1** | Tourism, Restaurants, Agriculture | Marrakech, Casablanca, Agadir, Essaouira, Fes |
| **2** | Healthcare, Real Estate, Retail | Rabat, Casablanca, Tanger, Marrakech |
| **3** | Education, Logistics | Rabat, Casablanca, Tanger |

## Keeping it Running

For production use, run the cron scheduler as a background process:

```bash
# Using nohup (simple)
nohup npm run outbound:cron > outbound.log 2>&1 &

# Using pm2 (recommended for reliability)
npm install -g pm2
pm2 start "npm run outbound:cron" --name tadnun-outbound
pm2 save
pm2 startup  # auto-restart on reboot
```
