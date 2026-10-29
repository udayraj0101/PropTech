import Link from "next/link";
import Display from "../ui/Display";
import { INVESTOR_STATUSES, investmentCount, portalNote, type Investor } from "../../lib/investors";
import StatusPill from "./StatusPill";
import InvestmentsList from "./InvestmentsList";

function InfoField({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <div className="text-[9.5px] uppercase leading-[1.35] tracking-[0.16em] text-[#080B0F]/40">{label}</div>
      <div className="mt-1.5 truncate text-[13.5px] text-[#080B0F]/85">{value || "—"}</div>
    </div>
  );
}

function ContactItem({ icon, value }: { icon: string; value: string }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className="flex h-4 w-4 items-center justify-center text-[#9A7433]">
        <i className={`${icon} text-[15px]`} />
      </span>
      {value}
    </span>
  );
}

export default function InvestorDetail({ investor }: { investor: Investor }) {
  const count = investmentCount(investor);

  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-9 md:px-10">
        <Link
          href="/workspace/investors"
          className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/50 transition-colors hover:text-[#9A7433]"
        >
          <i className="ri-arrow-left-line" />
          Investor Management
        </Link>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-8">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />
              <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investor</span>
            </div>
            <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
              {investor.name}
            </Display>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-[#080B0F]/60">
              <ContactItem icon="ri-mail-line" value={investor.email} />
              <ContactItem icon="ri-smartphone-line" value={investor.phone || "—"} />
              <ContactItem icon="ri-map-pin-line" value={investor.country || "—"} />
              <span className="flex items-center gap-2.5">
                <span className="text-[10px] uppercase tracking-[0.18em] text-[#080B0F]/40">Portal Access</span>
                <StatusPill status={investor.portal} />
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/workspace/investors/edit?id=${investor.id}`}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap border border-[#080B0F]/20 px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] text-[#080B0F]/80 transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
            >
              <i className="ri-edit-line text-[15px]" />
              Edit investor
            </Link>
            <Link
              href={`/workspace/investors/investment?investor=${investor.id}`}
              className="flex cursor-pointer items-center gap-3 whitespace-nowrap bg-[#080B0F] px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              <i className="ri-add-line text-[15px]" />
              Add investment
            </Link>
          </div>
        </div>

        <section className="mt-10 border border-[#080B0F]/12 bg-white">
          <div className="border-b border-[#080B0F]/8 px-8 py-5">
            <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Investor Information
            </h3>
            <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
              Contact details and portal access for this investor.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-7 px-8 py-8 md:grid-cols-4">
            <InfoField label="Full name" value={investor.name} />
            <InfoField label="Email" value={investor.email} />
            <InfoField label="Mobile number" value={investor.phone} />
            <InfoField label="Country" value={investor.country || "—"} />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#080B0F]/8 px-8 py-6">
            <div>
              <div className="text-[9.5px] uppercase tracking-[0.16em] text-[#080B0F]/40">Investor Portal Access</div>
              <div className="mt-1.5 text-[13px] text-[#080B0F]/70">{portalNote(investor.portal)}</div>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-[#080B0F]/12 p-1">
              {INVESTOR_STATUSES.map((s) => (
                <span
                  key={s}
                  className={`rounded-full px-4 py-1.5 text-[10.5px] uppercase tracking-[0.16em] ${
                    s === investor.portal ? "bg-[#080B0F] text-[#F5F2EA]" : "text-[#080B0F]/35"
                  }`}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="mt-12 flex items-baseline justify-between gap-4">
          <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#080B0F]/45">
            Investments ({count})
          </span>
          <span className="text-[10.5px] uppercase tracking-[0.22em] text-[#080B0F]/40">
            Last updated {investor.lastUpdated}
          </span>
        </div>

        {count === 0 ? (
          <div className="mt-5 border border-[#080B0F]/12 bg-white px-8 py-16 text-center">
            <div className="text-[16px] text-[#080B0F]/70" style={{ fontFamily: "var(--font-display)" }}>
              No investments have been added yet.
            </div>
            <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[#080B0F]/50">
              Add an investment to associate a property or unit with this investor.
            </p>
            <Link
              href={`/workspace/investors/investment?investor=${investor.id}`}
              className="mt-7 inline-flex cursor-pointer items-center gap-3 whitespace-nowrap bg-[#080B0F] px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              <i className="ri-add-line text-[15px]" />
              Add investment
            </Link>
          </div>
        ) : (
          <InvestmentsList investor={investor} />
        )}

        <section className="mt-12 border border-[#080B0F]/12 bg-white">
          <div className="border-b border-[#080B0F]/8 px-8 py-5">
            <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
              Performance
            </h3>
          </div>
          <div className="px-8 py-8">
            <div className="text-[10px] uppercase tracking-[0.24em] text-[#9A7433]">Status</div>
            <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-[#080B0F]/70">
              Performance tracking will be available once the required market and investment data is available.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}