import AuthLogin from "@/components/auth/AuthLogin";

export const metadata = {
  title: "PROPTECH Administration — Sign in",
};

export default function AdminLoginPage() {
  return <AuthLogin role="admin" />;
}
