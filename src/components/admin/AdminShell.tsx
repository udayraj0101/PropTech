"use client";

import { useEffect, useState, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { LogoMark } from "../brand/Logo";
import { clearSession, getSession, type Session } from "../../lib/auth";

const nav = [
  { label: "Overview", href: "/admin" },
  { label: "Developments", href: "/admin/developments" },
  { label: "Map", href: "/admin/map" },
  { label: "Developers", href: "/admin/developers" },
  { label: "Brokers", href: "/admin/brokers" },
];

export default function AdminShell({
  children,
  bleed = false,
}: {
  children: ReactNode;
  bleed?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<Session | null>(null);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = getSession();
    if (!session || session.role !== "admin") {
      router.replace("/admin/login");
      return;
    }
    setUser(session);
    setOpen(false);
    setMenu(false);
    setReady(true);
  }, [router, pathname]);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  function handleMenu(label: string) {
    if (label === "Sign out") {
      clearSession();
      router.push("/admin/login");
    } else {
      setMenu(false);
    }
  }

  const displayName = user?.name || "Administrator";
  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";

  if (!ready || !user) {
    return (
      <div className="flex min-h-[100svh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
          Opening console
        </span>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100svh] w-full flex-col bg-[#F5F2EA]">
      <header className="sticky top-0 z-50 border-b border-[#F5F2EA]/10 bg-[#080B0F] text-[#F5F2EA]">
        <div className="flex h-[68px] w-full items-center justify-between gap-6 px-6 md:px-10">
          <div className="flex items-center gap-10">
            <Link href="/admin" className="flex cursor-pointer items-center gap-3">
              <LogoMark className="h-[24px] w-[24px]" />
              <span className="text-[14px] font-medium leading-none tracking-[0.34em]">
                PROPTECH
              </span>
            </Link>
            <span className="hidden border-l border-[#F5F2EA]/15 pl-4 text-[11px] uppercase tracking-[0.24em] text-[#C9A45C] sm:block">
              Admin Console
            </span>
          </div>

          <nav className="hidden items-center gap-8 xl:flex">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className={`relative py-1 text-[13.5px] font-medium transition-colors duration-300 hover:text-[#C9A45C] ${
                  isActive(n.href) ? "text-[#C9A45C]" : "text-[#F5F2EA]/85"
                }`}
              >
                {n.label}
                <span
                  className={`absolute -bottom-[3px] left-0 h-px w-full bg-[#C9A45C] transition-opacity duration-300 ${
                    isActive(n.href) ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setMenu((v) => !v)}
                suppressHydrationWarning
                className="flex cursor-pointer items-center gap-3 border-l border-[#F5F2EA]/12 pl-4"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A45C]/40 text-[12px] tracking-wide text-[#C9A45C]">
                  {initials}
                </span>
                <span className="hidden text-left leading-tight lg:block">
                  <span className="block text-[13px] text-[#F5F2EA]/90">{displayName}</span>
                  <span className="block text-[11px] text-[#F5F2EA]/45">Administrator</span>
                </span>
                <i className="ri-arrow-down-s-line text-[#F5F2EA]/50" />
              </button>

              {menu && (
                <div className="absolute right-0 top-[52px] z-50 w-56 border border-[#F5F2EA]/12 bg-[#0B0E13] py-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.8)]">
                  {["Sign out"].map((m) => (
                    <button
                      key={m}
                      onClick={() => handleMenu(m)}
                      suppressHydrationWarning
                      className="block w-full cursor-pointer px-5 py-2.5 text-left text-[13px] text-[#F5F2EA]/70 transition-colors duration-300 hover:bg-[#F5F2EA]/5 hover:text-[#C9A45C]"
                    >
                      {m}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              suppressHydrationWarning
              className="flex h-9 w-9 cursor-pointer items-center justify-center xl:hidden"
            >
              <i className={`ri-${open ? "close-line" : "menu-line"} text-xl`} />
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-[#F5F2EA]/10 px-6 pb-6 pt-3 xl:hidden">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                className={`block border-b border-[#F5F2EA]/8 py-3 text-[14.5px] font-medium ${
                  isActive(n.href) ? "text-[#C9A45C]" : "text-[#F5F2EA]/85"
                }`}
              >
                {n.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {bleed ? (
        <main className="w-full flex-1">{children}</main>
      ) : (
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-6 py-14 md:px-12">{children}</main>
      )}

      <footer className="border-t border-[#080B0F]/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-2 text-[11.5px] text-[#080B0F]/40 sm:flex-row sm:items-center sm:justify-between">
          <span className="uppercase tracking-[0.24em]">PROPTECH · Administration</span>
          <span>Operational source of truth for the Broker platform</span>
        </div>
      </footer>
    </div>
  );
}
