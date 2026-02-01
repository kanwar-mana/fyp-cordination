"use client";
import StudentSubmissions from "@/components/app/student/StudentSubmissions";
import { useAppSelector } from "@/store/hooks";
import { SubmissionsSkeleton } from "@/components/app/skeleton/SubmissionsSkeleton";

export default function SubmissionsPage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="container mx-auto md:p-6">
        <SubmissionsSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:p-6">
      {user.role === "student" ? (
        <StudentSubmissions />
      ) : user.role === "supervisor" ? (
        <div>Supervisor Submissions View - Coming Soon</div>
      ) : user.role === "coordinator" ? (
        <div>Coordinator Submissions View - Coming Soon</div>
      ) : (
        <SubmissionsSkeleton />
      )}
    </div>
  );
}
