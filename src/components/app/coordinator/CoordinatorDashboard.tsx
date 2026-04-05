import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  FolderGit2,
  Gauge,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const metrics = [
  {
    title: "Active Projects",
    value: 48,
    delta: "+6 this month",
    trend: "up" as const,
    progress: 78,
    icon: FolderGit2,
  },
  {
    title: "Supervisors",
    value: 17,
    delta: "14 available now",
    trend: "up" as const,
    progress: 67,
    icon: Users,
  },
  {
    title: "Pending Approvals",
    value: 9,
    delta: "3 urgent items",
    trend: "down" as const,
    progress: 41,
    icon: ClipboardCheck,
  },
  {
    title: "Missed Deadlines",
    value: 2,
    delta: "Needs follow-up",
    trend: "down" as const,
    progress: 18,
    icon: AlertTriangle,
  },
];

type ApprovalPriority = "High" | "Medium" | "Low";

const pendingApprovals: {
  title: string;
  team: string;
  phase: string;
  priority: ApprovalPriority;
}[] = [
  {
    title: "AI Attendance Predictor",
    team: "Team Falcon",
    phase: "Proposal",
    priority: "High",
  },
  {
    title: "Smart Lab Inventory",
    team: "Team Vector",
    phase: "Mid Review",
    priority: "Medium",
  },
  {
    title: "Document Intelligence Engine",
    team: "Team Nova",
    phase: "Final Submission",
    priority: "High",
  },
  {
    title: "Campus Guide Assistant",
    team: "Team Orbit",
    phase: "Proposal",
    priority: "Low",
  },
];

const upcomingDeadlines = [
  { label: "Proposal Review Close", date: "Apr 10", status: "today" },
  { label: "Mid-Term Evaluations", date: "Apr 18", status: "upcoming" },
  { label: "Supervisor Allocation", date: "Apr 25", status: "upcoming" },
  { label: "Final Report Window", date: "May 08", status: "upcoming" },
];

const recentActivity = [
  "Approved Team Falcon proposal under Dr. Samina.",
  "Assigned 3 new projects to available supervisors.",
  "Sent deadline reminders to 12 student teams.",
  "Marked 2 submissions for revision after quality check.",
];

const phaseHealth = [
  { label: "Proposal Stage", value: 86 },
  { label: "Mid Evaluation", value: 63 },
  { label: "Final Submission", value: 52 },
];

function priorityBadgeVariant(priority: ApprovalPriority) {
  if (priority === "High") return "destructive" as const;
  if (priority === "Medium") return "secondary" as const;
  return "outline" as const;
}

const CoordinatorDashboard = ({ user }: { user?: { fullName?: string } }) => {
  return (
    <div className="relative space-y-6 pb-8">
      <div className="pointer-events-none absolute inset-x-0 -top-8 -z-10 h-48 bg-linear-to-r from-primary/15 via-transparent to-accent/20 blur-3xl" />

      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className=" gap-4 border-l-4 border-l-primary shadow-lg/3 bg-card/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader className="pb-0 w-min sm:w-full">
                <div className="flex items-center justify-between">
                  <div className=" rounded-md bg-primary/12 p-2 text-primary">
                    <Icon className="size-4" />
                  </div>
                  <CardDescription className="font-medium text-xs uppercase">
                    {item.title}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-between space-y-3">
                <p className="text-3xl font-bold leading-none">{item.value}</p>
                <div className="flex items-center gap-2 text-xs">
                  {item.trend === "up" ? (
                    <TrendingUp className="size-3.5 text-emerald-500" />
                  ) : (
                    <TrendingDown className="size-3.5 text-amber-500" />
                  )}
                  <p className="text-muted-foreground">{item.delta}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-8 border-border/70 shadow-none bg-card/95">
          <CardHeader>
            <div className="flex items-center justify-between gap-3">
              <div>
                <CardTitle>Pending Approval Queue</CardTitle>
                <CardDescription>
                  Prioritize items that need coordinator action today.
                </CardDescription>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/projects">
                  Open Queue
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingApprovals.map((item) => (
              <div
                key={item.title}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border/60 bg-background/40 p-3.5 transition-colors hover:bg-background/60"
              >
                <div className="space-y-0.5">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.team}</span>
                    <span>•</span>
                    <span>{item.phase}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={priorityBadgeVariant(item.priority)}>
                    {item.priority}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-8">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="xl:col-span-4 border-border/70 shadow-none bg-card/95">
          <CardHeader>
            <CardTitle>Cycle Health</CardTitle>
            <CardDescription>
              Completion and deadline tracking for current semester.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">72%</span>
              </div>
              <Progress value={72} />
            </div>

            <div className="space-y-3 rounded-lg border border-border/60 bg-background/40 p-3">
              {phaseHealth.map((item) => (
                <div key={item.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">{item.label}</span>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                  <Progress value={item.value} className="h-1.5" />
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {upcomingDeadlines.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between rounded-md border border-border/60 p-2.5"
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="size-4 text-primary" />
                    <span className="text-sm">{item.label}</span>
                  </div>
                  <Badge
                    className="rounded-full"
                    variant={
                      item.status === "today" ? "destructive" : "outline"
                    }
                  >
                    {item.date}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/70 shadow-none bg-card/95">
        <CardHeader>
          <CardTitle>Recent Coordination Activity</CardTitle>
          <CardDescription>
            Latest actions performed across projects, teams, and supervisors.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          {recentActivity.map((activity) => (
            <div
              key={activity}
              className="flex items-start gap-3 rounded-md border border-border/60 bg-background/35 p-3"
            >
              <CheckCircle2 className="mt-0.5 size-4 text-primary" />
              <p className="text-sm text-muted-foreground">{activity}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="size-3.5" />
            Last sync: just now
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoordinatorDashboard;
