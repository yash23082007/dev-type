import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevBlog | DevType",
  description: "Coding efficiency guides, developer speed typing research, and DevType platform updates.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
