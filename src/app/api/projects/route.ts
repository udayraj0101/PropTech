import { NextResponse } from "next/server";
import { listReellyProjects, ReellyError } from "@/lib/reelly";

/**
 * GET /api/projects
 *
 * Server-side proxy to Reelly's project list. Returns every project the
 * tenant exposes (currently 48, across 48 developers). Keeps
 * REELLY_API_KEY on the server. Narrowing to specific developers is
 * handled by the UI's dropdown filter.
 */
export async function GET() {
  try {
    const projects = await listReellyProjects();
    return NextResponse.json({ projects });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const configMissing = message.includes("REELLY_API_KEY");
    const upstreamStatus = err instanceof ReellyError ? err.status : undefined;
    return NextResponse.json(
      { error: message, configMissing, upstreamStatus },
      { status: configMissing ? 503 : 502 }
    );
  }
}
