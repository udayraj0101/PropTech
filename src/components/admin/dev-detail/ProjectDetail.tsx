"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProjectHero from "./ProjectHero";
import ProjectSidebar from "./ProjectSidebar";
import UnitsAvailability from "./UnitsAvailability";
import ProjectOverview from "./ProjectOverview";
import AmenitiesGrid from "./AmenitiesGrid";
import NearbyPoints from "./NearbyPoints";
import PaymentPlanTimeline from "./PaymentPlanTimeline";
import type { ProjectDetailShape } from "./detailTypes";

type FetchState =
  | { kind: "loading" }
  | { kind: "ready"; project: ProjectDetailShape }
  | {
      kind: "error";
      message: string;
      configMissing: boolean;
      upstreamStatus?: number;
    };

export default function ProjectDetail({
  id,
  backHref = "/admin/developments",
  modellerBase,
}: {
  id: string;
  /** Where the "Back to Developments" link should point. */
  backHref?: string;
  /** Enables the "Model this investment" sidebar CTA (broker-only). */
  modellerBase?: string;
}) {
  const [state, setState] = useState<FetchState>({ kind: "loading" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/projects/${encodeURIComponent(id)}`);
        const data = (await res.json()) as {
          project?: ProjectDetailShape;
          error?: string;
          configMissing?: boolean;
          upstreamStatus?: number;
        };
        if (cancelled) return;
        if (!res.ok || !data.project) {
          setState({
            kind: "error",
            message: data.error ?? `Request failed with status ${res.status}`,
            configMissing: Boolean(data.configMissing),
            upstreamStatus: data.upstreamStatus,
          });
          return;
        }
        setState({ kind: "ready", project: data.project });
      } catch (err) {
        if (cancelled) return;
        setState({
          kind: "error",
          message: err instanceof Error ? err.message : "Network error",
          configMissing: false,
        });
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (state.kind === "loading") {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
          Loading project…
        </span>
      </div>
    );
  }

  if (state.kind === "error") {
    return (
      <div className="border border-[#C06B57]/40 bg-[#F7E7E1] px-6 py-10">
        <p className="text-[13px] font-medium text-[#9E4A38]">
          {state.configMissing
            ? "Reelly API key not configured."
            : state.upstreamStatus === 404
            ? "Project not found on Reelly."
            : state.upstreamStatus && state.upstreamStatus >= 500
            ? `Reelly API returned ${state.upstreamStatus} for this project.`
            : "Could not load project detail."}
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#080B0F]/60">{state.message}</p>
        <Link
          href={backHref}
          className="mt-5 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#080B0F]/60 transition-colors hover:text-[#C9A45C]"
        >
          <i className="ri-arrow-left-line" /> Back to Developments
        </Link>
      </div>
    );
  }

  const { project } = state;
  const galleryCount =
    (project.architecture?.length ?? 0) +
    (project.interior?.length ?? 0) +
    (project.lobby?.length ?? 0) +
    (project.cover_image ? 1 : 0);

  return (
    <div>
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-[11.5px] uppercase tracking-[0.18em] text-[#080B0F]/55 transition-colors hover:text-[#C9A45C]"
      >
        <i className="ri-arrow-left-line" /> Back to Developments
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px] lg:gap-12">
        <main className="flex flex-col gap-14">
          <ProjectHero project={project} galleryCount={galleryCount} />
          <ProjectOverview project={project} />
          <UnitsAvailability project={project} />
          <PaymentPlanTimeline project={project} />
          <AmenitiesGrid project={project} />
          <NearbyPoints project={project} />
        </main>

        <div className="lg:sticky lg:top-[88px] lg:self-start">
          <ProjectSidebar project={project} modellerBase={modellerBase} />
        </div>
      </div>
    </div>
  );
}
