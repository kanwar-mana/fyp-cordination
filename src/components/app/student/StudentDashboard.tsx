import { FilePlus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectTimeline } from "@/components/Timeline";
import { Milestone } from "@/types/app.types";
import type { User } from "@/types/auth.types";

const milestones: Milestone[] = [
  {
    id: 1,
    date: "March 15, 2024",
    title: "Proposal Submission",
    description: "Initial project proposal was submitted and approved.",
    status: "completed",
  },
  {
    id: 2,
    date: "May 20, 2024",
    title: "Mid-term Review",
    description: "Successfully presented the project progress.",
    status: "completed",
  },
  {
    id: 3,
    date: "July 10, 2024",
    title: "Final Report Submission",
    description: "Final documentation and code submission due.",
    status: "upcoming",
  },
  {
    id: 4,
    date: "August 01, 2024",
    title: "Final Presentation (Viva)",
    description: "Project defense and final presentation.",
    status: "pending",
  },
];

const StudentDashboard = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="font-normal text-sm text-muted-foreground">
          Welcome back, {user?.fullName || "Student"}!
        </p>
      </div>
      <div className="flex flex-wrap gap-4 mt-6">
        <div className="flex-1 bg-card rounded-md p-4 min-h-24">
          <p className="font-semibold text-xs text-muted-foreground">
            PROJECT TITLE
          </p>
          <p className="mt-2 text-sm">
            AI-Powered Chatbot for Customer Support and technical assistance
          </p>
        </div>
        <div className="flex flex-1 gap-4 w-full">
          <div className="bg-card w-full rounded-md p-4 min-h-24">
            <p className="font-semibold text-xs text-muted-foreground">
              SUPERVISOR
            </p>
            <p className="mt-2 text-sm">Dr. Zahid</p>
          </div>
          <div className="bg-card w-full rounded-md p-4 min-h-24">
            <p className="font-semibold text-xs text-muted-foreground">
              STATUS
            </p>
            <p className="mt-2 text-sm text-green-900 dark:text-green-100  bg-green-500/20 w-fit rounded-full py-1 px-4">
              In Progress
            </p>
          </div>
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
        <div className="md:flex-2 min-h-96 rounded-xl">
          <ProjectTimeline milestones={milestones} />
        </div>
        <div className="md:flex-1 w-full bg-card min-h-96 rounded-xl shadow-sm border border-border/50"></div>
      </div>
    </div>
  );
};

export default StudentDashboard;
