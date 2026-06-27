"use client";
import { useEffect } from "react";
import { Project } from "@/components/app/student/StudentProject";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { getGroup } from "@/store/group/groupThunk";

import SupervisorProjects from "@/components/app/supervisor/SupervisorProjects";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const { currentGroup, isLoading } = useAppSelector((state) => state.group);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // If the student has a group assigned in their profile, but it's not loaded in state, fetch it
    if (user?.role === "student" && user?.studentProfile?.group && !currentGroup) {
      dispatch(getGroup(user.studentProfile.group as string));
    }
  }, [user, currentGroup, dispatch]);

  if (user?.role === "supervisor") {
    return <SupervisorProjects />;
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-muted-foreground gap-3">
        <Loader2 className="size-8 text-primary animate-spin" />
        <p className="text-sm">Loading project details...</p>
      </div>
    );
  }

  if (!currentGroup) {
    return <div className="p-8 text-center text-muted-foreground">No project details found...</div>;
  }

  return (
    <div className="container mx-auto md:p-6">
      <Project group={currentGroup} />
    </div>
  );
}
