"use client";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Student Dashboard</h1>
      <p className="text-muted-foreground">Welcome,Kanwer Abdull Rahman !</p>

      {/* Add your dashboard content here */}
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Projects</h3>
          <p className="text-sm text-muted-foreground mt-2">
            View and manage your projects
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Supervisors</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Connect with supervisors
          </p>
        </div>
        <div className="rounded-lg border bg-card p-6">
          <h3 className="font-semibold">Submissions</h3>
          <p className="text-sm text-muted-foreground mt-2">
            Track your submissions
          </p>
        </div>
      </div>
    </div>
  );
}
