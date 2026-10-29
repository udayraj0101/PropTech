"use client";

import { useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Display from "../ui/Display";
import SettingsField from "../investor/settings/SettingsField";
import SettingsSelect from "../investor/settings/SettingsSelect";
import { getSession } from "../../lib/auth";
import { brokerSeed, brokerName } from "../../lib/brokers";
import { addCreatedInvestor } from "../../lib/investorStore";
import {
  INVESTOR_COUNTRIES,
  investorSlug,
  isValidEmail,
  isValidName,
  isValidPhone,
  type Investor,
} from "../../lib/investors";

function today(): string {
  return new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function AddInvestorForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("United Arab Emirates");
  const [portal, setPortal] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submittingRef = useRef(false);

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
    if (submittingRef.current) return;
    if (!validate()) return;
    submittingRef.current = true;

    const session = getSession();
    const matched = brokerSeed.find((b) => b.email === session?.email);
    const brokerage = matched?.company || "Gulf Estates Partners";
    const broker = matched ? brokerName(matched) : session?.name || "Khalid Al Mansoori";

    const investor: Investor = {
      id: `inv-${investorSlug(name) || "investor"}-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country,
      brokerage,
      broker,
      status: "Pending",
      portal: portal ? "Pending" : "Inactive",
      lastUpdated: today(),
      investments: [],
    };

    addCreatedInvestor(investor);
    router.push(`/workspace/investors/view?id=${investor.id}`);
  }

  return (
    <div className="w-full bg-[#F5F2EA] pb-24">
      <div className="mx-auto w-full max-w-[900px] px-6 pt-9 md:px-10">
        <Link
          href="/workspace/investors"
          className="flex cursor-pointer items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#080B0F]/50 transition-colors hover:text-[#9A7433]"
        >
          <i className="ri-arrow-left-line" />
          Back to investors
        </Link>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <span className="text-[10.5px] uppercase tracking-[0.34em] text-[#C9A45C]">Investors</span>
        </div>
        <Display className="mt-3.5 text-[32px] font-medium leading-[1.05] tracking-[-0.03em] text-[#080B0F] md:text-[44px]">
          Add Investor
        </Display>
        <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#080B0F]/55">
          Create an investor profile to manage their investments and portal access.
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
                Investor Portal Access
              </h3>
              <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[#080B0F]/50">
                Enable access to the Investor Portal. No password is set here — the investor receives an invitation to
                activate their own account.
              </p>
            </div>
            <div className="px-8 py-8 md:px-11">
              <button
                type="button"
                onClick={() => setPortal((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 border border-[#080B0F]/15 px-5 py-4 text-left transition-colors duration-300 hover:border-[#C9A45C]/60"
              >
                <span>
                  <span className="block text-[13.5px] text-[#080B0F]">Create Investor Portal Access</span>
                  <span className="mt-1 block text-[11.5px] leading-relaxed text-[#080B0F]/45">
                    {portal
                      ? "Access status will be Pending until the investor activates their account."
                      : "No portal access will be created for this investor."}
                  </span>
                </span>
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center border transition-colors duration-300 ${
                    portal ? "border-[#080B0F] bg-[#080B0F] text-[#F5F2EA]" : "border-[#080B0F]/25 text-transparent"
                  }`}
                >
                  <i className="ri-check-line text-[14px]" />
                </span>
              </button>
            </div>
          </section>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2.5 whitespace-nowrap bg-[#080B0F] px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#F5F2EA] transition-colors duration-300 hover:bg-[#C9A45C] hover:text-[#080B0F]"
            >
              Create Investor
              <i className="ri-check-line text-[15px]" />
            </button>
            <Link
              href="/workspace/investors"
              className="cursor-pointer whitespace-nowrap border border-[#080B0F]/15 px-7 py-3.5 text-[11.5px] uppercase tracking-[0.2em] text-[#080B0F]/70 transition-colors duration-300 hover:border-[#080B0F]/40"
            >
              Cancel
            </Link>
          </div>

          <p className="text-[10.5px] leading-relaxed text-[#080B0F]/40">
            Investments are added separately from the investor's detail view — the investor can be created without an
            investment.
          </p>
        </form>
      </div>
    </div>
  );
}