"use client";

import { Group } from "@/types/group.types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, FolderGit2, Users } from "lucide-react";

interface AllGroupsTableProps {
  groups: Group[];
  onDeleteGroup: (groupId: string) => Promise<void>;
  isDeleting?: string | null; // ID of the group currently being deleted to show loading state
}

// Component for Coordinators to view and manage all groups in their department
export default function AllGroupsTable({ groups, onDeleteGroup, isDeleting = null }: AllGroupsTableProps) {
  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No groups have been created in your department yet.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/70 bg-linear-to-br from-card via-card to-primary/5 shadow-lg/10">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-xl">
            <FolderGit2 className="size-5 text-primary" />
            Department Groups
          </CardTitle>
          <CardDescription>
            A complete overview of all FYP groups in your department.
          </CardDescription>
          <Badge variant="secondary" className="w-fit mt-2">
            {groups.length} {groups.length === 1 ? "Group" : "Groups"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Title</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Supervisor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group._id}>
                  <TableCell className="font-medium">{group.projectDetails.title}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{group.projectDetails.domain}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="size-3.5 text-muted-foreground" />
                      {group.members.length} / {group.requiredMembers}
                    </div>
                  </TableCell>
                  <TableCell>
                    {group.supervisor?.fullName ? (
                      <span className="text-sm font-medium">{group.supervisor.fullName}</span>
                    ) : (
                      <Badge variant="outline" className="text-xs text-muted-foreground bg-muted/20">Pending</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={group.status === "APPROVED" ? "default" : "secondary"}>
                      {group.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onDeleteGroup(group._id)}
                      disabled={isDeleting === group._id}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      {isDeleting === group._id ? "Deleting..." : "Delete"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
