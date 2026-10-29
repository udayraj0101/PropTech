"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo, { LogoMark } from "../brand/Logo";
import Button from "../ui/Button";

const links = [
  { label: "Platform", href: "#platform" },
  { label: "Market", href: "#market" },
  { label: "Modeller", href: "#modeller" },
  { label: "Brokers", href: "#brokers" },
  { label: "Investors", href: "#investors" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = scrolled ? "dark" : "light";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-[#080B0F]/10 bg-[#F5F2EA] shadow-[0_20px_44px_-34px_rgba(8,11,15,0.4)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[84px] w-full items-center justify-between px-6 md:px-14">
        <div className="flex items-center gap-14">
          <Logo tone={tone} draw />
          <nav className="hidden items-center gap-9 xl:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-[13.5px] font-medium tracking-[0.02em] transition-colors duration-300 hover:text-[#C9A45C] ${
                  scrolled ? "text-[#080B0F]/85" : "text-[#F5F2EA]/90"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-8 lg:flex">
          <Link
            href="/access"
            className={`text-[13.5px] font-medium transition-colors duration-300 hover:text-[#C9A45C] ${
              scrolled ? "text-[#080B0F]/85" : "text-[#F5F2EA]/90"
            }`}
          >
            Sign in
          </Link>
          <Button href="#access" variant={scrolled ? "primary" : "gold"}>
            Request access
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
          suppressHydrationWarning
          className={`flex h-10 w-10 items-center justify-center xl:hidden ${
            tone === "dark" ? "text-[#080B0F]" : "text-[#F5F2EA]"
          }`}
        >
          <i className={`ri-${open ? "close-line" : "menu-line"} text-2xl`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-[#080B0F]/10 bg-[#F5F2EA] px-6 pb-8 pt-4 xl:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-[#080B0F]/8 py-3.5 text-[14.5px] font-medium text-[#080B0F]/85"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-4">
            <LogoMark className="h-7 w-7" />
            <Button href="#access" variant="primary" className="flex-1">
              Request access
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
