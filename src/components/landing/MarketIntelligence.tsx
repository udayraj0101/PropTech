import InView from "../ui/InView";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import DevMap from "./DevMap";
import PulsePanel from "./PulsePanel";

const provenance = ["Live", "Historical", "Reference", "Modelled"];

export default function MarketIntelligence() {
  return (
    <section id="market" className="w-full bg-[#080B0F] py-28 text-[#F5F2EA] md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              tone="light"
              eyebrow="Market intelligence"
              title="Read the market before you price a single unit."
              description="Understand area performance, transaction activity, rental yields and historical price movement before making a recommendation."
            />
            <div className="flex flex-wrap gap-x-7 gap-y-3">
              {provenance.map((p) => (
                <span key={p} className="flex items-center gap-2.5">
                  <span className="h-1 w-1 rounded-full bg-[#C9A45C]" />
                  <span className="text-[12px] text-[#F5F2EA]/60">{p}</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <DevMap />
        </Reveal>

        <Reveal className="mt-16">
          <InView minHeight={440}>
            <PulsePanel />
          </InView>
        </Reveal>

        <p className="mt-8 max-w-3xl text-[12px] leading-relaxed text-[#F5F2EA]/35">
          All figures are illustrative demonstration data and do not represent verified market statistics.
          PROPTECH labels every dataset as live, historical, reference or modelled — modelled values are never
          presented as fact.
        </p>
      </div>
    </section>
  );
}
