"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession, roleHome } from "../../lib/auth";

/**
 * Session gate at /workspace. Redirects to the role-specific home —
 * broker lands on /workspace/explore, admin on /admin, no session on
 * /access.
 */
export default function WorkspaceEntry() {
  const router = useRouter();

  useEffect(() => {
    const id = window.setTimeout(() => {
      const session = getSession();
      if (!session) {
        router.replace("/access");
        return;
      }
      router.replace(roleHome(session.role));
    }, 0);
    return () => window.clearTimeout(id);
  }, [router]);

  return (
    <div className="flex min-h-[100svh] w-full items-center justify-center bg-[#F5F2EA]">
      <span className="text-[11px] uppercase tracking-[0.3em] text-[#080B0F]/40">
        Opening workspace
      </span>
    </div>
  );
}
