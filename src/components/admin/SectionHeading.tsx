export default function SectionHeading({
  title,
  note,
  action,
}: {
  title: string;
  note?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border-t border-[#080B0F]/10 pt-7 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-[#C9A45C]" />
          <h2 className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#080B0F]/70">
            {title}
          </h2>
        </div>
        {note && (
          <p className="mt-4 max-w-2xl text-[13.5px] leading-relaxed text-[#080B0F]/50">{note}</p>
        )}
      </div>
      {action}
    </div>
  );
}
