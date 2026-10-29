import Link from "next/link";
import Logo from "../brand/Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "Market Intelligence", href: "#market" },
      { label: "Development Discovery", href: "#market" },
      { label: "Investment Modeller", href: "#modeller" },
      { label: "Broker Workspace", href: "#brokers" },
      { label: "Investor Portal", href: "#investors" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "For Brokers", href: "#brokers" },
      { label: "For Developers", href: "#platform" },
      { label: "For Investors", href: "#investors" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Request Access", href: "#access" },
      { label: "Contact", href: null },
      { label: "Privacy", href: null },
      { label: "Terms", href: null },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="w-full bg-[#080B0F] text-[#F5F2EA]">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-20 md:px-14">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.5fr_2fr]">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[#F5F2EA]/55">
              Real estate intelligence and investment infrastructure for the UAE.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {columns.map((c) => (
              <div key={c.title}>
                <h4 className="text-[12px] tracking-[0.2em] text-[#C9A45C]">{c.title.toUpperCase()}</h4>
                <ul className="mt-6 space-y-3.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.href ? (
                        <Link
                          href={l.href}
                          className="text-[14px] text-[#F5F2EA]/60 transition-colors hover:text-[#F5F2EA]"
                        >
                          {l.label}
                        </Link>
                      ) : (
                        <span className="text-[14px] text-[#F5F2EA]/60">{l.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#F5F2EA]/10 pt-8 text-[12px] text-[#F5F2EA]/40 md:flex-row md:items-center md:justify-between">
          <p>© 2026 PROPTECH. United Arab Emirates.</p>
          <div className="flex items-center gap-3">
            {["linkedin-fill", "twitter-x-fill", "mail-fill"].map((i) => (
              <span
                key={i}
                aria-hidden="true"
                title="Social profiles coming soon"
                className="flex h-9 w-9 items-center justify-center border border-[#F5F2EA]/12 text-[#F5F2EA]/35"
              >
                <i className={`ri-${i} text-sm`} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
