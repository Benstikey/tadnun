import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../../.env.local") });

const API_KEY = "43f4a50827ad4d7daee669662ed58caf";
const emails = [
  "wassim@tadnun.com",
  "contact@tadnun.com",
  "abdallah@tadnun.com",
];

async function checkReputation(email: string) {
  const url = `https://emailreputation.abstractapi.com/v1/?api_key=${API_KEY}&email=${encodeURIComponent(email)}`;
  const res = await fetch(url);
  console.log(`\n${"=".repeat(50)}`);
  console.log(`📧 ${email}`);
  console.log(`Status: ${res.status}`);
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

async function main() {
  for (const email of emails) {
    await checkReputation(email);
    await new Promise((r) => setTimeout(r, 1000));
  }
}

main().catch(console.error);
