import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";

const pillars = [
  {
    n: "01",
    title: "Discover",
    body: "Developers, developments, locations, pricing, payment plans and market context — in one connected view.",
  },
  {
    n: "02",
    title: "Model",
    body: "Payment schedules, rental income, capital appreciation, ROI and IRR, modelled against the real available price.",
  },
  {
    n: "03",
    title: "Propose",
    body: "Turn analysis into professional client recommendations and sales offers your client can act on.",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="w-full bg-white py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            eyebrow="The platform"
            title="From market intelligence to investment decision."
            description="Everything a broker needs to move from discovery to recommendation in one connected workflow."
          />
        </Reveal>

        <div className="mt-20 grid gap-14 md:grid-cols-3 md:gap-10">
          {pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 110} className="h-full">
              <div className="group flex h-full flex-col border-t border-[#080B0F]/15 pt-9">
                <span
                  className="text-[15px] tracking-[0.1em] text-[#C9A45C]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.n}
                </span>
                <h3
                  className="mt-8 text-[27px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[32px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {p.title}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#080B0F]/65">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
