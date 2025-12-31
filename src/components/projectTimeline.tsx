import { Check } from "lucide-react";

type MilestoneStatus = "completed" | "upcoming" | "pending";

interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  status: MilestoneStatus;
}

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

const TimelineIcon = ({ status }: { status: MilestoneStatus }) => {
  if (status === "completed") {
    return (
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground shadow-md ring-4 ring-primary/20">
        <Check className="w-4 h-4" strokeWidth={3} />
      </div>
    );
  }
  if (status === "upcoming") {
    return (
      <div className="w-7 h-7 rounded-full bg-primary/20 border-[3px] border-primary shadow-md ring-4 ring-primary/10 animate-pulse" />
    );
  }
  return (
    <div className="w-7 h-7 rounded-full bg-muted border-[3px] border-muted-foreground/30 shadow-sm" />
  );
};

const ProjectTimeline = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-6">Project Timeline</h2>
      <div className="relative">
        {milestones.map((milestone, index) => (
          <div
            key={milestone.id}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {/* Vertical Line */}
            {index < milestones.length - 1 && (
              <div
                className={`absolute left-[13px] top-7 w-0.5 h-[calc(100%-12px)] ${
                  milestone.status === "completed"
                    ? "bg-linear-to-b from-primary to-primary/50"
                    : "bg-muted-foreground/20"
                }`}
              />
            )}

            {/* Icon */}
            <div className="relative z-10 shrink-0">
              <TimelineIcon status={milestone.status} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`text-sm font-medium ${
                    milestone.status === "upcoming"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {milestone.date}
                </span>
                {milestone.status === "upcoming" && (
                  <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Upcoming
                  </span>
                )}
              </div>
              <h3
                className={`font-semibold mt-1 ${
                  milestone.status === "pending"
                    ? "text-muted-foreground"
                    : "text-foreground"
                }`}
              >
                {milestone.title}
              </h3>
              <p
                className={`text-sm mt-0.5 ${
                  milestone.status === "pending"
                    ? "text-muted-foreground/60"
                    : "text-muted-foreground"
                }`}
              >
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ProjectTimeline;
