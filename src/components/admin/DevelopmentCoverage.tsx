import SectionHeading from "./SectionHeading";
import { cityCoverage, developerCoverage } from "../../lib/adminData";

export default function DevelopmentCoverage() {
  return (
    <section className="mt-16">
      <SectionHeading
        title="Development Coverage"
        note="Current platform coverage across the emirates, by city and developer."
      />

      <div className="mt-9 grid gap-px border border-[#080B0F]/12 bg-[#080B0F]/12 lg:grid-cols-2">
        {cityCoverage.map((c) => (
          <div key={c.city} className="bg-white p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10.5px] uppercase tracking-[0.26em] text-[#080B0F]/40">
                  Emirate
                </p>
                <p
                  className="mt-3 text-[22px] font-medium text-[#080B0F]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {c.city}
                </p>
              </div>
              <span
                className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-[#C9A45C]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {c.count}
              </span>
            </div>
            <p className="mt-6 text-[12px] uppercase tracking-[0.2em] text-[#080B0F]/40">
              Developers covered
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.developers.map((d) => (
                <span
                  key={d}
                  className="border border-[#080B0F]/12 px-3 py-1.5 text-[11px] tracking-[0.12em] text-[#080B0F]/70"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border border-[#080B0F]/12 bg-white p-8">
        <p className="text-[10.5px] uppercase tracking-[0.26em] text-[#080B0F]/40">
          Developer coverage
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {developerCoverage.map((d) => (
            <div key={d.name} className="border-t border-[#080B0F]/10 pt-5">
              <p className="text-[14.5px] font-medium text-[#080B0F]">{d.name}</p>
              <p className="mt-2 text-[12.5px] text-[#080B0F]/50">
                {d.count} {d.count === 1 ? "development" : "developments"}
              </p>
              <p className="mt-1 text-[12px] text-[#080B0F]/40">{d.cities.join(" · ")}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex items-center gap-3 border-t border-[#080B0F]/10 pt-6">
          <i className="ri-add-line text-[#C9A45C]" />
          <span className="text-[12px] uppercase tracking-[0.22em] text-[#080B0F]/50">
            More / expanding
          </span>
        </div>
      </div>
    </section>
  );
}
