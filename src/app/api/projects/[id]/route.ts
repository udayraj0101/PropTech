import { NextResponse } from "next/server";
import { getProject, ReellyError } from "@/lib/reelly";

/**
 * GET /api/projects/[id]
 *
 * Server-side proxy to Reelly's project detail endpoint. Keeps the
 * REELLY_API_KEY on the server.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const project = await getProject(id);
    return NextResponse.json({ project });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    const configMissing = message.includes("REELLY_API_KEY");
    const upstreamStatus = err instanceof ReellyError ? err.status : undefined;
    return NextResponse.json(
      { error: message, configMissing, upstreamStatus },
      { status: configMissing ? 503 : upstreamStatus === 404 ? 404 : 502 }
    );
  }
}
