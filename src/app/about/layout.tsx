import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | DevType — Built for Developers Who Type Seriously",
  description: "DevType is the typing trainer built by an engineer, for engineers. Real code snippets, IDE-themed aesthetics, and developer-focused analytics.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
