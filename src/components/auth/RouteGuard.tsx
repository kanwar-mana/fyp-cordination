"use client";

import { useAppSelector } from "@/store/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { hasRouteAccess } from "@/lib/rbac";
import { DashboardSkeleton } from "../app/skeleton/DashboardSkeleton";
interface RouteGuardProps {
  children: React.ReactNode;
}

export const RouteGuard = ({ children }: RouteGuardProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAuthorized(true);
      return;
    }

    const hasAccess = hasRouteAccess(user.role, pathname);

    if (!hasAccess) {
      router.replace("/unauthorized");
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }
  }, [user, pathname, router]);

  // Show loading skeleton while checking
  if (!user || !isAuthorized) {
    return <DashboardSkeleton />;
  }

  return <>{children}</>;
};
