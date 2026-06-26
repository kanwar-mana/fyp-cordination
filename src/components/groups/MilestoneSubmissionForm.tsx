"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Milestone } from "@/types/group.types";
import { UploadCloud, FileIcon, X } from "lucide-react";
import RepositoryFactory from "@/repository/RepositoryFactory";

interface MilestoneSubmissionFormProps {
  milestone: Milestone;
  onSubmit: (payload: { submissionUrls: string[], studentMessage: string }) => Promise<void>;
  isLoading?: boolean;
}

export default function MilestoneSubmissionForm({ milestone, onSubmit, isLoading = false }: MilestoneSubmissionFormProps) {
  const [submissionUrls, setSubmissionUrls] = useState<string[]>([]);
  const [studentMessage, setStudentMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionUrls.length === 0) return;
    await onSubmit({ submissionUrls, studentMessage });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadRepo = RepositoryFactory.get("upload");
      const uploadPromises = files.map(file => uploadRepo.uploadDocument(file));
      const results = await Promise.all(uploadPromises);
      const newUrls = results.map(res => res.data.data.url);
      setSubmissionUrls(prev => [...prev, ...newUrls]);
    } catch (err) {
      console.error("Failed to upload documents", err);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = (urlToRemove: string) => {
    setSubmissionUrls(prev => prev.filter(url => url !== urlToRemove));
  };

  const isSubmitting = isLoading || isUploading;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit: {milestone.title}</CardTitle>
        <CardDescription>Upload your documents and add a message.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-3">
            <Label>Documents & Attachments</Label>
            
            {/* File Upload Dropzone */}
            <div className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed rounded-xl border-border bg-card/50 hover:bg-accent/50 transition-colors cursor-pointer overflow-hidden group">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                disabled={isSubmitting || milestone.status === "APPROVED"}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              <div className="flex flex-col items-center justify-center pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
                <UploadCloud className="w-6 h-6 mb-2 text-muted-foreground group-hover:text-primary transition-colors" />
                <p className="text-xs font-medium text-muted-foreground group-hover:text-foreground">
                  {isUploading ? "Uploading..." : "Click or drag files to upload"}
                </p>
              </div>
            </div>

            {/* Display Uploaded Files */}
            {submissionUrls.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {submissionUrls.map((url, urlIndex) => (
                  <div 
                    key={`${url}-${urlIndex}`}
                    className="flex items-center gap-2 pl-2 pr-1 py-1 text-xs bg-primary/10 text-primary border border-primary/20 rounded-full group"
                  >
                    <FileIcon className="w-3 h-3" />
                    <span className="max-w-[120px] truncate" title={url.split('/').pop()}>
                      {url.split('/').pop() || 'Document'}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="w-5 h-5 p-0 rounded-full hover:bg-primary/20 text-primary"
                      onClick={() => removeFile(url)}
                      disabled={isSubmitting}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label>Message (Optional)</Label>
            <Textarea 
              placeholder="Add any remarks for your supervisor..." 
              value={studentMessage}
              onChange={(e) => setStudentMessage(e.target.value)}
              disabled={isSubmitting || milestone.status === "APPROVED"}
            />
          </div>

          <Button type="submit" disabled={isSubmitting || milestone.status === "APPROVED" || submissionUrls.length === 0}>
            {isLoading ? "Submitting..." : milestone.status === "APPROVED" ? "Already Approved" : "Submit Milestone"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
