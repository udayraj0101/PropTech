import CountUp from "../ui/CountUp";
import InView from "../ui/InView";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import PortfolioChart from "./PortfolioChart";

const tabs = ["Overview", "Investments", "Performance", "Documents"];

const summary = [
  { l: "Portfolio value", to: 1.77, decimals: 2, prefix: "AED ", suffix: "M", d: "+3.1% this month" },
  { l: "Total invested", to: 1.4, decimals: 2, prefix: "AED ", suffix: "M", d: "2 investments" },
  { l: "Unrealised gain", to: 368, decimals: 0, prefix: "AED ", suffix: "K", d: "+26.3%" },
  { l: "Estimated yield", to: 6.1, decimals: 1, prefix: "", suffix: "%", d: "Trailing 12 months" },
];

const holdings = [
  {
    name: "Saadiyat Reserve · Villa 214",
    dev: "Aldar",
    paid: "AED 840,000",
    progress: "60%",
    value: "AED 1,012,000",
  },
  {
    name: "Reem Hills · Apartment 1806",
    dev: "Modon",
    paid: "AED 465,000",
    progress: "30%",
    value: "AED 756,000",
  },
];

export default function AfterDeal() {
  return (
    <section id="investors" className="w-full bg-[#080B0F] py-28 text-[#F5F2EA] md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            tone="light"
            eyebrow="After the deal"
            title="The relationship continues after the transaction."
            description="Once an investment is registered, clients receive their own private portal to monitor payments, value and performance — separate from the main broker workspace."
          />
        </Reveal>

        <Reveal className="mt-16">
          <div className="border border-[#F5F2EA]/12 bg-[#0D1116]">
            <div className="flex flex-wrap items-center gap-8 border-b border-[#F5F2EA]/10 px-7 py-5">
              {tabs.map((t, i) => (
                <span
                  key={t}
                  className={`cursor-pointer pb-1 text-[13px] ${
                    i === 0
                      ? "border-b border-[#C9A45C] text-[#F5F2EA]"
                      : "text-[#F5F2EA]/45 hover:text-[#F5F2EA]/80"
                  }`}
                >
                  {t}
                </span>
              ))}
              <span className="ml-auto hidden text-[12px] text-[#F5F2EA]/45 md:block">
                Khalid Al Mansoori
              </span>
            </div>

            <div className="grid grid-cols-2 gap-px bg-[#F5F2EA]/10 lg:grid-cols-4">
              {summary.map((s, i) => (
                <Reveal key={s.l} delay={i * 90}>
                  <div className="h-full bg-[#0D1116] p-7">
                    <div className="text-[12px] text-[#F5F2EA]/55">{s.l}</div>
                    <div
                      className="mt-4 text-[26px] font-medium text-[#F5F2EA]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <CountUp to={s.to} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} />
                    </div>
                    <div className="mt-2.5 text-[12px] text-[#3E9D80]">{s.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="grid gap-px bg-[#F5F2EA]/10 lg:grid-cols-[1fr_1.3fr]">
              <div className="bg-[#0D1116] p-7 md:p-9">
                <div className="flex items-center justify-between">
                  <h4
                    className="text-[15px] font-medium text-[#F5F2EA]/85"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Performance
                  </h4>
                  <span className="text-[12px] text-[#F5F2EA]/40">AED thousands</span>
                </div>
                <div className="mt-6">
                  <InView minHeight={170}>
                    <PortfolioChart />
                  </InView>
                </div>
                <div className="mt-6 flex items-center gap-2.5 border-t border-[#F5F2EA]/10 pt-5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C9A45C]" />
                  <span className="text-[12px] text-[#F5F2EA]/45">Valuation reported quarterly</span>
                </div>
              </div>

              <div className="bg-[#0D1116]">
                <div className="flex items-center justify-between border-b border-[#F5F2EA]/10 px-7 py-5">
                  <h4
                    className="text-[15px] font-medium text-[#F5F2EA]/85"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Investment holdings
                  </h4>
                  <span className="text-[12px] text-[#F5F2EA]/45">2 active</span>
                </div>
                {holdings.map((h) => (
                  <div key={h.name} className="border-b border-[#F5F2EA]/8 px-7 py-6">
                    <div className="flex items-start justify-between gap-6">
                      <div>
                        <div className="text-[15px] text-[#F5F2EA]/90">{h.name}</div>
                        <div className="mt-1 text-[12px] text-[#F5F2EA]/40">{h.dev}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[15px] text-[#F5F2EA]/90">{h.value}</div>
                        <div className="mt-1 flex items-center justify-end gap-1.5 text-[12px] text-[#3E9D80]">
                          <i className="ri-arrow-right-up-line text-xs" />
                          {h.progress} paid
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 h-px w-full bg-[#F5F2EA]/10">
                      <div className="h-px bg-[#C9A45C]" style={{ width: h.progress }} />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[12px] text-[#F5F2EA]/45">
                      <span>Contributed {h.paid}</span>
                      <span className="cursor-pointer transition-colors hover:text-[#C9A45C]">
                        View details
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
