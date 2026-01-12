export type MilestoneStatus =
  | "completed"
  | "in-progress"
  | "upcoming"
  | "pending";

export interface Milestone {
  id: number;
  date: string;
  title: string;
  description: string;
  status: MilestoneStatus;
  deliverables?: string[];
}
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  email: string;
}
