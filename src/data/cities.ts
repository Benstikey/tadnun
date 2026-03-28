export interface CityData {
  slug: string;
  name: string;
  nameAr: string;
  population: string;
  region: string;
  regionAr: string;
  /** Which sectors are strongest in this city */
  strongSectors: string[];
  /** City-specific economic context */
  context: string;
  contextEn: string;
  contextAr: string;
}

export const cities: CityData[] = [
  {
    slug: "casablanca",
    name: "Casablanca",
    nameAr: "الدار البيضاء",
    population: "3.7M",
    region: "Casablanca-Settat",
    regionAr: "الدار البيضاء-سطات",
    strongSectors: ["restaurants", "retail", "healthcare", "logistics", "realestate"],
    context: "Capitale economique du Maroc, Casablanca concentre 30% du PIB national. La ville abrite le plus grand nombre de PME du pays, avec une forte concentration dans le commerce, la restauration et les services de sante.",
    contextEn: "Morocco's economic capital, Casablanca generates 30% of national GDP. The city has the highest concentration of SMEs in the country, particularly in retail, restaurants, and healthcare.",
    contextAr: "العاصمة الاقتصادية ديال المغرب، الدار البيضاء كتنتج 30% ديال الناتج الداخلي الخام. المدينة فيها أكبر عدد ديال المقاولات الصغيرة والمتوسطة في البلاد.",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    nameAr: "مراكش",
    population: "1.3M",
    region: "Marrakech-Safi",
    regionAr: "مراكش-آسفي",
    strongSectors: ["tourism", "restaurants", "realestate"],
    context: "Premiere destination touristique du Maroc avec plus de 3 millions de visiteurs par an. Marrakech est le coeur de l'hotellerie marocaine — riads, restaurants et activites touristiques dominent l'economie locale.",
    contextEn: "Morocco's top tourist destination with over 3 million visitors per year. Marrakech is the heart of Moroccan hospitality — riads, restaurants, and tourism activities drive the local economy.",
    contextAr: "الوجهة السياحية الأولى في المغرب مع أكثر من 3 ملايين زائر في العام. مراكش هي قلب الضيافة المغربية — الرياضات والمطاعم والأنشطة السياحية.",
  },
  {
    slug: "rabat",
    name: "Rabat",
    nameAr: "الرباط",
    population: "580K",
    region: "Rabat-Sale-Kenitra",
    regionAr: "الرباط-سلا-القنيطرة",
    strongSectors: ["healthcare", "education", "realestate"],
    context: "Capitale administrative du Maroc, Rabat concentre les institutions publiques, les cliniques privees et les etablissements d'enseignement. La ville connait un boom immobilier avec le developpement de nouveaux quartiers.",
    contextEn: "Morocco's administrative capital, Rabat is home to government institutions, private clinics, and educational establishments. The city is experiencing a real estate boom with new neighborhood developments.",
    contextAr: "العاصمة الإدارية ديال المغرب، الرباط فيها المؤسسات الحكومية والعيادات الخاصة ومؤسسات التعليم. المدينة كتعرف طفرة عقارية.",
  },
  {
    slug: "agadir",
    name: "Agadir",
    nameAr: "أكادير",
    population: "600K",
    region: "Souss-Massa",
    regionAr: "سوس-ماسة",
    strongSectors: ["agriculture", "tourism", "logistics"],
    context: "Capitale de la region Souss-Massa, Agadir est le premier pole agrumicole et halieutique du Maroc. La region exporte vers l'Europe et a besoin de tracabilite ONSSA. Le tourisme balneaire complete l'economie.",
    contextEn: "Capital of the Souss-Massa region, Agadir is Morocco's leading citrus and fishing hub. The region exports to Europe and needs ONSSA traceability. Beach tourism complements the economy.",
    contextAr: "عاصمة جهة سوس-ماسة، أكادير هي القطب الأول ديال الحوامض والصيد البحري في المغرب. الجهة كتصدّر لأوروبا وكتحتاج التتبع ديال ONSSA.",
  },
  {
    slug: "tanger",
    name: "Tanger",
    nameAr: "طنجة",
    population: "1.1M",
    region: "Tanger-Tetouan-Al Hoceima",
    regionAr: "طنجة-تطوان-الحسيمة",
    strongSectors: ["logistics", "retail", "restaurants"],
    context: "Hub logistique majeur grace au port Tanger Med, la ville est un carrefour commercial entre l'Europe et l'Afrique. Le commerce et la restauration profitent du trafic international croissant.",
    contextEn: "A major logistics hub thanks to Tanger Med port, the city is a commercial crossroads between Europe and Africa. Retail and restaurants benefit from growing international traffic.",
    contextAr: "قطب لوجيستيكي كبير بفضل ميناء طنجة المتوسط، المدينة هي ملتقى تجاري بين أوروبا وأفريقيا.",
  },
  {
    slug: "fes",
    name: "Fes",
    nameAr: "فاس",
    population: "1.2M",
    region: "Fes-Meknes",
    regionAr: "فاس-مكناس",
    strongSectors: ["tourism", "education", "restaurants"],
    context: "Capitale spirituelle du Maroc et ville imperiale, Fes attire les touristes culturels du monde entier. La medina classee UNESCO abrite des centaines de riads et restaurants traditionnels. La ville est aussi un pole universitaire important.",
    contextEn: "Morocco's spiritual capital and imperial city, Fes attracts cultural tourists from around the world. The UNESCO-listed medina houses hundreds of riads and traditional restaurants. The city is also a major university hub.",
    contextAr: "العاصمة الروحية ديال المغرب ومدينة إمبراطورية، فاس كتجذب السياح الثقافيين من العالم كله. المدينة القديمة المصنفة يونسكو فيها مئات الرياضات والمطاعم التقليدية.",
  },
];

export const validCities = cities.map((c) => c.slug);

export function getCityData(slug: string): CityData | undefined {
  return cities.find((c) => c.slug === slug);
}
