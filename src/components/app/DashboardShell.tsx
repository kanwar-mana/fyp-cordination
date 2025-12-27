"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppShell } from "./AppShell";
import { checkAuth } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  // On mount, check authentication status
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <SidebarProvider>
      <AppShell>{children}</AppShell>
    </SidebarProvider>
  );
}
