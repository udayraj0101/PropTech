"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Display from "../ui/Display";
import { investorSeed, investorSearchBlob, type Investor, type InvestorStatus } from "../../lib/investors";
import { allInvestors } from "../../lib/investorStore";
import InvestorRow from "./InvestorRow";

type Filter = "All" | InvestorStatus;

const FILTERS: Filter[] = ["All", "Active", "Pending", "Inactive"];

export default function InvestorManagement() {
  const [investors, setInvestors] = useState<Investor[]>(investorSeed);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    setInvestors(allInvestors());
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return investors.filter((inv) => {
      if (filter !== "All" && inv.status !== filter) return false;
      if (q && !investorSearchBlob(inv).includes(q)) return false;
      return true;
    });
  }, [investors, search, filter]);

  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-9 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />
              <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investors</span>
            </div>
            <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
              Investor Management
            </Display>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
              View and manage investors associated with your brokerage portfolio.
            </p>
          </div>

          <Link
            href="/workspace/investors/new"
            className="flex cursor-pointer items-center gap-3 whitespace-nowrap border border-[#080B0F] bg-[#080B0F] px-6 py-3.5 text-[10.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:border-[#C9A45C] hover:bg-[#C9A45C] hover:text-[#080B0F]"
          >
            <i className="ri-add-line text-[15px]" />
            Add investor
          </Link>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-[#080B0F]/10 py-5">
          <div className="flex min-w-[260px] flex-1 items-center border border-[#080B0F]/15 px-4 py-2.5 focus-within:border-[#080B0F]/45 sm:max-w-md">
            <i className="ri-search-line text-[15px] text-[#080B0F]/40" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search investors..."
              className="w-full bg-transparent pl-3 text-sm text-[#080B0F] placeholder-[#080B0F]/35 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#080B0F]/40 transition-colors hover:text-[#9A7433]"
              >
                <i className="ri-close-line text-[15px]" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 rounded-full border border-[#080B0F]/12 p-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`cursor-pointer rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 ${
                  filter === f ? "bg-[#080B0F] text-[#F5F2EA]" : "text-[#080B0F]/55 hover:text-[#080B0F]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <span className="text-[10.5px] uppercase tracking-[0.28em] text-[#080B0F]/45">
            {filtered.length} {filtered.length === 1 ? "investor" : "investors"}
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 border border-[#080B0F]/12 bg-white px-8 py-16 text-center">
            <div className="text-[15px] text-[#080B0F]/70">No investors match your search.</div>
            <button
              onClick={() => {
                setSearch("");
                setFilter("All");
              }}
              className="mt-4 cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-6 border border-[#080B0F]/12 bg-white">
            <div className="hidden grid-cols-[minmax(0,2.2fr)_0.9fr_1fr_1fr_1fr_112px] items-center gap-6 border-b border-[#080B0F]/10 px-6 py-3.5 lg:grid">
              {["Investor", "Investments", "Investment status", "Portal access", "Last updated", ""].map((h) => (
                <span key={h} className="text-[9.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">
                  {h}
                </span>
              ))}
            </div>
            <div className="divide-y divide-[#080B0F]/8">
              {filtered.map((inv) => (
                <InvestorRow key={inv.id} investor={inv} />
              ))}
            </div>
          </div>
        )}

        <p className="mt-10 text-[10.5px] leading-relaxed text-[#080B0F]/40">
          Demonstration data for prototype use. Investor records originate from your brokerage data and will connect to
          the Investor Portal in a later step.
        </p>
      </div>
    </div>
  );
}