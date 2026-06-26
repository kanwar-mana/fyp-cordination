"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/auth.types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllGroups, getMySupervisorRequests, respondToSupervisorRequest } from "@/store/group/groupThunk";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FolderGit2, AlertCircle, ArrowRight } from "lucide-react";
import SupervisorRequestsList from "@/components/groups/SupervisorRequestsList";
import { Project } from "@/components/app/student/StudentProject";

const SupervisorDashboard = ({ user }: { user: User }) => {
  const dispatch = useAppDispatch();
  const { allGroups, mySupervisorRequests, isLoading } = useAppSelector((state) => state.group);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    dispatch(getAllGroups());
    dispatch(getMySupervisorRequests());
  }, [dispatch]);

  // If a specific group is selected to view details
  if (selectedGroup) {
    const groupToView = allGroups.find(g => g._id === selectedGroup);
    if (groupToView) {
      return (
        <div className="space-y-4">
          <button 
            onClick={() => setSelectedGroup(null)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 mb-4"
          >
            ← Back to Dashboard
          </button>
          <Project group={groupToView} />
        </div>
      );
    }
  }

  const activeGroups = allGroups.filter(g => g.status === "APPROVED" || g.status === "COMPLETED");

  return (
    <div className="relative space-y-6 pb-8 mt-2">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Supervisor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user.fullName}. Here is an overview of your supervised projects.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary shadow-lg/3 bg-card/90 transition-all duration-200">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase flex items-center justify-between">
              Active Projects
              <FolderGit2 className="size-4 text-primary" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold leading-none">{activeGroups.length}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 shadow-lg/3 bg-card/90 transition-all duration-200">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase flex items-center justify-between">
              Pending Requests
              <AlertCircle className="size-4 text-amber-500" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold leading-none">{mySupervisorRequests.length}</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500 shadow-lg/3 bg-card/90 transition-all duration-200">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-xs uppercase flex items-center justify-between">
              Supervision Quota
              <Users className="size-4 text-blue-500" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold leading-none">
              {activeGroups.length} <span className="text-lg font-normal text-muted-foreground">/ {user.supervisorProfile?.studentQuota || 5}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="groups" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="groups" className="font-semibold">My Supervised Groups</TabsTrigger>
          <TabsTrigger value="requests" className="font-semibold">Group Requests <Badge className="ml-2 bg-primary/20 text-primary">{mySupervisorRequests.length}</Badge></TabsTrigger>
        </TabsList>

        <TabsContent value="groups" className="space-y-4">
          <Card className="border-border/70 bg-linear-to-br from-card via-card to-primary/5 shadow-lg/10">
            <CardHeader>
              <CardTitle className="text-xl">Supervised Groups</CardTitle>
              <CardDescription>Click on any group to view their milestones and grade their submissions.</CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading && allGroups.length === 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="h-36 rounded-xl border bg-muted/20 animate-pulse" />
                  ))}
                </div>
              ) : allGroups.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  You are not supervising any groups yet.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {allGroups.map((group) => (
                    <div
                      key={group._id}
                      onClick={() => setSelectedGroup(group._id)}
                      className="group cursor-pointer rounded-xl border border-border/70 bg-background/80 p-5 transition-all hover:-translate-y-1 hover:shadow-md hover:border-primary/40 flex flex-col justify-between min-h-[160px]"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="font-semibold line-clamp-1">{group.projectDetails.title}</h3>
                          <Badge variant="outline" className="shrink-0">{group.projectDetails.domain}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">
                          {group.projectDetails.description}
                        </p>
                      </div>
                      <div className="flex items-end justify-between mt-auto">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="size-3.5" />
                          <span>{group.members.length} Members</span>
                        </div>
                        <span className="text-xs font-medium text-primary flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          View details <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <SupervisorRequestsList 
            requests={mySupervisorRequests as any} 
            onRespond={async (payload) => {
              await dispatch(respondToSupervisorRequest(payload)).unwrap();
            }} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupervisorDashboard;
