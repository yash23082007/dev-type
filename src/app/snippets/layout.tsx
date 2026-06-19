import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Snippets | DevType — Code Typing Practice Library",
  description: "Browse and practice real code snippets in JavaScript, Python, HTML, C++, and more. Filter by language, difficulty, and category.",
};

export default function SnippetsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
