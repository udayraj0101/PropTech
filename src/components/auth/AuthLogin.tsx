"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogoMark } from "../brand/Logo";
import Display from "../ui/Display";
import {
  getSession,
  nameFromEmail,
  roleHome,
  saveSession,
  validateCredentials,
  type Role,
} from "../../lib/auth";

type Config = {
  eyebrow: string;
  panelTitle: string;
  panelBody: string;
  title: string;
  subtitle: string;
  emailLabel: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  requestTitle?: string;
  requestHref?: string;
  requestLabel?: string;
  backLabel: string;
};

const CONFIG: Record<Role, Config> = {
  broker: {
    eyebrow: "BROKER ACCESS",
    panelTitle: "Where UAE real estate decisions are made.",
    panelBody:
      "Explore developments, understand the market and model the opportunity from one connected platform.",
    title: "Welcome to PROPTECH",
    subtitle: "Access your development intelligence workspace.",
    emailLabel: "Work email",
    emailPlaceholder: "Enter your work email",
    passwordPlaceholder: "Enter your password",
    requestTitle: "Don't have broker access?",
    requestHref: "/#access",
    requestLabel: "Request Access",
    backLabel: "Back to Access",
  },
  admin: {
    eyebrow: "Administration",
    panelTitle: "The intelligence behind the platform.",
    panelBody:
      "Manage developments, availability, pricing and market data across the PROPTECH network.",
    title: "PROPTECH Administration",
    subtitle: "Manage the intelligence behind the platform.",
    emailLabel: "Work email",
    emailPlaceholder: "Enter your work email",
    passwordPlaceholder: "Enter your password",
    backLabel: "Back to Access",
  },
  investor: {
    eyebrow: "Investor access",
    panelTitle: "Your investment, in full view.",
    panelBody:
      "Track your purchased property, its value and ongoing performance from a private, post-purchase portal.",
    title: "Investor Access",
    subtitle: "Track your property investment and performance.",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    passwordPlaceholder: "Enter your password",
    backLabel: "Back to Access",
  },
};

export default function AuthLogin({ role }: { role: Role }) {
  const router = useRouter();
  const config = CONFIG[role];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const existing = getSession();
    if (existing && existing.role === role) {
      router.replace(roleHome(role));
      return;
    }
    setReady(true);
  }, [router, role]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }
    // Demo build — single hardcoded account per role (see lib/auth.ts).
    // TODO: swap for real /api/auth call once the backend is built.
    if (!validateCredentials(role, email, password)) {
      setError("Invalid credentials. Please check your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    const name = nameFromEmail(email.trim());
    try {
      saveSession({ email: email.trim(), name, role });
    } catch {
      setError("We could not start your session. Please try again.");
      setLoading(false);
      return;
    }
    router.push(roleHome(role));
  }

  if (!ready) {
    return (
      <div className="flex min-h-[100svh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading</span>
      </div>
    );
  }

  const fieldCls =
    "w-full border-b border-[#080B0F]/15 bg-transparent py-3.5 text-[15px] text-[#080B0F] placeholder-[#080B0F]/30 outline-none transition-colors duration-300 focus:border-[#C9A45C]";

  return (
    <div className="flex min-h-[100svh] w-full flex-col lg:flex-row">
      <div className="relative hidden w-[50%] overflow-hidden bg-[#080B0F] text-[#F5F2EA] lg:block">
        <img
          suppressHydrationWarning
          src="https://public.readdy.ai/ai/img_res/edited_250ca6a82e046df9910f6bc7d7037022_815489e1.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080B0F] via-[#080B0F]/70 to-[#080B0F]/40" />
        <div className="relative flex h-full flex-col justify-between p-12 xl:p-16">
          <Link href="/" className="flex cursor-pointer items-center gap-3">
            <LogoMark className="h-[26px] w-[26px]" />
            <span className="text-[15px] font-medium leading-none tracking-[0.34em]">PROPTECH</span>
          </Link>

          <div className="max-w-md">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#C9A45C]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#C9A45C]">
                {config.eyebrow}
              </span>
            </div>
            <Display className="mt-7 text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] xl:text-[52px]">
              {config.panelTitle}
            </Display>
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-[#F5F2EA]/60">
              {config.panelBody}
            </p>
          </div>

          <span className="text-[11.5px] tracking-[0.06em] text-[#F5F2EA]/40">
            Abu Dhabi · Dubai · United Arab Emirates
          </span>
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center bg-[#F5F2EA] px-6 py-16 md:px-16">
        <div className="w-full max-w-[440px]">
          <Link href="/" className="mb-12 flex cursor-pointer items-center gap-3 lg:hidden">
            <LogoMark className="h-[24px] w-[24px]" />
            <span className="text-[14px] font-medium leading-none tracking-[0.34em]">PROPTECH</span>
          </Link>

          <Display
            as="h1"
            className="text-[34px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[44px]"
          >
            {config.title}
          </Display>
          <p className="mt-5 text-[15px] text-[#080B0F]/55">{config.subtitle}</p>

          <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <div>
              <label
                htmlFor="email"
                className="text-[12px] uppercase tracking-[0.16em] text-[#080B0F]/45"
              >
                {config.emailLabel}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={config.emailPlaceholder}
                className={`mt-3 ${fieldCls}`}
                suppressHydrationWarning
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-[12px] uppercase tracking-[0.16em] text-[#080B0F]/45"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setNotice("Password reset is issued by your platform administrator.")
                  }
                  suppressHydrationWarning
                  className="cursor-pointer text-[12px] text-[#080B0F]/50 transition-colors duration-300 hover:text-[#C9A45C]"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative mt-3">
                <input
                  id="password"
                  name="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={config.passwordPlaceholder}
                  className={`${fieldCls} pr-12`}
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  suppressHydrationWarning
                  className="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center text-[#080B0F]/40 transition-colors duration-300 hover:text-[#080B0F]"
                >
                  <i className={`ri-${showPw ? "eye-off-line" : "eye-line"} text-lg`} />
                </button>
              </div>
            </div>

            {error && (
              <p className="border-l-2 border-[#C06B57] pl-4 text-[13px] leading-relaxed text-[#9E4A38]">
                {error}
              </p>
            )}
            {notice && (
              <p className="text-[13px] leading-relaxed text-[#080B0F]/55">{notice}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              suppressHydrationWarning
              className="inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap bg-[#080B0F] px-8 py-[18px] text-[12px] font-medium uppercase tracking-[0.16em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in" : "Sign in"}
              <i className="ri-arrow-right-line" />
            </button>
          </form>

          {config.requestHref && (
            <div className="mt-12 border-t border-[#080B0F]/12 pt-8">
              <p className="text-[12px] uppercase tracking-[0.18em] text-[#080B0F]/45">
                {config.requestTitle}
              </p>
              <Link
                href={config.requestHref}
                className="group mt-4 inline-flex cursor-pointer items-center gap-3 border border-[#080B0F]/20 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#080B0F] transition-colors duration-300 hover:border-[#080B0F] hover:bg-[#080B0F] hover:text-[#F5F2EA]"
              >
                {config.requestLabel}
                <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          )}

          <Link
            href="/access"
            className="mt-10 inline-flex cursor-pointer items-center gap-2 text-[12.5px] text-[#080B0F]/50 transition-colors duration-300 hover:text-[#C9A45C]"
          >
            <i className="ri-arrow-left-line" />
            {config.backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
