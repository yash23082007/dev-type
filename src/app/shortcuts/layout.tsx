import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shortcut Master | DevType — IDE Keyboard Shortcut Trainer",
  description: "Train your IDE keyboard shortcuts with interactive exercises. Master VS Code key combos and boost your development speed.",
};

export default function ShortcutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
