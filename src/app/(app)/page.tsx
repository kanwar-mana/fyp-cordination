"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useAppSelector } from "@/store/hooks";

export default function Home() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  console.log("Authentication Status:", isAuthenticated);

  useEffect(() => {
    console.log("isAuthenticated changed:", isAuthenticated);
    if (isAuthenticated) {
      redirect("/dashboard");
    } else {
      redirect("/auth/login");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
        <p className="mt-4 text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}
