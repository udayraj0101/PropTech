import SectionHeading from "./SectionHeading";
import { recentUpdates } from "../../lib/adminData";

export default function RecentUpdates() {
  return (
    <section>
      <SectionHeading
        title="Recent Data Updates"
        note="Administrative changes recorded against platform records."
      />
      <div className="mt-6 border border-[#080B0F]/12 bg-white">
        {recentUpdates.map((u, i) => (
          <div
            key={u.title + u.area}
            className={`flex items-start justify-between gap-6 px-7 py-5 ${
              i > 0 ? "border-t border-[#080B0F]/10" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A45C]" />
              <div>
                <p className="text-[14px] font-medium text-[#080B0F]">{u.title}</p>
                <p className="mt-1.5 text-[12.5px] text-[#080B0F]/50">{u.area}</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <span className="block text-[10.5px] uppercase tracking-[0.2em] text-[#080B0F]/40">
                {u.tag}
              </span>
              <span className="mt-1 block text-[11.5px] text-[#080B0F]/45">{u.time}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
