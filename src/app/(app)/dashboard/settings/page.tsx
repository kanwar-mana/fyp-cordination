"use client";
import StudentSettings from "@/components/app/student/StudentSettings";
import { useAppSelector } from "@/store/hooks";
export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="container mx-auto">
      {user?.role === "student" ? (
        <StudentSettings />
      ) : user?.role === "supervisor" ? (
        <div>Supervisor Settings - Coming Soon</div>
      ) : user?.role === "coordinator" ? (
        <div>Coordinator Settings - Coming Soon</div>
      ) : (
        <div>Please log in to view settings.</div>
      )}
    </div>
  );
}
