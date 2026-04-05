"use client";
import StudentDashboard from "@/components/app/student/StudentDashboard";
import CoordinatorDashboard from "@/components/app/coordinator/CoordinatorDashboard";
import { useAppSelector } from "@/store/hooks";
import { DashboardSkeleton } from "@/components/app/skeleton/DashboardSkeleton";

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="container mx-auto">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      {user.role === "student" ? (
        <StudentDashboard user={user} />
      ) : user.role === "supervisor" ? (
        <div>Supervisor Dashboard - Coming Soon</div>
      ) : user.role === "coordinator" ? (
        <CoordinatorDashboard user={user} />
      ) : (
        <DashboardSkeleton />
      )}
    </div>
  );
};
export default DashboardPage;
