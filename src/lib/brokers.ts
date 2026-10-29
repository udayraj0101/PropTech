export type BrokerStatus = "Active" | "Pending" | "Inactive" | "Suspended";
export type AccessStatus = "Approved" | "Pending" | "Rejected";

export type Broker = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  companyLocation: string;
  licenseRef: string;
  brokerId: string;
  status: BrokerStatus;
  access: AccessStatus;
  accessEnabled: boolean;
  notes: string;
  lastLogin: string;
  createdAt: string;
  createdBy: string;
  lastUpdated: string;
  lastUpdatedBy: string;
  lastStatusChange: string;
};

export const BROKER_STATUSES: BrokerStatus[] = ["Active", "Pending", "Inactive", "Suspended"];
export const ACCESS_STATUSES: AccessStatus[] = ["Approved", "Pending", "Rejected"];

export function brokerSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function brokerName(b: Broker): string {
  return `${b.firstName} ${b.lastName}`.trim();
}

export function brokerStatusTone(status: BrokerStatus): string {
  if (status === "Active") return "text-[#3F5C4E]";
  if (status === "Pending") return "text-[#8A6A34]";
  if (status === "Suspended") return "text-[#96604C]";
  return "text-[#080B0F]/45";
}

export function brokerStatusDot(status: BrokerStatus): string {
  if (status === "Active") return "bg-[#4F6F5F]";
  if (status === "Pending") return "bg-[#B08A4A]";
  if (status === "Suspended") return "bg-[#A5745F]";
  return "bg-[#080B0F]/30";
}

export function accessTone(access: AccessStatus): string {
  if (access === "Approved") return "text-[#3F5C4E]";
  if (access === "Pending") return "text-[#8A6A34]";
  return "text-[#96604C]";
}

export const companyOptions: string[] = [
  "Gulf Estates Partners",
  "Meridian Property Group",
  "Capital Residences Advisory",
  "Harbour & Co Realty",
  "Skyline Asset Advisory",
];

export const brokerSeed: Broker[] = [
  {
    id: "broker-khalid-al-mansoori",
    firstName: "Khalid",
    lastName: "Al Mansoori",
    email: "khalid@proptech.ae",
    phone: "+971 50 000 0000",
    company: "Gulf Estates Partners",
    companyLocation: "Abu Dhabi",
    licenseRef: "",
    brokerId: "BRK-1001",
    status: "Active",
    access: "Approved",
    accessEnabled: true,
    notes: "",
    lastLogin: "06 Oct 2026",
    createdAt: "14 Jan 2026",
    createdBy: "Administrator",
    lastUpdated: "06 Oct 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "06 Oct 2026",
  },
  {
    id: "broker-sara-al-nuaimi",
    firstName: "Sara",
    lastName: "Al Nuaimi",
    email: "sara@proptech.ae",
    phone: "+971 55 000 0000",
    company: "Meridian Property Group",
    companyLocation: "Abu Dhabi",
    licenseRef: "",
    brokerId: "BRK-1002",
    status: "Active",
    access: "Approved",
    accessEnabled: true,
    notes: "",
    lastLogin: "05 Oct 2026",
    createdAt: "22 Jan 2026",
    createdBy: "Administrator",
    lastUpdated: "05 Oct 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "05 Oct 2026",
  },
  {
    id: "broker-omar-haddad",
    firstName: "Omar",
    lastName: "Haddad",
    email: "omar@proptech.ae",
    phone: "+971 52 000 0000",
    company: "Capital Residences Advisory",
    companyLocation: "Dubai",
    licenseRef: "",
    brokerId: "BRK-1003",
    status: "Active",
    access: "Approved",
    accessEnabled: true,
    notes: "",
    lastLogin: "04 Oct 2026",
    createdAt: "03 Feb 2026",
    createdBy: "Administrator",
    lastUpdated: "04 Oct 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "04 Oct 2026",
  },
  {
    id: "broker-layla-rahman",
    firstName: "Layla",
    lastName: "Rahman",
    email: "layla@proptech.ae",
    phone: "+971 56 000 0000",
    company: "Harbour & Co Realty",
    companyLocation: "Dubai",
    licenseRef: "",
    brokerId: "BRK-1004",
    status: "Active",
    access: "Approved",
    accessEnabled: true,
    notes: "",
    lastLogin: "01 Oct 2026",
    createdAt: "19 Feb 2026",
    createdBy: "Administrator",
    lastUpdated: "01 Oct 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "01 Oct 2026",
  },
  {
    id: "broker-yousef-karim",
    firstName: "Yousef",
    lastName: "Karim",
    email: "yousef@proptech.ae",
    phone: "+971 50 000 0000",
    company: "Skyline Asset Advisory",
    companyLocation: "Abu Dhabi",
    licenseRef: "",
    brokerId: "BRK-1005",
    status: "Inactive",
    access: "Approved",
    accessEnabled: false,
    notes: "Account deactivated at broker request.",
    lastLogin: "12 Jul 2026",
    createdAt: "08 Mar 2026",
    createdBy: "Administrator",
    lastUpdated: "28 Sep 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "28 Sep 2026",
  },
  {
    id: "broker-noor-alfarsi",
    firstName: "Noor",
    lastName: "Al Farsi",
    email: "noor@proptech.ae",
    phone: "+971 55 000 0000",
    company: "Meridian Property Group",
    companyLocation: "Dubai",
    licenseRef: "",
    brokerId: "BRK-1006",
    status: "Pending",
    access: "Pending",
    accessEnabled: false,
    notes: "",
    lastLogin: "—",
    createdAt: "02 Oct 2026",
    createdBy: "Request Access",
    lastUpdated: "02 Oct 2026",
    lastUpdatedBy: "Request Access",
    lastStatusChange: "02 Oct 2026",
  },
  {
    id: "broker-faisal-nasser",
    firstName: "Faisal",
    lastName: "Nasser",
    email: "faisal@proptech.ae",
    phone: "+971 50 000 0000",
    company: "Gulf Estates Partners",
    companyLocation: "Abu Dhabi",
    licenseRef: "",
    brokerId: "",
    status: "Pending",
    access: "Pending",
    accessEnabled: false,
    notes: "Awaiting administrative review.",
    lastLogin: "—",
    createdAt: "04 Oct 2026",
    createdBy: "Request Access",
    lastUpdated: "04 Oct 2026",
    lastUpdatedBy: "Request Access",
    lastStatusChange: "04 Oct 2026",
  },
  {
    id: "broker-hana-saeed",
    firstName: "Hana",
    lastName: "Saeed",
    email: "hana@proptech.ae",
    phone: "+971 52 000 0000",
    company: "Capital Residences Advisory",
    companyLocation: "Abu Dhabi",
    licenseRef: "",
    brokerId: "BRK-1007",
    status: "Suspended",
    access: "Approved",
    accessEnabled: false,
    notes: "Access suspended pending administrative review.",
    lastLogin: "22 Aug 2026",
    createdAt: "11 Apr 2026",
    createdBy: "Administrator",
    lastUpdated: "30 Sep 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "30 Sep 2026",
  },
  {
    id: "broker-tariq-mahmoud",
    firstName: "Tariq",
    lastName: "Mahmoud",
    email: "tariq@proptech.ae",
    phone: "",
    company: "Skyline Asset Advisory",
    companyLocation: "Dubai",
    licenseRef: "",
    brokerId: "",
    status: "Inactive",
    access: "Rejected",
    accessEnabled: false,
    notes: "Access request not approved. Record retained for administrative reference.",
    lastLogin: "—",
    createdAt: "17 Sep 2026",
    createdBy: "Request Access",
    lastUpdated: "21 Sep 2026",
    lastUpdatedBy: "Administrator",
    lastStatusChange: "21 Sep 2026",
  },
];