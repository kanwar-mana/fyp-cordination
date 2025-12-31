"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppShell } from "./AppShell";
import { checkAuth } from "@/store/auth/authThunk";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect } from "react";
import {
  FileText,
  FolderGit2,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

const studentNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Submissions", href: "/submissions", icon: FileText },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

const supervisorNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Students", href: "/dashboard/students", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

const coordinatorNavItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Supervisors", href: "/dashboard/supervisors", icon: Users },
  { label: "Students", href: "/dashboard/students", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);

  let navItems = studentNavItems;
  if (user?.role === "supervisor") {
    navItems = supervisorNavItems;
  } else if (user?.role === "coordinator") {
    navItems = coordinatorNavItems;
  }
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <SidebarProvider>
      <AppShell navItems={navItems}>{children}</AppShell>
    </SidebarProvider>
  );
}
