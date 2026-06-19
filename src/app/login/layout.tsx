import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In | DevType",
  description: "Sign in to DevType to sync streaks, personal bests, and code typing metrics.",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
