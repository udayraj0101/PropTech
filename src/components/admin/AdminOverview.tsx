import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import OverviewMetrics from "./OverviewMetrics";
import DevelopmentCoverage from "./DevelopmentCoverage";
import DataStatus from "./DataStatus";
import RecentUpdates from "./RecentUpdates";
import QuickActions from "./QuickActions";
import {
  activeDevelopments,
  totalDevelopers,
  withAvailability,
  pricingReview,
} from "../../lib/adminData";

export default function AdminOverview() {
  const metrics = [
    {
      label: "Active Developments",
      value: String(activeDevelopments),
      note: `Across ${totalDevelopers} developers`,
    },
    {
      label: "Total Developers",
      value: String(totalDevelopers),
      note: "Confirmed platform coverage",
    },
    {
      label: "With Current Availability",
      value: String(withAvailability),
      note: "Open for reservation",
    },
    {
      label: "Pricing Review",
      value: String(pricingReview),
      note: "Records flagged for review",
      tone: "gold" as const,
    },
    { label: "Market Data Status", value: "Current", note: "2 areas pending refresh" },
  ];

  return (
    <div>
      <header className="flex flex-col gap-10 border-b border-[#080B0F]/10 pb-12 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow tone="gold">Platform Operations</Eyebrow>
          <Display
            as="h1"
            className="mt-6 text-[38px] font-semibold leading-[1.04] tracking-[-0.03em] text-[#080B0F] md:text-[52px]"
          >
            Platform Overview
          </Display>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-[#080B0F]/55">
            Manage the development intelligence powering PROPTECH.
          </p>
        </div>
        <div className="shrink-0 text-left md:text-right">
          <div
            className="text-[13px] tracking-[0.18em] text-[#080B0F]"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            07 OCT 2026
          </div>
          <div className="mt-2.5 text-[10.5px] uppercase tracking-[0.28em] text-[#080B0F]/40">
            Intelligence last synced
          </div>
        </div>
      </header>

      <div className="mt-12">
        <OverviewMetrics metrics={metrics} />
      </div>

      <DevelopmentCoverage />

      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <DataStatus />
        <RecentUpdates />
      </div>

      <QuickActions />
    </div>
  );
}
