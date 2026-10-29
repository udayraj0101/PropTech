import Link from "next/link";
import SectionHeading from "./SectionHeading";

const actions = [
  { label: "Add development", icon: "ri-add-line", href: "/admin/developments/new", primary: true },
  { label: "View development map", icon: "ri-road-map-line", href: "/admin/map" },
  { label: "Update availability", icon: "ri-stack-line", href: "/admin/developments" },
  { label: "Update pricing", icon: "ri-price-tag-3-line", href: "/admin/developments" },
  { label: "Update payment plan", icon: "ri-file-list-3-line", href: "/admin/developments" },
];

export default function QuickActions() {
  return (
    <section className="mt-16">
      <SectionHeading
        title="Quick Actions"
        note="Jump directly to the records that power the Broker platform."
      />
      <div className="mt-8 grid gap-px border border-[#080B0F]/12 bg-[#080B0F]/12 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <Link
            key={a.label}
            href={a.href}
            className={`group flex cursor-pointer flex-col justify-between gap-8 p-7 transition-colors duration-300 ${
              a.primary ? "bg-[#080B0F] text-[#F5F2EA] hover:bg-[#0B0E13]" : "bg-white hover:bg-[#FBF9F4]"
            }`}
          >
            <span
              className={`flex h-11 w-11 items-center justify-center border ${
                a.primary ? "border-[#C9A45C]/40 text-[#C9A45C]" : "border-[#080B0F]/15 text-[#C9A45C]"
              }`}
            >
              <i className={`${a.icon} text-lg`} />
            </span>
            <span
              className={`flex items-center justify-between text-[13px] font-medium ${
                a.primary ? "text-[#F5F2EA]" : "text-[#080B0F]"
              }`}
            >
              {a.label}
              <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
