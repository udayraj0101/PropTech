const tones: Record<string, { text: string; dot: string }> = {
  Active: { text: "text-[#3F5C4E]", dot: "bg-[#4F6F5F]" },
  Pending: { text: "text-[#8A6A34]", dot: "bg-[#B08A4A]" },
  Inactive: { text: "text-[#080B0F]/45", dot: "bg-[#080B0F]/30" },
  Completed: { text: "text-[#080B0F]/55", dot: "bg-[#080B0F]/30" },
};

export default function StatusPill({ status }: { status: string }) {
  const tone = tones[status] ?? tones.Inactive;
  return (
    <span className={`inline-flex items-center gap-2 text-[12.5px] ${tone.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
      {status}
    </span>
  );
}