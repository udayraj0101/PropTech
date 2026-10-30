export type Role = "broker" | "admin" | "investor";

export type Session = { email: string; name: string; role: Role };

const KEY = "proptech.session";

/**
 * Hardcoded credentials for the demo build (UI phase, no backend yet).
 * Only these two accounts can sign in; everything else is rejected by
 * `validateCredentials` below. Investor role is not restricted — the
 * portal isn't live yet.
 *
 * TODO: replace with a real /api/auth endpoint once the backend lands.
 * Password-in-source is only safe here because the client never stores
 * anything sensitive and the whole app is a demo.
 */
const CREDENTIALS: Partial<Record<Role, { email: string; password: string }>> = {
  admin: { email: "admin@proptech.com", password: "proptech@admin" },
  broker: { email: "broker@proptech.com", password: "proptech@broker" },
};

/**
 * Returns true only when the role's single allowed email + password pair
 * matches. Case-insensitive on the email; password must match exactly.
 */
export function validateCredentials(
  role: Role,
  email: string,
  password: string
): boolean {
  const creds = CREDENTIALS[role];
  if (!creds) return true; // roles without a hardcoded account (e.g. investor) pass through
  return (
    email.trim().toLowerCase() === creds.email.toLowerCase() &&
    password === creds.password
  );
}

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

// Role-specific landing pages after sign-in. Map is the default view for
// both roles — operational flow starts from geography.
export function roleHome(role: Role): string {
  if (role === "admin") return "/admin/map";
  if (role === "broker") return "/workspace/explore";
  return "/";
}
