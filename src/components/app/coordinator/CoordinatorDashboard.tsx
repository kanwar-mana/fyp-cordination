"use client";

import {
  AlertTriangle,
  ArrowRight,
  CalendarDays,
  ClipboardCheck,
  Flag,
  FolderGit2,
  PauseCircle,
  TrendingDown,
  TrendingUp,
  Users,
  EllipsisVertical,
  PencilLine,
  Trash2,
  Power,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateSession from "./CreateSession";
import UpdateSession from "./UpdateSession";
import {
  getSessions,
  deleteSession,
  changeSessionActivation,
} from "@/store/session/sessionThunk";
import type { User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type { Session } from "@/types/session.types";
import { useEffect, useState } from "react";

// ─── Constants ───────────────────────────────────────────────────────────────

const metrics = [
  {
    title: "Active Projects",
    value: 48,
    delta: "+6 this month",
    trend: "up" as const,
    icon: FolderGit2,
  },
  {
    title: "Supervisors",
    value: 17,
    delta: "14 available now",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Pending Approvals",
    value: 9,
    delta: "3 urgent items",
    trend: "down" as const,
    icon: ClipboardCheck,
  },
  {
    title: "Missed Deadlines",
    value: 2,
    delta: "Needs follow-up",
    trend: "down" as const,
    icon: AlertTriangle,
  },
];

const DAY_IN_MS = 24 * 60 * 60 * 1000;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toDate(value?: string) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value?: string) {
  const date = toDate(value);
  if (!date) return "Not set";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateRange(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) return "Dates not configured";
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

function getSessionLifecycle(session: Session) {
  const now = new Date();
  const start = toDate(session.startDate);
  const end = toDate(session.endDate);

  if (start && now < start)
    return { label: "Upcoming", variant: "secondary" as const };
  if (end && now > end)
    return { label: "Completed", variant: "outline" as const };
  return { label: "Active", variant: "default" as const };
}

function getActivationState(session: Session) {
  console.log("Session activation state:", session.isActive);
  if (session.isActive === false) {
    return {
      label: "Paused",
      variant: "secondary" as const,
      icon: PauseCircle,
      muted: true,
    };
  }
  return {
    label: "Active",
    variant: "default" as const,
    icon: Flag,
    muted: false,
  };
}

function getDurationDays(startDate?: string, endDate?: string) {
  const start = toDate(startDate);
  const end = toDate(endDate);
  if (!start || !end) return "-";
  return `${Math.max(1, Math.ceil((end.getTime() - start.getTime()) / DAY_IN_MS))} days`;
}

// ─── Component ───────────────────────────────────────────────────────────────

const CoordinatorDashboard = ({ user }: { user?: User | null }) => {
  const dispatch = useAppDispatch();
  const sessions = useAppSelector((state) => state.session.sessions);

  const [loading, setLoading] = useState(true);
  const [sessionEditorMode, setSessionEditorMode] = useState<
    "create" | "update" | null
  >(null);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [sessionForUpdate, setSessionForUpdate] = useState<Session | null>(
    null,
  );
  const [sessionForDelete, setSessionforDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getSessions())
      .unwrap()
      .finally(() => setLoading(false));
  }, [dispatch]);

  // ── Early returns ──────────────────────────────────────────────────────────

  if (!loading && sessions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-6rem)]">
        <CreateSession />
      </div>
    );
  }

  if (sessionEditorMode === "create") {
    return (
      <CreateSession startInForm onBack={() => setSessionEditorMode(null)} />
    );
  }

  if (sessionEditorMode === "update" && sessionForUpdate) {
    return (
      <UpdateSession
        session={sessionForUpdate}
        onBack={() => {
          setSessionEditorMode(null);
          setSessionForUpdate(null);
        }}
      />
    );
  }

  // ── Handlers ───────────────────────────────────────────────────────────────

  const deleteSelectedSession = async (sessionId: string) => {
    try {
      await dispatch(deleteSession(sessionId)).unwrap();
    } catch (error) {
      console.error("Failed to delete session:", error);
    }
  };

  const changeActivation = async (sessionId: string) => {
    await dispatch(changeSessionActivation(sessionId)).unwrap();
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="relative space-y-6 pb-8">
      {/* Metric Cards */}
      <div className="grid gap-4 grid-cols-2 xl:grid-cols-4">
        {metrics.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              className="gap-4 border-l-4 border-l-primary shadow-lg/3 bg-card/90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            >
              <CardHeader className="pb-0 w-min sm:w-full">
                <div className="flex items-center justify-between">
                  <div className="rounded-md bg-primary/12 p-2 text-primary">
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

      {/* Sessions Card */}
      <Card className="border-border/70 bg-linear-to-br from-card via-card to-primary/5 shadow-lg/10">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <CalendarDays className="size-5 text-primary" />
              Session Details
            </CardTitle>
            <CardDescription>
              Review all coordinator sessions. Click any card to view full
              details.
            </CardDescription>
            <Badge variant="secondary" className="w-fit">
              {sessions.length} {sessions.length === 1 ? "Session" : "Sessions"}
            </Badge>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedSession(null);
              setSessionForUpdate(null);
              setSessionEditorMode("create");
            }}
          >
            New Session
          </Button>
        </CardHeader>

        <CardContent>
          {loading && sessions.length === 0 ? (
            // Skeleton
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-36 rounded-xl border bg-muted/20 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {sessions.map((session: Session, index: number) => {
                const lifecycle = getSessionLifecycle(session);
                const activation = getActivationState(session);

                return (
                  <div
                    key={session._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => setSelectedSession(session)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedSession(session);
                      }
                    }}
                    className={`group rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      activation.muted
                        ? "border-dashed border-muted-foreground/25 bg-muted/35 opacity-80 grayscale-[0.15] hover:border-muted-foreground/40 hover:shadow-none"
                        : "border-accent/20 bg-background/80 hover:border-primary/40"
                    }`}
                  >
                    {/* Card Header Row */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p
                            className={`line-clamp-1 text-base font-semibold tracking-tight ${
                              activation.muted ? "text-muted-foreground" : ""
                            }`}
                          >
                            {session.name}
                          </p>
                        </div>
                        <p
                          className={`line-clamp-1 text-xs ${
                            activation.muted
                              ? "text-muted-foreground/80"
                              : "text-muted-foreground"
                          }`}
                        >
                          {session.department || "Department not specified"}
                        </p>
                      </div>

                      {/* Badges + Actions */}
                      <div className="flex flex-wrap items-center justify-end gap-2">
                        <Badge variant={lifecycle.variant} className="h-6">
                          {lifecycle.label}
                        </Badge>
                        <Badge
                          variant={activation.variant}
                          className={`h-6 gap-1.5 ${
                            activation.muted
                              ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                              : ""
                          }`}
                        >
                          <activation.icon className="size-3.5" />
                          {activation.label}
                        </Badge>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              onClick={(e) => e.stopPropagation()}
                              className="hover:bg-muted-foreground/20 p-2 cursor-pointer rounded-full z-10"
                              aria-label="Open session actions"
                            >
                              <EllipsisVertical className="size-4" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-52 rounded-xl border-border/70 bg-popover/95 p-1.5 shadow-xl backdrop-blur"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.stopPropagation();
                                setSelectedSession(null);
                                setSessionForUpdate(session);
                                setSessionEditorMode("update");
                              }}
                            >
                              <PencilLine className="size-4" />
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={(e) => {
                                e.stopPropagation();
                                changeActivation(session._id!);
                              }}
                            >
                              <Power className="size-4" />
                              Change Activation
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              variant="destructive"
                              onSelect={(e) => {
                                e.stopPropagation();
                                setSessionforDelete(session._id!);
                              }}
                            >
                              <Trash2 className="size-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    {/* Date Range */}
                    <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                      <CalendarDays className="size-3.5" />
                      <span>
                        {formatDateRange(session.startDate, session.endDate)}
                      </span>
                    </div>

                    {/* Footer Row */}
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {(session.fypMilestones || []).length} milestones
                      </span>
                      <span className="inline-flex items-center gap-1 font-medium text-foreground/90 transition-colors group-hover:text-primary">
                        View details
                        <ArrowRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Session Detail Dialog */}
      <Dialog
        open={Boolean(selectedSession)}
        onOpenChange={(open) => {
          if (!open) setSelectedSession(null);
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto p-0 sm:max-w-3xl">
          {selectedSession && (
            <>
              <div className="border-b bg-linear-to-r from-primary/15 via-primary/5 to-transparent px-6 py-5">
                <DialogHeader className="text-left">
                  <div className="flex items-start justify-between gap-3 pr-8">
                    <div>
                      <DialogTitle className="text-2xl tracking-tight">
                        {selectedSession.name}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedSession.department ||
                          "Department not specified"}
                      </DialogDescription>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      <Badge
                        variant={getSessionLifecycle(selectedSession).variant}
                        className="h-6 gap-1.5"
                      >
                        <Flag className="size-3.5" />
                        {getSessionLifecycle(selectedSession).label}
                      </Badge>
                      <Badge
                        variant={getActivationState(selectedSession).variant}
                        className="h-6 gap-1.5"
                      >
                        {getActivationState(selectedSession).muted ? (
                          <PauseCircle className="size-3.5" />
                        ) : (
                          <Flag className="size-3.5" />
                        )}
                        {getActivationState(selectedSession).label}
                      </Badge>
                    </div>
                  </div>
                </DialogHeader>
              </div>

              <div className="space-y-5 px-6 py-5">
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    {
                      label: "Start Date",
                      value: formatDate(selectedSession.startDate),
                    },
                    {
                      label: "End Date",
                      value: formatDate(selectedSession.endDate),
                    },
                    {
                      label: "Duration",
                      value: getDurationDays(
                        selectedSession.startDate,
                        selectedSession.endDate,
                      ),
                    },
                  ].map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border bg-background/80 p-3"
                    >
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="mt-1 text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                <Card className="border-dashed shadow-none">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      Session Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Min Group Size
                      </p>
                      <p className="font-medium">
                        {selectedSession.settings?.minGroupSize ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Max Group Size
                      </p>
                      <p className="font-medium">
                        {selectedSession.settings?.maxGroupSize ?? "-"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Proposal Deadline
                      </p>
                      <p className="font-medium">
                        {formatDate(selectedSession.settings?.proposalDeadline)}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Flag className="size-4 text-primary" />
                    <h3 className="text-sm font-semibold">Milestones</h3>
                  </div>

                  {(selectedSession.fypMilestones || []).length > 0 ? (
                    <div className="space-y-2">
                      {(selectedSession.fypMilestones || []).map(
                        (milestone, index) => (
                          <div
                            key={
                              milestone._id ||
                              milestone.id ||
                              `${milestone.title}-${index}`
                            }
                            className="rounded-xl border bg-background/80 p-3"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <p className="font-medium">{milestone.title}</p>
                              <Badge variant="outline">
                                {formatDate(milestone.dueDate)}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {milestone.description ||
                                "No description provided"}
                            </p>
                          </div>
                        ),
                      )}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                      No milestones configured for this session.
                    </div>
                  )}
                </div>
              </div>

              <DialogFooter className="border-t px-6 py-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedSession(null)}
                >
                  Close
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={Boolean(sessionForDelete)}
        onOpenChange={(open) => {
          if (!open) setSessionforDelete(null);
        }}
      >
        <AlertDialogContent className="border-border/70">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this session? This action cannot
              be undone. All associated data will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSessionforDelete(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={async () => {
                if (sessionForDelete) {
                  await deleteSelectedSession(sessionForDelete);
                  setSessionforDelete(null);
                  setSelectedSession(null);
                }
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CoordinatorDashboard;
