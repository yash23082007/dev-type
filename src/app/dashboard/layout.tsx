import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DevType",
  description: "Analyze your personal coding speed analytics, streak records, heatmaps, and weak keys.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
