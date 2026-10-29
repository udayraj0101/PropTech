export type City = "Abu Dhabi" | "Dubai";

export type MarketState = "Positive" | "Stable" | "Emerging";

export const marketTone: Record<MarketState, string> = {
  Positive: "#9A7433",
  Stable: "#C9A45C",
  Emerging: "#7C8794",
};

export type UnitStatus = "Available" | "Limited" | "Waitlist";

export type Unit = {
  id: string;
  bedrooms: string;
  type: string;
  size: string;
  price: number;
  status: UnitStatus;
};

export type PlanStage = {
  label: string;
  pct: number;
  note: string;
};

export type Development = {
  id: string;
  name: string;
  developer: string;
  area: string;
  city: City;
  type: string;
  startingPrice: number;
  availablePrice: number;
  availability: "Available" | "Limited" | "Waitlist";
  completion: string;
  paymentPlan: string;
  yieldPct: number;
  appreciationPct: number;
  priceMovementPct: number;
  market: MarketState;
  concept: string;
  description: string;
  developerNote: string;
  amenities: string[];
  nearby: string[];
  units: Unit[];
  planStages: PlanStage[];
  x: number;
  y: number;
  image: string;
};

export const developers = ["ALDAR", "MODON", "EAGLE HILLS", "AL AIN HOLDING"];

const plan = (booking: number, construction: number, handover: number): PlanStage[] => [
  { label: "On Booking", pct: booking, note: "Reservation & SPA" },
  { label: "During Construction", pct: construction, note: "Milestone-linked" },
  { label: "On Handover", pct: handover, note: "Key collection" },
];

export const developments: Development[] = [
  {
    id: "saadiyat-reserve",
    name: "Saadiyat Reserve",
    developer: "ALDAR",
    area: "Saadiyat Island",
    city: "Abu Dhabi",
    type: "Villa",
    startingPrice: 1.0,
    availablePrice: 1.4,
    availability: "Available",
    completion: "2028",
    paymentPlan: "60 / 40",
    yieldPct: 5.1,
    appreciationPct: 5.0,
    priceMovementPct: 6.4,
    market: "Stable",
    concept: "Beachfront villa community",
    description:
      "A low-rise collection of contemporary villas set within landscaped gardens on Saadiyat Island's cultural district. Homes are oriented toward the beach and community parkland, with generous terraces and warm, natural material palettes throughout.",
    developerNote:
      "ALDAR is one of Abu Dhabi's principal master developers, recognised for waterfront and cultural-district communities across the emirate.",
    amenities: ["Private beach access", "Landscaped parks", "Community retail", "Cycling tracks", "Kids' play areas", "24/7 security"],
    nearby: ["Louvre Abu Dhabi", "Saadiyat Beach Golf Club", "NYU Abu Dhabi", "Zayed National Museum"],
    units: [
      { id: "3br", bedrooms: "3 Bedroom", type: "Villa", size: "2,850 sqft", price: 1.4, status: "Available" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Villa", size: "3,600 sqft", price: 2.1, status: "Limited" },
      { id: "5br", bedrooms: "5 Bedroom", type: "Villa", size: "4,400 sqft", price: 3.25, status: "Available" },
    ],
    planStages: plan(20, 40, 40),
    x: 40,
    y: 44,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20a%20luxury%20beachfront%20villa%20community%20on%20Saadiyat%20Island%20Abu%20Dhabi%2C%20low%20white%20contemporary%20villas%20with%20warm%20dusk%20lighting%2C%20minimalist%20landscaped%20gardens%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography%2C%20sharp%20and%20elegant&width=640&height=440&seq=prop-explore-saadiyat-v1&orientation=landscape",
  },
  {
    id: "yas-living",
    name: "Yas Living",
    developer: "ALDAR",
    area: "Yas Island",
    city: "Abu Dhabi",
    type: "Apartment",
    startingPrice: 0.95,
    availablePrice: 1.2,
    availability: "Available",
    completion: "2027",
    paymentPlan: "50 / 50",
    yieldPct: 6.2,
    appreciationPct: 5.8,
    priceMovementPct: 7.1,
    market: "Positive",
    concept: "Waterfront apartment living",
    description:
      "Modern waterfront apartments arranged around a calm marina promenade on Yas Island. Interiors are bright and efficient, with wide glazing that frames the water and easy walking access to the island's leisure and retail destinations.",
    developerNote:
      "ALDAR continues to shape Yas Island as a destination-led community, blending residential, leisure and entertainment infrastructure.",
    amenities: ["Waterfront promenade", "Residents' pools", "Fitness studios", "Retail & dining", "Parks", "Concierge"],
    nearby: ["Yas Mall", "Ferrari World", "Warner Bros. World", "Etihad Arena"],
    units: [
      { id: "1br", bedrooms: "1 Bedroom", type: "Apartment", size: "780 sqft", price: 1.2, status: "Available" },
      { id: "2br", bedrooms: "2 Bedroom", type: "Apartment", size: "1,180 sqft", price: 1.75, status: "Available" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Apartment", size: "1,650 sqft", price: 2.3, status: "Limited" },
    ],
    planStages: plan(15, 35, 50),
    x: 50,
    y: 66,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20modern%20waterfront%20apartment%20towers%20on%20Yas%20Island%20Abu%20Dhabi%20seen%20at%20warm%20dusk%2C%20glass%20facades%20with%20soft%20champagne%20reflections%2C%20calm%20marina%20water%20in%20foreground%2C%20simple%20neutral%20sky%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-yas-v1&orientation=landscape",
  },
  {
    id: "reem-hills",
    name: "Reem Hills",
    developer: "MODON",
    area: "Al Reem Island",
    city: "Abu Dhabi",
    type: "Apartment",
    startingPrice: 1.35,
    availablePrice: 1.55,
    availability: "Available",
    completion: "2027",
    paymentPlan: "60 / 40",
    yieldPct: 6.8,
    appreciationPct: 6.0,
    priceMovementPct: 6.9,
    market: "Positive",
    concept: "Island parkland residences",
    description:
      "A contemporary residential quarter on Al Reem Island built around elevated parkland and a landscaped promenade. The development pairs city convenience with generous green space, appealing to both end-users and rental investors.",
    developerNote:
      "MODON develops large-scale mixed-use communities across Abu Dhabi, with a focus on master-planned island and waterfront districts.",
    amenities: ["Elevated parkland", "Promenade", "Retail plaza", "Gym & pool", "Community centre", "Smart home"],
    nearby: ["Reem Mall", "The Galleria", "Abu Dhabi Corniche", "Cleveland Clinic"],
    units: [
      { id: "1br", bedrooms: "1 Bedroom", type: "Apartment", size: "820 sqft", price: 1.55, status: "Available" },
      { id: "2br", bedrooms: "2 Bedroom", type: "Apartment", size: "1,300 sqft", price: 2.05, status: "Available" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Apartment", size: "1,780 sqft", price: 2.9, status: "Limited" },
    ],
    planStages: plan(20, 40, 40),
    x: 62,
    y: 36,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20contemporary%20residential%20apartment%20buildings%20on%20Al%20Reem%20Island%20Abu%20Dhabi%20at%20golden%20hour%2C%20clean%20geometric%20facades%2C%20landscaped%20promenade%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-reem-v1&orientation=landscape",
  },
  {
    id: "marsa-al-bateen",
    name: "Marsa Al Bateen",
    developer: "EAGLE HILLS",
    area: "Al Bateen",
    city: "Abu Dhabi",
    type: "Residence",
    startingPrice: 2.2,
    availablePrice: 2.6,
    availability: "Limited",
    completion: "2027",
    paymentPlan: "60 / 40",
    yieldPct: 4.6,
    appreciationPct: 4.4,
    priceMovementPct: 5.2,
    market: "Stable",
    concept: "Marina-front residence",
    description:
      "An intimate collection of low-rise residences overlooking the marina at Marsa Al Bateen. Quiet, low-density and finely finished, the development suits buyers seeking a discreet waterfront address close to the city core.",
    developerNote:
      "EAGLE HILLS positions itself around boutique, high-finish residential assets in established Abu Dhabi districts.",
    amenities: ["Marina berths", "Residents' terrace", "Spa & pool", "Concierge", "Private parking", "Landscaped courtyard"],
    nearby: ["Emirates Palace", "Abu Dhabi Corniche", "Marina Mall", "Bateen Airport"],
    units: [
      { id: "3br", bedrooms: "3 Bedroom", type: "Residence", size: "2,100 sqft", price: 2.6, status: "Limited" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Residence", size: "2,900 sqft", price: 3.9, status: "Available" },
      { id: "ph", bedrooms: "Penthouse", type: "Residence", size: "4,600 sqft", price: 6.5, status: "Waitlist" },
    ],
    planStages: plan(25, 35, 40),
    x: 30,
    y: 40,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20an%20elegant%20waterfront%20residence%20at%20Marsa%20Al%20Bateen%20Abu%20Dhabi%2C%20warm%20dusk%20light%2C%20low-rise%20luxury%20architecture%20with%20terrace%20and%20marina%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-bateen-v1&orientation=landscape",
  },
  {
    id: "al-raha-gardens",
    name: "Al Raha Gardens",
    developer: "ALDAR",
    area: "Al Raha",
    city: "Abu Dhabi",
    type: "Townhouse",
    startingPrice: 2.3,
    availablePrice: 2.5,
    availability: "Available",
    completion: "2028",
    paymentPlan: "70 / 30",
    yieldPct: 5.9,
    appreciationPct: 5.5,
    priceMovementPct: 6.0,
    market: "Positive",
    concept: "Family townhouse community",
    description:
      "A serene townhouse neighbourhood set between the coast and Al Raha Beach. Tree-lined streets, generous plot sizes and community amenities make it a natural fit for families seeking long-term settlement near the airport corridor.",
    developerNote:
      "ALDAR's Al Raha portfolio is among the most established residential communities in the Capital, with mature infrastructure and demand.",
    amenities: ["Community pools", "Parks & walkways", "Retail centre", "Schools nearby", "Sports courts", "Gated security"],
    nearby: ["Al Raha Beach", "Yas Island", "Abu Dhabi Int'l Airport", "Marsa Al Raha"],
    units: [
      { id: "3br", bedrooms: "3 Bedroom", type: "Townhouse", size: "2,200 sqft", price: 2.5, status: "Available" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Townhouse", size: "2,850 sqft", price: 3.1, status: "Available" },
    ],
    planStages: plan(30, 40, 30),
    x: 68,
    y: 24,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20a%20serene%20townhouse%20community%20in%20Al%20Raha%20Abu%20Dhabi%20at%20warm%20dusk%2C%20low%20contemporary%20homes%20with%20palm%20landscaping%2C%20calm%20water%20in%20background%2C%20simple%20neutral%20sky%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-raha-v1&orientation=landscape",
  },
  {
    id: "khalifa-quarter",
    name: "Khalifa Quarter",
    developer: "AL AIN HOLDING",
    area: "Khalifa City",
    city: "Abu Dhabi",
    type: "Townhouse",
    startingPrice: 1.7,
    availablePrice: 1.9,
    availability: "Available",
    completion: "2027",
    paymentPlan: "60 / 40",
    yieldPct: 6.5,
    appreciationPct: 6.4,
    priceMovementPct: 7.6,
    market: "Emerging",
    concept: "Emerging suburban townhouses",
    description:
      "Contemporary townhouses in one of Abu Dhabi's fastest-growing suburban districts. Positioned near schools and the airport corridor, the scheme targets growing families and value-focused investors looking at emerging rental demand.",
    developerNote:
      "AL AIN HOLDING is an Abu Dhabi developer focused on accessible, well-planned residential communities across the emirate.",
    amenities: ["Landscaped streets", "Community park", "Retail", "Schools nearby", "Kids' areas", "Gated access"],
    nearby: ["Khalifa City Schools", "Masdar City", "Abu Dhabi Int'l Airport", "Al Forsan"],
    units: [
      { id: "3br", bedrooms: "3 Bedroom", type: "Townhouse", size: "2,050 sqft", price: 1.9, status: "Available" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Townhouse", size: "2,650 sqft", price: 2.45, status: "Limited" },
      { id: "5br", bedrooms: "5 Bedroom", type: "Townhouse", size: "3,300 sqft", price: 3.4, status: "Available" },
    ],
    planStages: plan(20, 40, 40),
    x: 74,
    y: 54,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20a%20modern%20townhouse%20neighbourhood%20in%20Khalifa%20City%20Abu%20Dhabi%20at%20golden%20hour%2C%20low%20geometric%20homes%20with%20clean%20facades%2C%20landscaped%20streets%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-khalifa-v1&orientation=landscape",
  },
  {
    id: "al-maryah-crest",
    name: "Al Maryah Crest",
    developer: "ALDAR",
    area: "Al Maryah Island",
    city: "Abu Dhabi",
    type: "Apartment",
    startingPrice: 3.6,
    availablePrice: 4.1,
    availability: "Limited",
    completion: "2029",
    paymentPlan: "50 / 50",
    yieldPct: 5.4,
    appreciationPct: 5.6,
    priceMovementPct: 6.2,
    market: "Positive",
    concept: "Financial-district tower living",
    description:
      "A landmark high-rise of premium apartments on Al Maryah Island, anchoring the financial district's waterfront. Bright, high-floor homes with wide views across the marina and city skyline, aimed at professionals and international buyers.",
    developerNote:
      "ALDAR's Al Maryah Island developments sit at the centre of Abu Dhabi's financial and lifestyle district, with strong commercial adjacency.",
    amenities: ["Sky lounge", "Infinity pool", "Spa & wellness", "Valet parking", "Concierge", "Retail podium"],
    nearby: ["The Galleria", "ADGM", "Cleveland Clinic", "Rosewood Abu Dhabi"],
    units: [
      { id: "2br", bedrooms: "2 Bedroom", type: "Apartment", size: "1,450 sqft", price: 4.1, status: "Limited" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Apartment", size: "2,050 sqft", price: 5.6, status: "Available" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Apartment", size: "2,900 sqft", price: 7.8, status: "Waitlist" },
    ],
    planStages: plan(20, 30, 50),
    x: 54,
    y: 28,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20a%20luxury%20high-rise%20residential%20tower%20on%20Al%20Maryah%20Island%20Abu%20Dhabi%20at%20dusk%2C%20glass%20and%20stone%20facade%20with%20champagne%20lighting%2C%20waterfront%20setting%2C%20simple%20neutral%20sky%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-maryah-v1&orientation=landscape",
  },
  {
    id: "boulevard-heights",
    name: "Boulevard Heights",
    developer: "EAGLE HILLS",
    area: "Downtown Dubai",
    city: "Dubai",
    type: "Apartment",
    startingPrice: 2.6,
    availablePrice: 2.85,
    availability: "Available",
    completion: "2027",
    paymentPlan: "60 / 40",
    yieldPct: 6.0,
    appreciationPct: 5.9,
    priceMovementPct: 7.4,
    market: "Positive",
    concept: "Downtown skyline apartments",
    description:
      "Refined apartments steps from the Downtown Dubai boulevard, capturing skyline views and immediate access to the city's retail and dining core. Efficient layouts and a premium amenity base suit both investors and owner-occupiers.",
    developerNote:
      "EAGLE HILLS focuses on premium urban residential assets in prime Dubai and Abu Dhabi locations.",
    amenities: ["Sky pool", "Fitness centre", "Residents' lounge", "Concierge", "Covered parking", "Retail below"],
    nearby: ["Burj Khalifa", "Dubai Mall", "DIFC", "Business Bay"],
    units: [
      { id: "1br", bedrooms: "1 Bedroom", type: "Apartment", size: "760 sqft", price: 2.85, status: "Available" },
      { id: "2br", bedrooms: "2 Bedroom", type: "Apartment", size: "1,180 sqft", price: 3.6, status: "Available" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Apartment", size: "1,720 sqft", price: 5.1, status: "Limited" },
    ],
    planStages: plan(20, 40, 40),
    x: 50,
    y: 40,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20a%20modern%20residential%20tower%20in%20Downtown%20Dubai%20at%20dusk%2C%20elegant%20glass%20facade%20with%20warm%20champagne%20lighting%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography%2C%20sharp%20and%20luxurious&width=640&height=440&seq=prop-explore-boulevard-v1&orientation=landscape",
  },
  {
    id: "creek-harbour-residences",
    name: "Creek Harbour Residences",
    developer: "ALDAR",
    area: "Dubai Creek",
    city: "Dubai",
    type: "Apartment",
    startingPrice: 1.9,
    availablePrice: 2.1,
    availability: "Available",
    completion: "2028",
    paymentPlan: "60 / 40",
    yieldPct: 6.3,
    appreciationPct: 6.6,
    priceMovementPct: 8.0,
    market: "Emerging",
    concept: "Creek-side master community",
    description:
      "Waterfront residences within Dubai Creek Harbour, a large master community built around a new creek marina and central park. The district is maturing quickly, offering early-stage pricing alongside long-dated upside for patient investors.",
    developerNote:
      "ALDAR's creek-side masterplan is one of the largest new urban districts in Dubai, blending residential, retail and open space.",
    amenities: ["Central park", "Marina promenade", "Pools", "Fitness studio", "Retail & dining", "Cycling trails"],
    nearby: ["Creek Tower", "Ras Al Khor Sanctuary", "Dubai Festival City", "Al Jaddaf"],
    units: [
      { id: "1br", bedrooms: "1 Bedroom", type: "Apartment", size: "740 sqft", price: 2.1, status: "Available" },
      { id: "2br", bedrooms: "2 Bedroom", type: "Apartment", size: "1,150 sqft", price: 2.85, status: "Available" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Apartment", size: "1,680 sqft", price: 4.0, status: "Limited" },
    ],
    planStages: plan(20, 40, 40),
    x: 66,
    y: 50,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20render%20of%20contemporary%20waterfront%20residences%20at%20Dubai%20Creek%20Harbour%20at%20golden%20hour%2C%20clean%20modern%20towers%20beside%20calm%20water%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography%2C%20luxurious%20minimal&width=640&height=440&seq=prop-explore-creek-v1&orientation=landscape",
  },
  {
    id: "marina-promenade",
    name: "Marina Promenade",
    developer: "EAGLE HILLS",
    area: "Dubai Marina",
    city: "Dubai",
    type: "Residence",
    startingPrice: 3.2,
    availablePrice: 3.55,
    availability: "Limited",
    completion: "2027",
    paymentPlan: "50 / 50",
    yieldPct: 5.7,
    appreciationPct: 5.0,
    priceMovementPct: 5.4,
    market: "Stable",
    concept: "Marina-front residences",
    description:
      "Elegant residences on the Dubai Marina promenade, framed by the yacht berths and the district's dining scene. A stable, well-established rental market makes this a considered choice for income-focused investors.",
    developerNote:
      "EAGLE HILLS pursues prime, design-led residential assets in established waterfront districts.",
    amenities: ["Marina views", "Infinity pool", "Gym & spa", "Concierge", "Residents' lounge", "Secure parking"],
    nearby: ["JBR Beach", "The Walk", "Palm Jumeirah", "Marina Mall"],
    units: [
      { id: "2br", bedrooms: "2 Bedroom", type: "Residence", size: "1,300 sqft", price: 3.55, status: "Limited" },
      { id: "3br", bedrooms: "3 Bedroom", type: "Residence", size: "1,900 sqft", price: 4.8, status: "Limited" },
      { id: "4br", bedrooms: "4 Bedroom", type: "Residence", size: "2,700 sqft", price: 6.9, status: "Waitlist" },
    ],
    planStages: plan(25, 35, 40),
    x: 30,
    y: 62,
    image:
      "https://readdy.ai/api/search-image?query=Premium%20architectural%20listing%20render%20of%20a%20luxury%20residential%20tower%20at%20Dubai%20Marina%20at%20dusk%2C%20glass%20facade%20reflecting%20warm%20champagne%20light%2C%20calm%20marina%20water%20foreground%2C%20simple%20neutral%20sky%20background%2C%20editorial%20real%20estate%20photography&width=640&height=440&seq=prop-explore-marina-v1&orientation=landscape",
  },
];

export const cityImages: Record<City, string> = {
  "Abu Dhabi":
    "https://readdy.ai/api/search-image?query=Minimalist%20light%20cartographic%20top-down%20street%20map%20of%20Abu%20Dhabi%20United%20Arab%20Emirates%2C%20pale%20ivory%20land%20and%20island%20shapes%20filling%20most%20of%20the%20frame%2C%20soft%20light%20blue%20Arabian%20Gulf%20water%20channels%20between%20islands%2C%20visible%20Corniche%20seawall%20and%20breakwater%20curve%2C%20thin%20champagne%20gold%20road%20lines%20and%20arterial%20roads%20across%20the%20city%2C%20clean%20premium%20atlas%20editorial%20style%2C%20gentle%20soft%20shadows%2C%20no%20text%2C%20no%20labels%2C%20no%20markers&width=1600&height=800&seq=prop-map-abudhabi-v3&orientation=landscape",
  Dubai:
    "https://readdy.ai/api/search-image?query=Minimalist%20light%20cartographic%20top-down%20street%20map%20of%20Dubai%20United%20Arab%20Emirates%2C%20pale%20ivory%20land%20filling%20most%20of%20the%20frame%20with%20soft%20light%20blue%20Persian%20Gulf%20water%20along%20the%20coastline%2C%20clearly%20recognizable%20Palm%20Jumeirah%20frond%20shape%20and%20winding%20Dubai%20Creek%20and%20long%20sandy%20shoreline%2C%20thin%20champagne%20gold%20road%20lines%20and%20arterial%20highways%2C%20clean%20premium%20atlas%20editorial%20style%2C%20gentle%20soft%20shadows%2C%20no%20text%2C%20no%20labels%2C%20no%20markers&width=1600&height=800&seq=prop-map-dubai-v3&orientation=landscape",
};

export type PriceBand = "Under AED 2M" | "AED 2M – 4M" | "AED 4M+";

export function priceBand(price: number): PriceBand {
  if (price < 2) return "Under AED 2M";
  if (price <= 4) return "AED 2M – 4M";
  return "AED 4M+";
}

export function aedCompact(millions: number): string {
  return `AED ${millions.toFixed(2).replace(/\.00$/, "")}M`;
}

export function unitStatusLabel(status: UnitStatus): string {
  if (status === "Limited") return "Limited Availability";
  if (status === "Waitlist") return "Coming Soon";
  return "Available";
}

export function findDevelopment(id: string): Development | undefined {
  return developments.find((d) => d.id === id);
}

export function findUnit(dev: Development, unitId?: string | null): Unit {
  return dev.units.find((u) => u.id === unitId) ?? dev.units[0];
}