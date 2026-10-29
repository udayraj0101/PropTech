import Reveal from "../ui/Reveal";
import Display from "../ui/Display";

export default function Statement() {
  return (
    <section className="w-full bg-white py-32 md:py-44">
      <div className="mx-auto w-full max-w-[1120px] px-6 text-center md:px-14">
        <Reveal>
          <span className="flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-[#C9A45C]" />
            <span className="text-[11.5px] uppercase tracking-[0.3em] text-[#080B0F]/50">
              The PROPTECH standard
            </span>
            <span className="h-px w-10 bg-[#C9A45C]" />
          </span>
          <Display className="mt-11 text-[31px] font-medium leading-[1.22] tracking-[-0.02em] text-[#080B0F] md:text-[48px]">
            A recommendation should never rest on instinct alone. Every figure behind a PROPTECH decision is
            located, sourced and modelled —{" "}
            <span className="italic text-[#C9A45C]">so conviction is built, not assumed.</span>
          </Display>
        </Reveal>
      </div>
    </section>
  );
}
