"use client";

import { useState } from "react";
import { FileText, Clock, CheckCircle2, AlertCircle, Calendar } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Milestone, Group } from "@/types/group.types";
import { MilestoneRow } from "./MilestoneRow";
import { MilestoneDetail } from "./MilestoneDetail";
import { formatDate, relativeTime, getRowType, isMilestoneLocked } from "./milestoneUtils";

interface MilestoneListProps {
  group: Group;
  isLeader: boolean;
  showStats?: boolean;
}

export const MilestoneList = ({ group, isLeader, showStats = true }: MilestoneListProps) => {
  const [selected, setSelected] = useState<Milestone | null>(null);

  const milestones: Milestone[] = group.milestones || [];
  const groupApproved = group.status === "APPROVED";

  // Stats
  const totalCount = milestones.length;
  const approvedCount = milestones.filter((m) => m.status === "APPROVED").length;
  const submittedCount = milestones.filter((m) => m.status === "SUBMITTED").length;
  const pendingCount = milestones.filter(
    (m) => m.status === "PENDING" || m.status === "REJECTED"
  ).length;
  const progressPct =
    totalCount > 0 ? Math.round((approvedCount / totalCount) * 100) : 0;

  // Group by due date
  const grouped: { label: string; relLabel: string; items: { m: Milestone; index: number }[] }[] =
    [];
  milestones.forEach((m, index) => {
    const label = formatDate(m.deadline);
    const last = grouped[grouped.length - 1];
    if (last && last.label === label) {
      last.items.push({ m, index });
    } else {
      grouped.push({
        label,
        relLabel: relativeTime(m.deadline),
        items: [{ m, index }],
      });
    }
  });

  if (selected) {
    return (
      <MilestoneDetail
        milestone={selected}
        groupId={group._id}
        isLeader={isLeader}
        groupApproved={groupApproved}
        onBack={() => setSelected(null)}
        onSubmitSuccess={() => setSelected(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {showStats && (
        <>
          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Total",
                value: totalCount,
                icon: <FileText className="w-4 h-4" />,
                color: "text-muted-foreground",
              },
              {
                label: "Approved",
                value: approvedCount,
                icon: <CheckCircle2 className="w-4 h-4" />,
                color: "text-green-500",
              },
              {
                label: "Submitted",
                value: submittedCount,
                icon: <Clock className="w-4 h-4" />,
                color: "text-blue-500",
              },
              {
                label: "Pending",
                value: pendingCount,
                icon: <AlertCircle className="w-4 h-4" />,
                color: "text-amber-500",
              },
            ].map(({ label, value, icon, color }) => (
              <div
                key={label}
                className="bg-card rounded-xl border border-border/50 shadow-sm p-4"
              >
                <div className={`flex items-center gap-2 mb-2 ${color}`}>
                  {icon}
                  <span className="text-xs font-medium text-muted-foreground">{label}</span>
                </div>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          {/* Progress */}
          <div className="bg-card rounded-xl border border-border/50 shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-sm">Milestone Progress</h2>
              <span className="text-xl font-bold text-primary">{progressPct}%</span>
            </div>
            <Progress value={progressPct} className="h-2 mb-2" />
            <p className="text-xs text-muted-foreground">
              {approvedCount} of {totalCount} milestones approved
            </p>
          </div>

          <Separator />
        </>
      )}

      {/* List */}
      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-muted-foreground">
          <Calendar className="w-12 h-12 mb-4 opacity-20" />
          <h3 className="text-lg font-medium">No milestones yet.</h3>
          <p className="text-sm">Your coordinator hasn't set up any milestones.</p>
        </div>
      ) : (
        <div className="space-y-5">
          {grouped.map(({ label, relLabel, items }) => {
            const hasPastDue = items.some(({ m }) => getRowType(m) === "pastdue");
            return (
              <div key={label}>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-semibold text-sm">{label}</h3>
                  {hasPastDue && relLabel && (
                    <span className="text-xs text-destructive">Due {relLabel}</span>
                  )}
                </div>
                {items.map(({ m, index }) => (
                  <MilestoneRow
                    key={m._id}
                    milestone={m}
                    isLocked={isMilestoneLocked(milestones, index)}
                    onClick={() => setSelected(m)}
                  />
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
