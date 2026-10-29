import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import SalesOffer from "./SalesOffer";

const workflow = [
  { n: "01", name: "Discover" },
  { n: "02", name: "Analyse" },
  { n: "03", name: "Compare" },
  { n: "04", name: "Model" },
  { n: "05", name: "Propose" },
  { n: "06", name: "Close" },
];

const points = [
  "Your own client information on every recommendation",
  "Your brokerage identity on every document you issue",
  "A consistent, professional format your client can trust",
];

export default function Brokers() {
  return (
    <section id="brokers" className="w-full bg-white py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            eyebrow="Built for brokers"
            title="One workflow. From discovery to signed offer."
            description="Move through the same six stages on every opportunity — and keep the conversation with your client about the decision, not the data."
          />
        </Reveal>

        <Reveal className="mt-20">
          <div className="relative">
            <div className="grid grid-cols-2 gap-y-12 md:grid-cols-3 lg:grid-cols-6">
              {workflow.map((w, i) => (
                <div key={w.n} className="relative pr-6">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#C9A45C]" />
                    {i < workflow.length - 1 && (
                      <span className="hidden h-px flex-1 bg-[#080B0F]/15 lg:block" />
                    )}
                  </div>
                  <span
                    className="mt-6 block text-[15px] font-medium text-[#C9A45C]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {w.n}
                  </span>
                  <span
                    className="mt-3 block text-[20px] font-medium tracking-[-0.01em] text-[#080B0F]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {w.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-24 grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div>
              <h3
                className="max-w-md text-[28px] font-medium leading-[1.12] tracking-[-0.015em] text-[#080B0F] md:text-[34px]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Turn your analysis into a professional recommendation.
              </h3>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-[#080B0F]/65">
                Every offer carries your client&apos;s details and your brokerage branding, generated from the
                same model — prepared in minutes, not a spreadsheet.
              </p>
              <ul className="mt-10 flex flex-col divide-y divide-[#080B0F]/10 border-y border-[#080B0F]/10">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-4 py-4">
                    <i className="ri-check-line text-[#C9A45C]" />
                    <span className="text-[14px] text-[#080B0F]/75">{p}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[12px] leading-relaxed text-[#080B0F]/45">
                Figures in the proposal preview are illustrative and demonstrate document structure, not a
                live offer.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <SalesOffer />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
