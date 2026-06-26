"use client";

import { useEffect, useState } from "react";
import { Loader2, Search, User, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getSupervisors, sendSupervisorRequest } from "@/store/group/groupThunk";
import { User as UserType } from "@/types/auth.types";
import { toast } from "@/components/ui/use-toast";

interface RequestSupervisorProps {
  groupId: string;
}

export const RequestSupervisor = ({ groupId }: RequestSupervisorProps) => {
  const dispatch = useAppDispatch();
  const { supervisors, isLoading } = useAppSelector((s) => s.group);
  const [query, setQuery] = useState("");
  const [requesting, setRequesting] = useState<string | null>(null);
  const [hasPendingRequest, setHasPendingRequest] = useState(false);

  useEffect(() => {
    dispatch(getSupervisors());
  }, [dispatch]);

  const filtered = supervisors.filter((s: UserType) =>
    s.fullName?.toLowerCase().includes(query.toLowerCase()) ||
    s.email?.toLowerCase().includes(query.toLowerCase())
  );

  const handleRequest = async (supervisorId: string) => {
    setRequesting(supervisorId);
    try {
      await dispatch(sendSupervisorRequest({ groupId, supervisorId })).unwrap();
      setHasPendingRequest(true);
    } catch (error: any) {
      // Handled by thunk, but we can catch if it was a "pending request exists" error
      if (error?.message?.includes("already pending")) {
        setHasPendingRequest(true);
      }
    } finally {
      setRequesting(null);
    }
  };

  const getInitials = (name?: string) =>
    (name || "?").split(" ").map((w) => w[0] || "").join("").substring(0, 2).toUpperCase();

  if (hasPendingRequest) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-600 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>
          You have a pending supervisor request. Please wait for the supervisor to respond before sending another request.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>Select a supervisor from your department to oversee your project.</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search supervisors by name…"
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border/50 bg-background focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/50 placeholder:text-muted-foreground"
        />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-6 text-muted-foreground gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-sm">Loading supervisors…</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-6 text-center text-sm text-muted-foreground">
          No supervisors found in your department.
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {filtered.map((supervisor: UserType) => {
            const quota = supervisor.supervisorProfile?.studentQuota || 5;
            const currentGroups = supervisor.supervisorProfile?.groups?.length || 0;
            const isFull = currentGroups >= quota;

            return (
              <div
                key={supervisor._id}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg border border-border/40 bg-card/60 transition-colors ${
                  isFull ? "opacity-60" : "hover:bg-card"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                      {getInitials(supervisor.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-tight">{supervisor.fullName}</p>
                    <p className="text-xs text-muted-foreground">
                      Quota: {currentGroups}/{quota} groups
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-1.5 h-7 text-xs"
                  disabled={isFull || requesting === supervisor._id}
                  onClick={() => handleRequest(supervisor._id)}
                >
                  {requesting === supervisor._id ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <User className="w-3 h-3" />
                  )}
                  {isFull ? "Full" : "Request"}
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
