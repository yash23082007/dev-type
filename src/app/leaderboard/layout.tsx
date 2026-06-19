import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboard | DevType — Top Developer Typing Speeds",
  description: "See the fastest developer typists on DevType. Filter by language, difficulty, and time mode. Compete for the top spot.",
};

export default function LeaderboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
