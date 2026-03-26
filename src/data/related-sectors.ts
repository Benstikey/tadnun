export const relatedSectors: Record<string, string[]> = {
  agriculture: ["logistics", "retail"],
  restaurants: ["tourism", "retail"],
  tourism: ["restaurants", "realestate"],
  healthcare: ["education", "retail"],
  retail: ["restaurants", "logistics"],
  education: ["healthcare", "retail"],
  realestate: ["tourism", "logistics"],
  logistics: ["agriculture", "retail"],
};
