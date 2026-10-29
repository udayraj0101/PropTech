export type InvestorStatus = "Active" | "Pending" | "Inactive";
export type PortalAccess = "Active" | "Pending" | "Inactive";
export type InvestmentStatus = "Active" | "Completed" | "Pending";

export const INVESTOR_STATUSES: InvestorStatus[] = ["Active", "Pending", "Inactive"];
export const INVESTMENT_FORM_STATUSES: InvestmentStatus[] = ["Active", "Pending", "Completed"];

export type Investment = {
  id: string;
  developmentId?: string;
  development: string;
  unit: string;
  unitType?: string;
  size?: string;
  purchasePrice: number;
  purchaseDate: string;
  startingPrice?: number;
  availablePrice?: number;
  currentValue?: number;
  status: InvestmentStatus;
};

export type Investor = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  brokerage: string;
  broker: string;
  status: InvestorStatus;
  portal: PortalAccess;
  lastUpdated: string;
  investments: Investment[];
};

export const INVESTOR_COUNTRIES = [
  "United Arab Emirates",
  "Saudi Arabia",
  "Qatar",
  "Kuwait",
  "United Kingdom",
  "India",
  "Other",
];

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length >= 7 && /^[+()\-\s0-9]+$/.test(value.trim());
}

export const PRICE_MODEL_NOTE =
  "Development starting price, current available price and investor actual purchase price are tracked separately. Investment performance is measured against the investor's recorded actual purchase price.";

export function investorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function findInvestor(id: string): Investor | undefined {
  return investorSeed.find((i) => i.id === id);
}

export function aedFull(amount: number): string {
  return `AED ${amount.toLocaleString("en-US")}`;
}

export function investorDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export function investmentCount(inv: Investor): number {
  return inv.investments.length;
}

export function portalNote(portal: PortalAccess): string {
  if (portal === "Active") return "Portal access active";
  if (portal === "Pending") return "Portal access pending";
  return "Portal access inactive";
}

export function findInvestment(investor: Investor, id: string | null): Investment | undefined {
  if (!id) return undefined;
  return investor.investments.find((i) => i.id === id);
}

export function investorSearchBlob(inv: Investor): string {
  return [inv.name, inv.email, inv.phone, inv.brokerage, inv.broker, ...inv.investments.map((i) => i.development)]
    .join(" ")
    .toLowerCase();
}

export const investorSeed: Investor[] = [
  {
    id: "inv-john-smith",
    name: "John Smith",
    email: "john@example.com",
    phone: "+971 50 112 3344",
    brokerage: "Gulf Estates Partners",
    broker: "Khalid Al Mansoori",
    status: "Active",
    portal: "Active",
    lastUpdated: "06 Oct 2026",
    investments: [
      {
        id: "inv-john-smith-1",
        development: "Saadiyat Grove Residences",
        unit: "2 Bedroom Apartment",
        unitType: "Apartment",
        size: "1,180 sqft",
        purchasePrice: 1250000,
        purchaseDate: "2024-03-12",
        startingPrice: 1000000,
        availablePrice: 1400000,
        status: "Active",
      },
      {
        id: "inv-john-smith-2",
        development: "Marina Vista Towers",
        unit: "2 Bedroom Residence",
        unitType: "Residence",
        size: "1,300 sqft",
        purchasePrice: 2100000,
        purchaseDate: "2023-11-05",
        startingPrice: 1900000,
        availablePrice: 2385000,
        status: "Active",
      },
    ],
  },
  {
    id: "inv-mariam-al-zaabi",
    name: "Mariam Al Zaabi",
    email: "mariam.alzaabi@example.ae",
    phone: "+971 55 220 7788",
    brokerage: "Gulf Estates Partners",
    broker: "Khalid Al Mansoori",
    status: "Active",
    portal: "Active",
    lastUpdated: "05 Oct 2026",
    investments: [
      {
        id: "inv-mariam-1",
        development: "Al Reem Central Park",
        unit: "1 Bedroom Apartment",
        unitType: "Apartment",
        size: "820 sqft",
        purchasePrice: 980000,
        purchaseDate: "2024-06-20",
        startingPrice: 900000,
        availablePrice: 1125000,
        status: "Active",
      },
      {
        id: "inv-mariam-2",
        development: "Yas Bay Waterfront",
        unit: "2 Bedroom Apartment",
        unitType: "Apartment",
        size: "1,180 sqft",
        purchasePrice: 1650000,
        purchaseDate: "2024-01-15",
        startingPrice: 1500000,
        availablePrice: 1830000,
        status: "Active",
      },
      {
        id: "inv-mariam-3",
        development: "Palm Crest Villas",
        unit: "4 Bedroom Villa",
        unitType: "Villa",
        size: "3,600 sqft",
        purchasePrice: 4600000,
        purchaseDate: "2023-09-02",
        startingPrice: 4200000,
        availablePrice: 5125000,
        status: "Active",
      },
    ],
  },
  {
    id: "inv-rahul-mehta",
    name: "Rahul Mehta",
    email: "rahul.mehta@example.com",
    phone: "+971 52 334 9900",
    brokerage: "Meridian Property Group",
    broker: "Khalid Al Mansoori",
    status: "Active",
    portal: "Active",
    lastUpdated: "04 Oct 2026",
    investments: [
      {
        id: "inv-rahul-1",
        development: "Downtown Skyline Residences",
        unit: "3 Bedroom Apartment",
        unitType: "Apartment",
        size: "1,720 sqft",
        purchasePrice: 3400000,
        purchaseDate: "2024-02-08",
        startingPrice: 3100000,
        availablePrice: 3890000,
        status: "Active",
      },
    ],
  },
  {
    id: "inv-ahmed-bin-faisal",
    name: "Ahmed Bin Faisal",
    email: "ahmed.faisal@example.ae",
    phone: "+971 50 556 8822",
    brokerage: "Gulf Estates Partners",
    broker: "Khalid Al Mansoori",
    status: "Active",
    portal: "Active",
    lastUpdated: "03 Oct 2026",
    investments: [
      {
        id: "inv-ahmed-1",
        development: "Saadiyat Grove Residences",
        unit: "2 Bedroom Apartment",
        unitType: "Apartment",
        size: "1,180 sqft",
        purchasePrice: 1190000,
        purchaseDate: "2024-05-30",
        startingPrice: 1100000,
        availablePrice: 1315000,
        status: "Active",
      },
      {
        id: "inv-ahmed-2",
        development: "Yas Bay Waterfront",
        unit: "1 Bedroom Apartment",
        unitType: "Apartment",
        size: "780 sqft",
        purchasePrice: 1420000,
        purchaseDate: "2023-12-11",
        startingPrice: 1350000,
        availablePrice: 1560000,
        status: "Active",
      },
    ],
  },
  {
    id: "inv-yousef-al-hashimi",
    name: "Yousef Al Hashimi",
    email: "yousef.hashimi@example.ae",
    phone: "+971 52 778 4455",
    brokerage: "Capital Residences Advisory",
    broker: "Khalid Al Mansoori",
    status: "Active",
    portal: "Active",
    lastUpdated: "02 Oct 2026",
    investments: [
      {
        id: "inv-yousef-1",
        development: "Palm Crest Villas",
        unit: "4 Bedroom Villa",
        unitType: "Villa",
        size: "3,600 sqft",
        purchasePrice: 5250000,
        purchaseDate: "2022-08-19",
        startingPrice: 5000000,
        availablePrice: 5940000,
        status: "Active",
      },
      {
        id: "inv-yousef-2",
        development: "Downtown Skyline Residences",
        unit: "3 Bedroom Apartment",
        unitType: "Apartment",
        size: "1,720 sqft",
        purchasePrice: 2980000,
        purchaseDate: "2023-04-27",
        startingPrice: 2800000,
        availablePrice: 3210000,
        status: "Active",
      },
      {
        id: "inv-yousef-3",
        development: "Marina Vista Towers",
        unit: "2 Bedroom Residence",
        unitType: "Residence",
        size: "1,300 sqft",
        purchasePrice: 1760000,
        purchaseDate: "2023-07-14",
        startingPrice: 1650000,
        availablePrice: 1985000,
        status: "Active",
      },
      {
        id: "inv-yousef-4",
        development: "Al Reem Central Park",
        unit: "1 Bedroom Apartment",
        unitType: "Apartment",
        size: "820 sqft",
        purchasePrice: 1050000,
        purchaseDate: "2024-04-03",
        startingPrice: 980000,
        availablePrice: 1180000,
        status: "Active",
      },
    ],
  },
  {
    id: "inv-elena-petrova",
    name: "Elena Petrova",
    email: "elena.petrova@example.com",
    phone: "+971 56 445 2211",
    brokerage: "Harbour & Co Realty",
    broker: "Khalid Al Mansoori",
    status: "Pending",
    portal: "Pending",
    lastUpdated: "02 Oct 2026",
    investments: [
      {
        id: "inv-elena-1",
        development: "Marina Vista Towers",
        unit: "2 Bedroom Residence",
        unitType: "Residence",
        size: "1,300 sqft",
        purchasePrice: 1890000,
        purchaseDate: "2026-09-28",
        startingPrice: 1800000,
        availablePrice: 1890000,
        status: "Pending",
      },
    ],
  },
  {
    id: "inv-sophia-bennett",
    name: "Sophia Bennett",
    email: "sophia.bennett@example.com",
    phone: "+971 54 667 3311",
    brokerage: "Skyline Asset Advisory",
    broker: "Khalid Al Mansoori",
    status: "Pending",
    portal: "Pending",
    lastUpdated: "01 Oct 2026",
    investments: [],
  },
  {
    id: "inv-priya-nair",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+971 55 889 6633",
    brokerage: "Meridian Property Group",
    broker: "Khalid Al Mansoori",
    status: "Inactive",
    portal: "Inactive",
    lastUpdated: "28 Sep 2026",
    investments: [
      {
        id: "inv-priya-1",
        development: "Al Reem Central Park",
        unit: "1 Bedroom Apartment",
        unitType: "Apartment",
        size: "820 sqft",
        purchasePrice: 890000,
        purchaseDate: "2021-05-10",
        startingPrice: 850000,
        availablePrice: 945000,
        status: "Completed",
      },
    ],
  },
];