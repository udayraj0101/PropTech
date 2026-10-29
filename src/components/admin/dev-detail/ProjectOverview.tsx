"use client";

import { useMemo, useState } from "react";
import type { ProjectDetailShape } from "./detailTypes";

/**
 * Reelly overviews are Markdown-flavoured strings with `#####` headings
 * and blank-line paragraph breaks. We render a lightweight version — no
 * markdown lib — because the formatting is always this consistent.
 */
type Block =
  | { kind: "heading"; text: string }
  | { kind: "paragraph"; text: string };

function parse(markdown: string): Block[] {
  const lines = markdown.split(/\r?\n/);
  const blocks: Block[] = [];
  let paragraph: string[] = [];
  const flush = () => {
    if (paragraph.length) {
      blocks.push({ kind: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flush();
      continue;
    }
    const headingMatch = /^#{3,6}\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      flush();
      blocks.push({ kind: "heading", text: headingMatch[1].trim() });
      continue;
    }
    paragraph.push(trimmed);
  }
  flush();
  return blocks;
}

const PREVIEW_PARAGRAPHS = 2;

export default function ProjectOverview({ project }: { project: ProjectDetailShape }) {
  const [open, setOpen] = useState(false);
  const blocks = useMemo(() => (project.overview ? parse(project.overview) : []), [
    project.overview,
  ]);

  if (blocks.length === 0 && !project.short_description) return null;

  // Preview = up to the first heading or N paragraphs.
  const previewEndIndex = (() => {
    let paragraphs = 0;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].kind === "heading" && i > 0) return i;
      if (blocks[i].kind === "paragraph" && ++paragraphs >= PREVIEW_PARAGRAPHS) return i + 1;
    }
    return blocks.length;
  })();
  const visible = open ? blocks : blocks.slice(0, previewEndIndex);
  const hasMore = blocks.length > visible.length;

  return (
    <section>
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[#C9A45C]" />
        <h2
          className="text-[20px] font-medium tracking-[-0.01em] text-[#080B0F] md:text-[24px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Description
        </h2>
      </div>

      <div className="mt-6 space-y-5 border border-[#080B0F]/10 bg-white px-6 py-6 md:px-8 md:py-7">
        {project.short_description && (
          <p className="text-[14px] leading-relaxed text-[#080B0F]/75">
            {project.short_description}
          </p>
        )}
        {visible.map((block, i) =>
          block.kind === "heading" ? (
            <h3
              key={i}
              className="text-[14px] font-semibold uppercase tracking-[0.18em] text-[#080B0F]/70"
            >
              {block.text}
            </h3>
          ) : (
            <p key={i} className="text-[13.5px] leading-[1.7] text-[#080B0F]/70">
              {block.text}
            </p>
          )
        )}
        {(hasMore || open) && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            suppressHydrationWarning
            className="inline-flex cursor-pointer items-center gap-2 text-[12px] font-medium uppercase tracking-[0.14em] text-[#C9A45C] transition-colors hover:text-[#9A7433]"
          >
            {open ? "Read less" : "Read more"}
            <i
              className={`ri-arrow-down-s-line text-[14px] transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </section>
  );
}
