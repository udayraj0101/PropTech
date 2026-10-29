"use client";

import { useState } from "react";
import Reveal from "../ui/Reveal";
import SectionHead from "../ui/SectionHead";
import ExploreCta from "../auth/ExploreCta";

const pins = [
  { id: "saadiyat", x: 30, y: 42, name: "Saadiyat Reserve", meta: "Villa · Aldar · from AED 1.4M" },
  { id: "reem", x: 60, y: 34, name: "Reem Hills", meta: "Apartment · Modon · from AED 1.55M" },
  { id: "yas", x: 46, y: 66, name: "Yas Living", meta: "Apartment · Aldar · from AED 1.2M" },
  { id: "maryah", x: 68, y: 48, name: "Al Maryah Crest", meta: "Apartment · Aldar · from AED 4.1M" },
];

export default function DiscoverMarket() {
  const [active, setActive] = useState("reem");

  return (
    <section className="w-full bg-white py-28 md:py-40">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <Reveal>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHead
              eyebrow="Discover the market"
              title="Explore UAE developments through geographic intelligence."
              description="Explore UAE developments through an interactive geographic intelligence experience — one connected map of the Emirates."
            />
            <ExploreCta variant="primary" size="lg" className="self-start lg:mb-2">
              Explore developments
              <i className="ri-arrow-right-line" />
            </ExploreCta>
          </div>
        </Reveal>

        <Reveal className="mt-16" delay={80}>
          <div className="relative h-[520px] overflow-hidden border border-[#080B0F]/10 bg-[#DDE7E7]">
            <img
              suppressHydrationWarning
              src="https://public.readdy.ai/ai/img_res/edited_7a5f544c8c82c8c67bc1371fb84b1b83_0114dec6.jpg"
              alt="Preview of the UAE development map"
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {pins.map((p) => {
              const on = active === p.id;
              return (
                <button
                  key={p.id}
                  onMouseEnter={() => setActive(p.id)}
                  onFocus={() => setActive(p.id)}
                  onClick={() => setActive(p.id)}
                  aria-label={p.name}
                  suppressHydrationWarning
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{ left: `${p.x}%`, top: `${p.y}%` }}
                >
                  <span className="relative flex h-4 w-4 items-center justify-center">
                    <span
                      className="absolute h-11 w-11 rounded-full border"
                      style={{ borderColor: "#C9A45C", opacity: on ? 0.55 : 0.2 }}
                    />
                    <span
                      className="h-3.5 w-3.5 rounded-full border-2 border-white shadow-[0_2px_8px_rgba(8,11,15,0.35)] transition-transform duration-300"
                      style={{
                        backgroundColor: "#C9A45C",
                        transform: on ? "scale(1.18)" : "scale(1)",
                      }}
                    />
                  </span>
                </button>
              );
            })}

            <div className="pointer-events-none absolute left-6 top-6 z-20 flex items-center gap-2 border border-[#080B0F]/12 bg-[#F5F2EA]/90 px-4 py-2 backdrop-blur-md">
              <i className="ri-map-pin-2-line text-[15px] text-[#C9A45C]" />
              <span className="text-[10.5px] uppercase tracking-[0.24em] text-[#080B0F]/60">
                Interactive development map
              </span>
            </div>

            {pins.map((p) => {
              const on = active === p.id;
              return (
                <div
                  key={p.id}
                  className="pointer-events-none absolute z-30 hidden w-[260px] sm:block"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    opacity: on ? 1 : 0,
                    transform: `translateY(${on ? 0 : 6}px)`,
                    transition: "opacity 400ms ease, transform 400ms ease",
                  }}
                >
                  <div
                    className={`border border-[#080B0F]/12 bg-white/97 px-5 py-4 shadow-[0_24px_60px_-28px_rgba(8,11,15,0.45)] backdrop-blur-md ${
                      p.x > 58 ? "-translate-x-[112%] -translate-y-1/2" : "translate-x-[14%] -translate-y-1/2"
                    }`}
                  >
                    <span
                      className="block text-[15px] font-medium text-[#080B0F]"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {p.name}
                    </span>
                    <span className="mt-1 block text-[12px] text-[#080B0F]/55">{p.meta}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <p className="mt-6 text-[12.5px] text-[#080B0F]/45">
            A preview of the broker workspace. Sign in to open the full interactive map.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
