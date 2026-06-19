import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | DevType",
  description: "Create a DevType account to access advanced statistics and code typing leaderboards.",
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
