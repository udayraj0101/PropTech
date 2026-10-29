"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Display from "../ui/Display";
import SettingsField from "../investor/settings/SettingsField";
import SettingsSelect from "../investor/settings/SettingsSelect";
import StatusSelect from "./StatusSelect";
import { resolveInvestor, updateInvestor } from "../../lib/investorStore";
import {
  INVESTOR_COUNTRIES,
  INVESTOR_STATUSES,
  isValidEmail,
  isValidName,
  isValidPhone,
  type Investor,
  type InvestorStatus,
  type PortalAccess,
} from "../../lib/investors";

function today(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function EditInvestorForm() {
  const router = useRouter();
  const params = useSearchParams();
  const investorId = params.get("id");

  const [investor, setInvestor] = useState<Investor | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United Arab Emirates");
  const [status, setStatus] = useState<InvestorStatus>("Active");
  const [portal, setPortal] = useState<PortalAccess>("Active");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef(false);

  useEffect(() => {
    const found = resolveInvestor(investorId) ?? null;
    setInvestor(found);
    if (found) {
      setName(found.name);
      setEmail(found.email);
      setPhone(found.phone);
      setCountry(found.country || "United Arab Emirates");
      setStatus(found.status);
      setPortal(found.portal);
    }
    setLoaded(true);
  }, [investorId]);

  function validate() {
    const next: Record<string, string> = {};
    if (!isValidName(name)) next.name = "Full name is required";
    if (!isValidEmail(email)) next.email = "Enter a valid email address";
    if (!isValidPhone(phone)) next.phone = "Enter a valid mobile number";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (submittingRef.current || !investor) return;
    if (!validate()) return;
    submittingRef.current = true;

    updateInvestor({ ...investor, name: name.trim(), email: email.trim(), phone: phone.trim(), country, status, portal, lastUpdated: today() });
    router.push(`/workspace/investors/view?id=${investor.id}`);
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center bg-[#F5F2EA]">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">Loading investor</span>
      </div>
    );
  }

  if (!investor) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 bg-[#F5F2EA] text-center">
        <div className="text-[15px] text-[#080B0F]/70">This investor could not be found.</div>
        <Link
          href="/workspace/investors"
          className="cursor-pointer text-[11.5px] uppercase tracking-[0.18em] text-[#9A7433] transition-colors hover:text-[#080B0F]"
        >
          Back to investors
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[900px] px-6 pt-9 md:px-10">
        <Link
          href={`/workspace/investors/view?id=${investor.id}`}
          className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/50 transition-colors hover:text-[#9A7433]"
        >
          <i className="ri-arrow-left-line" />
          Back to {investor.name}
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investors</span>
        </div>
        <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
          Edit Investor
        </Display>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
          Update this investor's details, investment status and portal access.
        </p>

        <form onSubmit={submit} noValidate className="mt-10 flex flex-col gap-6">
          <section className="border border-[#080B0F]/12 bg-white">
            <div className="border-b border-[#080B0F]/8 px-8 py-6 md:px-11">
              <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                Investor Information
              </h3>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
                Basic details used to identify the investor across your portfolio.
              </p>
            </div>
            <div className="grid gap-7 px-8 py-8 md:grid-cols-2 md:px-11">
              <SettingsField
                label="Full Name"
                value={name}
                onChange={setName}
                placeholder="e.g. John Smith"
                error={errors.name}
              />
              <SettingsField
                label="Email Address"
                value={email}
                onChange={setEmail}
                type="email"
                placeholder="name@example.com"
                error={errors.email}
              />
              <SettingsField
                label="Mobile Number"
                value={phone}
                onChange={setPhone}
                placeholder="+971 50 000 0000"
                error={errors.phone}
              />
              <SettingsSelect label="Country" value={country} options={INVESTOR_COUNTRIES} onChange={setCountry} />
            </div>
          </section>

          <section className="border border-[#080B0F]/12 bg-white">
            <div className="border-b border-[#080B0F]/8 px-8 py-6 md:px-11">
              <h3 className="text-[17px] text-[#080B0F]" style={{ fontFamily: "var(--font-display)" }}>
                Status &amp; Access
              </h3>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
                Investment status and Investor Portal access are tracked separately.
              </p>
            </div>
            <div className="grid gap-7 px-8 py-8 md:grid-cols-2 md:px-11">
              <StatusSelect
                label="Investment Status"
                value={status}
                options={INVESTOR_STATUSES}
                onChange={(v) => setStatus(v as InvestorStatus)}
              />
              <StatusSelect
                label="Investor Portal Access"
                value={portal}
                options={INVESTOR_STATUSES}
                onChange={(v) => setPortal(v as PortalAccess)}
                hint="Access remains Pending until the investor activates their own account."
              />
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap bg-[#080B0F] px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              Save Changes
              <i className="ri-check-line text-[15px]" />
            </button>
            <Link
              href={`/workspace/investors/view?id=${investor.id}`}
              className="cursor-pointer whitespace-nowrap border border-[#080B0F]/15 px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F]/40"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}