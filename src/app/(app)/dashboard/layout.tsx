import { AppShell } from "@/components/app/AppShell";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return <AppShell>{children}</AppShell>;
}
