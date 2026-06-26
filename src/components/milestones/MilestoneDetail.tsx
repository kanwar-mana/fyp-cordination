"use client";

import {
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  FileText,
  Paperclip,
  Star,
  Upload,
  ShieldX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Milestone } from "@/types/group.types";
import MilestoneSubmissionForm from "@/components/groups/MilestoneSubmissionForm";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { submitMilestone } from "@/store/group/groupThunk";
import { getRowType, formatDate } from "./milestoneUtils";

interface MilestoneDetailProps {
  milestone: Milestone;
  groupId: string;
  isLeader: boolean;
  groupApproved: boolean;
  onBack: () => void;
  onSubmitSuccess?: () => void;
}

export const MilestoneDetail = ({
  milestone,
  groupId,
  isLeader,
  groupApproved,
  onBack,
  onSubmitSuccess,
}: MilestoneDetailProps) => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((s) => s.group);
  const type = getRowType(milestone);

  const statusBadge = () => {
    if (milestone.status === "APPROVED")
      return (
        <Badge className="bg-green-500/10 text-green-600 border border-green-500/30 gap-1">
          <CheckCircle2 className="w-3 h-3" /> Approved
        </Badge>
      );
    if (milestone.status === "SUBMITTED")
      return (
        <Badge className="bg-blue-500/10 text-blue-600 border border-blue-500/30 gap-1">
          <CheckCircle2 className="w-3 h-3" /> Turned in
        </Badge>
      );
    if (milestone.status === "REJECTED")
      return (
        <Badge className="bg-red-500/10 text-red-600 border border-red-500/30 gap-1">
          <AlertCircle className="w-3 h-3" /> Rejected
        </Badge>
      );
    if (type === "pastdue")
      return (
        <span className="flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="w-3.5 h-3.5" /> Past due
        </span>
      );
    return (
      isLeader && (
        <span className="text-xs text-muted-foreground italic">Not turned in</span>
      )
    );
  };

  return (
    <div className="flex flex-col gap-0 animate-in fade-in slide-in-from-right-4 duration-200">
      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-b pb-4 mb-6">
        <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 -ml-2">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
        <div className="flex items-center gap-3">{statusBadge()}</div>
      </div>

      {/* ── Title + due date ─────────────────────────────────────────── */}
      <h1 className="text-2xl md:text-3xl font-bold">{milestone.title}</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-8">
        Due {formatDate(milestone.deadline)}
      </p>

      <div className="grid md:grid-cols-[1fr_220px] gap-8">
        {/* ── Left column ──────────────────────────────────────────── */}
        <div className="space-y-7">
          {/* Instructions */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Instructions
            </p>
            <p className="text-sm">{milestone.description || "None"}</p>
          </section>

          {/* Reference materials */}
          {milestone.documentUrls && milestone.documentUrls.length > 0 && (
            <section>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                Reference materials
              </p>
              <div className="space-y-2">
                {milestone.documentUrls.map((url, i) => (
                  <a
                    key={i}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-border/50 bg-muted/30 hover:bg-muted/60 transition-colors text-sm text-primary hover:underline"
                  >
                    <FileText className="w-4 h-4 shrink-0" />
                    <span className="truncate max-w-[300px]">
                      {url.split("/").pop() || `Document ${i + 1}`}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* My Work */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              My work
            </p>

            {type === "completed" ? (
              <div className="space-y-3">
                {milestone.submissionUrls && milestone.submissionUrls.length > 0 ? (
                  <div className="space-y-2">
                    {milestone.submissionUrls.map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-green-500/30 bg-green-500/5 text-sm text-green-600 hover:underline"
                      >
                        <Paperclip className="w-4 h-4 shrink-0" />
                        <span className="truncate">
                          {url.split("/").pop() || `Submission ${i + 1}`}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No files attached.</p>
                )}
                {milestone.studentMessage && (
                  <div className="p-3 bg-muted/40 rounded-lg border border-border/50 text-sm italic text-muted-foreground">
                    "{milestone.studentMessage}"
                  </div>
                )}
                {milestone.remarks && (
                  <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-xs font-semibold text-primary mb-1">
                      Supervisor Feedback
                    </p>
                    <p className="text-sm">{milestone.remarks}</p>
                  </div>
                )}
              </div>
            ) : !groupApproved ? (
              <div className="flex items-center gap-3 p-4 rounded-lg border border-destructive/20 bg-destructive/5 text-sm text-destructive">
                <ShieldX className="w-4 h-4 shrink-0" />
                <span>Submissions are locked until your group is approved by a supervisor.</span>
              </div>
            ) : isLeader ? (
              <MilestoneSubmissionForm
                milestone={milestone}
                isLoading={isLoading}
                onSubmit={async (payload) => {
                  await dispatch(
                    submitMilestone({ groupId, milestoneId: milestone._id, payload })
                  ).unwrap();
                  onSubmitSuccess?.();
                }}
              />
            ) : (
              <div className="flex items-center gap-2 text-muted-foreground text-sm py-4">
                <Upload className="w-4 h-4" />
                <span>Only the group leader can submit this milestone.</span>
              </div>
            )}
          </section>
        </div>

        {/* ── Right column ─────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-border/50 bg-card/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Points / Grade
            </p>
            {milestone.grade ? (
              <div className="flex items-center gap-1.5 text-primary font-bold">
                <Star className="w-4 h-4" />
                {milestone.grade}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Not graded</p>
            )}
          </div>

          <div className="p-4 rounded-xl border border-border/50 bg-card/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">
              Status
            </p>
            <Badge
              variant="outline"
              className={
                milestone.status === "APPROVED"
                  ? "bg-green-500/10 text-green-600 border-green-500/30"
                  : milestone.status === "SUBMITTED"
                  ? "bg-blue-500/10 text-blue-600 border-blue-500/30"
                  : milestone.status === "REJECTED"
                  ? "bg-red-500/10 text-red-600 border-red-500/30"
                  : "bg-amber-500/10 text-amber-600 border-amber-500/30"
              }
            >
              {milestone.status}
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};
