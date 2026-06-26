"use client";
import { Project } from "@/components/app/student/StudentProject";
import { useAppSelector } from "@/store/hooks";

export default function DashboardPage() {
  const { currentGroup, isLoading } = useAppSelector((state) => state.group);

  if (isLoading) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">Loading project details...</div>;
  }
  if (!currentGroup) {
    return <div className="p-8 text-center text-muted-foreground animate-pulse">No project details found...</div>;
  }

  return (
    <div className="container mx-auto md:p-6">
      <Project group={currentGroup} />
    </div>
  );
}
