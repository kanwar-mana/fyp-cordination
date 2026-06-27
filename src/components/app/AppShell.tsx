"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, GraduationCap } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { useAppSelector } from "@/store/hooks";
import type { UserRole } from "@/types/auth.types";

interface NavItem {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
}

export function AppShell({
  children,
  navItems,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
}) {
  const user = useAppSelector((state) => state.auth.user);
  const roleLabelMap: Record<UserRole, string> = {
    student: "Student",
    supervisor: "Supervisor",
    coordinator: "Coordinator",
  };

  const pathname = usePathname();
  const { state } = useSidebar();

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex items-center justify-between px-2 py-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-base"
          >
            <GraduationCap className="size-10 text-primary" />
            {state === "expanded" && user?.role ? (
              <span>{roleLabelMap[user.role]}</span>
            ) : null}
          </Link>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu
                className={`${
                  state === "collapsed" ? "flex flex-col items-center" : ""
                }`}
              >
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.label}
                        className={
                          state === "collapsed" ? "justify-center" : ""
                        }
                      >
                        <Link href={item.href}>
                          <Icon />
                          {state === "expanded" && <span>{item.label}</span>}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>{user ? <NavUser user={user} /> : null}</SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-sidebar px-4">
          <SidebarTrigger />
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        <div className="flex-1 px-4 py-6 lg:px-6">{children}</div>
      </SidebarInset>
    </div>
  );
}
