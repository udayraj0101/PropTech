import SectionHeading from "./SectionHeading";
import { dataStatus, type StatusState } from "../../lib/adminData";

const tone: Record<StatusState, { dot: string; text: string; label: string }> = {
  current: { dot: "bg-[#4F6F5F]", text: "text-[#3F5C4E]", label: "Up to date" },
  review: { dot: "bg-[#B08A4A]", text: "text-[#8A6A34]", label: "Needs review" },
};

export default function DataStatus() {
  return (
    <section>
      <SectionHeading
        title="Data Status"
        note="The state of the intelligence powering the Broker experience."
      />
      <div className="mt-6 border border-[#080B0F]/12 bg-white">
        {dataStatus.map((row, i) => {
          const t = tone[row.state];
          return (
            <div
              key={row.label}
              className={`flex items-start justify-between gap-6 px-7 py-6 ${
                i > 0 ? "border-t border-[#080B0F]/10" : ""
              }`}
            >
              <div>
                <p className="text-[14px] font-medium text-[#080B0F]">{row.label}</p>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-[#080B0F]/50">
                  {row.detail}
                </p>
              </div>
              <span className={`flex shrink-0 items-center gap-2 text-[12px] font-medium ${t.text}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${t.dot}`} />
                {t.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
