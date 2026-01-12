import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users } from "lucide-react";
import { TeamMember } from "@/types/app.types";
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

export default function Team() {
  return (
    <div className="container mx-auto">
      {/* Team Members Detail */}
      <div className="bg-card rounded-xl border border-border/50 shadow-sm p-6">
        <div className="flex items-center gap-2 mb-6">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-bold">Team Members</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Avatar className="h-12 w-12">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{member.name}</p>
                <p className="text-sm text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.email}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
