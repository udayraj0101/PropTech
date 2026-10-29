import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";

const steps = [
  { n: "01", title: "Discover", copy: "Explore UAE developments through the interactive map." },
  { n: "02", title: "Explore", copy: "Open a development and understand the opportunity." },
  {
    n: "03",
    title: "Model",
    copy: "Adjust price, payment plan, holding period, rental assumptions and appreciation.",
  },
  { n: "04", title: "Decide", copy: "Review the investment outcome and build the recommendation." },
];

export default function Journey() {
  return (
    <section className="w-full bg-[#F5F2EA] py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            eyebrow="The journey"
            title="From discovery to decision, in one flow."
            description="A single connected path from exploring the market through to a confident investment outcome."
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="h-full">
              <div className="group flex h-full flex-col border-t border-[#080B0F]/15 pt-8">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] tracking-[0.2em] text-[#C9A45C]">{s.n}</span>
                  {i < steps.length - 1 && (
                    <span className="hidden text-[#080B0F]/25 lg:block">
                      <i className="ri-arrow-right-line text-lg" />
                    </span>
                  )}
                </div>
                <h3
                  className="mt-7 text-[26px] font-semibold tracking-[-0.02em] text-[#080B0F]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {s.title}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed text-[#080B0F]/60">{s.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
