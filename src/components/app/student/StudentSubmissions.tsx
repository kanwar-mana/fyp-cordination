"use client";
import {
  FileText,
  Upload,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Calendar,
  Eye,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Submission, SubmissionStatus } from "@/types/app.types";

const submissions: Submission[] = [
  {
    id: 1,
    title: "Project Proposal",
    description:
      "Initial project proposal document including problem statement, objectives, and methodology.",
    dueDate: "February 15, 2024",
    submittedDate: "February 14, 2024",
    status: "graded",
    grade: "A",
    feedback:
      "Excellent proposal with clear objectives. Good literature review.",
    fileName: "Project_Proposal_v2.pdf",
    fileSize: "2.4 MB",
  },
  {
    id: 2,
    title: "Literature Review",
    description:
      "Comprehensive review of existing research and related work in the field.",
    dueDate: "March 20, 2024",
    submittedDate: "March 18, 2024",
    status: "graded",
    grade: "A-",
    feedback: "Well-researched review. Consider adding more recent papers.",
    fileName: "Literature_Review.pdf",
    fileSize: "5.1 MB",
  },
  {
    id: 3,
    title: "System Design Document",
    description:
      "Complete system architecture, database design, and API specifications.",
    dueDate: "April 25, 2024",
    submittedDate: "April 24, 2024",
    status: "submitted",
    fileName: "System_Design_v3.pdf",
    fileSize: "8.2 MB",
  },
  {
    id: 4,
    title: "Mid-term Progress Report",
    description:
      "Progress report detailing work completed, challenges faced, and future plans.",
    dueDate: "May 30, 2024",
    status: "pending",
  },
  {
    id: 5,
    title: "Implementation Report",
    description:
      "Technical documentation of the implementation phase including code structure.",
    dueDate: "July 10, 2024",
    status: "pending",
  },
  {
    id: 6,
    title: "Final Report & Documentation",
    description:
      "Complete project report including testing results, user manual, and conclusions.",
    dueDate: "August 1, 2024",
    status: "pending",
  },
];

const getSubmissionStatusColor = (status: SubmissionStatus) => {
  switch (status) {
    case "graded":
      return "bg-green-500/10 text-green-700 dark:text-green-400";
    case "submitted":
      return "bg-blue-500/10 text-blue-700 dark:text-blue-400";
    case "pending":
      return "bg-amber-500/10 text-amber-700 dark:text-amber-400";
    case "overdue":
      return "bg-red-500/10 text-red-700 dark:text-red-400";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getStatusIcon = (status: SubmissionStatus) => {
  switch (status) {
    case "graded":
      return <CheckCircle2 className="w-4 h-4" />;
    case "submitted":
      return <Clock className="w-4 h-4" />;
    case "pending":
      return <Calendar className="w-4 h-4" />;
    case "overdue":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <FileText className="w-4 h-4" />;
  }
};

const StudentSubmissions = () => {
  const submittedCount = submissions.filter(
    (s) => s.status === "submitted" || s.status === "graded",
  ).length;
  const gradedCount = submissions.filter((s) => s.status === "graded").length;
  const pendingCount = submissions.filter((s) => s.status === "pending").length;
  const overdueCount = submissions.filter((s) => s.status === "overdue").length;
  const progressPercentage = Math.round(
    (submittedCount / submissions.length) * 100,
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Submissions</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your project submissions and deadlines
          </p>
        </div>
        <Button>
          <Upload className="w-4 h-4 mr-2" />
          New Submission
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium">Total</span>
          </div>
          <p className="text-2xl font-bold">{submissions.length}</p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-2">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-sm font-medium">Graded</span>
          </div>
          <p className="text-2xl font-bold">{gradedCount}</p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Pending</span>
          </div>
          <p className="text-2xl font-bold">{pendingCount}</p>
        </div>
        <div className="bg-card rounded-xl border border-border/50 shadow-sm p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Overdue</span>
          </div>
          <p className="text-2xl font-bold">{overdueCount}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Submission Progress</h2>
          <span className="text-2xl font-bold text-primary">
            {progressPercentage}%
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">
          {submittedCount} of {submissions.length} submissions completed
        </p>
      </div>

      <Separator className="my-2" />

      {/* Submissions List */}
      <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <FileText className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">All Submissions</h2>
        </div>
        <div className="space-y-4">
          {submissions.map((submission) => (
            <div
              key={submission.id}
              className="bg-muted/30 rounded-lg p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="font-semibold text-foreground">
                      {submission.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className={getSubmissionStatusColor(submission.status)}
                    >
                      <span className="mr-1">
                        {getStatusIcon(submission.status)}
                      </span>
                      {submission.status.charAt(0).toUpperCase() +
                        submission.status.slice(1)}
                    </Badge>
                    {submission.grade && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary"
                      >
                        <Star className="w-3 h-3 mr-1" />
                        Grade: {submission.grade}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {submission.description}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Due: {submission.dueDate}</span>
                    </div>
                    {submission.submittedDate && (
                      <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Submitted: {submission.submittedDate}</span>
                      </div>
                    )}
                    {submission.fileName && (
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>
                          {submission.fileName} ({submission.fileSize})
                        </span>
                      </div>
                    )}
                  </div>
                  {submission.feedback && (
                    <div className="mt-3 p-3 bg-background/50 rounded-md border border-border/50">
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Feedback:
                      </p>
                      <p className="text-sm">{submission.feedback}</p>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 shrink-0">
                  {submission.status === "pending" ? (
                    <Button size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Submit
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      {submission.fileName && (
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentSubmissions;
