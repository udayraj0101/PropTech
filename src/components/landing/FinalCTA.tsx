"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./FinalCTA.module.css";
import Reveal from "../ui/Reveal";
import Display from "../ui/Display";
import ExploreCta from "../auth/ExploreCta";

const fieldCls =
  "w-full border-b border-[#F5F2EA]/20 bg-transparent py-3 text-[14px] text-[#F5F2EA] placeholder-[#F5F2EA]/30 outline-none transition-colors duration-300 focus:border-[#C9A45C]";

export default function FinalCTA() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honey = String(fd.get("company_alt") ?? "").trim();
    if (honey) {
      setStatus("success");
      return;
    }
    fd.delete("company_alt");

    setStatus("loading");
    setError("");

    try {
      // TODO: wire to backend /api/access when API is built. Simulated for now.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  }

  return (
    <section
      id="access"
      className="relative w-full overflow-hidden bg-[#080B0F] py-28 text-[#F5F2EA] md:py-40"
    >
      <img
        src="https://readdy.ai/api/search-image?query=Cinematic%20evening%20photograph%20of%20an%20elegant%20executive%20boardroom%20with%20floor-to-ceiling%20windows%20overlooking%20a%20glittering%20Gulf%20city%20skyline%2C%20deep%20charcoal%20tones%20and%20warm%20champagne%20accent%20lighting%2C%20minimal%20luxurious%20composition%20with%20the%20left%20side%20kept%20dark%20and%20uncluttered%2C%20editorial%20architectural%20photography%2C%20ultra%20sharp%2C%20no%20text&width=1800&height=1100&seq=proptech-cta-v3a&orientation=landscape"
        alt=""
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#080B0F] via-[#080B0F]/94 to-[#080B0F]/72" />

      <div className="relative mx-auto w-full max-w-[1440px] px-6 md:px-14">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
          <div className="flex flex-col justify-center">
            <Display className="max-w-lg text-[38px] font-semibold leading-[1.06] tracking-[-0.03em] md:text-[58px]">
              Build the next recommendation with PROPTECH.
            </Display>
            <p className="mt-7 max-w-md text-[15.5px] leading-relaxed text-[#F5F2EA]/65">
              Market context. Development intelligence. Investment modelling. One connected platform.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <ExploreCta variant="outlineLight" size="lg">
                Explore developments
              </ExploreCta>
            </div>
          </div>

          <Reveal>
            <div className="border border-[#F5F2EA]/12 bg-[#0B0E13]/75 p-8 backdrop-blur-md md:p-10">
              <div className="flex items-center justify-between border-b border-[#F5F2EA]/10 pb-5">
                <span className="text-[12px] uppercase tracking-[0.22em] text-[#F5F2EA]/55">
                  Request Broker Access
                </span>
                <span className="text-[12px] text-[#F5F2EA]/40">Reviewed within one business day</span>
              </div>

              {status === "success" ? (
                <div className="flex min-h-[420px] flex-col items-start justify-center">
                  <div className="flex h-12 w-12 items-center justify-center border border-[#3E9D80]/50 text-[#3E9D80]">
                    <i className="ri-checkbox-circle-line text-2xl" />
                  </div>
                  <h3
                    className="mt-7 text-[28px] font-medium"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Thank you — your request is with us.
                  </h3>
                  <p className="mt-4 max-w-sm text-[14px] leading-relaxed text-[#F5F2EA]/55">
                    Access is reviewed individually. Our team will contact you within one business day to
                    arrange your walkthrough.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-7">
                  <p className="max-w-md text-[13px] leading-relaxed text-[#F5F2EA]/55">
                    This form is for prospective brokers seeking access to the PROPTECH broker workspace.
                    Broker credentials are reviewed individually and provisioned by our team.
                  </p>
                  <input type="hidden" name="role" value="Broker" />

                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label className="text-[12px] text-[#F5F2EA]/50">Full name</label>
                      <input
                        name="name"
                        required
                        placeholder="Khalid Al Mansoori"
                        className={`mt-3 ${fieldCls}`}
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#F5F2EA]/50">Work email</label>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.ae"
                        className={`mt-3 ${fieldCls}`}
                      />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#F5F2EA]/50">Company</label>
                      <input name="company" placeholder="Company name" className={`mt-3 ${fieldCls}`} />
                    </div>
                    <div>
                      <label className="text-[12px] text-[#F5F2EA]/50">Phone</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="+971 50 000 0000"
                        className={`mt-3 ${fieldCls}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[12px] text-[#F5F2EA]/50">What would you like to cover?</label>
                    <textarea
                      name="message"
                      rows={3}
                      maxLength={500}
                      placeholder="Briefly describe your mandate or the developments you are focused on."
                      className={`mt-3 resize-none ${fieldCls}`}
                    />
                  </div>

                  <div className={styles.offscreen} aria-hidden="true">
                    <label htmlFor="company_alt">Company alt</label>
                    <input
                      id="company_alt"
                      name="company_alt"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      readOnly
                    />
                  </div>

                  {status === "error" && (
                    <p className="border-l-2 border-[#C06B57] pl-4 text-[13px] leading-relaxed text-[#E0A08F]">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    suppressHydrationWarning
                    className="mt-1 inline-flex cursor-pointer items-center justify-center gap-3 whitespace-nowrap bg-[#C9A45C] px-8 py-4 text-[12px] uppercase tracking-[0.14em] text-[#080B0F] transition-colors duration-300 hover:bg-[#F5F2EA] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Submitting" : "Request access"}
                    <i className="ri-arrow-right-line" />
                  </button>
                  <p className="text-[12px] leading-relaxed text-[#F5F2EA]/35">
                    By submitting, you agree to be contacted about PROPTECH. We never share your details with
                    third parties.
                  </p>
                </form>
              )}

              <div className="mt-8 flex flex-col gap-2 border-t border-[#F5F2EA]/10 pt-6">
                <Link
                  href="/login"
                  className="group inline-flex w-fit cursor-pointer items-center gap-2 text-[13px] text-[#F5F2EA]/55 transition-colors duration-300 hover:text-[#C9A45C]"
                >
                  Already have broker access? Sign in
                  <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
