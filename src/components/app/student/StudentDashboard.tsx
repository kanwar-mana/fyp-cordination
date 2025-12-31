import { useAppSelector } from "@/store/hooks";
import { FilePlus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProjectTimeline from "@/components/projectTimeline";

const StudentDashboard = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="font-normal text-sm text-muted-foreground">
          Welcome back, {user?.fullName || "Student"}!
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="bg-card w-full rounded-md p-4 min-h-24">
          <h2 className="font-semibold text-muted-foreground">Project Title</h2>
          <p className="mt-2 text-sm">
            AI-Powered Chatbot for Customer Support and technical assistance
          </p>
        </div>
        <div className="bg-card w-full rounded-md p-4 min-h-24">
          <h2 className="font-semibold text-muted-foreground">Supervisor</h2>
          <p className="mt-2 text-sm">Dr. Zahid</p>
        </div>

        <div className="bg-card w-full rounded-md p-4 min-h-24">
          <h2 className="font-semibold text-muted-foreground">Status</h2>
          <p className="mt-2 text-sm text-green-900 dark:text-green-100  bg-green-500/20 w-fit rounded-full py-1 px-4">
            In Progress
          </p>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap mt-6">
        <Button>
          <FilePlus className="h-6 w-6" />
          Create New Project
        </Button>
        <Button variant="outline">
          <FilePlus className="h-6 w-6" />
          Upload Report
        </Button>
        <Button variant="secondary">
          <Calendar className="h-6 w-6" />
          Request Meeting
        </Button>
      </div>
      <div className="flex flex-wrap gap-6 mt-6 w-full">
        <div className="flex-2 min-h-96 rounded-xl">
          <ProjectTimeline />
        </div>
        <div className="flex-1 bg-card min-h-96 rounded-xl shadow-sm border border-border/50"></div>
      </div>
    </div>
  );
};

export default StudentDashboard;
