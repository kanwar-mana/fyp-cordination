"use client";
import StudentSettings from "@/components/app/student/StudentSettings";
import { useAppSelector } from "@/store/hooks";
import { SettingsSkeleton } from "@/components/app/skeleton/SettingsSkeleton";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);

  if (!user) {
    return (
      <div className="container mx-auto md:p-6">
        <SettingsSkeleton />
      </div>
    );
  }

  return (
    <div className="container mx-auto md:p-6">
      {user.role === "student" ? (
        <StudentSettings />
      ) : user.role === "supervisor" ? (
        <div>Supervisor Settings - Coming Soon</div>
      ) : user.role === "coordinator" ? (
        <div>Coordinator Settings - Coming Soon</div>
      ) : (
        <SettingsSkeleton />
      )}
    </div>
  );
}
