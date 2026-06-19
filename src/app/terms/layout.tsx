import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | DevType",
  description: "Read the Terms of Service for the DevType platform.",
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
