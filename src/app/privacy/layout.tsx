import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | DevType",
  description: "Read the Privacy Policy for the DevType platform.",
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
