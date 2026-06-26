"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GroupRequest, RespondSupervisorRequestPayload } from "@/types/group.types";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SupervisorRequestsListProps {
  requests: GroupRequest[];
  onRespond: (payload: RespondSupervisorRequestPayload) => Promise<void>;
}

// Component for supervisors to review and respond to group requests
export default function SupervisorRequestsList({ requests, onRespond }: SupervisorRequestsListProps) {
  const [remarksMap, setRemarksMap] = useState<Record<string, string>>({});

  // Handles responding to a specific request
  const handleAction = async (requestId: string, action: "ACCEPTED" | "REJECTED") => {
    await onRespond({ requestId, action, remarks: remarksMap[requestId] });
  };

  // Updates remarks for a specific request
  const handleRemarksChange = (requestId: string, value: string) => {
    setRemarksMap((prev) => ({ ...prev, [requestId]: value }));
  };

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          No pending supervisor requests at this time.
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request._id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-xl">{request.group.projectDetails.title}</CardTitle>
                <CardDescription>Requested by {request.sender.fullName}</CardDescription>
              </div>
              <Badge>{request.group.projectDetails.domain}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm">
              <p><strong>Description:</strong> {request.group.projectDetails.description}</p>
              <p className="mt-1">
                <strong>Members:</strong> {request.group.members.length}/{request.group.requiredMembers}
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`remarks-${request._id}`}>Remarks (Optional)</Label>
              <Textarea 
                id={`remarks-${request._id}`}
                placeholder="Add any remarks before accepting or rejecting..."
                value={remarksMap[request._id] || ""}
                onChange={(e) => handleRemarksChange(request._id, e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => handleAction(request._id, "ACCEPTED")} className="w-full">
                Accept Request
              </Button>
              <Button onClick={() => handleAction(request._id, "REJECTED")} variant="destructive" className="w-full">
                Reject Request
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
