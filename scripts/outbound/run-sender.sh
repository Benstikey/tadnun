#!/bin/bash
# Daily outbound email sender — runs via crontab
cd /Users/wassim/Documents/GitHub/tadnun
export PATH="/opt/homebrew/bin:$PATH"
npx tsx -e "
import { runSender } from './scripts/outbound/sender.ts';
runSender().then(r => {
  console.log('Result:', JSON.stringify(r));
  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
" >> /tmp/tadnun-sender.log 2>&1
