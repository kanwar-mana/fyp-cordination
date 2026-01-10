import { Calendar, Users, User, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Milestone, TeamMember } from "@/types/app.types";
import { ProjectTimeline } from "@/components/Timeline";

const projectData = {
  title: "AI-Powered Chatbot for Customer Support",
  description:
    "An intelligent chatbot system using natural language processing and machine learning to provide automated customer support. The system learns from interactions to improve response accuracy over time.",
  status: "In Progress",
  progress: 65,
  category: "Artificial Intelligence",
  startDate: "February 1, 2024",
  expectedEndDate: "August 15, 2024",
  supervisor: {
    name: "Dr. Zahid Hussain",
    email: "zahid.hussain@uet.edu.pk",
    department: "Computer Science",
  },
  technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
  objectives: [
    "Develop NLP-based query understanding module",
    "Implement machine learning model for response generation",
    "Create user-friendly web interface",
    "Integrate with existing customer database",
    "Achieve 90% customer satisfaction rate",
  ],
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Ahmed Khan",
    role: "Team Lead",
    email: "ahmed@student.uet.edu.pk",
  },
  {
    id: 2,
    name: "Sara Ali",
    role: "ML Engineer",
    email: "sara@student.uet.edu.pk",
  },
  {
    id: 3,
    name: "Usman Malik",
    role: "Frontend Developer",
    email: "usman@student.uet.edu.pk",
  },
];

const milestones: Milestone[] = [
  {
    id: 1,
    date: "February 15, 2024",
    title: "Project Proposal",
    description: "Initial project proposal submission and approval.",
    status: "completed",
    deliverables: ["Proposal Document", "Initial Requirements"],
  },
  {
    id: 2,
    date: "March 20, 2024",
    title: "Literature Review",
    description:
      "Comprehensive review of existing chatbot systems and NLP techniques.",
    status: "completed",
    deliverables: ["Literature Review Report", "Technology Stack Selection"],
  },
  {
    id: 3,
    date: "April 25, 2024",
    title: "System Design",
    description: "Complete system architecture and database design.",
    status: "completed",
    deliverables: [
      "System Architecture Diagram",
      "Database Schema",
      "API Design",
    ],
  },
  {
    id: 4,
    date: "May 30, 2024",
    title: "Mid-term Presentation",
    description:
      "Present project progress and initial prototype demonstration.",
    status: "completed",
    deliverables: ["Presentation Slides", "Prototype Demo"],
  },
  {
    id: 5,
    date: "July 10, 2024",
    title: "Implementation Phase",
    description: "Core module development and integration.",
    status: "in-progress",
    deliverables: ["NLP Module", "ML Model", "Web Interface"],
  },
  {
    id: 6,
    date: "August 1, 2024",
    title: "Testing & Documentation",
    description: "System testing, bug fixes, and final documentation.",
    status: "upcoming",
    deliverables: ["Test Reports", "User Manual", "Technical Documentation"],
  },
  {
    id: 7,
    date: "August 15, 2024",
    title: "Final Presentation (Viva)",
    description: "Project defense and final demonstration.",
    status: "pending",
    deliverables: ["Final Report", "Project Demo", "Source Code"],
  },
];

export const Project = () => {
  const completedMilestones = milestones.filter(
    (m) => m.status === "completed"
  ).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">
              {projectData.title}
            </h1>
            <Badge
              variant="secondary"
              className="bg-green-500/10 text-green-700 dark:text-green-400"
            >
              {projectData.status}
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            {projectData.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {projectData.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Github className="w-4 h-4 mr-2" />
            Repository
          </Button>
          <Button size="sm">
            <ExternalLink className="w-4 h-4 mr-2" />
            Live Demo
          </Button>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Overall Progress</h2>
          <span className="text-2xl font-bold text-primary">
            {projectData.progress}%
          </span>
        </div>
        <Progress value={projectData.progress} className="h-3 mb-2" />
        <p className="text-sm text-muted-foreground">
          {completedMilestones} of {milestones.length} milestones completed
        </p>
      </div>

      {/* Project Info Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Supervisor Card */}
        <div className="bg-card rounded-xl  shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Supervisor</h3>
          </div>
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                {projectData.supervisor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{projectData.supervisor.name}</p>
              <p className="text-sm text-muted-foreground">
                {projectData.supervisor.department}
              </p>
            </div>
          </div>
        </div>

        {/* Timeline Card */}
        <div className="bg-card rounded-xl  shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Timeline</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Start Date</span>
              <span className="text-sm font-medium">
                {projectData.startDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Expected End
              </span>
              <span className="text-sm font-medium">
                {projectData.expectedEndDate}
              </span>
            </div>
          </div>
        </div>

        {/* Team Card */}
        <div className="bg-card rounded-xl shadow-sm p-5">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Team Members</h3>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              {teamMembers.length} members
            </p>
          </div>
          <div className="flex -space-x-2">
            {teamMembers.map((member) => (
              <Avatar
                key={member.id}
                className="h-10 w-10 border-2 border-card"
              >
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>

      <Separator className="my-2" />

      {/* Project Timeline */}
      <ProjectTimeline milestones={milestones} />
      {/* Technologies & Objectives */}
      {/* <div className="flex flex-col gap-4">
     
          <div className="bg-card rounded-xl  shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Technologies Used</h3>
            </div>
          </div>

    
          <div className="bg-card rounded-xl shadow-sm p-5">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Project Objectives</h3>
            </div>
            <ul className="space-y-2">
              {projectData.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}
    </div>
  );
};
