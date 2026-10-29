import AuthLogin from "@/components/auth/AuthLogin";

export const metadata = {
  title: "Welcome to PROPTECH — Broker Workspace",
};

export default function LoginPage() {
  return <AuthLogin role="broker" />;
}
