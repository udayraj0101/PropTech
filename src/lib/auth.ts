export type Role = "broker" | "admin" | "investor";

export type Session = { email: string; name: string; role: Role };

const KEY = "proptech.session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Session>;
    if (!parsed || typeof parsed.email !== "string") return null;
    return {
      email: parsed.email,
      name: parsed.name || "Member",
      role: (parsed.role as Role) || "broker",
    };
  } catch {
    return null;
  }
}

export function saveSession(session: Session) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(session));
  } catch {
    return;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    return;
  }
}

export function nameFromEmail(email: string): string {
  const local = email.split("@")[0] || "Member";
  return (
    local
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .trim() || "Member"
  );
}

// Role-specific landing pages after sign-in.
export function roleHome(role: Role): string {
  if (role === "admin") return "/admin";
  if (role === "broker") return "/workspace/explore";
  return "/";
}
