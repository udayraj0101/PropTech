import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";

const developers = [
  {
    name: "ALDAR",
    note: "Master developer · United Arab Emirates",
    logo: "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/2f13af8c-b38c-4314-97bd-ea9c550ec91e_compressed_ALDAR-LOGO.webp",
    ratio: "aspect-[1/1]",
  },
  {
    name: "MODON",
    note: "Master communities · United Arab Emirates",
    logo: "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/c23cfff4-2181-4b73-aca2-84dc5d434639_compressed_images.webp",
    ratio: "aspect-[1/1]",
  },
  {
    name: "EAGLE HILLS",
    note: "Waterfront & mixed-use · United Arab Emirates",
    logo: "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/140f98b1-b42c-492e-814c-db8b3dd16d7e_compressed_Eagle-Hills-logo.webp",
    ratio: "aspect-[1/1]",
  },
  {
    name: "AL AIN HOLDING",
    note: "Diversified holdings · United Arab Emirates",
    logo: "https://storage.helloreaddy.io/project_files/adec7213-67e0-4d5c-985f-d084445559f6/5825882c-66b6-4867-85fb-7c239dddd9bf_compressed_ALAIN.webp",
    ratio: "aspect-[1/1]",
  },
] as const;

export default function DeveloperCoverage() {
  return (
    <section className="w-full bg-[#F5F2EA] py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <SectionHead
            eyebrow="Current coverage"
            title="Selected developer coverage. Built to expand."
            description="PROPTECH brings together selected premium developer groups and their developments across the Emirates, with coverage designed to scale across the UAE."
          />
        </Reveal>

        <div className="mt-20 grid grid-cols-1 gap-px overflow-hidden bg-[#080B0F]/10 sm:grid-cols-2 lg:grid-cols-4">
          {developers.map((d, i) => (
            <Reveal key={d.name} delay={i * 90} className="h-full">
              <div className="group flex h-full flex-col justify-between bg-white px-8 py-9 md:px-10 md:py-10">
                <span className="self-end text-[12px] text-[#080B0F]/30">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className={`mt-6 flex w-full items-center justify-center ${d.ratio}`}>
                  <img
                    src={d.logo}
                    alt={d.name}
                    className="h-full w-full object-contain opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                  />
                </div>

                <div className="mt-9">
                  <p className="text-[13px] leading-relaxed text-[#080B0F]/50">{d.note}</p>
                  <span className="mt-6 block h-px w-8 bg-[#C9A45C] transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
            <span className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center text-[#C9A45C]">
                <i className="ri-add-line text-lg" />
              </span>
              <span className="text-[12px] uppercase tracking-[0.24em] text-[#080B0F]/55">Expanding</span>
            </span>
            <span className="text-[14px] text-[#080B0F]/50">
              New developers are added as coverage is verified and released.
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
