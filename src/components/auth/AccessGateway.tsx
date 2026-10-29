"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogoMark } from "../brand/Logo";
import Display from "../ui/Display";
import Eyebrow from "../ui/Eyebrow";
import { clearSession, getSession, roleHome, type Session } from "../../lib/auth";

type RoleCard = {
  id: string;
  tag: string;
  icon: string;
  title: string;
  desc: string;
  cta: string;
  href: string;
  primary: boolean;
};

const roles: RoleCard[] = [
  {
    id: "broker",
    tag: "Primary workspace",
    icon: "ri-map-2-line",
    title: "Broker",
    desc: "Explore developments, model investment opportunities and present opportunities to clients.",
    cta: "Continue as broker",
    href: "/login",
    primary: true,
  },
  {
    id: "admin",
    tag: "Platform operations",
    icon: "ri-shield-user-line",
    title: "Admin",
    desc: "Manage developments, availability, pricing, market data and platform access.",
    cta: "Continue as admin",
    href: "/admin/login",
    primary: false,
  },
];

export default function AccessGateway() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    setSession(getSession());
    setReady(true);
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-[100svh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading</span>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-col bg-[#F5F2EA]">
      <header className="flex h-[84px] w-full items-center justify-between px-6 md:px-14">
        <Link href="/" className="flex cursor-pointer items-center gap-3 text-[#080B0F]">
          <LogoMark className="h-[26px] w-[26px]" />
          <span className="text-[15px] font-medium leading-none tracking-[0.34em]">PROPTECH</span>
        </Link>
        <Link
          href="/"
          className="inline-flex cursor-pointer items-center gap-2 text-[12.5px] text-[#080B0F]/55 transition-colors duration-300 hover:text-[#C9A45C]"
        >
          <i className="ri-arrow-left-line" />
          Back to site
        </Link>
      </header>

      <main className="mx-auto flex w-full max-w-[1180px] flex-1 flex-col justify-center px-6 py-14 md:px-14">
        <Eyebrow tone="gold">Access PROPTECH</Eyebrow>
        <Display
          as="h1"
          className="mt-7 text-[38px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[54px]"
        >
          Access PROPTECH
        </Display>
        <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-[#080B0F]/55">
          Choose how you use the platform.
        </p>

        {session && (
          <div className="mt-10 flex flex-col gap-4 border border-[#080B0F]/12 bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#080B0F]/40">
                Currently signed in
              </p>
              <p className="mt-1.5 text-[14.5px] text-[#080B0F]">
                {session.name}
                <span className="text-[#080B0F]/45"> · {session.role} workspace</span>
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push(roleHome(session.role))}
                suppressHydrationWarning
                className="inline-flex cursor-pointer items-center gap-2 whitespace-nowrap border border-[#080B0F]/20 px-5 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
              >
                Continue
                <i className="ri-arrow-right-line" />
              </button>
              <button
                onClick={() => {
                  clearSession();
                  setSession(null);
                }}
                suppressHydrationWarning
                className="cursor-pointer whitespace-nowrap text-[12.5px] text-[#080B0F]/50 transition-colors duration-300 hover:text-[#C9A45C]"
              >
                Sign out
              </button>
            </div>
          </div>
        )}

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {roles.map((r) =>
            r.primary ? (
              <article
                key={r.id}
                className="relative flex flex-col border border-[#C9A45C]/40 bg-[#080B0F] p-8 text-[#F5F2EA]"
              >
                <span className="absolute right-7 top-7 text-[10px] uppercase tracking-[0.24em] text-[#C9A45C]">
                  {r.tag}
                </span>
                <span className="flex h-12 w-12 items-center justify-center border border-[#C9A45C]/40 text-[#C9A45C]">
                  <i className={`${r.icon} text-xl`} />
                </span>
                <h2
                  className="mt-8 text-[26px] font-medium"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#F5F2EA]/60">{r.desc}</p>
                <Link
                  href={r.href}
                  className="mt-9 inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap bg-[#C9A45C] px-7 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:bg-[#F5F2EA]"
                >
                  {r.cta}
                  <i className="ri-arrow-right-line" />
                </Link>
              </article>
            ) : (
              <article
                key={r.id}
                className="relative flex flex-col border border-[#080B0F]/15 bg-white p-8"
              >
                <span className="absolute right-7 top-7 text-[10px] uppercase tracking-[0.24em] text-[#080B0F]/35">
                  {r.tag}
                </span>
                <span className="flex h-12 w-12 items-center justify-center border border-[#080B0F]/18 text-[#C9A45C]">
                  <i className={`${r.icon} text-xl`} />
                </span>
                <h2
                  className="mt-8 text-[26px] font-medium text-[#080B0F]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {r.title}
                </h2>
                <p className="mt-3 flex-1 text-[14px] leading-relaxed text-[#080B0F]/55">{r.desc}</p>
                <Link
                  href={r.href}
                  className="mt-9 inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap border border-[#080B0F]/25 px-7 py-4 text-[12px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
                >
                  {r.cta}
                  <i className="ri-arrow-right-line" />
                </Link>
              </article>
            )
          )}
        </div>

        <p className="mt-10 max-w-2xl text-[12.5px] leading-relaxed text-[#080B0F]/40">
          Broker and admin workspaces are separate environments.
        </p>
      </main>
    </div>
  );
}
