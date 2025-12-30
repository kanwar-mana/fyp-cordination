"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  FolderGit2,
  Settings,
  LogOut,
  User,
} from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/store/auth/authThunk";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Projects", href: "/dashboard/projects", icon: FolderGit2 },
  { label: "Submissions", href: "/submissions", icon: FileText },
  { label: "Teams", href: "/teams", icon: Users },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const { user } = useAppSelector((state) => state.auth);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { state } = useSidebar();

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen w-full">
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex items-center justify-between px-2 py-3">
          <Link href="/dashboard" className="font-semibold text-base">
            F
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

        <SidebarSeparator />

        <SidebarFooter className="px-2 pb-4">
          {user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center justify-center gap-2">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.avatar} alt={user.fullName} />
                    <AvatarFallback>
                      {user.fullName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {state === "expanded" && user.fullName && (
                    <div className="hidden md:flex flex-col text-sm font-medium duration-150">
                      <span>{user.fullName}</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        {user.email.slice(0, 20)}
                      </span>
                    </div>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.fullName}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                    {/* <p className="text-xs leading-none text-muted-foreground capitalize">
                        {user.role}
                      </p> */}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <User />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/settings")}>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 focus:bg-red-600/20"
                >
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {/* <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Logout
            </Button> */}
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b bg-background px-4">
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
