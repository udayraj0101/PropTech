"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Button from "../ui/Button";
import ExploreCta from "../auth/ExploreCta";
import Display from "../ui/Display";
import styles from "../ui/arch.module.css";

const headline: { text: string; gold?: boolean }[][] = [
  [{ text: "Real estate intelligence" }],
  [{ text: "for " }, { text: "better decisions.", gold: true }],
];

export default function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 90);
    return () => clearTimeout(t);
  }, []);

  const rise = (delay: number, y = 18): CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0px)" : `translateY(${y}px)`,
    transition:
      "opacity 1100ms cubic-bezier(0.16,1,0.3,1), transform 1100ms cubic-bezier(0.16,1,0.3,1)",
    transitionDelay: `${delay}ms`,
  });

  return (
    <section className="relative w-full overflow-hidden bg-[#080B0F] text-[#F5F2EA]">
      <img
        suppressHydrationWarning
        src="https://public.readdy.ai/ai/img_res/edited_250ca6a82e046df9910f6bc7d7037022_815489e1.jpg"
        alt="United Arab Emirates skyline at dusk"
        className={`absolute inset-0 h-full w-full object-cover object-center transition-[opacity,transform] duration-[2400ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          ready ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
        }`}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080B0F] via-[#080B0F]/88 to-[#080B0F]/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#080B0F] via-transparent to-[#080B0F]/45" />
      <div className={`absolute inset-0 opacity-40 ${styles.gridDark}`} />

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1440px] flex-col px-6 pt-24 md:px-14">
        <div className="flex flex-1 flex-col justify-center py-9">
          <div className="flex items-center gap-4" style={rise(140)}>
            <span
              className="h-px bg-[#C9A45C]"
              style={{
                width: ready ? 44 : 0,
                transition: "width 1300ms cubic-bezier(0.16,1,0.3,1) 320ms",
              }}
            />
            <span className="text-[11.5px] font-semibold uppercase tracking-[0.3em] text-[#C9A45C]">
              UAE Real Estate Intelligence
            </span>
          </div>

          <Display
            as="h1"
            className="mt-8 w-full max-w-[1180px] text-[clamp(32px,6vw,92px)] font-semibold leading-[1.03] tracking-[-0.035em]"
          >
            {headline.map((line, i) => (
              <span key={i} className="block overflow-hidden pb-[0.16em]">
                <span className="block" style={rise(300 + i * 180, 26)}>
                  {line.map((seg, j) => (
                    <span key={j} className={seg.gold ? "italic text-[#C9A45C]" : undefined}>
                      {seg.text}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </Display>

          <p
            className="mt-7 max-w-[600px] text-[16px] font-normal leading-relaxed text-[#F5F2EA]/75"
            style={rise(760)}
          >
            Explore UAE developments, understand the market, model the opportunity and build stronger
            investment recommendations from one connected platform.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4" style={rise(900)}>
            <ExploreCta variant="gold" size="lg">
              Explore developments
              <i className="ri-arrow-right-line" />
            </ExploreCta>
            <Button href="#access" variant="outlineLight" size="lg">
              Request access
            </Button>
          </div>
        </div>

        <div
          className="flex items-center justify-between border-t border-[#F5F2EA]/12 py-5"
          style={rise(1080)}
        >
          <span className="text-[11.5px] tracking-[0.06em] text-[#F5F2EA]/50">
            Abu Dhabi · Dubai · United Arab Emirates
          </span>
          <span
            className="hidden text-[11px] tracking-[0.14em] text-[#F5F2EA]/35 md:block"
            style={{ fontFamily: "var(--font-geist-mono)" }}
          >
            UAE · 23.4241° N / 53.8478° E
          </span>
        </div>
      </div>
    </section>
  );
}
