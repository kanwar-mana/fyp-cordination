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
import { useAppDispatch, useAppSelector } from "@/store/hooks";

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
  const { user }: { user: any } = useAppSelector((state) => state.auth);

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
            {state === "expanded" && user.role === "coordinator" ? (
              <span>Coordinator</span>
            ) : user.role === "Supervisor" ? (
              <span>Supervisor</span>
            ) : user.role === "Student" ? (
              <span>Student</span>
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

        <SidebarFooter>
          <NavUser user={user as any} />
        </SidebarFooter>
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
