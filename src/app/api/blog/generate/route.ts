import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";

const SECTORS = [
  "agriculture", "restaurants", "tourism", "healthcare",
  "retail", "education", "realestate", "logistics",
];

const LOCALES = ["fr", "en", "ar"] as const;

const SECTOR_NAMES: Record<string, Record<string, string>> = {
  agriculture: { fr: "Agriculture & Cooperatives", en: "Agriculture & Cooperatives", ar: "الفلاحة والتعاونيات" },
  restaurants: { fr: "Restaurants & Cafes", en: "Restaurants & Cafes", ar: "المطاعم والمقاهي" },
  tourism: { fr: "Tourisme & Hotellerie", en: "Tourism & Hospitality", ar: "السياحة والفنادق" },
  healthcare: { fr: "Sante & Cliniques", en: "Healthcare & Clinics", ar: "الصحة والعيادات" },
  retail: { fr: "Commerce & Detail", en: "Retail & Commerce", ar: "التجارة" },
  education: { fr: "Education & Formation", en: "Education & Training", ar: "التعليم والتكوين" },
  realestate: { fr: "Immobilier", en: "Real Estate", ar: "العقار" },
  logistics: { fr: "Logistique & Transport", en: "Logistics & Transport", ar: "اللوجيستيك والنقل" },
};

export async function POST(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!anthropicKey || !supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Missing env vars" }, { status: 500 });
  }

  const anthropic = new Anthropic({ apiKey: anthropicKey });
  const supabase = createClient(supabaseUrl, supabaseKey);

  // Pick a random sector and locale
  const sector = SECTORS[Math.floor(Math.random() * SECTORS.length)];
  const locale = LOCALES[Math.floor(Math.random() * LOCALES.length)];
  const sectorName = SECTOR_NAMES[sector][locale];

  // Check how many posts exist for this sector/locale to avoid duplicates
  const { data: existing } = await supabase
    .from("blog_posts")
    .select("title")
    .eq("sector", sector)
    .eq("locale", locale);

  const existingTitles = (existing || []).map((p) => p.title).join("\n- ");

  const langInstruction = locale === "fr"
    ? "Write in French. Warm, direct, practical tone. Name 'Tadnun' at least 3 times."
    : locale === "ar"
      ? "Write in Darija (Moroccan Arabic). Casual, warm, approachable. Use 'تدنون' for Tadnun at least 3 times."
      : "Write in English. Warm, direct, practical tone. Name 'Tadnun' at least 3 times.";

  const prompt = `You are a content writer for Tadnun, a Moroccan digital transformation company that helps SMEs digitalize their operations.

Write a blog article about the ${sectorName} sector in Morocco.

${langInstruction}

Requirements:
- 600-800 words
- Include specific Moroccan context (cities, institutions like CMI, ONSSA, CNSS, etc.)
- Include real-sounding statistics and practical advice
- Reference Moroccan entities and platforms (WhatsApp Business, Glovo, Booking.com, etc. as relevant)
- End with a CTA to /${locale}/contact?sector=${sector}
- Do NOT repeat these existing titles:
${existingTitles ? `- ${existingTitles}` : "(no existing articles)"}

Return ONLY a JSON object with these fields (no markdown, no code fences):
{
  "title": "Article title",
  "description": "1-2 sentence SEO description",
  "slug": "url-slug-in-lowercase-with-hyphens",
  "content": "Full article body in Markdown"
}`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const article = JSON.parse(text);

    // Insert into Supabase
    const { error } = await supabase.from("blog_posts").insert({
      slug: article.slug,
      locale,
      title: article.title,
      description: article.description,
      sector,
      content: article.content,
      status: "published",
      published_at: new Date().toISOString(),
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      slug: article.slug,
      locale,
      sector,
      title: article.title,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
